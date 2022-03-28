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
          <q-btn 
            @click="fixed = true"
            size="20px"
            color="brown-5" 
            label="Lancer le cours" 
          />
        </div>

        <CustomModal v-model="fixed" :render="true">
          <div class="row q-gutter-md" id="container-course">
            <div class="section_one">
              <div class="postion-img">
                <img src="../../assets/saint_esprit.jpg" />
              </div>
              <div class="head-title">Suivi de cours</div>
              <p> J'assiste au cours en :</p> 
              <div class="form-select">
                <q-radio v-model="shape" val="line" label="Présentiel" />
                <q-radio v-model="shape" val="rectangle" label="Distanciel" />
                <q-radio v-model="shape" val="ellipse" label="En replay" />
              </div>
            </div>

            <div class="red-border"></div>

            <div class="section_two">
              <div class="head-title">Mes ressources d'étude</div>
              <div class="form-list">
                <p>
                  Youtube.Dereckprince.lafindestemps <br>
                  Youtube.Dereckprince.lafindestemps <br>
                  Youtube.Dereckprince.lafindestemps 
                </p>
                <p>
                  Le retour de Christ - JM Thabois  <br>
                  Le retour de Christ - JM Thabois  <br>
                  Le retour de Christ - JM Thabois  
                </p>
                <p>
                  Apocalypse Chapitre 1 à 7 <br>
                  Apocalypse Chapitre 1 à 7 <br>
                  Apocalypse Chapitre 1 à 7 
                </p>
                <div>
                  <video width="320" height="240" controls>
                    <source src="" type="video/mp4">
                    <source src="" type="video/ogg">
                  </video>
                </div>
              </div>
            </div>

            <div class="red-border-right"></div>

            <div class="section_three">
              <div class="head-title" id="">Devoir</div> 
              <q-select 
                rounded
                size="10px" 
                outlined 
                v-model="model" 
                :options="options" 
                label="Séléctionner le devoir" 
              />
              <p class="form-date"> Date limite: 18 Février 2022 </p>
              <div class="form-files">
                <q-file 
                  borderless 
                  v-model="model" 
                  label="Importer un fichier" 
                />
                <q-btn 
                  class="btn-send-devoir"
                  color="secondary" 
                  label="Soumettre mon devoir" 
                  no-caps
                />
              </div>
              <div class="head-title">Messagerie</div>
              <div class="q-pa-md row justify-center" id="border-right">
                <div style="width: 70%; max-width: 200px">
                  <q-chat-message
                    name="me"
                    avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                    :text="['hey, how are you?']"
                    stamp="7 minutes ago"
                    sent
                    bg-color="amber-7"
                  />
                  <q-chat-message
                    name="Jane"
                    avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                    :text="['doing fine, how r you?']"
                    stamp="4 minutes ago"
                    text-color="white"
                    bg-color="primary"
                  />
                </div>
              </div>

              <q-input 
                class="form-send-msg"
                rounded 
                outlined 
                v-model="text" 
                label="Votre message" 
              />
                
              <div class="btns-send">
                <q-btn 
                  class="send-class"
                  no-caps
                  rounded 
                  label="Envoyer à la classe" 
                /> 
                <q-btn 
                  class="send-prof"
                  no-caps
                  rounded  
                  label="Envoyer au prof" 
                />
              </div>
              
            </div>

          </div>
        </CustomModal>

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
  import CustomModal from 'src/components/lib/CustomModal.vue';
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
  const fixed = ref(false);
  const shape = ref('');
  const model = ref(null);
  const options = ['Les psaumes', 'Corinthiens', 'Histoire de David', 'Apocalypse'];

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

<style scoped>
  .titleContent {
    text-align: center;
    margin-top: 2px;
    line-height: 0.5;
  }

  #container-course {
    width: 62vw;
    
  }

  img {
    width: 269px;
    height: 189px;
    margin-top: -58px;
    box-shadow: 7px 3px 6px #00000029;
  }
  
  .btn-course {
    background-color:#00427A !important;
    width: 300px;
    letter-spacing: 2px;
    font-weight: bold;
    margin-bottom: 25px;
  }

  p {
    color:rgb(83, 81, 81);
    font-size: 12px;
    margin-left: 46px;
    margin-top: 25px;
    letter-spacing: 2px;
  }

  .form-select {
    color:rgb(83, 81, 81);
    font-size: 12px;
  }

  .red-border {
    margin-top: -41px;
    background: #c41526 0% 0% no-repeat padding-box;
    border-radius: 11px;
    width: 8px;
    height: 331px;
    margin-inline: 20px;
  }

  .red-border-right {
    margin-top: 196px;
    background: #c41526 0% 0% no-repeat padding-box;
    border-radius: 11px;
    width: 8px;
    height: 347px;
    margin-inline: 20px;
  }

  .section_two {
    margin-top: -42px;
  }

  .section_three {
    margin-top: -42px;
  }

  .form-date {
    margin-top: 13px;
    margin-left: 13px;
    font-family: normal normal 13px/25px Montserrat;
    font-weight: bold;
    letter-spacing: 1px;
    color: #C41526;
    opacity: 1;
  }
  
  .form-send-msg {
    background: #EDEDED 0% 0% no-repeat padding-box;
    box-shadow: 7px 3px 6px #00000029;
    border-radius: 26px;
    margin-bottom: 25px;
    opacity: 1;
  }

  .btns-send {
    display: flex;
    color: white;
    justify-content: space-between;
  }

  .head-title {
    background-color: #19437a;
    text-align: center;
    color: white;
    padding: 10px 0px;
    font-family: "Montserrat";
    font-weight: bold;
    letter-spacing: 1.17px;
    margin-bottom: 33px;
  }

  .btn-send-devoir {
    background-color: #C41526 !important;
    color: white;
    margin-top: -77px;
    margin-left: 163px;
    border-radius: 30px;
  }

  .form-files {
    width: 100%;
    margin-top: -20px;
    margin-left: 14px;
  }

  .send-class {
    background-color: #4b8ee6 !important;
  }

  .send-prof {
    background-color: #19437a !important;
  }
  

  

</style>