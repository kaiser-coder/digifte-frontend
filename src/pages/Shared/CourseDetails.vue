<template>
  <div>
    <div class="featuredItem">
      <span class="featuredTitle">DETAILS COURS</span> &nbsp;
      <div class="featuredContainer">
        <h5>Titre : {{ details.title }}</h5>
        <h5>Description : {{ details.description }}</h5>
        <br />
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
            <tr v-for="(lesson, index) in lessons" :key="index">
              <td class="text-center">{{ lesson.start_date }}</td>
              <td class="text-center">{{ lesson.name }}</td>
              <td class="text-center">{{ lesson.duration }}</td>
              <td class="text-center">
                <q-btn
                  color="teal-5"
                  @click="fixed = true"
                  label="S'inscrire"
                />
                &nbsp;
                <q-btn
                  class="buttonMeeting"
                  color="amber"
                  @click="handleLaunchMeeting"
                  label="Lancer meeting"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>

        <q-dialog v-model="fixed">
          <q-card>
            <q-card-section>
              <div class="text-h6">Voulez-vous s'inscrire à ce cours ?</div>
            </q-card-section>
            <q-separator />
            <q-card-section style="max-height: 20vh" class="scroll">
              <form @submit.prevent="subscribeStudent">
                <div class="q-gutter-md" style="max-width: 300px">
                  <div class="buttonConfirmSubscribe">
                    <q-btn
                      @click="subscribeStudent"
                      size="15px"
                      color="secondary"
                      label="Valider"
                      v-close-popup
                    />
                    &nbsp;
                    <q-btn
                      size="15px"
                      style="background: #212121; color: white"
                      label="Annuler"
                      color="grey-14"
                      v-close-popup
                    />
                    <br />
                    <br />
                  </div>
                </div>
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
