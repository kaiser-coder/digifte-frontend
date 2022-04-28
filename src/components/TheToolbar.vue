<template lang="html">
  <q-header>
    <div :class="color" id="toolbar">
      <div class="toolbar-logo">
        <router-link to="/app/home"><img src="../assets/LogoFTE.jpg" /></router-link>
      </div>
      <div class="toolbar-menu">
        <ul>
          <li><router-link to="/app/students/school">Contacter l'école</router-link></li>
          <li>
            <router-link to="/app/students/administratif">L'administration</router-link>
          </li>
          <li><router-link to="">La bibliothèque</router-link></li>
          <li><router-link to="">Messagerie</router-link></li>
          <li><router-link to="/app/students/agenda">Mes documents</router-link></li>
        </ul>
      </div>
      <div class="toolbar-user">
        <q-item clickable v-close-popup>
          <div class="user-notification">
            <q-btn 
              round 
              icon="notifications"  
              id="notif-btn"
              @click="fixedModalNotification = true"
            >
              <q-badge class="badge-notif" floating rounded>4</q-badge>
            </q-btn>
          </div>
          <CustomModal id="notif_modal" v-model="fixedModalNotification">
            <div class="form-notification">
              <p class="title-notification">
                Mes notifications
              </p>
              <div class="icon-form">
                <div class="date-notification">
                 <p class="date-msg-notif">12/01/2022</p>
                </div>
                <div class="col-2">
                  <i class="fa-regular fa-envelope" id="icon-enveloppe"></i>
                </div>
                <div class="col-12 col-md-10">
                  <p class="notification-msg">
                    Mike, votre professeur Mr Dumat vous (...)
                  </p>
                  <div class="separator-notification">
                  </div>
                  <q-chip 
                    class="form-chip"
                    dense 
                    color="primary" 
                    text-color="white"
                  >
                    <p class="admin-notif">Admin</p>
                  </q-chip>
                </div>
              </div>

              <div class="icon-form-two">
                <div class="date-notification">
                 <p class="date-msg-notif">12/01/2022</p>
                </div>
                <div class="col-2">
                  <i class="fa-regular fa-envelope-open" id="icon-enveloppe"></i>
                </div>
                <div class="col-12 col-md-10">
                  <p class="notification-msg">
                    Mike, votre professeur Mr Dumat vous (...)
                  </p>
                  <div class="separator-notification">
                  </div>
                  <q-chip 
                    class="form-chip"
                    dense 
                    color="primary" 
                    text-color="white"
                  >
                    <p class="admin-notif">Admin</p>
                  </q-chip>
                </div>
              </div>

              <div class="icon-form-three">
                <div class="date-notification">
                 <p class="date-msg-notif">12/01/2022</p>
                </div>
                <div class="col-2">
                  <i class="fa-regular fa-envelope-open" id="icon-enveloppe"></i>
                </div>
                <div class="col-12 col-md-10">
                  <p class="notification-msg">
                    Mike, votre professeur Mr Dumat vous (...)
                  </p>
                  <div class="separator-notification">
                  </div>
                  <q-chip 
                    class="form-chip"
                    dense 
                    color="primary" 
                    text-color="white"
                  >
                    <p class="admin-notif">Admin</p>
                  </q-chip>
                </div>
              </div>

              <div class="icon-form-for">
                <div class="date-notification">
                 <p class="date-msg-notif">12/01/2022</p>
                </div>
                <div class="col-2">
                  <i class="fa-regular fa-envelope" id="icon-enveloppe"></i>
                </div>
                <div class="col-12 col-md-10">
                  <p class="notification-msg">
                    Mike, votre professeur Mr Dumat vous (...)
                  </p>
                  <div class="separator-notification">
                  </div>
                  <q-chip 
                    class="form-chip"
                    dense 
                    color="primary" 
                    text-color="white"
                  >
                    <p class="admin-notif">Admin</p>
                  </q-chip>
                </div>
              </div>
            </div>
          </CustomModal>
          &nbsp;
          <div class="user-account">
            <div class="account-icon">
              <q-item-section>
                <router-link to="/app/students/profil">
                  <AccountIcon fillColor="#FFFFFF"
                /></router-link>
              </q-item-section>
            </div>
          </div>
          <q-btn round color="secondary" @click="dialog = true" icon="logout" />
        </q-item>
      </div>
    </div>
  </q-header>

  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section class="row items-center q-gutter-sm">
        <p>Souhaitez-vous vraiment vous déconnecter ?</p>
      </q-card-section>
      <div class="buttonLogoutConfirm">
        <q-btn
          @click="handleLogout"
          size="10px"
          style="background: #ffb300; color: white"
          label="Oui"
        />
        &nbsp;
        <q-btn
          size="10px"
          style="background: #212121; color: white"
          label="Non"
          v-close-popup
        />
        <br />
        <br />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import AccountIcon from 'vue-material-design-icons/Account.vue';
