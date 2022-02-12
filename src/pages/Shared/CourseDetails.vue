<template>
  <div>
      <div class="featuredItem">
          <span class="featuredTitle">DETAILS COURS</span>
          <div class="featuredContainer">
              <h5>Titre :{{details.title}}</h5> 
              <h5>Description : {{details.description}}</h5> <br>
              <q-btn color="secondary" @click="fixed = true" label="Créer leçon" /> <br> <br>
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
                            <q-btn color="brown-5" v-if="lesson.meeting !== undefined" @click="handleLaunchMeeting(lesson.meeting.join_url)" label="Lancer meeting" /> &nbsp;
                            <q-btn color="amber" v-else @click="createMeeting(lesson)" label="Créer meeting" /> 
                          </td>
                          <td>
                            <q-btn @click="renderLessonDetails(lesson)">Voir</q-btn>
                          </td>
                      </tr>
                  </tbody>
              </q-markup-table>


              <!-- CRÉATION LEÇON -->
              <q-dialog v-model="fixed">
                  <q-card>
                      <q-card-section>
                          <div class="text-h6">Création d'une leçon</div>
                      </q-card-section>

                      <q-separator />

                      <q-card-section style="max-height: 50vh" class="scroll">
                          <form @submit.prevent="submitFormLesson">  
                              <q-input
                                  outlined
                                  label="Nom du leçon"
                                  id="name"
                                  v-model="lessonForm.name"
                                  stack-label
                                  required
                              /> <br> 

                              <q-input outlined v-model="lessonForm.date" label="Date du cours">
                                  <template v-slot:prepend>
                                      <q-icon name="event" class="cursor-pointer">
                                          <q-popup-proxy
                                              cover
                                              transition-show="scale"
                                              transition-hide="scale"
                                          >
                                              <q-date
                                                  v-model="lessonForm.date"
                                                  mask="YYYY-MM-DD"
                                                  color="negative"
                                              >
                                                  <div class="row items-center justify-end">
                                                      <q-btn
                                                          v-close-popup
                                                          label="Close"
                                                          color="#b71c1c"
                                                          flat
                                                      />
                                                  </div>
                                              </q-date>
                                          </q-popup-proxy>
                                      </q-icon>
                                  </template>
                              </q-input> <br>

                              <q-input outlined v-model="lessonForm.time" label="Heure">
                                  <template v-slot:prepend>
                                      <q-icon name="access_time" class="cursor-pointer">
                                          <q-popup-proxy
                                              cover
                                              transition-show="scale"
                                              transition-hide="scale"
                                          >
                                              <q-time
                                              v-model="lessonForm.time"
                                              mask="HH:mm:ss"
                                              format24h
                                              color="negative"
                                              >
                                              <div class="row items-center justify-end">
                                                  <q-btn
                                                  v-close-popup
                                                  label="Close"
                                                  color="#b71c1c"
                                                  flat
                                                  />
                                              </div>
                                              </q-time>
                                          </q-popup-proxy>
                                      </q-icon>
                                  </template>
                              </q-input> <br>

                              <q-btn
                                  size="18px"
                                  type="submit"
                                  style="
                                      background: #7e807c;
                                      color: white;
                                      width: 330px;
                                      margin-left: 0.5rem;
                                  "
                                  label="Créer"
                                  v-close-popup
                              />      
                          </form>
                      </q-card-section>
                  </q-card>
              </q-dialog>


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

const $router = useRouter();
const $q = useQuasar();

// UI States
const fixed = ref(false);
const inception = ref(false);

// Stores
const courseStore = useCourseStore();
const lessonStore = useLessonStore();

// States
const { lessons } = storeToRefs(lessonStore);
const { details } = storeToRefs(courseStore);
const appToken = ref($q.sessionStorage.getItem('app_token'));
const courseId = ref($router.currentRoute.value.params.courseId);
const lessonForm = ref({});
const lessonDetails = reactive({});

onBeforeMount(() => {
  /*eslint-disable*/
  console.log('CourseId =>', $router.currentRoute.value.params.courseId);
  // console.log('Courses details =>', courseStore.details)
  console.log('Lessons for this course =>', lessonStore.lessons);

  /*eslint-disable*/
  courseStore.getCourseDetails(appToken.value, courseId.value);
  lessonStore.getAllByCourseId(appToken.value, courseId.value);
});

// Functions

function subscribeStudent() {
  const studentId = $q.sessionStorage.getItem('user_id');

  const formSubscribe = {
    courseId: courseId,
    student: studentId,
  };

  courseStore.subscribeToCourse(appToken, formSubscribe)
    .then((response) => {
      if (response.status === 200) {
        $q.notify({
          type: 'positive',
          message: 'Félicitation! Vous êtes inscris',
          position: 'top',
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      if (error) {
        $q.notify({
          type: 'negative',
          message: 'Vous êtes déjà inscris',
          position: 'top',
        });
      }
    });
}

function handleLaunchMeeting(url) {
  window.open(url, '_blank');
}

function submitFormLesson() {
  const { date, time, name } = lessonForm.value;
  const start_date = new Date(`${date} ${time}`);

  lessonStore.submitLesson(appToken.value, {name, start_date, courseId: courseId.value}).then((result) => {
    lessonStore.lessons.push(result)
    $q.notify({
      type: 'positive',
      message: result.data.message,
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
      message: 'Meeting added',
      position: 'top-right'
    })
  })
  .catch((error) => {
    $q.notify({
      type: 'negative',
      message: error.data.message,
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
