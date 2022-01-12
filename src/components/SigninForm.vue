<template>
    <div>
        <form class="form-signin" @submit.prevent="submitFormSignin">
           <div class="form-inner"> 
                <div class="form-group">
                    <div class="q-pa-md">
                        <div class="q-gutter-md" style="max-width: 300px">
                            <q-input label="Email" id="email" v-model="form.email" required />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="q-pa-md">
                        <div class="q-gutter-md" style="max-width: 300px">
                            <q-input label="Mot de passe" type="password" id="password" v-model="form.password" required />
                        </div>
                    </div>
                </div> <br>
                <div class="form-group">
                    <div class="q-pa-md q-gutter-md">
                        <q-btn color="primary" type="submit" style="width: 300px" label="Connexion" />
                    </div>
                </div> <br>
                <a style="text-decoration:none" href="">Mot de passe oublié ?</a> 
                <a style="text-decoration:none" href="/signup">Nouveau compte</a>
           </div>
       </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async submitFormSignin() {
            await axios.post('http://localhost:4000/auth/signin',this.form)
            .then((response) => {
                console.log(response);
            })
            .catch((error)=> {
                console.log(error);
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