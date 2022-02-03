<template>
    <div>
        <form class="form-signin" @submit.prevent="submitFormSignin">
           <div class="form-inner"> 
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
                                label="Mot de passe" 
                                type="password" 
                                id="password" 
                                v-model="form.password"
                                lazy-rules
                                :rules="[ 
                                    val => val !== '' || 'Password can\'t be empty',
                                    val => val.length > 8 || 'Password must have 8 characters at least',
                                ]"
                            />
                        </div>
                    </div>
                </div> <br>
                <div class="form-group">
                    <div class="q-pa-md q-gutter-md">
                        <q-btn color="primary" type="submit" style="width: 300px" label="Connexion" />
                    </div>
                </div> <br>
                <a style="text-decoration:none" href="">Mot de passe oublié ?</a> 
                <a style="text-decoration:none" href="/signup">Créer compte</a>
           </div>
       </form>
    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
                roles: ''
            }
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
        submitFormSignin() {
            axios.post('/api/auth',this.form)
            .then((response) => {
                if(response.status === 200) {
                    /*eslint-disable*/
                    const { app_token, message, zoom_token } = response.data;
                    const infos = jwt_decode(app_token);
                    const { user_id, zoom_userId } = infos

                    this.$q.sessionStorage.set('app_token', app_token)
                    this.$q.sessionStorage.set('message', message)
                    this.$q.sessionStorage.set('current_user', infos)
                    this.$q.sessionStorage.set('zoom_token', zoom_token)
                    this.$q.sessionStorage.set('zoom_userId', zoom_userId)
                    this.$q.sessionStorage.set('user_id', user_id)
                   
                    this.$router.push('/dashboard/home')
                }
            })
            .catch((error)=> {
                //console.log(error);
                this.$q.notify({
                    type: 'negative',
                    message: 'Error connection',
                    position: 'top-right'
                })
            })
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

    a {
        text-align: center;
        margin-right: 2em;
    }

    .form-signin {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ABB2B9
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
</style>