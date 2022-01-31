<template>
    
  <div v-if="isShownProfessor" >
    <HomePageProfessor />
  </div>

  <div v-if="isShownStudent" >
    <HomePageStudent />
  </div>

  <div v-if="isShownAdmnistrator" >
    <HomePageAdmnistrator />
  </div>

</template>

<script>
import HomePageProfessor from 'components/Professor/HomePageProfessor.vue'
import HomePageStudent from 'components/Student/HomePageStudent.vue'
import HomePageAdmnistrator from 'components/Admnistrator/HomePageAdmnistrator.vue'

export default {

  name: 'Home',
  components: {
    HomePageProfessor,
    HomePageStudent,
    HomePageAdmnistrator
	},

  data() {
    return {
      isShownProfessor: false,
      isShownStudent: false,
      isShownAdmnistrator: false
    }
  },

  mounted() {
    /*eslint-disable*/
    if (!this.$q.sessionStorage.isEmpty()) {
      this.currentUser = this.$q.sessionStorage.getItem('current_user');
    }

    if(this.currentUser.roles.includes('professor')) {
      this.isShownProfessor = true
    }
    if(this.currentUser.roles.includes('student')) {
      this.isShownStudent = true
    }
    if(this.currentUser.roles.includes('admnistrator')) {
      this.isShownAdmnistrator = true
    }
  },

}
</script>


<style scoped>

</style>