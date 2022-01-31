<template>
    <div>
        <h4 class="titleContent" >Création d'une leçon</h4>
        <form class="form-meeting" @submit.prevent="submitFormLesson">
            <div class="form-inner">
                <div class="form-group-meet">
                <div class="q-pa-md">

                    <q-input
                        outlined
                        label="Nom du leçon"
                        id="name"
                        v-model="name"
                        stack-label
                        required
                    />

                    <q-input outlined v-model="date" label="Date">
                        <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date
                                    v-model="date"
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
                    </q-input>

                    <q-select
                        outlined
                        :options="options"
                        label="Durée heure"
                        id="duration"
                        v-model="duration"
                        stack-label
                    />

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
                    />
                </div>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    setup() {
        return {
            options: [1, 2, 3],
        };
    },

    data() {
        return {
            name:'',
            zoom_url: '',
            date: '',
            duration: '',
            course_Id:''
        }
    },

    beforeMount() {
    /*eslint-disable*/
        if (!this.$q.sessionStorage.getItem('current_user')) {
        this.$router.push('/');
        }
    },

   methods: {
    submitFormLesson() {
      
    const appToken = this.$q.sessionStorage.getItem('app_token');
    
    var zoom_url = this.$q.sessionStorage.getItem('join_url'); 
    var course_Id = this.$q.sessionStorage.getItem('_id'); 

    console.log('ZOOM_URL ' + zoom_url);
    console.log('COURSE_ID ' + course_Id);

    var obj_zoomUrl = JSON.parse(zoom_url); 
    var obj_courseId = JSON.parse(course_Id);

    var getJoinUrl = obj_zoomUrl.data.join_url
    var getCourseId = obj_courseId.data._id

    var date = this.date + 'T00:00:00Z';

    const formLesson = {
        name: this.name,
        zoom_url: getJoinUrl,
        start_date: date,
        duration: this.duration,
        courseId: getCourseId
    };

    axios.post('http://localhost:3000/api/lessons', formLesson, {headers: { 'x-access-token': appToken }})
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);

            this.$q.notify({
              type: 'positive',
              message: 'Lesson created',
              position: 'top',
            });
          }

          if (response.data === 400) {
            this.$q.notify({
              type: 'negative',
              message: 'Lesson not stored',
              position: 'top',
            });
          }

          if (response.data === 401) {
            this.$q.notify({
              type: 'negative',
              message: 'Duplicated data',
              position: 'top',
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        }),

      this.name = '';
      this.date = '';
      this.duration = '';
    },
  },
}
</script>


<style>
    .titleContent {
        text-align: center;
    }

    form {
        display: block;
        position: relative;
    }

    .form-meeting {
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form .form-inner {
        position: relative;
        border-radius: 8px;
        display: block;
        background-color: #fff;
        z-index: 2;
    }

    form .form-inner .form-group-meet {
        display: block;
        width: 400px;
        margin-bottom: 15px;
    }

    .form-group-meet {
        border: none;
        padding: 10px 15px;
        background-color: #c9c6c687;
        border-radius: 5px;
    }

    form .form-inner .form-group-meet input {
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
    }

    .form-inner .form-group-meet label {
        margin-left: 0.5rem;
        color: #fff;
        font-size: 12px;
        margin-bottom: 5px;
    }
</style>