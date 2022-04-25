<template>
  <q-form>
    <div class="content">
      <div class="row">
        <div class="col">
          <div class="container-form">
            <form class="form">
              <h4 class="form-title">Mon espace profil</h4>
              <div class="red-border"></div>
              <div class="profil-form">
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
                        lazy-rules
                        :rules="rules.firstname"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="input-form">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-input
                        class="form-prenom"
                        label="Prénom"
                        bg-color="white"
                        id="lastname"
                        lazy-rules
                        :rules="rules.lastname"
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="input-form">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-input
                        class="form-mail"
                        label="E-mail"
                        id="mail"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.email"
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="input-form">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-input
                        class="form-mail"
                        label="Numéro de téléphone"
                        id="phone"
                        bg-color="white"
                        lazy-rules
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <p class="p-adresse-residence">Adresse de résidence</p>
                <br />
                <div class="input-form">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-input
                        class="form-adresse"
                        label="Adresse"
                        id="adresse"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.address"
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="input-form">
                  <div class="form-residence row">
                    <div class="col">
                      <q-input
                        class="form-code-postale"
                        label="Code postale"
                        id="code-postale"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.postalCode"
                        rounded
                        outlined
                      />
                    </div>
                    <div class="col">
                      <q-input
                        class="form-ville"
                        label="Ville"
                        id="ville"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.city"
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="input-form">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-input
                        class="form-pays"
                        label="Pays"
                        id="pays"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.country"
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <p class="p-adresse-postale">Adresse postale</p>
                <br />
                <div class="input-form">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-input
                        class="form-adresse"
                        label="Adresse"
                        id="adresse"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.address"
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="input-form">
                  <div class="form-residence row">
                    <div class="col">
                      <q-input
                        class="form-code-postale"
                        label="Code postale"
                        id="code-postale"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.postalCode"
                        rounded
                        outlined
                      />
                    </div>
                    <div class="col">
                      <q-input
                        class="form-ville"
                        label="Ville"
                        id="ville"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.city"
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="input-form">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-input
                        class="form-pays"
                        label="Pays"
                        id="pays"
                        bg-color="white"
                        lazy-rules
                        :rules="rules.country"
                        rounded
                        outlined
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="input-form" id="fields">
                  <div class="q-pa-md text-white">
                    <div class="q-gutter-md" id="file">
                      <q-file
                        borderless
                        v-model="model"
                        label="Importer un photo de profil"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div class="form-save-profil">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-btn
                        class="btn-save-profil"
                        flat
                        color="white"
                        label="Enregistrer mon profil"
                        outline
                        rounded
                        no-caps
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
/*eslint-disable*/

import { ref, reactive } from 'vue';
const model = ref(null);

const rules = reactive({
  firstname: [(val) => (val && val !== '') || 'Entrez votre nom'],
  lastname: [(val) => (val && val !== '') || 'Entrez votre prénom'],
  // email: [(val) => validateEmail(val) || 'Entrez votre adresse mail'],
  address: [(val) => (val && val !== '') || 'Entrez votre adresse'],
  postalCode: [(val) => (val && val !== '') || 'Entrez votre code postale'],
  city: [(val) => (val && val !== '') || 'Entrez votre ville'],
  country: [(val) => (val && val !== '') || 'Entrez votre pays'],
});

/* const formFields = reactive({
  FirstName,
  LastName,
  Email,
  Phone,
  Address,
  City,
  PostalCode,
  Country,
}); */
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

/*CUSTOM ATTRIBUT QUASAR*/

/*For size label in input*/
.input-form .q-field__label.no-pointer-events.absolute.ellipsis {
  font-size: 16px;
  top: 10px;
}

/*For propriety css*/
#file .q-field__label.no-pointer-events.absolute.ellipsis {
  color: white !important;
  width: 225px !important;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: montserrat, sans-serif;
}

.link {
  cursor: pointer;
}

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
}

.input-form {
  height: 40px;
}

.form-mail,
.form-password {
  width: 100%;
}

.form-title {
  text-align: right;
  font: normal normal 600 60px/73px Montserrat;
  letter-spacing: 3.6px;
  margin-top: 244px;
  color: #ffffff;
  width: 400px;
}

.profil-form {
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
  color: #ffffff;
  opacity: 1;
}

.form-save-profil {
  margin-left: 80px;
  width: 400px;
}

.q-btn-outline::before {
  border: 1px solid transparent !important;
}

.btn-infos {
  border: 1px solid white;
  border-radius: 20px;
  padding: 5px;
  width: 250px;
}

.btn-save-profil {
  background-color: #c41526 !important;
  border-radius: 36px;
  font: normal normal bold 17px/24px Montserrat;
  padding: 5px;
  width: 251px;
  height: 47px;
  letter-spacing: 1.2px;
}

.red-border {
  background: #c41526 0% 0% no-repeat padding-box;
  border-radius: 11px;
  margin-top: 198px;
  width: 20px;
  height: 269px;
}

.content {
  overflow-x: hidden;
  overflow-y: hidden;
}

.p-adresse-residence {
  font: normal normal normal 20px/24px Montserrat;
  letter-spacing: 1.2px;
  color: #ffffff;
  margin-left: 27px;
  padding-top: 9px;
  opacity: 1;
}

.p-adresse-postale {
  font: normal normal normal 20px/24px Montserrat;
  letter-spacing: 1.2px;
  color: #ffffff;
  margin-left: 27px;
  padding-top: 9px;
  opacity: 1;
}

.form-residence {
  color: white;
}

.form-ville {
  margin-left: 5px;
}

.form-pays {
  width: 222px;
}
</style>
