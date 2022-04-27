<template lang="html">
  <div>
    <ListsCourses :courses="courses" @onViewLessons="getLessons" />
    <br />
    <div class="row items-center">
      <div class="col">
        <q-btn-group>
          <q-btn
            @click="handleClick('day')"
            :color="isDay === false ? 'blue-grey' : 'blue-grey-4'"
            text-color="white"
            label="Jour"
          />
          <q-btn
            @click="handleClick('week')"
            :color="isWeek === false ? 'blue-grey' : 'blue-grey-4'"
            text-color="white"
            label="Semaine"
          />
          <q-btn
            @click="handleClick('month')"
            :color="isMonth === false ? 'blue-grey' : 'blue-grey-4'"
            text-color="white"
            label="Mois"
          />
        </q-btn-group>
      </div>

      <!-- Custom Modal for Courses -->

      <q-btn label="Voir" color="primary" @click="fixedModalCourse = true" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <CustomModal id="course_modal" v-model="fixedModalCourse">
        <div class="row" style="width: 80vw; margin-top: -50px">
          <div class="col-12 col-lg-8">
            <div class="row">
              <div class="col-12 col-md-5">
                <img class="img" src="../../assets/apocalypse.png" />
                <div class="head-title-date-cours">Date du cours</div>
                <div class="form-btn-date row">
                  <div class="col">
                    <div class="date-begin">12/02/2020</div>
                  </div>
                  <div class="col form-date-end">
                    <div class="date-end">24/02/2020</div>
                  </div>
                  <div class="col">
                    <q-select
                      class="form-select-date"
                      bg-color="Simply Sparkling"
                      rounded
                      outlined
                      bottom-slots
                      v-model="model"
                      :dense="dense"
                      label="..."
                    />
                  </div>
                </div>
              </div>
              <div class="col-1 border-red">
                <div class="red-border-up"></div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-content-syllabus">
                  <p class="text-syllabus">
                    <br />Vivamus magna justo, lacinia eget consectetur sed, convallis at
                    tellus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.
                    <br />Proin eget tortor risus. Nulla quis lorem ut libero malesuada
                    feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at
                    sem.
                    <br />
                    <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur arcu erat, accumsan id imperdiet et, porttitor at (…)
                  </p>
                </div>
                <div class="btns-send-cours row">
                  <div class="col">
                    <q-btn
                      class="btn-syllabus"
                      no-caps
                      rounded
                      label="Télécharger le syllabus"
                    />
                  </div>
                  <div class="col form-incription">
                    <q-btn
                      class="btn-inscription"
                      no-caps
                      rounded
                      label="Inscription au cours"
                    />
                    <p class="p-date">
                      avant le
                      <strong>12 février</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mt-md q-mb-lg">
              <div class="col-12">
                <div class="head-title-ressource-etude">Mes ressources d'étude</div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-5">
                <div class="form-list">
                  <div class="icon-form row items-center q-mb-md">
                    <div class="col-2">
                      <div id="form-icon">
                        <i class="fa-solid fa-play" id="icon-play"></i>
                      </div>
                    </div>

                    <div class="col-12 col-md-10">
                      Youtube.Dereckprince.lafindestemps
                      <br />Youtube.Dereckprince.lafindestemps
                      <br />Youtube.Dereckprince.lafindestemps
                    </div>
                  </div>

                  <div class="icon-form row items-center q-mb-md">
                    <div class="col-2">
                      <div id="form-icon">
                        <i class="fa-solid fa-list" id="icon-list"></i>
                      </div>
                    </div>
                    <div class="col-12 col-md-10">
                      Le retour de Christ - JM Thabois
                      <br />Le retour de Christ - JM Thabois <br />Le retour de Christ -
                      JM Thabois
                    </div>
                  </div>

                  <div class="icon-form row items-center q-mb-md">
                    <div class="col-2">
                      <div id="form-icon">
                        <i class="fa-solid fa-cross" id="icon-cross"></i>
                      </div>
                    </div>
                    <div class="col-12 col-md-10">
                      Apocalypse Chapitre 1 à 7
                      <br />Apocalypse Chapitre 1 à 7 <br />Apocalypse Chapitre 1 à 7
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-1 border-red">
                <div class="red-border-down"></div>
              </div>
              <div class="col-12 col-md-6">
                <div class="video-cours">
                  <video controls>
                    <source src type="video/mp4" />
                    <source src type="video/ogg" />
                  </video>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="row items-center">
              <p class="col-5 title-voir-cours">
                Voir plus de
                <br />cours
              </p>
              <div class="col-1 border-red">
                <div class="red-border-up-right"></div>
              </div>
              <div class="col-5" id="cours-select">
                <q-select
                  class="form-select-cours"
                  bg-color="negative"
                  label-color="white"
                  rounded
                  outlined
                  bottom-slots
                  v-model="model"
                  :options="options"
                  :dense="dense"
                  label="Mes cours"
                />
              </div>
            </div>

            <div class="head-title-messagerie-cours">Messagerie</div>
            <br />
            <div class="form-chat-cours"></div>
            <br />
            <q-input
              class="form-send-msg-cours"
              rounded
              outlined
              v-model="text"
              label="Votre message"
              
            />
            <br />
            <div class="btns-send">
              <q-btn class="btn-send-msg-prof" no-caps rounded label="Envoyer au prof" />
            </div>
          </div>
        </div>
      </CustomModal>

      <!-- Custom Modal for Lessons -->

      <CustomModal
        id="lesson_modal"
        class="form-modal-cours"
        :render="fixedModalLesson"
        @course-id="getLesson"
      >
        <form>
          <div class="row" style="width: 80vw; margin-top: -54px">
            <div class="col">
              <div class="position-img">
                <div>
                  <img class="img" src="../../assets/saint_esprit.png" />
                </div>
                <div class="form-title-lesson">
                  <div class="title-lesson">{{ lesson.name }}</div>
                </div>
              </div>
              <div class="head-title-suivi-cours">Suivi de cours</div>
              <p class="head-text">J'assiste au cours en :</p>
              <div class="form-select q-gutter-md">
                <q-radio v-model="shape" val="presentiel" label="Présentiel" />
                <q-radio v-model="shape" val="distanciel" label="Distanciel" />
                <q-radio v-model="shape" val="replay" label="En replay" />
              </div>

              <div class="row">
                <div class="col" v-if="shape === 'distanciel'">
                  <div class="head-title-cours-en-ligne">Cours en ligne</div>
                  <p class="p-title-join-cours">Rejoindre le cours en ligne</p>
                  <br />
                  <q-btn class="btn-join-cours" label="Rejoindre le cours" no-caps />
                </div>

                <div class="col" v-if="shape === 'replay'">
                  <div class="head-title-replay">Résumé du cours</div>
                  <form class="row">
                    <div class="col-8">
                      <div class="form-resume-cours">
                        <p class="p-title-resume-lesson">Résumé de la leçon</p>
                      </div>
                    </div>

                    <div class="col-4" style="padding-inline: 28px">
                      <div class="row q-mb-sm items-center">
                        <div class="col-9">
                          <q-badge id="badge-date">{{ model_date }}</q-badge>
                        </div>
                        <div class="col-3">
                          <q-icon class="icon-event" name="event">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <div class="q-pa-md">
                                <q-date v-model="model_date" />
                              </div>
                            </q-popup-proxy>
                          </q-icon>
                        </div>
                      </div>

                      <q-btn class="btn-save-lesson" label="Enregistrer" no-caps />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="row">
                <div class="col-1 border-red">
                  <div class="red-border-up"></div>
                </div>
                <div class="col-10">
                  <div class="head-title-etude">Mes ressources d'étude</div>
                  <div class="form-list">
                    <div class="icon-form row items-center q-mb-md">
                      <div class="col-2">
                        <div id="form-icon">
                          <i class="fa-solid fa-play" id="icon-play"></i>
                        </div>
                      </div>

                      <div class="col-10">
                        Youtube.Dereckprince.lafindestemps
                        <br />Youtube.Dereckprince.lafindestemps
                        <br />Youtube.Dereckprince.lafindestemps
                      </div>
                    </div>
                    <div class="icon-form row items-center q-mb-md">
                      <div class="col-2">
                        <div id="form-icon">
                          <i class="fa-solid fa-list" id="icon-list"></i>
                        </div>
                      </div>
                      <div class="col-10">
                        Le retour de Christ - JM Thabois
                        <br />Le retour de Christ - JM Thabois <br />Le retour de Christ -
                        JM Thabois
                      </div>
                    </div>
                    <div class="icon-form row items-center q-mb-md">
                      <div class="col-2">
                        <div id="form-icon">
                          <i class="fa-solid fa-cross" id="icon-cross"></i>
                        </div>
                      </div>
                      <div class="col-10">
                        Apocalypse Chapitre 1 à 7
                        <br />Apocalypse Chapitre 1 à 7 <br />Apocalypse Chapitre 1 à 7
                      </div>
                    </div>
                    <div class="video">
                      <video width="410" controls>
                        <source src type="video/mp4" />
                        <source src type="video/ogg" />
                      </video>
                    </div>
                  </div>
                </div>
                <div class="col-1 border-red">
                  <div class="red-border-right"></div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="section_three">
                <div class="head-title-devoir" id>Devoir</div>
                <q-select
                  class="form-select-lesson"
                  rounded
                  outlined
                  bottom-slots
                  v-model="model"
                  :options="options"
                  :dense="dense"
                  label="Sélectionner le devoir"
                />
                <p class="form-date">Date limite: 18 Février 2022</p>

                <div class="row items-center" id="form-file-devoir">
                  <div class="col">
                    <q-file
                      class="form-file"
                      borderless
                      v-model="model"
                      label="Importer un fichier"
                    />
                  </div>
                  <div class="col">
                    <q-btn
                      class="btn-send-devoir"
                      color="secondary"
                      label="Soumettre mon devoir"
                      no-caps
                    />
                  </div>
                </div>

                <div class="head-title-messagerie">Messagerie</div>
                <div class="form-chat"></div>
                <br />
                <q-input
                  class="form-send-msg"
                  rounded
                  outlined
                  v-model="text"
                  label="Votre message"
                />
                <br />
                <div class="btns-send">
                  <q-btn
                    class="btn-send-class"
                    no-caps
                    rounded
                    label="Envoyer à la classe"
                  />
                  <q-btn class="btn-send-prof" no-caps rounded label="Envoyer au prof" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CustomModal>

      <div class="col">
        <Navigation @onPrev="handlePrev" @onNext="handleNext" @onToday="handleToday" />
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
          @onRenderLesson="getLesson"
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
import CustomModal from 'src/components/lib/CustomModal.vue';
import { useCourseStore } from 'src/stores/course';
import { useLessonStore } from 'src/stores/lesson';
import { ref, onMounted, computed } from 'vue';
import Navigation from './Navigation.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const courseStore = useCourseStore();
const lessonStore = useLessonStore();

