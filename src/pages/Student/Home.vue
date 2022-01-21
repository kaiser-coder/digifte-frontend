<template>
    <div>
        <p>Bienvenue {{ fullName }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            fullName: '',
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
            this.fullName = this.$q.sessionStorage.getItem('fullname')
        }
    }
}
</script>


<style scoped>

</style>