<template>
    <q-layout view="lHh Lpr lFf">
    <q-header elevated> 
      <q-toolbar :class="toolbarColor">
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
    <TheSidebar 
      :open="isOpen"
      :menu="itemsForSidebar"
    />

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>

</template>

<script setup>
  import { ref, computed } from 'vue';

  import TheSidebar from 'src/components/TheSidebar.vue';

  import ForumIcon from 'vue-material-design-icons/Forum.vue';
  import MailIcon from 'vue-material-design-icons/Mail.vue';
  import LogoutIcon from 'vue-material-design-icons/Logout.vue';
  import AccountIcon from 'vue-material-design-icons/Account.vue';

  const isOpen = ref(false);
  const menuItems = ref({
    admin: {
      title: 'ADMINISTRATEUR',
      items: [
        {icon: '', link: '', label: ''}
      ]
    },
    professor: {
      title: 'ESPACE PROFESSEUR',
      items: [
        {icon: 'home', link: '/app/home', label: 'Accueil'},
        {icon: 'book', link: '/app/courses/list', label: 'Mes cours'},
        {icon: 'school', link: '', label: 'Mes élèves'},
        {icon: 'book', link: '', label: 'Mes ressources'},
      ]
    }
  });

  const toolbarColor = computed(() => {
    const userRole = 'professor'
    switch (userRole) {
      case 'admin':
        return 'bg-amber-7'

      case 'professor':
        return 'bg-red-10';

      case 'student':
        return '';

      default:
        return '';
    }
  })

  const itemsForSidebar = computed(() => {
    const userRole = 'professor'
    /*eslint-disable*/
    switch (userRole) {
      case 'admin':
        return menuItems.value.admin;

      case 'professor':
        return menuItems.value.professor;

      case 'student': 
        return menuItems.value.student;

      default:
        return menuItems.value.visitor;
    }
  })

  function toggleSidebar() {
    console.log('toggle sidebar')
    isOpen.value = !isOpen.value 
  }
</script>