import CustomModal from 'src/components/lib/CustomModal.vue'
import { ref } from 'vue';

defineProps({
  color: String,
});


const fixedModalNotification = ref(false);
const emit = defineEmits([
  //  'onMenuClick',
  'onLogout',
]);
const dialog = ref(false);

/* function handleMenuClick() {
      emit('onMenuClick')
   } */

function handleLogout() {
  emit('onLogout');
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

#toolbar {
  /* height: 8vh; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toolbar-logo {
  width: 143px;
}

.toolbar-logo img {
  width: 100%;
  height: auto;
}

.toolbar-menu li {
  display: inline-block;
  margin: 0px 25px;
  font: 'Montserrat';
  letter-spacing: 1.62px;
  text-transform: uppercase;
}

.toolbar-menu li a:hover {
  border-color: #00427a;
  border-radius: 50px;
}

.toolbar-menu li a.active {
  background-color: #00427a;
  color: white;
}

.toolbar-menu li a {
  text-decoration: none;
  color: #3b3738;
  font-weight: bold;
  height: 100px;
  padding: 10px;
  border: solid 2px transparent;
  border-radius: 50px;
}

.toolbar-menu ul {
  margin: 0;
  padding: 0;
}

.toolbar-menu ul li:last-child a {
  text-transform: capitalize;
}

.user-account {
  position: relative;
  background-color: #00427a;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  opacity: 1;
}

.account-icon {
  position: absolute;
  top: 5px;
  left: 5px;
}

.buttonLogoutConfirm {
  margin-left: 5.5rem;
}

#notif-btn {
  position: relative;
  background-color: #00427a;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  opacity: 1;
}

.badge-notif {
  background-color: #c41526 !important;
}

/*CUSTOM QUASAR */
.q-card.card-container {
  top:88px !important;
  left: 615px !important;
}
/*STYLE FOR NOTIFICATION */

#notif_modal {
  width: 409px !important;
  height: 50vh !important;
}

.title-notification {
  font: normal normal bold 24px/25px Montserrat;
  text-align: center;
  letter-spacing: 1.8px;
  color: #00427a;
}

#form-icon {
  position: relative;
  margin-left: -2px;
  margin-top: 1px;
  height: 29px;
  width: 29px;
  border: 2.5px solid #19437a;
  border-radius: 50%;
  opacity: 1;
}

.icon-form {
  font: normal normal normal 12px/25px Montserrat;
  letter-spacing: 1.08px;
  color: #3b3738;
  opacity: 1;
}

.icon-form-two {
  font: normal normal normal 12px/25px Montserrat;
  letter-spacing: 1.08px;
  color: #3b3738;
  opacity: 1;
}

.icon-form-three {
  font: normal normal normal 12px/25px Montserrat;
  letter-spacing: 1.08px;
  color: #3b3738;
  opacity: 1;
}

.icon-form-for {
  font: normal normal normal 12px/25px Montserrat;
  letter-spacing: 1.08px;
  color: #3b3738;
  opacity: 1;
}

.separator-notification {
  border: 0.5px solid;
  color: #4680dd;
  width: 399px;
  margin-left: 9px;
}

#icon-enveloppe {
  font-size: 34px;
  color: #19437a;
  margin-left: 8px;
  margin-top: 37px;
}

.notification-msg {
  margin-top: -28px;
  margin-left: 54px;
  font-size:16px;
  white-space: nowrap;
  letter-spacing: 1.8px;
}

.form-chip {
  width: 116px;
  height: 29px;
  border-radius: 50px;
  margin-left: 408px;
  margin-top: -25px;
}

.admin-notif {
  font-weight: bold;
  margin-left: 28px;
  margin-top: 13px;
  font-style: italic;
}

.date-notification {
  position: relative;
}

.date-msg-notif {
  position: fixed;
  font-style: italic;
  margin-left: 441px;
  margin-top: 18px;
  font-size: 14px;
}

</style>
