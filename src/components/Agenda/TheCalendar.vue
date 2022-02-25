<template lang="" >
    <div>
        <h3 class="titleContent">Planning</h3>

        <ListsCourses :courses="courses" @onViewLessons="getLessons"/> <br> <br> <br> <br>

         <q-btn-group push>
            <q-btn @click="handleClick('day')" color="blue-grey-4" glossy text-color="white" push label="Today" />
            <q-btn @click="handleClick('week')" color="blue-grey-5" glossy text-color="white" push label="Week" />
            <q-btn @click="handleClick('month')" color="blue-grey-7" glossy text-color="white" push label="Month" />
        </q-btn-group> <br> <br>

        <TheCalendarDay
          v-if="isDay === true"
          :lessons="filteredLessons"
        />
        <TheCalendarWeek
          v-if="isWeek === true"
          :lessons="filteredLessons"
        />
        <TheCalendarMonth
          v-if="isMonth === true"
          :lessons="filteredLessons"
        />

    </div>
</template>

<script setup>
    import TheCalendarDay from 'src/components/Agenda/TheCalendarDay.vue';
    import TheCalendarMonth from 'src/components/Agenda/TheCalendarMonth.vue';
    import TheCalendarWeek from 'src/components/Agenda/TheCalendarWeek.vue';
    import ListsCourses from 'src/components/Agenda/ListsCourses.vue';

    import { useCourseStore } from 'src/stores/course';
    import { useLessonStore } from 'src/stores/lesson';
    import { ref, onMounted, computed } from 'vue';
    import { useQuasar } from 'quasar';

    const $q = useQuasar();
    const courseStore = useCourseStore();
    const lessonStore = useLessonStore();

    /*eslint-disable*/
    const courses = ref([]);
    const lessons = ref([]);
    const lessonsId = ref([]);
    const filteredLessons = computed(()=> {     
      return lessons.value.filter((l) => lessonsId.value.includes(l.courseId))
    })

    const isDay = ref(true);
    const isWeek = ref(false);
    const isMonth  = ref(false);

    // ========= HANDLE COLOR ===========

    // This function define random colors
    const COLORS = ['pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'primary', 'secondary', 'accent', 'positive', 'negative', 'info', 'warning'];

    const setColor = (i) => {
      /* let max = COLORS.length;
      let color = COLORS[Math.floor(Math.random() * max) + 1]
      console.log('Color is ', color, Math.floor(Math.random() * max) + 1);
      return color; */
      return COLORS[i];
    }

    // ==================================

    onMounted(() => {
        const appToken = $q.sessionStorage.getItem('app_token');
        /*eslint-disable*/
        courseStore.getAll(appToken).then((result) => {
          console.log('Courses =>', result);
          /*eslint-disable*/
          courseStore.courses = result.data;
          courses.value = result.data.map((d, i) => {
            return {...d, bgcolor: setColor(i)}
          });
        })

        // Get all lessons
        lessonStore.getAll(appToken).then((result) => {
          result.data.map((d) => {
            // Get bgcolor property from each course
            let color = '';
            courses.value.map((c) => {
              if(c._id === d.courseId) {
                color = c.bgcolor
              }
            })
            // console.log(`Color of lesson: ${d.name} => `, color)
            // Inject color to filtered lessons
            lessons.value.push({...d, bgcolor: color});
          })
          lessonsId.value = lessons.value.map((l) => l.courseId)
        })

      console.log('Filtered lessons => ', filteredLessons.value)
    })

    function getLessons(id) {
      const indexId = lessonsId.value.indexOf(id)
      if (indexId > -1) {
        if (lessonsId.value.length == lessons.value.length) {
          // full calendar so start from the id requested
          lessonsId.value = []
          lessonsId.value.push(id)
        } else {
          lessonsId.value.splice(indexId, 1)
        }
      } else {
        lessonsId.value.push(id)
      }

      if (!lessonsId.value.length) {
        // empty calendar so start reset to full calendar lessons
        lessonsId.value = lessons.value.map((l) => l.courseId)
      }
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
