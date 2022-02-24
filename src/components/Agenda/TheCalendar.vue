<template lang="" >
    <div>
        <h3 class="titleContent">Planning</h3>
       
        <ListsCourses :courses="courses" @onViewLessons="getLessons"/> <br> <br> <br> <br> 

         <q-btn-group push>
            <q-btn @click="handleClick('day')" color="blue-grey-4" glossy text-color="white" push label="Today" />
            <q-btn @click="handleClick('week')" color="blue-grey-5" glossy text-color="white" push label="Week" />
            <q-btn @click="handleClick('month')" color="blue-grey-7" glossy text-color="white" push label="Month" />
        </q-btn-group> <br> <br>

        <TheCalendarDay v-show="isDay === true"/>
        <TheCalendarWeek v-show="isWeek === true"/>
        <TheCalendarMonth v-show="isMonth === true" :lessons="filteredLessons"/>

    </div>
</template>

<script setup>
    import TheCalendarDay from 'src/components/Agenda/TheCalendarDay.vue';
    import TheCalendarMonth from 'src/components/Agenda/TheCalendarMonth.vue';
    import TheCalendarWeek from 'src/components/Agenda/TheCalendarWeek.vue';
    import ListsCourses from 'src/components/Agenda/ListsCourses.vue';

    import { useCourseStore } from 'src/stores/course';
    import { useLessonStore } from 'src/stores/lesson';
    import { ref, onMounted } from 'vue';
    import { useQuasar } from 'quasar';

    const $q = useQuasar();
    const courseStore = useCourseStore();
    const lessonStore = useLessonStore();

    /*eslint-disable*/
    const courses = ref([]);
    const lessons = ref([]);
    const filteredLessons = ref([]);
    

    const isDay = ref(true);
    const isWeek = ref(false);
    const isMonth  = ref(false);

    onMounted(() => {
        const appToken = $q.sessionStorage.getItem('app_token');
        /*eslint-disable*/
        void courseStore.getAll(appToken).then((result) => {
            console.log('Courses =>', result);
            /*eslint-disable*/
            courseStore.courses = result.data;
            courses.value = result.data;
        })

        // Get all lessons
        lessonStore.getAll(appToken).then((result) => {
          lessons.value = result.data
          filteredLessons.value = result.data
        })
    })

    function getLessons(id) {
      filteredLessons.value = lessons.value.filter((l) => l.courseId === id)
    }

    function handleClick (mode) {
       if(mode === 'day') {
           isDay.value = true
           isWeek.value = false
           isMonth.value = false
        }

       if(mode === 'week') {
           isWeek.value = true
           isDay.value = false
           isMonth.value = false
        }

       if(mode === 'month') {
           isMonth.value = true
           isWeek.value = false
           isDay.value = false
        }
    }

</script>

<style>
    .titleContent {
        text-align: center;
        margin-top: 2px;
        line-height: 0.5;
    }
</style>
