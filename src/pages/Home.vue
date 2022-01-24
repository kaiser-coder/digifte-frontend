<template>
    <div>
        <!-- <p>Bienvenue {{ fullName }}</p> -->
        <h3 class="titleOne">EB 7283 - Les psaumes</h3> 
        <h4 class="titleTwo">Session hiver 2020</h4> 
        <h4 class="titleThree">Nouvelle leçon</h4> <br>

        <form class="form-meeting" @submit.prevent="submitFormMeeting" v-if="isShown">
            <div class="form-inner"> 
                <div class="form-group-meet">
                    <div class="q-pa-md">
                        <q-input 
                            outlined  
                            type="date" 
                            label="Date du cours" 
                            id="start_time"
                            v-model="start_time"
                            stack-label 
                            :dense="dense" 
                        /> 

                        <!-- <q-input outlined v-model="date" >
                            <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>

                            <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                    </q-time>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>  -->

                        <q-input 
                            outlined  
                            label="Topic" 
                            id="topic"
                            v-model="topic"
                            stack-label 
                            :dense="dense" 
                        />
                        <q-select 
                            outlined 
                            :options="options" 
                            label="Durée heure" 
                            id="duration"
                            v-model="duration"
                            stack-label 
                            :dense="dense" 
                        />
                        <q-input 
                            outlined  
                            type="password" 
                            label="Mot de passe" 
                            id="password"
                            v-model="password"
                            stack-label 
                            :dense="dense" 
                        />

                        <q-btn 
                            size="18px" 
                            type="submit"
                            style="background: #7e807c;color:white; width: 330px; margin-left: 0.5rem;" 
                            label="Créer" 
                        />
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    setup () {
        return {
            date: ref('2022-01-21 16:15'),
            text: ref(''),
            ph: ref(''),
            dense: ref(false),
            model: ref(null),
            options: [1, 2, 3],
        }
    },
    data() {
        return {
            message: '',
            fullName: '',
            currentUser: {},

            start_time: '',
            topic: '',
            duration: '',
            password: '',
            isShown: false,
        }
    },
    beforeMount() {
        /*eslint-disable*/
        if (!this.$q.sessionStorage.getItem('current_user')) {
            this.$router.push('/')
        }
    },
    mounted() {
        /*eslint-disable*/
        if (!this.$q.sessionStorage.isEmpty()) {
            this.message = this.$q.sessionStorage.getItem('message');
            this.fullName = this.$q.sessionStorage.getItem('fullname');
            this.currentUser = this.$q.sessionStorage.getItem('current_user');
        }

        if(this.currentUser.roles.includes('professor')) {
            this.isShown = true
        }
    },

    methods: {
        
        submitFormMeeting () {

            const zoomToken = this.$q.sessionStorage.getItem("zoom_token")
            const appToken = this.$q.sessionStorage.getItem("app_token")

            console.log("VOICI LE ZOOM TOKEN " + zoomToken);
            console.log("VOICI LE ZOOM ID " + this.currentUser.zoom_id);

            const formMeeting = {
                start_time: this.start_time,
                topic: this.topic,
                duration: this.duration,
                passcode: this.password,
                zoom_token: zoomToken,
                zoom_userId: this.currentUser.zoom_id
            }

            console.log(formMeeting);
            

            axios.post('/api/meetings',formMeeting, { headers: {
                'x-access-token' : appToken
            }})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error.message);
            })

            this.start_time = '';
            this.topic = '';
            this.duration = '';
            this.password = ''
        }
    },
}
</script>


<style scoped>
    
    .titleOne {
        text-align: center;
        margin-top: 20px;
        line-height: 0;
    }

    .titleTwo {
       text-align: center;
        margin-top: 20px;
        line-height: 0;
    }

    .titleThree {
        text-align: center;
        margin-top: 20px;
        line-height: 0.5;
    }

    form {
        display: block;
        position: relative;
    }

    .form-meeting {
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form .form-inner {
        position: relative;
        border-radius: 8px;
        display: block;
        background-color: #FFF;
        z-index: 2;
    }

    form .form-inner .form-group-meet {
        display: block;
        width: 400px;
        margin-bottom: 15px;
    }

    .form-group-meet {
        border: none;
        padding: 10px 15px;
        background-color: #c9c6c687;
        border-radius: 5px;
    }

    form .form-inner .form-group-meet input {
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
    }

    .form-inner .form-group-meet label {
        margin-left: 0.5rem;
        color: #fff;
        font-size: 12px;
        margin-bottom: 5px;
    }

</style>