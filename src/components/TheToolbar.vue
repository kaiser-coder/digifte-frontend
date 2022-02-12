<template>
  <q-header elevated> 
      <q-toolbar :class="color">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="handleMenuClick"
        />

        <q-toolbar-title>
          DigiFTE
        </q-toolbar-title>

        <mail-icon /> &nbsp; &nbsp;
        <forum-icon /> &nbsp; &nbsp;
        <account-icon/>
        
        <q-icon name="account" class="account">
          <q-menu>
            <q-list dense style="min-width: 160px">
              <q-item clickable v-close-popup>
                <account-icon/> &nbsp; <q-item-section> Mon profil</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <logout-icon/> &nbsp; 
                <q-item-section @click="dialog = true">
                  Se déconnecter
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon> 
      </q-toolbar>
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
   import ForumIcon from 'vue-material-design-icons/Forum.vue';
   import MailIcon from 'vue-material-design-icons/Mail.vue';
   import LogoutIcon from 'vue-material-design-icons/Logout.vue';
   import AccountIcon from 'vue-material-design-icons/Account.vue';

   import { ref } from 'vue';

   defineProps({
      color: String
   })

   const emit = defineEmits()
   const dialog = ref(false)

   function handleMenuClick() {
      emit('onMenuClick')
   }

   function handleLogout() {
     emit('onLogout')
   }
</script>

<style>
  .account {
    cursor: pointer;
  }

  .buttonLogoutConfirm {
    margin-left: 5.5rem;
  }
</style>