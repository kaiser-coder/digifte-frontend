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
    const lessons = ref(lessonStore.lessons);
    const activeCourse = ref({});

    // Lifecycles
    onMounted(() => {
      const token = $q.sessionStorage.getItem('app_token');
      const courseId = router.params.courseId;

      courseStore.courses = [];
      lessonStore.lessons = [];

      courseStore.getAll(token).then((result) => {
        result.data.map((d) => courseStore.courses.push(d));

        activeCourse.value = courseStore.courses.filter((c) => {
          return c._id === courseId
        })
      })
      
      lessonStore.getAllByCourseId(token, courseId).then((result) => {
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
