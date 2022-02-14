<template>
  <div>
      <div class="featuredItem">
          <span class="featuredTitle">DETAILS COURS</span>
          <div class="featuredContainer">
              <h5>Titre :{{details.title}}</h5> 
              <h5>Description : {{details.description}}</h5> <br>
              <CreateLessonButton 
                v-if="userRole === 'professor'"
                @onSubmitLesson="submitFormLesson"
              />
              <q-markup-table>
                  <thead>
                      <tr>
                      <th class="text-center">Date</th>
                      <th class="text-center">Nom du leçon</th>
                      <th class="text-center">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(lesson, index) in lessons" :key="index">
                          <td class="text-center">{{ lesson.start_date }}</td>
                          <td class="text-center">{{ lesson.name }}</td>
                          <td class="text-center">
                            <MeetingButton 
                              :lesson="lesson"
                              @onLaunchMeeting="handleLaunchMeeting"
                              @onCreateMeeting="createMeeting"
                            />
                          </td>
                          <td>
                            <q-btn @click="renderLessonDetails(lesson)">Voir</q-btn>
                          </td>
                      </tr>
                  </tbody>
              </q-markup-table>

              <!-- DETAILS LESSON MEETING -->
              <q-dialog v-model="inception">
                  <q-card>
                      <q-card-section>
                        <div class="text-h6" style="align-content:center">{{}}</div>
                      </q-card-section>

                      <q-card-section class="q-pt-none">
                        {{lessonDetails}}
                      </q-card-section>
                  </q-card>
              </q-dialog>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useCourseStore } from 'src/stores/course';
import { useLessonStore } from 'src/stores/lesson';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import MeetingButton from 'src/components/courses/MeetingButton.vue';
import CreateLessonButton from 'src/components/lessons/CreateLessonButton.vue';

const $router = useRouter();
const $q = useQuasar();

// UI States
const inception = ref(false);

// Stores
const courseStore = useCourseStore();
const lessonStore = useLessonStore();

// States
const { lessons } = storeToRefs(lessonStore);
const { details } = storeToRefs(courseStore);
const appToken = ref($q.sessionStorage.getItem('app_token'));
const courseId = ref($router.currentRoute.value.params.courseId);
/*eslint-disable*/
const userRole = ref($q.sessionStorage.getItem('current_user').roles[0]);
const lessonDetails = reactive({});

onBeforeMount(() => {
  /*eslint-disable*/
  console.log('CourseId =>', $router.currentRoute.value.params.courseId);
  // console.log('Courses details =>', courseStore.details)
  console.log('Lessons for this course =>', lessonStore.lessons);

  /*eslint-disable*/
  courseStore.getCourseDetails(appToken.value, courseId.value).then((result) => {
    console.log('Course details =>', result)
    details.value = result.data;
  });

  lessonStore.getAllByCourseId(appToken.value, courseId.value).then((result) => {
    console.log('All lessons by courseId', result);
    lessons.value = result;
  })
});

// Functions

function handleLaunchMeeting(url) {
  window.open(url, '_blank');
}

function submitFormLesson(lesson) {
  const { date, time, name } = lesson;
  const start_date = new Date(`${date} ${time}`);

  /* console.log(lesson);
  throw '';
  */
 
  lessonStore.submitLesson(appToken.value, {name, start_date, courseId: courseId.value}).then((result) => {
    // console.log('Submited lesson => ', result)
    lessonStore.lessons.push(result.data)
    $q.notify({
      type: 'positive',
      message: result.message,
      position: 'top-right'
    })
  })
  /* .catch((error) => {
    $q.notify({
      type: 'negative',
      message: 'Not created as well',
      position: 'top-right'
    })
  }) */

}

function createMeeting(lesson) {
  lessonStore.submitMeeting(appToken.value, lesson._id, {
    start_time: lesson.start_date,
    topic: lesson.name,
    duration: 1,
    zoom_token: $q.sessionStorage.getItem('zoom_token'),
    zoom_userId: $q.sessionStorage.getItem('current_user').zoom_userId
  }).then((result) => {
    // console.log('Lesson with new meeting => ', result)

    $q.notify({
      type: 'positive',
      message: result.message,
      position: 'top-right'
    })
  })
  .catch((error) => {
    $q.notify({
      type: 'negative',
      message: error.message,
      position: 'top-right'
    })
  })
}

function renderLessonDetails(lesson) {
  // console.log('This lesson => ', lesson)
  inception.value = true;
  lessonDetails.value = lesson;
}
</script>

<style>
.featured {
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.featuredItem {
  flex: 1;
  margin: 0px 20px;
  padding: 50px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.856);
}

.featuredTitle {
  font-size: 30px;
  color: rgb(29, 29, 29);
  word-spacing: 9px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.featuredContainer {
  margin: 5px 0px;
  top: 50em;
  align-items: center;
}

.contentMeeting {
  background-color: bisque;
}

.buttonConfirmSubscribe {
  margin-left: 5.5em;
}

/* .buttonMeeting{
    display: none
  } */
</style>
