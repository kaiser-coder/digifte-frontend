<template>
  <div class="content">
    <div class="row">
      <div class="col">
        <div class="header-form">
          <h2 class="title-form">
            <img src="../assets/LogoFTE.jpg" />
            <div class="header-title">ACADIA</div>
          </h2>
          <p>faculté théologique évangélique</p>
          <h1 class="title">BIENVENUE</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="container-form">
          <form class="form" @submit.prevent="submitFormSignin">
            <h4 class="form-title">Mon espace étudiant</h4>
            <div class="red-border"></div>
            <div class="signin-form">
              <div class="input-form">
                <div class="q-pa-md">
                  <div class="q-gutter-md">
                    <q-input
                      class="form-mail"
                      label="Email"
                      id="email"
                      rounded
                      outlined
                      bg-color="white"
                      v-model="form.Email"
                      lazy-rules
                      :rules="[(val) => validateEmail(val) || 'Adresse mail invalide']"
                      width="180px"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div class="input-form">
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
                      v-model="form.Password"
                      lazy-rules
                      :rules="[
                        (val) => val !== '' || 'Le mot de passe ne peut pas être vide',
                        (val) =>
                          val.length > 8 || 'Le mot de passe doit être 8 caractères',
                      ]"
                    />
                  </div>
                </div>
              </div>
              <div class="input-form" id="fields">
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
                <div class="q-pa-md">
                  <div class="q-gutter-md">
                    <q-btn
                      class="btn-connect"
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
              <div class="btn-signin-position">
                <div class="q-pa-md">
                  <div class="q-gutter-md" id="btns">
                    <q-btn
                      class="btn-form"
                      outline
                      rounded
                      no-caps
                      color="white"
                      label="Mot de passe oublié ?"
                    />
                    &nbsp;
                    <q-btn
                      class="btn-form"
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
            </div>
          </form>
          <h2 class="title-footer">ACADIA</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/*eslint-disable*/

import jwt_decode from 'jwt-decode';
import { ref } from 'vue';
import { reactive } from 'vue';
import { useUserStore } from 'src/stores/user';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Local states
const form = reactive({
  Email: '',
  Password: '',
});

// Store
const userStore = useUserStore();

// Plugins
const $q = useQuasar();
const $router = useRouter();

const shape = ref();

function validateEmail(email) {
  let regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
  // console.log('Regex test is =>', regex.test(email))
  return regex.test(email);
}

function submitFormSignin() {
  // console.log('Form content =>', form);

  userStore
    .userSignin(form)
    .then((response) => {
      // console.log(response);

      //? Define all sessions varuable for tokens
      Object.entries(response.data).map(([key, value]) =>
        $q.sessionStorage.set(key, value)
      );

      //? Define all sessions variable
      const infos = jwt_decode(response.data.app_token);
      Object.entries(infos).map(([key, value]) => $q.sessionStorage.set(key, value));

      // console.log('Route object =>', $router);

      //? Data synchornization between Salesforce and MongoDB
      synchronize();

      /* const status = $q.sessionStorage.getItem('status');
      if (status === 'visitor') {
        $router.push('/app/home');
      } else {
        //NOTE: temporaly redirection because there is no dashboard view
        $router.push('/app/courses/list');
      } */
    })
    .catch((error) => {
      //console.log(error);
      $q.notify({
        type: 'negative',
        message: 'Error connection',
        position: 'top-right',
      });
    });
}

const synchronize = () => {
  const salesforceId = $q.sessionStorage.getItem('salesforce_id');
  const sfToken = $q.sessionStorage.getItem('sf_token');
  const url = `/api/salesforce/program-plans/0036g00000OWSnaAAH`;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${sfToken}`,
      },
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

/* Title Head  */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

img {
  height: 100px;
  width: 120px;
}

.header-form {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-title {
  font-size: 100px;
}

.title {
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 900;
  font-size: 165px;
  letter-spacing: 20px;
  color: #00427a;
  opacity: 1;
  padding-top: 120px;
}

.title-form {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat';
  letter-spacing: 18px;
  color: #00427a;
  opacity: 1;
}

p {
  text-align: center;
  letter-spacing: 3.6px;
  margin-right: -1em;
  color: #00427a;
  font-size: 225%;
  opacity: 1;
}

/* Signin Form */

.container-form {
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
  background-color: #00427a;
  gap: 70px;
  height: 50vh;
}

.container-form .title-footer {
  position: absolute;
  bottom: 40px;
  left: 30px;
  font-family: 'Montserrat';
  font-size: 100px;
  letter-spacing: 12px;
  color: #ffffff;
  opacity: 0.11;
}

.input-form {
  padding: 2px 0;
}

.form-mail,
.form-password {
  width: 100%;
}

.btn-connect {
  background-color: #c41526;
  width: 150px;
}

.btn-form {
  background-color: #00427a;
  width: 180px;
}

.form-title {
  text-align: right;
  font: normal normal 600 60px/73px Montserrat;
  letter-spacing: 3.6px;
  color: #ffffff;
  width: 400px;
}

.signin-form {
  display: flex;
  flex-direction: column;
  width: 540px;
}

.input-form#fields {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
}

.btn-signin-position {
  margin-top: 100px;
  width: 100%;
}

.btn-signin-position #btns {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
}

.red-border {
  background: #c41526 0% 0% no-repeat padding-box;
  border-radius: 11px;
  width: 20px;
  height: 269px;
}

.content {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
