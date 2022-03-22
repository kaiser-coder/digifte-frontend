<template lang="" >
    <div class="content">
        <div class="row">
            <div class="col">
                <div class="container-form">
                    <form class="form" @submit.prevent="submitForm">
                    <h4 class="form-title">Créer mon compte étudiant</h4>
                    
                    <div class="red-border"></div>

                        <div class="signup-form">
                            <div class="input-form"> 
                                <div class="q-pa-md">
                                    <div class="q-gutter-md">
                                        <q-input 
                                            class="form-name"
                                            bg-color="white"
                                            label="Nom" 
                                            id="firstname" 
                                            rounded 
                                            outlined
                                            v-model="form.firstname"
                                            lazy-rules
                                            :rules="[ val => val !== '' || 'Entrez votre nom']"
                                        />
                                    </div>
                                </div>
                            </div> <br>
                            <div class="input-form"> 
                                <div class="q-pa-md">
                                    <div class="q-gutter-md">
                                        <q-input 
                                            class="form-prenom"
                                            label="Prénom"   
                                            bg-color="white"
                                            id="lastname" 
                                            v-model="form.lastname"
                                            lazy-rules
                                            :rules="[ val => val !== '' || 'Entrez votre prénom']"
                                            rounded 
                                            outlined
                                        />
                                    </div>
                                </div>
                            </div> <br>
                            <div class="input-form"> 
                                <div class="q-pa-md">
                                    <div class="q-gutter-md">
                                        <q-input 
                                            class="form-mail"
                                            label="Email"  
                                            id="mail" 
                                            bg-color="white"
                                            v-model="form.email"
                                            lazy-rules
                                            :rules="[ val => validateEmail(val) || 'Entrez votre adresse mail']"
                                            rounded 
                                            outlined
                                        />
                                    </div>
                                </div>
                            </div> <br>
                            <div class="input-form"> 
                                <div class="q-pa-md">
                                    <div class="q-gutter-md">
                                        <q-input 
                                            class="form-password"
                                            label="Mot de passe"  
                                            id="password" 
                                            type="password"
                                            bg-color="white"
                                            v-model="form.password" 
                                            lazy-rules
                                            :rules="[ 
                                                val => val !== '' || 'Le mot de passe ne peut pas être vide',
                                                val => val.length > 8 || 'Le mot de passe doit comporter au moins 8 caractères',
                                            ]"
                                            rounded 
                                            outlined
                                        />
                                    </div>
                                </div>
                            </div> <br>
                            <div class="input-form"> 
                                <div class="q-pa-md">
                                    <div class="q-gutter-md">
                                        <q-input 
                                            class="form-conf-password"
                                            label="Tapez de nouveau le mot de passe"  
                                            id="password" 
                                            type="password"
                                            rounded 
                                            outlined
                                            bg-color="white"
                                            v-model="confPassword"
                                            lazy-rules
                                            :rules="[   
                                                val => val === form.password  || 'Le mot de passe de confirmation doit être égal au mot de passe'
                                            ]"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="input-form" id="fields"> 
                                <div class="q-pa-md text-white">
                                    <div class="q-gutter-md">
                                        <q-checkbox v-model="isAccepted" color="white" dark/> J'accepte les <strong class="link">conditions d'utilisation</strong> 
                                    </div>
                                </div>
                            </div> <br>
                            <div class="btn-signin-position">
                                <div class="q-pa-md">
                                    <div class="q-gutter-md" id="btns">
                                        <q-btn 
                                            class="btn-infos" 
                                            color="white" 
                                            label="Plus d'informations" 
                                            outline 
                                            rounded 
                                            no-caps
                                        /> &nbsp;
                                        <q-btn 
                                            class="btn-new-compte" 
                                            color="white"
                                            label="Créer mon compte" 
                                            :disabled="!isAccepted"
                                            outline 
                                            rounded 
                                            no-caps
                                        />
                                    </div>  
                                </div>   
                            </div>
                        </div>    
                    </form>
                <h2 class="title-footer"> ACADIA </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /*eslint-disable*/
    import { ref, reactive, onBeforeMount } from 'vue';
    import axios from 'axios';
    import { useQuasar } from 'quasar';
    import { useRouter } from 'vue-router';
    

        const isAccepted = ref(false);
        const $q = useQuasar();
        const $router = useRouter();

        const form = reactive({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        })

        const confPassword = ref('')

        onBeforeMount( () => {
            if($q.sessionStorage.getItem('current_user')) {
                $router.push('/home')
            }
        }) 
        
        function validateEmail(email) {
            let regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
            return regex.test(email)
        }

        const submitForm = async() => { 

            if(isAccepted) {
                await axios.post('/api/register',form)
                .then((response) => {
                    $q.notify({
                        type: 'positive',
                        message: 'Informations créés avec success',
                        position: 'top-right'
                    })

                })
                .catch((error)=> {
                    //console.log(error);
                    $q.notify({
                        type: 'negative',
                        message: 'All fields are required',
                        position: 'top-right'
                    })
                })

                form.firstname = ''
                form.lastname = ''
                form.email = ''
                form.password = ''
                form.confPassword = ''
            }
        }
        
    
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: montserrat, sans-serif ;
    }

    .link {
        cursor: pointer;
    }

    .container-form{
        position: relative;
        align-items: center;
    }

    .form {
        align-items: flex-start;
        padding-top: 100px;
    }

    .container-form .form {
        display: flex;
        justify-content: center;
        background-color: #00427A;
        gap: 70px;
        height: 100vh;
    }

    .container-form .title-footer{
        position: absolute;
        bottom: 40px;
        left: 30px;
        font-family: 'Montserrat';
        font-size: 100px;
        letter-spacing: 12px;
        color: #FFFFFF;
        opacity: 0.11;
    }

    .input-form {
        padding: 2px 0;
    }

    .form-mail,.form-password{
        width: 100%;
    }

    .form-title {
        text-align: right;
        font: normal normal 600 60px/73px Montserrat;
        letter-spacing: 3.6px;
        color: #FFFFFF;
        width: 400px;
    }
    
    .signup-form {
        display: flex;
        flex-direction: column;
        width: 540px;
    }

    .input-form#fields {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 40px;
        text-align: right;
        letter-spacing: 1.2px;
        color: #FFFFFF;
        opacity: 1;
    }

    .btn-signin-position {
        margin-top: 45px;
        margin-left: 80px;
        width: 400px;
    }

    .btn-signin-position #btns {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 10px;
    }

    .q-btn--outline::before {
        border: 1px solid transparent !important;
    }

    .btn-infos {
        border: 1px solid white;
        border-radius: 20px;
        padding: 5px;
        width: 250px;
    }

    .btn-new-compte {
        border: 1px solid #C41526;
        background-color: #C41526 !important;
        border-radius: 20px;
        padding: 5px;
        width: 250px;
    }

    .red-border {
        background: #C41526 0% 0% no-repeat padding-box;
        border-radius: 11px;
        width: 20px;
        height: 269px;
    }

    .content {
        overflow-x: hidden;
        overflow-y: hidden;
    }
</style>