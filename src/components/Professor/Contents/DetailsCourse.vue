<template>
    <div>
        <div class="featuredItem">
            <span class="featuredTitle">DETAILS COURS</span>
            <div class="featuredContainer">
                <h5>Titre :{{course.title}}</h5> 
                <h5>Description : {{course.description}}</h5> <br>
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
                        <tr v-for="(lesson, index) in lessonsDetails" :key="index" @click="getLessonsDetails(course_id)" >
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

<script>

    import { ref } from 'vue'
    import { useRoute } from 'vue-router';
    import { useQuasar } from 'quasar'
    import axios from 'axios';
    import { useCourseStore } from 'src/stores/course';
    import { useLessonStore } from 'src/stores/lesson';

    export default {
        data() {
            return {
                name:'',
                zoom_url: '',
                date: '',
                course_Id:'',
                currentLesson: ref(null),
                lessonsDetails:[],

                start_date_meet: '',
                start_time_meet: '',
                start_date_lesson: '',
                start_time_lesson: '',

                topic: '',
                duration: '',
                passcode: '',
                course: {},

                options: [1, 2, 3, 4],
                fixed: ref(false),
                inception: ref(false),
                dense: ref(false),
                dialog: ref(false),
                maximizedToggle: ref(true)
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

            clearLesson() {
                this.currentLesson = null;
            },

            creatingMeeting (lesson) {
                this.inception = true;
                this.currentLesson = lesson;
            },

            getAllCourses() {
                const courseStore = useCourseStore();
                const route = useRoute();
                const courseId = route.params._id;

                const appToken = this.$q.sessionStorage.getItem('app_token');
                courseStore.getCourseDetails(appToken, courseId).then((result) => {
                    console.log(result.data);
                    this.$q.sessionStorage.set('_id', result.data._id);
                    this.$q.sessionStorage.set('title', result.data.title);
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

            submitFormLesson() {
                const $q = useQuasar()
                const appToken = this.$q.sessionStorage.getItem('app_token');
                const zoomToken = this.$q.sessionStorage.getItem("zoom_token");
                const zoomUserId = this.$q.sessionStorage.getItem("zoom_userId");
                const courseId = this.$q.sessionStorage.getItem("_id");
                var zoom_url = this.$q.sessionStorage.getItem('join_url'); 

                var date_lesson = this.start_date_lesson + 'T' + this.start_time_lesson + ':00Z';
                
                const formLesson = {
                    name: this.name, //input by user
                    start_date: date_lesson, //input by user
                    //topic: 'Meeting Lesson',
                    duration: this.duration, //input by user
                    //passcode: 'secretpass',
                    zoom_token: zoomToken,
                    zoom_userId: zoomUserId,
                    zoom_url: zoom_url,
                    courseId: courseId
                }

                axios.post('http://localhost:3000/api/lessons', formLesson, { headers: {'x-access-token' : appToken }} )
                .then((response) => {
                    if (response.status === 200) {
                        this.$q.notify({
                            type: 'positive',
                            message: 'Félicitations! Votre leçon a été créé',
                            position: 'top',
                        });
                    }

                    if (response.data === 400) {
                        this.$q.notify({
                            type: 'negative',
                            message: 'La leçon n\'est pas créée ',
                            position: 'top',
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                }),

                this.name = '',
                this.start_date_lesson = '';
                this.start_time_lesson = '';
                this.duration = '';
            },
            
            submitFormMeeting(lesson) {
                const lessonStore = useLessonStore();
                const appToken = this.$q.sessionStorage.getItem('app_token');
                const zoomToken = this.$q.sessionStorage.getItem("zoom_token");
                const zoomUserId = this.$q.sessionStorage.getItem("zoom_userId");

                console.log('Current lesson', this.currentLesson)

                const updatedLesson = {
                    ...this.currentLesson,
                    meeting: {
                        start_time: Date.now(),
                        topic: this.topic,
                        duration: 1,
                        passcode: this.passcode,
                        zoom_token: zoomToken,
                        zoom_userId: zoomUserId
                    }
                };

                console.log('Updated lesson', updatedLesson)

                lessonStore.editLesson(appToken, lesson._id, updatedLesson)
                .then((result) => {
                    console.log('Meeting submited', result);
                    this.$q.notify({
                    type: 'positive',
                    message: 'Meeting créé',
                    position: 'top',
                });
                    
                }).catch((error) => {
                    console.log('An error occur', error);
                })

                this.topic = '',
                this.passcode = ''
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
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .featuredContainer{
        margin: 5px 0px;
        align-items: center;
    }

    .contentMeeting {
        background-color: bisque;
    }
</style>