const courses = ref([]);
const lesson = ref({});
const lessons = ref([]);
const lessonsId = ref([]);
const fixedModalLesson = ref(false);
const fixedModalCourse = ref(false);

const shape = ref('presentiel');
const model = ref(null);

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const fullDay = `${dd}/${mm}/${yyyy}`;

const model_date = ref(fullDay);
const dense = ref(true);

const options = ['Les psaumes', 'Corinthiens', 'Histoire de David', 'Apocalypse'];

const filteredLessons = computed(() => {
  return lessons.value.filter((l) => lessonsId.value.includes(l.courseId));
});

const isDay = ref(true);
const isWeek = ref(false);
const isMonth = ref(false);
const calendar = ref(null);

// This function define random colors
const COLORS = [
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey',
  'primary',
  'secondary',
  'accent',
  'positive',
  'negative',
  'info',
  'warning',
];
const setColor = (i) => {
  /* let max = COLORS.length;
  let color = COLORS[Math.floor(Math.random() * max) + 1]
  console.log('Color is ', color, Math.floor(Math.random() * max) + 1);
  return color; */
  return COLORS[i];
};

onMounted(() => {
  console.log('Shape', shape.value);

  const appToken = $q.sessionStorage.getItem('app_token');
  const userId = $q.sessionStorage.getItem('user_id');
  courseStore.getAll(appToken).then((result) => {
    console.log('Courses =>', result);
    let filtered = result.data.filter((c) => c.students.indexOf(userId) > -1);
    courses.value = filtered.map((d, i) => {
      return { ...d, bgcolor: setColor(i) };
    });
  });

  // Get all lessons
  lessonStore.getAll(appToken).then((result) => {
    result.data.map((d) => {
      // Get bgcolor property from each course
      let color = '';
      courses.value.map((c) => {
        if (c._id === d.courseId) {
          color = c.bgcolor;
        }
      });
      // console.log(`Color of lesson: ${d.name} => `, color)
      // Inject color to filtered lessons
      lessons.value.push({ ...d, bgcolor: color });
      // console.log('VOICI LES LESSONS => ', lessons.value[0]);
    });
    lessonsId.value = lessons.value.map((l) => l.courseId);
  });
  // console.log('Filtered lessons => ', filteredLessons.value)
});

