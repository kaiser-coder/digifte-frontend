<template>
    <q-layout view="lHh Lpr lFf">
    <!-- Toolbar -->
    <TheToolbar 
      :color="toolbarColor"
      @onMenuClick="toggleSidebar"
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

  import TheSidebar from 'src/components/TheSidebar.vue';
  import TheToolbar from 'src/components/TheToolbar.vue';

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