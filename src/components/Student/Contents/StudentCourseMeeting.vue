<template>
    <div>
        <div id="buttonGroup" class="q-pa-md q-gutter-sm">
            <q-btn-group>
                <!-- <q-btn 
                    color="secondary" 
                    glossy 
                    label="Participer à la réunion" 
                /> &nbsp; -->
                <q-btn 
                    color="secondary" 
                    glossy 
                    label="S'inscrire à un cours" 
                    @click="fixed = true"
                /> &nbsp;
                <q-btn 
                    color="secondary" 
                    glossy 
                    label="Cours de leçon" 
                    @click="alert = true"
                />
            </q-btn-group>

            <q-dialog v-model="fixed">
                <q-card>
                    <q-card-section>
                    <div class="text-h6">Voulez-vous s'inscrire à un cours ?</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section style="max-height: 20vh" class="scroll">
                        <form @submit.prevent="subscribeStudent">

                            <div class="q-gutter-md" style="max-width: 300px">
                                <div class="buttonConfirmSubscribe" >
                                    <q-btn @click="subscribeStudent" size="15px" color="secondary" label="Valider" v-close-popup /> &nbsp; 
                                    <q-btn size="15px" style="background: #212121;color:white" label="Annuler" color="#9C9998" v-close-popup /> <br> <br>
                                </div>
                            </div>
                        </form>
                    </q-card-section>
                </q-card>
            </q-dialog>

            <q-dialog v-model="alert">
                <q-card>
                    <q-card-section>
                    <div class="text-h6">Voulez-vous ajouter un cours ?</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section style="max-height: 20vh" class="scroll">
                        <form @submit.prevent="addCourse">
                            <div class="q-gutter-md" style="max-width: 300px">
                                <div class="buttonConfirmCours" >
                                    <q-btn @click="addCourse" size="15px" color="secondary" label="Valider" v-close-popup /> &nbsp; 
                                    <q-btn size="15px" style="background: #212121;color:white" label="Annuler" color="#9C9998" v-close-popup /> <br> <br>
                                </div>
                            </div>
                        </form>
                    </q-card-section>
                </q-card>
            </q-dialog>

        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    setup () {
        return {
            fixed: ref(false),
            alert: ref(false),
            text: ref('')
        }
    },
    beforeMount() {
        /*eslint-disable*/
        if (!this.$q.sessionStorage.getItem('current_user')) {
            this.$router.push('/')
        }
    },
    
    methods: {
        subscribeStudent() {
            const appToken = this.$q.sessionStorage.getItem("app_token");
            const courseId =  '61f76a1a7184e0bac89ef5f9' //créer dans le homePageProfessor
            const student = '61f5efe5d82ded71bdd7ae69'

            const formSubscribe = {
                courseId: courseId,
                student: student
            }

            axios.post('http://localhost:3000/api/courses/subscribe',formSubscribe, { headers: {'x-access-token' : appToken }})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);

                    this.$q.sessionStorage.set('_id')

                    this.$q.notify({
                        type: 'positive',
                        message: 'Subscribed successfuly',
                        position: 'top'
                    })
                }

                if (response.status === 400) {
                    this.$q.notify({
                        type: 'negative',
                        message: 'User does not subscribed',
                        position: 'top'
                    })
                }

                if (response.status === 401) {
                    this.$q.notify({
                        type: 'negative',
                        message: 'Duplicated data',
                        position: 'top'
                    })
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
        },

        addCourse () {
            const appToken = this.$q.sessionStorage.getItem("app_token");
            // const courseId = this.$$q.sessionStorage.getItem('_id')  //créer dans le homePageProfessor par le professor

            const courseId =  '61f76a1a7184e0bac89ef5f9' 
            const lessonId = '61f7733e7184e0bac89ef612' 

            const formCoursesLesson = {
                courseId: courseId,
                lesson: lessonId
            }

            axios.post('http://localhost:3000/api/courses/lesson',formCoursesLesson, { headers: {'x-access-token' : appToken }})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);

                    this.$q.sessionStorage.set('_id')

                    this.$q.notify({
                        type: 'positive',
                        message: 'Lesson added successfuly',
                        position: 'top'
                    })
                }

                if (response.status === 400) {
                    this.$q.notify({
                        type: 'negative',
                        message: 'Lesson does not added to course',
                        position: 'top'
                    })
                }

                if (response.status === 401) {
                    this.$q.notify({
                        type: 'negative',
                        message: 'Duplicated data',
                        position: 'top'
                    })
                }
            })
            .catch((error) => {
                console.log(error.message);
            })

        }
    }
}
</script>


<style scoped>

    #buttonGroup {
       align-items: center;
    }

    .buttonConfirmSubscribe {
        margin-left: 5.5em;
    }

    .buttonConfirmCours {
        margin-left: 5em;
    }

</style>