function getLesson(id) {
  console.log(id);
  lesson.value = lessons.value.filter((d) => {
    return d._id === id;
  })[0];
  fixedModalLesson.value = true;
}

function getLessons(id) {
  const indexId = lessonsId.value.indexOf(id);
  if (indexId > -1) {
    if (lessonsId.value.length == lessons.value.length) {
      // full calendar so start from the id requested
      lessonsId.value = [];
      lessonsId.value.push(id);
    } else {
      lessonsId.value.splice(indexId, 1);
    }
  } else {
    lessonsId.value.push(id);
  }
  if (!lessonsId.value.length) {
    // empty calendar so start reset to full calendar lessons
    lessonsId.value = lessons.value.map((l) => l.courseId);
  }
}

function handleClick(mode) {
  if (mode === 'day') {
    isDay.value = true;
    isWeek.value = false;
    isMonth.value = false;
  }
  if (mode === 'week') {
    isWeek.value = true;
    isDay.value = false;
    isMonth.value = false;
  }
  if (mode === 'month') {
    isMonth.value = true;
    isWeek.value = false;
    isDay.value = false;
  }
}

function launchMeeting(url) {
  window.open(url, '_blank');
}
function handleToday() {
  calendar.value.goToday();
}
function handlePrev() {
  calendar.value.goPrev();
}
function handleNext() {
  calendar.value.goNext();
}
</script>

