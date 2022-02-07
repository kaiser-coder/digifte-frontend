<template>
  <div>
    <div class="featuredItem">
      <span class="featuredTitle">DETAILS COURS</span> &nbsp;
      <div class="featuredContainer">
        <h5>Titre : {{ course.title }}</h5> 
        <h5>Description : {{ course.description }} </h5> <br>
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
            <tr v-for="(lesson, index) in lessonsDetails" :key="index" >
              <td class="text-center">{{ lesson.start_date }}</td>
              <td class="text-center">{{ lesson.name }}</td>
              <td class="text-center">{{ lesson.duration }}</td>
              <td class="text-center">
                <q-btn color="teal-5"  @click="fixed = true" label="S'inscrire" /> &nbsp;
                <q-btn class="buttonMeeting" color="amber" label="Lancer meeting" /> 
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
                  <div class="buttonConfirmSubscribe" >
                    <q-btn @click="subscribeStudent" size="15px" color="secondary" label="Valider" v-close-popup /> &nbsp; 
                    <q-btn size="15px" style="background: #212121;color:white" label="Annuler" color="grey-14" v-close-popup /> <br> <br>
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

<script>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { useCourseStore } from 'src/stores/course';
  

  export default {
    
    data() {
      return {
        fixed: ref(false),
        name:'',
        zoom_url: '',
        date: '',
        course_Id:'',
        lessonsDetails:[],
        start_date_lesson: '',
        start_time_lesson: '',
        course: {},
      }
    },

    beforeMount() {
      /*eslint-disable*/
      if (!this.$q.sessionStorage.getItem('current_user')) {}
    },

    mounted() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const course_id = this.$route.params._id
      this.getLessonsDetails(course_id);
      this.getAllCourses();
    },

    methods: {

      getAllCourses() {
        const courseStore = useCourseStore();
        const route = useRoute();
        const courseId = route.params._id;

        const appToken = this.$q.sessionStorage.getItem('app_token');
        courseStore.getCourseDetails(appToken, courseId).then((result) => {
          this.$q.sessionStorage.set('_id', result.data._id);
          courseStore.courses = [];
          this.course = Object.assign(this.course, result.data);
        })
      },

      getLessonsDetails(course_id) {
        const appToken = this.$q.sessionStorage.getItem('app_token')

        axios.get(`http://localhost:3000/api/lessons/courses/${course_id}`, {headers: { 'x-access-token': appToken }})
        .then((response) => {
          console.log(response.data);
          this.lessonsDetails = response.data.data
        })
      },
      
      formatLessonsDetails(lessons) {
        for (let key in lessons) {
          this.lessonsDetails.push({ ...lessons[key], id:key})
        }
      },

      subscribeStudent() {
        const appToken = this.$q.sessionStorage.getItem('app_token');
        const courseId =  this.$q.sessionStorage.getItem('_id');
        const student = this.$q.sessionStorage.getItem('user_id')

        const formSubscribe = {
          courseId: courseId,
          student: student
        }

        axios.post('http://localhost:3000/api/courses/subscribe',formSubscribe, { headers: {'x-access-token' : appToken }})
        .then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Inscription validé',
              position: 'top'
            })

          }

          if (response.status === 400) {
            this.$q.notify({
              type: 'negative',
              message: 'Inscription non autorisé',
              position: 'top'
            })
          }

          if (response.status === 401) {
            this.$q.notify({
              type: 'negative',
              message: 'Inscription déjà enregistré',
              position: 'top'
            })
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
      },

      handleLaunchMeeting(url) {
          window.open(url, '_blank');
        }
    }
            
    
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

  .featuredTitle{
    font-size: 30px;
    color:rgb(29, 29, 29);
    word-spacing: 9px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .featuredContainer{
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