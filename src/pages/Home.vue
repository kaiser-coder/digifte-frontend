<template>
    <div>
        <h2>Bienvenue {{ currentUser.fullname }}</h2>
        <span>{{ message }}</span><br/>
        <q-btn color="secondary" style="width:200px" label="Déconnexion" @click="logout"/>
    </div>
</template>


<script>
export default {
    data() {
        return {
            message: '',
            currentUser: {}
        }
    },
    beforeMount() {
        /*eslint-disable*/
        if (!this.$q.sessionStorage.getItem('current_user')) {
            this.$router.push('/')
        }
    },
    mounted() {
        /*eslint-disable*/
        if (!this.$q.sessionStorage.isEmpty()) {
            this.message = this.$q.sessionStorage.getItem('message');
            this.currentUser = this.$q.sessionStorage.getItem('current_user')
        }
    },
    methods: {
        logout() {
            this.$q.sessionStorage.clear();
            this.$router.push('/')
        }
    }
}
</script>


<style scoped>

</style>