<style scoped>
/*CUSTOM ATTRIBUT QUASAR */
#cours-select .q-icon .notranslate .material-icons .q-select__dropdown-icon {
  color: white;
}

.form-send-msg .q-field--outlined.q-field--rounded .q-field__control {
  width: auto !important;
}

.titleContent {
  text-align: center;
  margin-top: 2px;
  line-height: 0.5;
}

@media (max-width: 1024px) {
  .border-red {
    display: none;
  }
}

/* img {
  width: 333px;
  height: 189px;
  box-shadow: 7px 3px 6px #00000029;
} */

.img {
  width: 100%;
  height: 238px;
  box-shadow: 7px 3px 6px #00000029;
}

.position-img {
  position: relative;
}
.form-title-lesson {
  position: absolute;
  top: 20px;
  right: 1px;
  height: 36px;
  background: rgb(52 51 51 / 33%);
  width: 46%;
  text-align: center;
  color: white;
  padding-block: 10px;
}

.title-lesson {
  color: white;
  font-size: 19px;
  margin-top: -5px;
  font-weight: bold;
  text-align: center;
}

.btn-course {
  background-color: #00427a !important;
  width: 300px;
  letter-spacing: 2px;
  font-weight: bold;
  margin-bottom: 25px;
}

.icon-form {
  font: normal normal normal 12px/25px Montserrat;
  letter-spacing: 1.08px;
  color: #3b3738;
  opacity: 1;
}

.icon-event {
  font-size: 27px;
  color: #19437a;
  cursor: pointer;
}

p.head-text {
  color: rgb(83, 81, 81);
  font-size: 19px;
  margin-top: -23px;
  letter-spacing: 2px;
  text-align: center;
}

p {
  color: rgb(83, 81, 81);
  font-size: 12px;
  letter-spacing: 2px;
}

.p-date {
  color: #19437a;
  margin-right: 9px;
  margin-top: 8px;
}

.p-title-join-cours {
  margin: -15px 149px 16px;
}

.form-btn-date {
  margin-top: 12px;
  margin-left: -28px;
}

.form-modal-cours {
  height: 60vh !important;
}

.form-select {
  color: rgb(83, 81, 81);
  margin-top: -18px;
  font-size: 17px;
  text-align: center;
}

.form-select-cours {
  /* width: 261px !important; */
  margin-top: 15px;
}

.form-select-lesson {
  width: 270px !important;
}

.form-incription {
  text-align: right;
  padding-right: 27px;
}

@media (max-width: 1024px) {
  .form-incription {
    padding-right: 0;
  }
}

.red-border {
  background: #c41526 0% 0% no-repeat padding-box;
  border-radius: 11px;
  width: 8px;
  height: 316px;
  margin-inline: 20px;
}

.red-border-up {
  background: #c41526 0% 0% no-repeat padding-box;
  border-radius: 11px;
  width: 8px;
  height: 320px;
  margin-inline: 20px;
}

