<template>
    <q-layout view="lHh Lpr lFf">
    <!-- Toolbar -->
    <TheToolbar 
      :color="toolbarColor"
      @onMenuClick="toggleSidebar"
      @onLogout="logout"
    />

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
  import { onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';

  import TheSidebar from 'src/components/TheSidebar.vue';
  import TheToolbar from 'src/components/TheToolbar.vue';

  const $router = useRouter();
  const $q = useQuasar();

  const userRole = ref('');
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
    },
    student: {
      title: 'ESPACE ETUDIANT',
      items: [
        {icon: 'home', link: '/app/home', label: 'Accueil'},
        {icon: 'book', link: '/app/courses/list', label: 'Mes cours'},
      ]
    }
  });

  const toolbarColor = computed(() => {
    switch (userRole.value) {
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
    /*eslint-disable*/
    switch (userRole.value) {
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

  onBeforeMount(() => {
    /*eslint-disable*/
    const currentUser = $q.sessionStorage.getItem('current_user');

    if(!currentUser) {
      $router.push('/')
    }

    // Get User Role
    userRole.value = currentUser.roles[0]

  })

  function toggleSidebar() {
    console.log('toggle sidebar') 
    isOpen.value = !isOpen.value 
  }

  function logout() {
    $q.sessionStorage.clear();
    $router.push('/');
  }
</script>