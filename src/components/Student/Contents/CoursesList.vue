<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item v-for="(course, key) in courses" :key="key">
        <q-item-section>
          <q-item-label
              style="cursor: pointer;"
              @click="handleViewDetails(course._id)"
              id="custom_link"
          >
            {{ course.title }}
          </q-item-label>
          <q-item-label caption lines="2">
            <p>{{ course.description }}</p>
            <q-btn color="secondary" label="M'inscrire" @click="handleSubscribe(course)"/>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useCourseStore } from 'src/stores/course';
import { useRouter } from 'vue-router';

export default {
  name: 'CoursesList',
  props: ['courses'],
  setup(props) {
    // Plugins import
    const $q = useQuasar();
    const $router = useRouter();

    // Stores
    const courseStore = useCourseStore()

    // Props
    /*eslint-disable*/
    const { courses } = props;

    // States
    let isModalShown = ref(false);
    let token = ref('');
    let studentId = ref('');

    // Lifecycles 
    onMounted(() => {
      token = $q.sessionStorage.getItem('app_token');
      studentId = $q.sessionStorage.getItem('current_user').user_id
    })

    // Functions 
    function handleSubscribe(course) {
      // When subscribing student
      courseStore.subscribeToCourse(token, {
        courseId: course._id,
        student: studentId
      }).then((result) => {
        $q.notify({
          type: 'positive',
          message: result.message,
          position: 'top',
        });
      }).catch(() => {
        $q.notify({
          type: 'negative',
          message: 'Already subscribed',
          position: 'top',
        });
      })
    }

    function handleViewDetails(courseId) {
      $router.push(`/home-student/course-details/${courseId}`)
    }
    return {
      courses,
      isModalShown,
      handleSubscribe,
      handleViewDetails
    };
  },
};
</script>

<style scoped>
#custom_link {
  text-decoration: none;
  color: #373a3a;
}
</style>