.red-border-down {
  background: #c41526 0% 0% no-repeat padding-box;
  border-radius: 11px;
  width: 8px;
  height: 249px;
  margin-inline: 20px;
}

.red-border-up-right {
  background: #c41526 0% 0% no-repeat padding-box;
  border-radius: 11px;
  width: 8px;
  height: 104px;
}

.red-border-right {
  margin-top: 276px;
  background: #c41526 0% 0% no-repeat padding-box;
  border-radius: 11px;
  width: 8px;
  height: 313px;
  margin-inline: 13px;
}

.form-date {
  margin-top: -13px;
  margin-left: 13px;
  font: normal normal 13px/25px Montserrat;
  font-weight: bold;
  letter-spacing: 1px;
  color: #c41526;
  opacity: 1;
}

.form-send-msg {
  background: #ededed 0% 0% no-repeat padding-box;
  box-shadow: 7px 3px 6px #00000029;
  border-radius: 26px;
  opacity: 1;
}

.form-send-msg-cours {
  background: #ededed 0% 0% no-repeat padding-box;
  box-shadow: 7px 3px 6px #00000029;
  border-radius: 26px;
  opacity: 1;
}

.btns-send {
  display: flex;
  color: white;
  justify-content: flex-end;
}

.btns-send-cours {
  margin-top: 12px;
  margin-left: -28px;
}

@media (max-width: 1024px) {
  .btns-send-cours {
    margin-left: 0;
  }
}

.btn-send-class {
  background-color: #4b8ee6 !important;
  margin-right: 11px;
}

.btn-syllabus {
  background-color: #19437a !important;
  color: white;
  margin-right: 11px;
  box-shadow: 0px 3px 6px #00000029;
  letter-spacing: 1.08px;
  opacity: 1;
}

.btn-inscription {
  background-color: #c41526;
  color: white;
  border-radius: 50px;
  box-shadow: 0px 3px 6px #00000029;
  letter-spacing: 1.08px;
  opacity: 1;
}

.btn-send-prof {
  background-color: #19437a !important;
  color: white;
}

.btn-send-msg-prof {
  background-color: #19437a !important;
  color: white;
  width: 186px;
  letter-spacing: 1.35px;
}

.btn-save-lesson {
  background-color: #c41526;
  color: white;
  border-radius: 50px;
  font-size: 12px;
  box-shadow: 0px 3px 6px #00000029;
  letter-spacing: 1.17px;
  opacity: 1;
}

.btn-send-devoir {
  background: #c41526 0% 0% no-repeat padding-box !important;
  color: white;
  height: 0px;
  width: 190px;
  font-size: 12px;
  border-radius: 30px;
  letter-spacing: 1.17px;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}

.btn-join-cours {
  background-color: #c41526 !important;
  color: white;
  border-radius: 67px;
  height: 26px;
  width: 188px;
  font-size: 13px;
  margin-left: 150px;
  margin-top: -19px;
  letter-spacing: 1.17px;
  opacity: 1;
}

#badge-date {
  background-color: rgba(187, 179, 179, 0.815);
  border-radius: 18px;
  font-weight: bold;
  height: 25px;
  width: 79px;
}

.head-title-suivi-cours {
  background-color: #19437a;
  text-align: center;
  color: white;
  padding: 3px 0px;
  font: normal normal bold 17px/25px Montserrat;
  letter-spacing: 1.17px;
  margin-bottom: 33px;
}

.head-title-date-cours {
  background-color: #19437a;
  text-align: center;
  color: white;
  padding: 4px 0px;
  font: normal normal bold 16px/25px Montserrat;
  letter-spacing: 1.17px;
  margin-bottom: 17px;
}

.head-title-ressource-etude {
  background-color: #19437a;
  text-align: center;
  color: white;
  padding: 4px 0px;
  width: 97%;
  margin-top: -14px;
  font: normal normal bold 16px/25px Montserrat;
  letter-spacing: 1.17px;
}

.head-title-messagerie-cours {
  background-color: #19437a;
  text-align: center;
  color: white;
  width: 100%;
  padding: 4px 0px;
  font: normal normal bold 16px/25px Montserrat;
  letter-spacing: 1.17px;
  margin-top: 65px;
}

