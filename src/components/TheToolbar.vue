<template lang= "">
  <q-header> 
    <div :class="color" id="toolbar">
      <div class="toolbar-logo">
        <router-link to="/app/home"><img src="../assets/LogoFTE.jpg"></router-link>
      </div>
      <div class="toolbar-menu">
          <ul>
            <li><router-link to="/app/students/school">Contacter l'école</router-link></li>
            <li><router-link to="/app/students/administratif" >L'administration</router-link></li>
            <li><router-link to="">La bibliothèque</router-link></li>
            <li><router-link to="">Messagerie</router-link></li>
            <li><router-link to="/app/students/agenda">Mes documents</router-link></li>
          </ul>
      </div>
      <div class="toolbar-user">
        <q-item clickable v-close-popup>
          <div class="user-notification">
            <q-btn round icon="notifications" id="notif-btn">
              <q-badge class="badge-notif" floating rounded>4</q-badge>
            </q-btn>
          </div> &nbsp;
          <div class="user-account">
              <div class="account-icon">
                <q-item-section @click="dialog = true">
                  <AccountIcon fillColor="#FFFFFF"/>
                </q-item-section>
              </div>
          </div>
        </q-item>
      </div>
    </div>
  </q-header>

   <q-dialog v-model="dialog">
    <q-card>
        <q-card-section class="row items-center q-gutter-sm">
          <p>Souhaitez-vous vraiment vous déconnecter ?</p>
        </q-card-section>
        <div class="buttonLogoutConfirm" >
          <q-btn @click="handleLogout" size="10px" style="background: #ffb300;color:white" label="Oui" /> &nbsp; 
          <q-btn size="10px" style="background: #212121;color:white" label="Non" v-close-popup /> <br> <br>
        </div>
    </q-card>
   </q-dialog> 
</template>

<script setup>
   import AccountIcon from 'vue-material-design-icons/Account.vue';

   import { ref } from 'vue';

   defineProps({
    color: String
   })

   const emit = defineEmits([
    //  'onMenuClick', 
     'onLogout'
    ])
   const dialog = ref(false)

   /* function handleMenuClick() {
      emit('onMenuClick')
   } */

   function handleLogout() {
     emit('onLogout')
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

  .toolbar-logo{
    width:143px;
  }

  .toolbar-logo img{
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

  .toolbar-menu li a:hover{
    border-color: #00427A;
    border-radius: 50px;
  }

  .toolbar-menu li a.active {
    background-color: #00427A;
    color: white;
  }

  .toolbar-menu li a{
    text-decoration: none;
    color: #3B3738;
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

  .toolbar-menu ul li:last-child a{
    text-transform: capitalize;
  }

  .user-account {
    position: relative;
    background-color: #00427A;
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
    background-color: #00427A;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    opacity: 1;
  }

  .badge-notif {
    background-color: #C41526 !important;
  }

</style>