<template>
    <div>
        <h3 class="titleContent" >Planning</h3>
          <ListsCourses :courses="courses"/>
          <TheCalendar />
    </div>
</template>

<script setup>
    import TheCalendar from 'src/components/Agenda/TheCalendar.vue';
    import ListsCourses from 'src/components/Agenda/ListsCourses.vue';

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

<style>
    .titleContent {
        text-align: center;
        margin-top: 2px;
        line-height: 0.5;
    }
</style>
