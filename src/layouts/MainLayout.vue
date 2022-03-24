<template lang="">
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <!-- Toolbar -->
      <TheToolbar 
        :color="toolbarColor"
        @onMenuClick="toggleSidebar"
        @onLogout="logout"
      />

      <!-- <CustomModal
        :render="true"
        title="Un titre"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam iure facilis aperiam incidunt obcaecati sapiente similique nesciunt dicta ratione, inventore dignissimos minima magnam, omnis officia blanditiis maxime nulla dolores officiis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iste quasi, consectetur assumenda, ab illum explicabo totam nulla adipisci quia suscipit! Reprehenderit quos modi autem, recusandae nostrum eius doloribus accusantium.
        </p>
        <q-card-actions align="right" class="q-pa-lg">
          <q-btn class="cta" label="Coucou" v-close-popup />
        </q-card-actions>
      </CustomModal> -->

      <!-- Sidebar -->
      <!-- <TheSidebar 
        :open="isOpen"
        :menu="itemsForSidebar"
      /> -->

      <q-page-container>
        <router-view/>
      </q-page-container>

    </q-layout>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';

  // import TheSidebar from 'src/components/TheSidebar.vue';
  import TheToolbar from 'src/components/TheToolbar.vue';

  import { createCourse } from 'src/api/courses';

  const $router = useRouter();
  const $q = useQuasar();

  const userRole = ref('');
  const isOpen = ref(false);
  /* const menuItems = ref({
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
        {icon: 'school', link: '/app/students/lists', label: 'Mes élèves'},
        {icon: 'book', link: '', label: 'Mes ressources'},
      ]
    },
    student: {
      title: 'ESPACE ETUDIANT',
      items: [
        {icon: 'home', link: '/app/home', label: 'Accueil'},
        {icon: 'book', link: '/app/courses/list', label: 'Tous les cours'},
        {icon: 'plan', link: '/app/students/agenda', label: 'Planning'},
      ]
    }
  }); */

  const toolbarColor = computed(() => {
    switch (userRole.value) {
      case 'admin':
        return 'bg-amber-7'

      case 'professor':
        return 'bg-red-10';

      case 'student':
        return 'bg-white';

      default:
        return '';
    }
  })

  /* const itemsForSidebar = computed(() => {
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
  }) */

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