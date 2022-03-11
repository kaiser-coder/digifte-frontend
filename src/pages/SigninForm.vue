<template lang="">
    <div>
        <div class="row">
            <div class="col">
                <div class="form-header"> <br><br>
                    <h2 class="form-title">
                        <img src="../assets/LogoFTE.jpg">
                        <div class="header-title">ACADIA</div>
                    </h2> <br>
                    <p>faculté théologique évangélique</p> <br><br>
                    <h1 class="title">BIENVENUE</h1>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div> 
                    <form class="form-signin" @submit.prevent="submitFormSignin">
                        <div>
                            <div class="form-input"> 
                                <div class="q-pa-md">
                                    <div class="q-gutter-md">
                                        <q-input 
                                            class="form-mail"
                                            label="Email" 
                                            id="email" 
                                            rounded 
                                            outlined
                                            bg-color="white"
                                            v-model="form.email"
                                            lazy-rules
                                            :rules="[ val => validateEmail(val) || 'Adresse mail invalide']"
                                        />
                                    </div>
                                </div>
                            </div> <br>
                            <div class="form-input"> 
                                <div class="q-pa-md">
                                    <div class="q-gutter-md">
                                        <q-input 
                                            class="form-password"
                                            label="Mot de passe" 
                                            type="password" 
                                            id="password" 
                                            rounded 
                                            outlined
                                            bg-color="white"
                                            v-model="form.password"
                                            lazy-rules
                                            :rules="[ 
                                                val => val !== '' || 'Le mot de passe ne peut pas être vide',
                                                val => val.length > 8 || 'Le mot de passe doit être 8 caractères',
                                            ]"
                                        />
                                    </div>
                                </div>
                            </div> <br>

                            <div class="form-input"> 
                                <div class="q-pa-md text-white">
                                    <div class="q-gutter-md">
                                        <q-radio 
                                            v-model="shape" 
                                            color="white"
                                            val="Rester connecter" 
                                            dark
                                            label="Rester connecter" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="form-input"> 
                                <div class="q-pa-md">
                                    <div class="q-gutter-md">
                                        <q-btn
                                            class="btnConnect"
                                            type="submit"
                                            no-caps
                                            text-color="white"
                                            rounded
                                            unelevated
                                            label="Me connecter"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="q-pa-md">
                                <div class="q-gutter-md">
                                    <q-btn 
                                        class="btnMdp" 
                                        outline 
                                        rounded 
                                        no-caps
                                        color="white" 
                                        label="Mot de passe oublié ?" 
                                    /> &nbsp;
                                    <q-btn 
                                        class="btnMdp" 
                                        outline 
                                        rounded 
                                        no-caps
                                        color="white" 
                                        href="/signup"
                                        label="Nouveau compte" 
                                    />
                                </div>
                            </div>   
                        </div>    
                    </form>
                </div>
                <!-- <h2 class="titleFooter">ACADIA</h2> -->
            </div>
        </div>
    </div>
</template>

<script setup>
    import jwt_decode from 'jwt-decode';
    import { ref } from 'vue';
    import { reactive } from 'vue';
    import { useUserStore } from 'src/stores/user';
    import { useQuasar } from 'quasar';
    import { useRouter } from 'vue-router';

    // Local states
    const form = reactive({
        email: '',
        password: '',
    });

    // Store
    /*eslint-disable*/
    const userStore = useUserStore();
    
    // Plugins
    const $q = useQuasar();
    const $router = useRouter();

    const shape = ref();

    function validateEmail(email) {
        let regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
        // console.log('Regex test is =>', regex.test(email))
        return regex.test(email)
    };
        
    function submitFormSignin() {
        console.log('Form content =>', form);

        userStore.userSignin(form)
            .then((response) => {
                /*eslint-disable*/
                const { app_token, zoom_token } = response.data;
                const infos = jwt_decode(app_token);
                const { user_id, zoom_userId } = infos

                $q.sessionStorage.set('app_token', app_token)
                $q.sessionStorage.set('current_user', infos)
                $q.sessionStorage.set('zoom_token', zoom_token)
                $q.sessionStorage.set('zoom_userId', zoom_userId)
                $q.sessionStorage.set('user_id', user_id)
                
                console.log('Route object =>', $router);
                $router.push('/app/home');
            })
            .catch((error)=> {
                //console.log(error);
                $q.notify({
                    type: 'negative',
                    message: 'Error connection',
                    position: 'top-right'
                })
            })
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    /* .row > div {} */

    .row + .row {
        margin-top: 6.1rem; 
    }

    img {
        height:100px;
        width: 120px;
    }

    .form-header {
        width: 95%;
        height: 30vh;
    }

    .header-title {
        font-size: 100px;
    }
    
    .form-title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Montserrat';
        letter-spacing: 18px;
        color: #00427A;
        opacity: 1;
    }

    .title {
        text-align: center;
        font-family: 'Montserrat';
        font-weight: 900;
        font-size: 100px;
        letter-spacing: 20px;
        color: #00427A;
        opacity: 1;
    }
    
    .titleFooter{
        font-family: 'Montserrat';
        font-size: 100px;
        top:-6em;
        letter-spacing: 12px;
        color: #FFFFFF;
        opacity: 0.11;
    }

    p {
        text-align: center;
        letter-spacing: 3.6px;
        margin-right: -1em;
        color: #00427A;
        font-size: 225%;
        opacity: 1;
    }

    .btnConnect {
        background-color: #C41526;
        width: 150px;
        left: 18em;
        top: -4em;
    }

    .btnMdp {
        background-color: #00427A;
        left: 18em;
        top: -4em;
        width: 180px;
    }

    a {
        text-align: center;
        margin-right: 2em;
    }

    .form-signin {
        height: 60vh; 
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #00427A
    }

    .form-input {
        position: relative;
        display: block;
        padding: 30px;
        top: -6em;
        margin-left: 15em;
        width: 400px;
        height: 20px;
    }

    .form-mail,.form-password{
        width: 400px;
    }
</style>