<template>
    <div>
        <h4 class="titleContent">Listes cours</h4> <br>
        <q-btn color="primary" @click="small=true" label="Nouveau cours" /> <br> <br>
        <div>
            <q-markup-table>
                <thead>
                    <tr>
                        <th class="text-center">Titre</th>
                        <th class="text-center">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="cursor-pointer" v-for="(course, index) in courses" :key="index" @click="this.selectCourse(course)">
                        <td class="text-center" v-text="course.title" ></td>
                        <td class="text-center" v-text="course.description" ></td>
                    </tr>
                </tbody>
            </q-markup-table>
        </div>
        <q-dialog v-model="small">
            <q-card style="width: 300px">
                <q-card-section>
                    <div class="text-h6">Création cours</div>
                </q-card-section>

                <q-separator/> <br>
                
                <q-card-section class="q-pt-none">
                    <form @submit.prevent="submitFormCreationCourse">
                        <q-input 
                            outlined  
                            label="Titre" 
                            id="title"
                            v-model="title"
                            stack-label 
                            :dense="dense" 
                            required
                        /> <br>
                        <q-input 
                            outlined  
                            type="description" 
                            label="Description" 
                            id="description"
                            v-model="description"
                            stack-label 
                            :dense="dense" 
                            required
                        /> <br> 
                        <q-btn 
                            size="18px" 
                            type="submit"
                            style="background: #7e807c;color:white; width: 250px; margin-left: 0.5rem;" 
                            v-close-popup
                            label="Enregistrer" 
                        />
                    </form> 
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useCourseStore } from 'src/stores/course';

const data = [
  {
    Titre: '',
    Description: '',
  }
]

const columns = [
  {name: 'Titre', label: 'Titre', field: 'Titre', sortable: true, align: 'left'},
  {name: 'Description', label: 'Description', field: 'Description', sortable: true, align: 'left'},
  {name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center'}
];

export default {
    name: 'CreationCourse',

    data() {
        return {
            title: '',
            description: '',
            professor_id: '',
            coursesDetails: [],
        }
    },

    beforeMount() {
    /*eslint-disable*/
        if (!this.$q.sessionStorage.getItem('current_user')) {
        this.$router.push('/');
        }
    },

    setup () {
        const courseStore = useCourseStore()
        let courses = ref(courseStore.courses)
        return {
            text: ref(''),
            small: ref(false),
            ph: ref(''),
            dense: ref(false),
            model: ref(null),
            options: [1, 2, 3],
            data,
            columns,
            courses
        }
    },

    mounted() {
        this.getCoursesDetails();
    },

    methods: {
        selectCourse (course) {
            const { _id } = course
            this.$router.push({ path: `/home-professor/details-course/${_id}`})
        },

        getCoursesDetails() {
            const courseStore = useCourseStore()
            const appToken = this.$q.sessionStorage.getItem('app_token');
            courseStore.getAll(appToken).then((result) => {
                console.log(result.data);
                result.data.map((d) => courseStore.courses.push(d))
                this.coursesDetails = result.data.data
            })
        },

        formatCoursesDetails(courses) {
            for (let key in courses) {
                this.coursesDetails.push({ ...courses[key], id:key})
            }
        },

        submitFormCreationCourse() {

            const $q = useQuasar()
            const appToken = this.$q.sessionStorage.getItem('app_token')
            const professorId = this.$q.sessionStorage.getItem('current_user').user_id
            
            const formCreateCourse = {
                title: this.title,
                description: this.description,
                professor_id: professorId
            }

            const courseStore = useCourseStore();

            courseStore.submitCourse(appToken, formCreateCourse).then((result) => {
                console.log(result.data)
                this.$q.notify({
                    type: 'positive',
                    message: 'Course Created',
                    position: 'top',
                });
            })
            .catch((error) => {
                console.log(error)
                this.$q.notify({
                    type: 'negative',
                    message: 'Duplicated data',
                    position: 'top',
                });
            })

            this.title = '';
            this.description = '';
        },
    }
}

</script>


<style scoped>
    
    .titleContent {
        text-align: center;
        margin-top: 20px;
        line-height: 0.5;
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
        background-color: #FFF;
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