.head-title-cours-en-ligne {
  background-color: #19437a;
  text-align: center;
  color: white;
  padding: 3px 0px;
  font: normal normal bold 17px/25px Montserrat;
  letter-spacing: 1.17px;
  margin-top: 27px;
  margin-bottom: 33px;
}

.head-title-replay {
  background-color: #19437a;
  text-align: center;
  color: white;
  padding: 3px 0px;
  font: normal normal bold 17px/25px Montserrat;
  letter-spacing: 1.17px;
  margin-top: 6px;
  margin-bottom: 14px;
}

.head-title-etude {
  background-color: #19437a;
  text-align: center;
  color: white;
  padding: 3px 0px;
  font: normal normal bold 17px/25px Montserrat;
  letter-spacing: 1.17px;
  margin-bottom: 16px;
}

.head-title-devoir {
  background-color: #19437a;
  text-align: center;
  color: white;
  padding: 3px 0px;
  font: normal normal bold 17px/25px Montserrat;
  letter-spacing: 1.17px;
  margin-bottom: 33px;
  width: 431px;
}

.head-title-messagerie {
  background-color: #19437a;
  text-align: center;
  color: white;
  padding: 3px 0px;
  font: normal normal bold 17px/25px Montserrat;
  letter-spacing: 1.17px;
  margin-bottom: 33px;
}

.form-list {
  margin-left: 20px;
}

.form-file {
  width: 100%;
  font: normal normal bold 8px/25px Montserrat;
  letter-spacing: 1.17px;
  color: #3b3738;
  opacity: 1;
}

.video {
  margin-top: 76px;
  margin-left: -27px;
}

.video-cours {
  /* margin-left: -110px; */
  margin-top: 4px;
}
.video-cours video {
  width: 100%;
  margin-inline: -28px;
}
@media (max-width: 1024px) {
  .video-cours video {
    margin-inline: initial;
  }
}

.form-chat {
  background: #ededed 0% 0% no-repeat padding-box;
  box-shadow: 7px 3px 6px #00000029;
  height: 185px;
  border-radius: 12px;
  opacity: 1;
}

.form-chat-cours {
  background: #ededed 0% 0% no-repeat padding-box;
  box-shadow: 7px 3px 6px #00000029;
  height: 222px;
  border-radius: 12px;
}

.date-begin {
  background: #ededed 0% 0% no-repeat padding-box;
  color: #3b3738;
  height: 40px;
  width: 129px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  margin-left: 33px;
  border-radius: 29px;
  opacity: 1;
}

.form-date-end {
  text-align: right;
  margin-left: 38px;
}

#form-file-devoir {
  margin-left: 15px;
  margin-top: -16px;
}

.date-end {
  background: #b1c6de 0% 0% no-repeat padding-box;
  color: #3b3738;
  height: 40px;
  width: 129px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  /* margin-left: -56px; */
  border-radius: 29px;
  opacity: 1;
}

.form-resume-cours {
  background: #ededed 0% 0% no-repeat padding-box;
  box-shadow: 7px 3px 6px #00000029;
  height: 192px;
  border-radius: 12px;
  opacity: 1;
}

.form-content-syllabus {
  background: #19437a 0% 0% no-repeat padding-box;
  box-shadow: 7px 3px 6px #00000029;
  height: 251px;
  width: 100%;
  opacity: 1;
  margin-inline: -28px;
}
@media (max-width: 1024px) {
  .form-content-syllabus {
    margin-inline: initial;
  }
}

.p-title-resume-lesson {
  font: normal normal 9px/25px Montserrat;
  margin-left: 25px;
  letter-spacing: 1.08px;
  color: #707070;
  opacity: 1;
}

#icon-play {
  font-size: 14px;
  color: #19437a;
  margin-left: 8px;
  margin-top: 4px;
}

#icon-cross {
  font-size: 14px;
  color: #19437a;
  margin-left: 7px;
  margin-top: 5px;
}

#icon-list {
  font-size: 14px;
  color: #19437a;
  margin-left: 5px;
  margin-top: 4px;
}

#form-icon {
  position: relative;
  margin-left: -2px;
  margin-top: 1px;
  height: 29px;
  width: 29px;
  border: 2.5px solid #19437a;
  border-radius: 50%;
  opacity: 1;
}

.title-voir-cours {
  font: normal normal bold 20px/25px Montserrat;
  letter-spacing: 1.8px;
  color: #00427a;
  text-align: right;
  padding: 17px 20px;
}

.text-syllabus {
  color: white;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
