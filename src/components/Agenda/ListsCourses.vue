<template lang="">
    <div class="row">
        <q-btn class="q-ma-xs" color="primary" :label="course.title" v-for="course in courses" :key="course._id"/>
    </div>
</template>

<script setup>
    import { useCourseStore } from 'src/stores/course';
    import { ref, onMounted } from 'vue';
    import { useQuasar } from 'quasar';

    const $q = useQuasar();
    const courseStore = useCourseStore();
    /*eslint-disable*/
    const courses = ref([]);

    onMounted(() => {
        const appToken = $q.sessionStorage.getItem('app_token');
        /*eslint-disable*/
        void courseStore.getAll(appToken).then((result) => {
            console.log('Courses =>', result);
            /*eslint-disable*/
            courseStore.courses = result.data;
            courses.value = result.data;
        })
    })
</script>

<style lang="sass" scoped>
    .my-card
        width: 100%
        max-width: 250px
</style>