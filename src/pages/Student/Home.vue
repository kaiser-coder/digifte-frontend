<template>
    <div>
        <p>Bienvenue {{ fullName }}</p>
        <div class="q-pa-md q-gutter-sm">
            <q-btn color="secondary" label="Participer à la réunion" />
        </div>

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