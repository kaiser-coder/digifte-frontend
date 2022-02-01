<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item v-for="course, key in courses" :key="key">
        <q-item-section>
            <q-item-label>
              <a href="/home-student/course-details/1" id="custom_link">{{ course.title }}</a>
            </q-item-label>
            <q-item-label caption lines="2">
              <p>{{ course.description }}</p>
              <q-btn 
                color="secondary" 
                label="M'inscrire" 
              />
            </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import {ref} from 'vue';
import { useQuasar } from 'quasar';

export default {
    name: 'CustomList',
    props: ['courses'],
    setup(props) {
      // Plugins import
      const $q = useQuasar();

      // Props
      /*eslint-disable*/
      const { courses } = props;

      // States
      let isModalShown = ref(false);
      let activeCourse = ref({});
      const token = $q.sessionStorage.getItem('app_token');

      return {
        courses,
        isModalShown,
        activeCourse,
      }
    }
}
</script>

<style scoped>
  #custom_link {
    text-decoration: none;
    color: #373a3a;
  }
</style>