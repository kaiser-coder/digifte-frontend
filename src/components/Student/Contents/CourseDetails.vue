<template>
  <div>
    Current course
    {{ activeCourse }}

    All lessons
    {{ lessons }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useCourseStore } from 'src/stores/course';
import { useLessonStore } from 'src/stores/lesson';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

export default {
  name: 'CourseDetails',
  setup() {
    // Plugins import
    const $q = useQuasar();
    const router = useRoute();
    /*eslint-disable*/
    // Stores
    const courseStore = useCourseStore();
    const lessonStore = useLessonStore();

    // States
    let activeCourse = ref(courseStore.activeCourse);
    let lessons = ref(lessonStore.lessons);

    // Lifecycles
    onMounted(() => {
      const token = $q.sessionStorage.getItem('app_token');
      const courseId = router.params.courseId;

      courseStore.getCourseDetails(token, courseId).then((result) => {
        // console.log(result.data)
        courseStore.activeCourse = Object.assign(courseStore.activeCourse, result.data)
      });

      lessonStore.getAllByCourseId(token, courseId).then((result) => {
        // console.log(result.data)
        result.data.map((d) => lessonStore.lessons.push(d));
      });
    });

    return {
      activeCourse,
      lessons,
    };
  },
};
</script>
