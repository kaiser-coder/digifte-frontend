<template>
    <div>
        <form class="form-signup" @submit.prevent="submitForm">
            <div class="form-inner"> 
                <div class="form-group">
                    <div class="q-pa-md">
                        <div class="q-gutter-md" style="max-width: 300px">
                            <q-input 
                                label="Nom" 
                                id="firstname" 
                                v-model="form.firstname"
                                lazy-rules
                                :rules="[ val => val !== '' || 'Input your first name']"
                                
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="q-pa-md">
                        <div class="q-gutter-md" style="max-width: 300px">
                            <q-input 
                                label="Prénom" 
                                id="lastname" 
                                v-model="form.lastname"
                                lazy-rules
                                :rules="[ val => val !== '' || 'Input your last name']"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="q-pa-md">
                        <div class="q-gutter-md" style="max-width: 300px">
                            <q-input 
                                label="Email" 
                                id="email" 
                                v-model="form.email"
                                lazy-rules
                                :rules="[ val => validateEmail(val) || 'Invalid email address']"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="q-pa-md">
                        <div class="q-gutter-md" style="max-width: 300px">
                            <q-input 
                                type="password" 
                                id="password" 
                                v-model="form.password" 
                                label="Mot de passe"
                                lazy-rules
                                :rules="[ 
                                    val => val !== '' || 'Password can\'t be empty',
                                    val => val.length > 8 || 'Password must have 8 characters at least',
                                ]"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="q-pa-md">
                        <div class="q-gutter-md" style="max-width: 300px">
                            <q-input 
                                type="password" 
                                id="password"
                                v-model="confPassword"
                                label="Re-taper le mot de passe"
                                lazy-rules
                                :rules="[   
                                    val => val === form.password  || 'Confirmation password  must be equal to password'
                                ]"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="q-pa-md">
                        <div class="q-gutter-sm">
                            <q-checkbox v-model="isAccepted"/> J'accepte les <a style="text-decoration:none" href="">conditions d'utilisations</a> 
                        </div>
                        <div class="q-px-sm">
                        </div>
                </div>
                </div>
                <div class="form-group">
                    <div class="q-pa-md q-gutter-sm">
                        <q-btn :disabled="!isAccepted" color="secondary" type="submit" style="width:300px" label="Créer" /> 
                    </div>
                </div> 
                <div class="form-group">
                    <div class="q-pa-md q-gutter-sm">
                        <a style="text-decoration:none" href="/"> <q-btn class="buttonCancel" style="width:300px" label="Annuler" /> </a>
                    </div>
                </div> <br>
                
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
                isAccepted: ref(false)
            }
        },

        data() {
            return {
                form: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                },
                confPassword: ''
            }
        },
        beforeMount() {
            /*eslint-disable*/
            if(this.$q.sessionStorage.getItem('current_user')) {
                this.$router.push('/home')
            }
        },
        methods: {
            validateEmail(email) {
                let regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
                return regex.test(email)
            },
            async submitForm() {
                if(this.isAccepted) {
                    await axios.post('http://localhost:4000/register',this.form)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error)=> {
                        console.log(error);
                        this.$q.notify({
                            type: 'negative',
                            message: 'All fields are required',
                            position: 'top-right'
                        })
                    })
                }
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: montserrat, sans-serif ;
    }

    .form-signup {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(7, 20, 122, 0.781)
    }

    form {
        display: block;
        position: relative;
    }

    form .form-inner {
        position: relative;
        border-radius: 8px;
        display: block;
        background-color: #FFF;
        padding: 30px;
        z-index: 2;
    }

    form .form-inner h2 {
        color: #888;
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 30px;

    }

    form .form-inner .form-group {
        display: block;
        width: 300px;
        margin-bottom: 15px;
    }

    .form-inner .form-group label {
        display: block;
        margin-left: 0.5rem;
        color: #666;
        font-size: 12px;
        margin-bottom: 5px;
        transition: 0.4s;
    }

    form .form-inner .form-group input {
        display: block;
        border: none;
        width: 100%;
        padding: 10px 15px;
        background-color: #c9c6c687;
        border-radius: 5px;
        transition: 0.4s;
    }

    form .form-inner .form-group input:focus {
        box-shadow: 0px 0px 3px rgba(112, 111, 111, 0.2);
    }

    .buttonCancel
    {
        display: inline-block;
        border: none;
        width: 300px;
        color:#fff;
        padding: 10px 15px;
        border-radius: 5px;
        background-size: 200%;
        background-position: 0%;
        background-color:#888;
        transition: 0.4s;
        font-weight: 700;
        cursor: pointer;
    }
</style>