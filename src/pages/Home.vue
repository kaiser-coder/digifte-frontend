<template>
    
  <q-layout view="lHh Lpr lFf">
    <q-header elevated> 
      <q-toolbar class="bg-amber-7">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleSidebar"
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
          <q-btn @click="logout" size="10px" style="background: #ffb300;color:white" label="Oui" /> &nbsp; 
          <q-btn size="10px" style="background: #212121;color:white" label="Non" v-close-popup /> <br> <br>
        </div>
      </q-card>
    </q-dialog> 

    <!-- Sidebar -->
    <Sidebar :open="isOpen"/>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>

</template>

<script setup>
  import { ref } from 'vue';

  import Sidebar from 'src/components/Sidebar.vue';

  const isOpen = ref(true);
  const dialog = ref(true);

  function toggleSidebar() {
    console.log('show sidebar')
    isOpen = true;
  }
  
</script>