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
                        <q-input 
                            outlined  
                            type="date" 
                            label="Start time" 
                            id="start_time"
                            v-model="start_time"
                            stack-label 
                            :dense="dense" 
                        />
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
                            v-model="pasword"
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
            text: ref(''),
            ph: ref(''),
            dense: ref(false),
            model: ref(null),
            options: [
                1, 2, 3
            ]
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
            pasword: '',

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
        }
    },

    methods: {
        
        submitFormMeeting () {
            const zoomToken = this.$q.sessionStorage.getItem("zoom_token")
            const zoomUserId = this.$q.sessionStorage.getItem("zoom_id")
            console.log("VOICI LE ZOOM TOKEN " + zoomToken);
            console.log("VOICI LE ZOOM ID " + zoomUserId);
            const formMeeting = {
                start_time: this.start_time,
                topic: this.topic,
                duration: this.duration,
                pasword: this.pasword,
                zoom_token: zoomToken,
                zoom_userId: zoomUserId
            }
            axios.post('http://localhost:4000/api/meetings',formMeeting)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);

                }
            })
            .catch((error) => {
                console.log(error.message);
            })

            this.start_time = '';
            this.topic = '';
            this.duration = '';
            this.pasword = ''
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