<template lang="" >
    <div>
      <!-- <h3 class="titleContent">Planning</h3> -->
      <ListsCourses :courses="courses" @onViewLessons="getLessons"/> <br>
      <div class="row items-center">
        <div class="col">
          <q-btn-group>
            <q-btn
              @click="handleClick('day')"
              :color="isDay === false ? 'blue-grey' : 'blue-grey-4'"
              text-color="white" label="Today"
            />
            <q-btn
              @click="handleClick('week')"
              :color="isWeek === false ? 'blue-grey' : 'blue-grey-4'"
              text-color="white" label="Week"
            />
            <q-btn
              @click="handleClick('month')"
              :color="isMonth === false ? 'blue-grey' : 'blue-grey-4'"
              text-color="white" label="Month"
            />
          </q-btn-group>
        </div>

        <div class="col">
        Something month
        </div>

        <div class="col">
          <Navigation
            @onPrev="handlePrev"
            @onNext="handleNext"
            @onToday="handleToday"
          />
        </div>
      </div>
      <div class="row q-mt-xl">
        <div class="col">
          <TheCalendarDay
            v-if="isDay === true"
            :lessons="filteredLessons"
            @onLaunchMeeting="launchMeeting"
            ref="calendar"
          />
          <TheCalendarWeek
            v-if="isWeek === true"
            :lessons="filteredLessons"
            @onLaunchMeeting="launchMeeting"
            ref="calendar"
          />
          <TheCalendarMonth
            v-if="isMonth === true"
            :lessons="filteredLessons"
            @onLaunchMeeting="launchMeeting"
            ref="calendar"
          />
        </div>
      </div>
    </div>
</template>

<script setup>
  /*eslint-disable*/
  import TheCalendarDay from 'src/components/Agenda/TheCalendarDay.vue';
  import TheCalendarMonth from 'src/components/Agenda/TheCalendarMonth.vue';
  import TheCalendarWeek from 'src/components/Agenda/TheCalendarWeek.vue';
  import ListsCourses from 'src/components/Agenda/ListsCourses.vue';
  import { useCourseStore } from 'src/stores/course';
  import { useLessonStore } from 'src/stores/lesson';
  import { ref, onMounted, computed } from 'vue';
  import { useQuasar } from 'quasar';
  import Navigation from './Navigation.vue'

  const $q = useQuasar();
  const courseStore = useCourseStore();
  const lessonStore = useLessonStore();

  const courses = ref([]);
  const lessons = ref([]);
  const lessonsId = ref([]);

  const filteredLessons = computed(()=> {
    return lessons.value.filter((l) => lessonsId.value.includes(l.courseId))
  })
  const isDay = ref(true);
  const isWeek = ref(false);
  const isMonth  = ref(false);
  const calendar = ref(null);
 
  // This function define random colors
  const COLORS = ['pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'primary', 'secondary', 'accent', 'positive', 'negative', 'info', 'warning'];
  const setColor = (i) => {
    /* let max = COLORS.length;
    let color = COLORS[Math.floor(Math.random() * max) + 1]
    console.log('Color is ', color, Math.floor(Math.random() * max) + 1);
    return color; */
    return COLORS[i];
  }
 
  onMounted(() => {
    const appToken = $q.sessionStorage.getItem('app_token');
    const userId = $q.sessionStorage.getItem('user_id');
    courseStore.getAll(appToken).then((result) => {
      console.log('Courses =>', result);
      let filtered = result.data.filter((c) => c.students.indexOf(userId) > -1);
      courses.value = filtered.map((d, i) => {
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
    // console.log('Filtered lessons => ', filteredLessons.value)
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
  
  function launchMeeting(url) {
    window.open(url, '_blank');
  }
  function handleToday () {
    calendar.value.goToday()
  }
  function handlePrev () {
    calendar.value.goPrev()
  }
  function handleNext () {
    calendar.value.goNext()
  }
</script>

<style>
  .titleContent {
    text-align: center;
    margin-top: 2px;
    line-height: 0.5;
  }
</style>