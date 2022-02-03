<template>
    <div>
        <div class="featuredItem">
            <span class="featuredTitle">DETAILS COURS</span>
            <div class="featuredContainer">
                <h5>Titre : Galate</h5> 
                <h5>Description : Livre de Galate</h5> <br>
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
                            <td class="text-center">{{ lesson.start_date}}</td>
                            <td class="text-center">{{ lesson.name}}</td>
                            <td class="text-center">{{lesson.duration}}</td>
                            <td class="text-center">
                                <q-btn color="brown-5" @click="dialog = true" label="Voir meeting" /> &nbsp;
                                <q-btn color="amber" @click="inception = true"  label="Créer meeting" /> 
                            </td>
                        </tr>
                    </tbody>
                </q-markup-table>
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
                                </q-input> <br>

                                <q-select
                                    outlined
                                    :options="options"
                                    label="Durée heure"
                                    id="duration"
                                    v-model="duration"
                                    stack-label
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

                <q-dialog v-model="inception">
                    <q-card>
                        <q-card-section>
                            <div class="text-h6">Création d'un meeting</div>
                        </q-card-section>

                        <q-separator />

                        <q-card-section style="max-height: 50vh" class="scroll">
                            <form  @submit.prevent="submitFormMeeting">
                                <q-input outlined v-model="start_date_meet" label="Date du cours">
                                    <template v-slot:prepend>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy
                                                cover
                                                transition-show="scale"
                                                transition-hide="scale"
                                            >
                                                <q-date
                                                    v-model="start_date_meet"
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

                                <q-input outlined v-model="start_time_meet" label="Heure">
                                    <template v-slot:prepend>
                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy
                                                cover
                                                transition-show="scale"
                                                transition-hide="scale"
                                            >
                                                <q-time
                                                v-model="start_time_meet"
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

                                <q-input
                                    outlined
                                    label="Topic"
                                    id="topic"
                                    v-model="topic"
                                    stack-label
                                    :dense="dense"
                                    required
                                /> <br>
                                <q-select
                                    outlined
                                    :options="options"
                                    label="Durée heure"
                                    id="duration"
                                    v-model="duration"
                                    stack-label
                                    :dense="dense"
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

                <q-dialog
                    v-model="dialog"
                    persistent
                    :maximized="maximizedToggle"
                    transition-show="slide-up"
                    transition-hide="slide-down"
                >
                    <q-card class="contentMeeting">
                        <q-bar>
                        <q-space />

                        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                        </q-btn>
                        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                        </q-btn>
                        <q-btn dense flat icon="close" v-close-popup>
                            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                        </q-btn>
                        </q-bar>

                        <q-card-section>
                            <div class="text-h6">Informations Meetings</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <q-markup-table>
                                <thead>
                                    <tr>
                                    <th class="text-center">Date création</th>
                                    <th class="text-center">Topic</th>
                                    <th class="text-center">Date meeting</th>
                                    <th class="text-center">Heure meeting</th>
                                    <th class="text-center">Lien meeting</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">22-02-2022</td>
                                        <td class="text-center">Ephesien</td>
                                        <td class="text-center">25-02-2022</td>
                                        <td class="text-center">09:00</td>
                                        <td class="text-center"> <a href="https://www.zoom.us" target="_blank">http://zoom.us</a> </td>
                                    </tr>
                                </tbody>
                            </q-markup-table>
                        </q-card-section>
                    </q-card>
                </q-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useQuasar } from 'quasar'
    import axios from 'axios';

    export default {
       
        setup () {
            return {
                options: [1, 2, 3],
                fixed: ref(false),
                inception: ref(false),
                dense: ref(false),
                dialog: ref(false),
                maximizedToggle: ref(true)
            }
        },

        data() {
            return {
                name:'',
                zoom_url: '',
                date: '',
                course_Id:'',
                lessonsDetails:[],

                start_date_meet: '',
                start_time_meet: '',
                topic: '',
                duration: '',
                passcode: '',
            }
        },

        beforeMount() {
        /*eslint-disable*/
            if (!this.$q.sessionStorage.getItem('current_user')) {}
        },

        mounted() {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const course_id = this.$route.params.id
            this.getLessonsDetails(course_id);
        },

        methods: {

            getLessonsDetails(course_id) {
                console.log('COURSE_IDID' + course_id);
                const appToken = this.$q.sessionStorage.getItem('app_token')
                //const courseId = this.$q.sessionStorage.getItem('_id')
               
                axios.get(`http://localhost:3000/api/lessons/courses/${course_id}`, {headers: { 'x-access-token': appToken }})
                .then((response) => {
                    this.lessonsDetails = response.data.data
                    console.log(this.lessonsDetails);
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

                var zoom_url = this.$q.sessionStorage.getItem('join_url'); 
                var course_Id = this.$q.sessionStorage.getItem('_id'); 

                
                //var getJoinUrl = obj_zoomUrl.data.join_url
                var date = this.date;

                const formLesson = {
                    name: this.name,
                    zoom_url: 'https://us04web.zoom.us/j/72256795915?pwd=9xg_QI3ayFPv3S8RaWaI-_Keh6gGM2.1',
                    start_date: date,
                    duration: this.duration,
                    courseId: course_Id
                }

                axios.post('http://localhost:3000/api/lessons', formLesson, { headers: {'x-access-token' : appToken }} )
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

                    //if (response.data === 401) {
                        // this.$q.notify({
                        //     type: 'negative',
                        //     message: 'Duplicated data',
                        //     position: 'top',
                        // });
                    //}
                })
                .catch((error) => {
                    console.log(error);
                }),

                this.name = '';
                this.date = '';
                this.duration = '';
            },
            
            submitFormMeeting() {
      
                const appToken = this.$q.sessionStorage.getItem("app_token");
                const zoomToken = this.$q.sessionStorage.getItem("zoom_token");
                const zoomUserId = this.$q.sessionStorage.getItem("zoom_userId");

                //yyyy-MM-ddTHH:mm:ssZ   2020-03-31T12:02:00Z  2022-01-28T20:47:00Z
                var date_zoom = this.start_date_meet + 'T' + this.start_time_meet + ':00Z';
                
                const formMeeting = {
                    start_time: date_zoom,
                    topic: this.topic,
                    duration: this.duration,
                    passcode: this.passcode,
                    zoom_token: zoomToken,
                    zoom_userId: zoomUserId,
                };

                axios.post('http://localhost:3000/api/meetings', formMeeting, {headers: { 'x-access-token': appToken }})
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);

                            this.$q.sessionStorage.set('join_url', JSON.stringify(response.data))
                    
                            this.$q.notify({
                                type: 'positive',
                                message: 'Meeting créé',
                                position: 'top',
                            });
                        }

                        if (response.data === 400) {
                            this.$q.notify({
                                type: 'negative',
                                message: 'Erreur',
                                position: 'top',
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    }),

                    this.start_date_meet = '';
                    this.start_time_meet = '';
                    this.topic = '';
                    this.duration = '';
                    this.passcode = '';
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