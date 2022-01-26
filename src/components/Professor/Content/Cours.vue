<template>
    <div>
        <!-- <p>Bienvenue {{ fullName }}</p> -->
        <h3 class="titleOne">EB 7283 - Les psaumes</h3> 
        <h4 class="titleTwo">Session hiver 2020</h4> 
        <h4 class="titleThree">Nouvelle leçon</h4> <br>

        <form class="form-meeting" @submit.prevent="submitFormMeeting">
            <div class="form-inner"> 
                <div class="form-group-meet">
                    <div class="q-pa-md">
                        
                        <q-input outlined v-model="start_date" label="Date du cours">
                            <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="start_date" mask="YYYY-MM-DD" color="negative">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="#b71c1c" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <q-input outlined v-model="start_time" label="Heure">
                            <template v-slot:prepend>
                                <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="start_time" mask="HH:mm:ss" format24h color="negative">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="#b71c1c" flat />
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <q-input 
                            outlined  
                            label="Topic" 
                            id="topic"
                            v-model="topic"
                            stack-label 
                            :dense="dense" 
                            required
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
                            required
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
            start_date: '',
            start_time: '',
            topic: '',
            duration: '',
            password: '',
        }
    },
    beforeMount() {
        /*eslint-disable*/
        if (!this.$q.sessionStorage.getItem('current_user')) {
            this.$router.push('/')
        }
    },

    methods: {
        
        submitFormMeeting () {
            
            const zoomToken = this.$q.sessionStorage.getItem("zoom_token")
            const appToken = this.$q.sessionStorage.getItem("app_token")
            //yyyy-MM-ddTHH:mm:ssZ   2020-03-31T12:02:00Z  2022-01-28T20:47:00Z
            var date_zoom = this.start_date + 'T' + this.start_time + ':00Z';
            
            const formMeeting = {
                start_time: date_zoom,
                topic: this.topic,
                duration: this.duration,
                passcode: this.password,
                zoom_token: zoomToken,
                zoom_userId: this.currentUser.zoom_id
            }
            
            axios.post('/api/meetings',formMeeting, { headers: {'x-access-token' : appToken }})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.$q.notify({
                        type: 'positive',
                        message: 'Meeting créé',
                        position: 'top',
                    })
                }
            })
            .catch((error) => {
                console.log(error.message);
                this.$q.notify({
                    type: 'negative',
                    message: 'Erreur de saisi',
                    position: 'top',
                })
            }),

            this.start_date = '';
            this.start_time = '';
            this.topic = '';
            this.duration = '';
            this.password = '';
        }
    }
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