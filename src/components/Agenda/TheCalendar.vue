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
              text-color="white" label="Jour"
            />
            <q-btn
              @click="handleClick('week')"
              :color="isWeek === false ? 'blue-grey' : 'blue-grey-4'"
              text-color="white" label="Semaine"
            />
            <q-btn
              @click="handleClick('month')"
              :color="isMonth === false ? 'blue-grey' : 'blue-grey-4'"
              text-color="white" label="Mois"
            />
          </q-btn-group>
        </div>

        <!-- <div class="col">
          <q-btn 
            size="20px"
            color="brown-5" 
            label="Lancer le cours" 
          />
        </div> -->

        <CustomModal class="form-modal-cours" v-model="fixed" :render="true" @course-id="getCourse">
          <form> 
            <div class="row q-gutter-md" id="container-course">
              <div class="row">
                <div class="col">
                  <div class="position-img">
                    <img src="../../assets/saint_esprit.jpg" />
                  </div>
                  <div class="head-title-cours">Suivi de cours</div>
                  <p class="head-text"> J'assiste au cours en :</p> 
                  <div class="form-select">
                    <q-radio v-model="shape" val="presentiel" label="Présentiel" />
                    <q-radio v-model="shape" val="distanciel" label="Distanciel"/>
                    <q-radio v-model="shape" val="replay" label="En replay"/>
                  </div>


                  <div class="row">
                    <div class="col">
                      <div class="row">Content distanciel</div>
                      <div class="row">Content replay</div>
                    </div>
                  </div>
                </div>

                <div class="red-border"></div>

                <div class="col">
                  <div class="section_two">
                    <div class="head-title-etude">Mes ressources d'étude</div>
                    <div class="form-list">
                      <div class="icon-form row items-center q-mb-md">
                        <div class="col-2">
                          <i class="fa-regular fa-circle-play" id="icon-circle"></i>
                        </div>
                      
                        <div class="col-10">
                        <!-- {{ course }} -->
                          Youtube.Dereckprince.lafindestemps <br>
                          Youtube.Dereckprince.lafindestemps <br>
                          Youtube.Dereckprince.lafindestemps 
                        </div>
                      </div>

                      <div class="icon-form row items-center q-mb-md">
                        <div class="col-2">
                          <div id="form-icon">
                            <i class="fa-solid fa-list" id="icon-list"></i>
                          </div>
                        </div>
                        <div class="col-10">
                          Le retour de Christ - JM Thabois  <br>
                          Le retour de Christ - JM Thabois  <br>
                          Le retour de Christ - JM Thabois  
                        </div>
                      </div>

                      <div class="icon-form row items-center q-mb-md">
                        <div class="col-2">
                          <div id="form-icon">
                            <i class="fa-solid fa-cross" id="icon-cross"></i>
                          </div>
                        </div>
                        <div class="col-10">
                          Apocalypse Chapitre 1 à 7 <br>
                          Apocalypse Chapitre 1 à 7 <br>
                          Apocalypse Chapitre 1 à 7 
                        </div>
                      </div>
              
                      <div class="video">
                        <video width="320" height="240" controls>
                          <source src="" type="video/mp4">
                          <source src="" type="video/ogg">
                        </video>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="red-border-right"></div>

                <div class="col">
                  <div class="section_three">
                    <div class="head-title-devoir" id="">Devoir</div> 
                    <q-select 
                      class="form-select-cours" 
                      rounded 
                      outlined 
                      bottom-slots 
                      v-model="model" 
                      :options="options" 
                      :dense="dense" 
                      label="Sélectionner le devoir" 
                    />
                    <p class="form-date"> Date limite: 18 Février 2022 </p>
                    
                    <q-file 
                      borderless 
                      class="form-file"
                      v-model="model" 
                      label="Importer un fichier" 
                    />
                    <q-btn 
                      class="btn-send-devoir"
                      color="secondary" 
                      label="Soumettre mon devoir" 
                      no-caps
                    />
                    
                    <div class="head-title-messagerie">Messagerie</div>
                    <div class="form-chat">

                    </div> <br>
                    <q-input 
                      class="form-send-msg"
                      rounded 
                      outlined 
                      v-model="text" 
                      label="Votre message" 
                    /> <br>
                    <div class="btns-send">
                      <q-btn 
                        class="btn-send-class"
                        no-caps
                        rounded 
                        label="Envoyer à la classe" 
                      /> 
                      <q-btn 
                        class="btn-send-prof"
                        no-caps
                        rounded  
                        label="Envoyer au prof" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
            @onRenderCourse="getCourse"
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
  import Navigation from './Navigation.vue';
  import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
  // import { faListTimeline } from '@fortawesome/free-regular-svg-icons';
  // import { faCross } from '@fortawesome/free-regular-svg-icons';
  

  const $q = useQuasar();
  const courseStore = useCourseStore();
  const lessonStore = useLessonStore();

  const courses = ref([]);
  const course = ref({});
  const lessons = ref([]);
  const lessonsId = ref([]);
  const fixed = ref(true);
  const shape = ref('');
  const model = ref(null);
  const dense = ref(true);

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
    console.log('Shape', shape.value)

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

  function getCourse(id) {
    console.log(id);
    course.value = courses.value.filter((d, i) => {
      return d._id === id
    })[0];
    fixed.value = true
    console.log(course.value);
  }

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
    width: 333px;
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

  .form-list {
    margin-top: -21px;
  }

  .icon-form {
    font-family: normal normal normal 12px/25px Montserrat;
    letter-spacing: 1.08px;
    color: #3B3738;
    opacity: 1;
  }

  p.head-text {
    color:rgb(83, 81, 81);
    font-size: 12px;
    margin-left: 46px;
    margin-top: -23px;
    letter-spacing: 2px;
  }

  p {
    color:rgb(83, 81, 81);
    font-size: 12px;
    letter-spacing: 2px;
  }
  
  .form-modal-cours {
    height: 60vh !important;
  }

  .form-select {
    color:rgb(83, 81, 81);
    margin-top: -18px;
    font-size: 12px;
  }

  .form-select-cours {
    margin-top: -16px;
    width: 261px !important;
  }

  .red-border {
    margin-top: -59px;
    background: #c41526 0% 0% no-repeat padding-box;
    border-radius: 11px;
    width: 8px;
    height: 259px;
    margin-inline: 20px;
  }

  .red-border-right {
    margin-top: 176px;
    background: #c41526 0% 0% no-repeat padding-box;
    border-radius: 11px;
    width: 8px;
    height: 310px;
    margin-inline: 20px;
  }

  .section_two {
    margin-top: -58px;
  }

  .section_three {
    margin-top: -58px;
  }

  .form-date {
    margin-top: -13px;
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
    width: 357px;
    border-radius: 26px;
    opacity: 1;
  }

  .btns-send {
    display: flex;
    color: white;
    width: 358px;
    justify-content: flex-end;
  }

  .btn-send-class {
    background-color: #4b8ee6 !important;
    margin-right: 11px;
  }

  .btn-send-prof {
    background-color: #19437a !important;
  }

  .head-title-cours {
    background-color: #19437a;
    text-align: center;
    color: white;
    padding: 3px 0px;
    font-family: "Montserrat";
    font-weight: bold;
    letter-spacing: 1.17px;
    margin-bottom: 33px;
  }

  .head-title-etude {
    background-color: #19437a;
    text-align: center;
    color: white;
    padding: 3px 0px;
    font-family: "Montserrat";
    font-weight: bold;
    letter-spacing: 1.17px;
    margin-bottom: 33px;
  }

  .head-title-devoir {
    background-color: #19437a;
    text-align: center;
    color: white;
    padding: 3px 0px;
    font-family: "Montserrat";
    font-weight: bold;
    width:301px;
    letter-spacing: 1.17px;
    margin-bottom: 33px;
  }

  .head-title-messagerie {
    background-color: #19437a;
    text-align: center;
    color: white;
    padding: 3px 0px;
    font-family: "Montserrat";
    font-weight: bold;
    width:355px;
    letter-spacing: 1.17px;
    margin-bottom: 33px;
  }

  .btn-send-devoir {
    background: #C41526 0% 0% no-repeat padding-box !important;
    color: white;
    height: 0px;
    width: 164px;
    font-size: 12px;
    margin-top: -77px;
    margin-left: 163px;
    border-radius: 30px;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
  }

  .form-file {
    width: 100%;
    margin-top: -20px;
    margin-left: 14px;
    font-family: normal normal bold 13px/25px Montserrat;
    letter-spacing: 1.17px;
    color: #3B3738;
    opacity: 1;
  }

  .video {
    margin-top:59px;
  }

  .form-chat {
    background: #EDEDED 0% 0% no-repeat padding-box;
    box-shadow: 7px 3px 6px #00000029;
    margin-top: -18px;
    width: 357px;
    height: 185px;
    border-radius: 12px;
    opacity: 1;
  }

  #icon-circle {
    font-size: 25px;
    color: #19437a;
  }

  #icon-cross {
    font-size: 14px;
    color: #19437a;
    margin-left: 6px;
    margin-top: 4px;
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
    height: 26px;
    width: 27px;
    border: 2.5px solid #19437a;
    border-radius: 50%;
    opacity: 1;
  }

</style>