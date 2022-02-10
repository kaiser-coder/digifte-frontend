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
                      <th class="text-center">Duration</th>
                      <th class="text-center">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(lesson, index) in lessons" :key="index" @click="getLessonsDetails(course_id)" >
                          <td class="text-center">{{ lesson.start_date }}</td>
                          <td class="text-center">{{ lesson.name }}</td>
                          <td class="text-center">{{ lesson.duration }}</td>
                          <td class="text-center">
                              <q-btn color="brown-5" v-if="lesson.zoom_url" @click="handleLaunchMeeting(lesson.zoom_url)" label="Lancer meeting" /> &nbsp;
                              <q-btn color="amber" v-else @click="creatingMeeting(lesson)" label="Créer meeting" /> 
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
                                  v-model="name"
                                  stack-label
                                  required
                              /> <br> 

                              <q-input outlined v-model="start_date_lesson" label="Date du cours">
                                  <template v-slot:prepend>
                                      <q-icon name="event" class="cursor-pointer">
                                          <q-popup-proxy
                                              cover
                                              transition-show="scale"
                                              transition-hide="scale"
                                          >
                                              <q-date
                                                  v-model="start_date_lesson"
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

                              <q-input outlined v-model="start_time_lesson" label="Heure">
                                  <template v-slot:prepend>
                                      <q-icon name="access_time" class="cursor-pointer">
                                          <q-popup-proxy
                                              cover
                                              transition-show="scale"
                                              transition-hide="scale"
                                          >
                                              <q-time
                                              v-model="start_time_lesson"
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

                              <q-select
                                  outlined
                                  :options="options"
                                  label="Durée heure"
                                  id="duration"
                                  v-model="duration"
                                  stack-label
                                  :dense="dense"
                              /> <br>

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


              <!-- CRÉATION MEETING -->
              <q-dialog v-model="inception">
                  <q-card>
                      <q-card-section>
                          <div class="text-h6" style="align-content:center">Création meeting - {{ currentLesson.name }}</div>
                      </q-card-section>

                      <q-card-section class="q-pt-none">
                          <form  @submit.prevent="submitFormMeeting(currentLesson)">
                              <q-input
                                  outlined
                                  label="Topic"
                                  id="topic"
                                  v-model="topic"
                                  stack-label
                                  :dense="dense"
                                  required
                              /> <br>

                              <q-input
                                  outlined
                                  label="Mot de passe réunion"
                                  id="passcode"
                                  v-model="passcode"
                                  stack-label
                                  :dense="dense"
                                  required
                              /> <br>

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
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useCourseStore } from 'src/stores/course';
import { useLessonStore } from 'src/stores/lesson';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $router = useRouter();
const $q = useQuasar();

// UI States
const fixed = ref(false);

// Stores
const courseStore = useCourseStore();
const lessonStore = useLessonStore();

// States
const { lessons } = storeToRefs(lessonStore);
const { details } = storeToRefs(courseStore);
const appToken = ref(null);
const courseId = ref(null);

onBeforeMount(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const appToken = $q.sessionStorage.getItem('app_token');
  const courseId = $router.currentRoute.value.params.courseId;

  console.log('CourseId =>', $router.currentRoute.value.params.courseId);
  // console.log('Courses details =>', courseStore.details)
  console.log('Lessons for this course =>', lessonStore.lessons);

  /*eslint-disable*/
  courseStore.getCourseDetails(appToken, courseId);
  lessonStore.getAllByCourseId(appToken, courseId);
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
