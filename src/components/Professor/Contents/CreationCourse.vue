<template>
    <div>
        <h4 class="titleThree">Création d'un cours</h4> <br>
        <q-btn color="primary" @click="small=true" label="Nouveau cours" /> <br> <br>
        <div>
            <q-markup-table>
                <thead>
                    <tr>
                    <th class="text-center">Titre</th>
                    <th class="text-center">Description</th>
                    <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center">
                            <q-btn flat icon="edit" color="secondary"/>
                            <q-btn flat icon="delete" color="negative"/>
                        </td>
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
                    <form  @submit.prevent="submitFormCreationCourse">
                        <q-input 
                            outlined  
                            label="Title" 
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
import axios from 'axios';
import { useQuasar } from 'quasar'

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
    setup () {
        return {
            text: ref(''),
            small: ref(false),
            ph: ref(''),
            dense: ref(false),
            model: ref(null),
            options: [1, 2, 3],
            data,
            columns
        }
    },
    data() {
        return {
            title: '',
            description: '',
            professor_id: ''
        }
    },

     beforeMount() {
    /*eslint-disable*/
        if (!this.$q.sessionStorage.getItem('current_user')) {
        this.$router.push('/');
        }
    },

    // mounted() {
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const appToken = this.$q.sessionStorage.getItem('app_token')
    
    // axios.get('http://localhost:3000/api/courses', { headers: {'x-access-token' : appToken }})
    //   .then(response => {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //     this.courses = response.data;
    //     console.log('COURSES ' ,courses)
    //   })
    //   .catch(error => {
    //     alert(error)
    //   })
    // },

    methods: {
        submitFormCreationCourse () {
            // const appToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFlZTY5YmMwOGE2ODQwOTRhYzdjYjEyIiwiZW1haWwiOiJzaXRyYWthaGFyaW5qYWthQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiU2l0cmFrYSBIYXJpbmpha2EiLCJyb2xlcyI6WyJwcm9mZXNzb3IiXSwib3JnIjoiZnRlIiwiem9vbV91c2VySWQiOiJHOVpRajZ4eFNCMkVXTHU5b0czVlNnIiwiaWF0IjoxNjQzNjA4MjY2LCJleHAiOjE2NDM2MTU0NjZ9.-J69HvaOfiRXpCcfN6X5IY2RrYoWSvxBrI688dSo-X8';
            // const professorId = '61ee69bc08a684094ac7cb12';
            const $q = useQuasar()

            const appToken = this.$q.sessionStorage.getItem('app_token')
            const professorId = this.$q.sessionStorage.getItem('user_id')
            
            console.log('APPTOKEN ' + appToken);
            console.log('PROF_ID ' + professorId);
            
            const formCreateCourse = {
                title: this.title,
                description: this.description,
                professor_id: professorId
            }
            
            axios.post('http://localhost:3000/api/courses/create',formCreateCourse, { headers: {'x-access-token' : appToken }})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                   
                    this.$q.sessionStorage.set('_id', JSON.stringify(response.data))
                    
                    this.$q.notify({
                        type: 'positive',
                        message: 'Course Created',
                        position: 'top',
                    });
                }

                 if (response.status === 400) {
                    this.$q.notify({
                        type: 'negative',
                        message: 'Course not registered',
                        position: 'top',
                    });
                } 

                if (response.status === 401) {
                     this.$q.notify({
                        type: 'negative',
                        message: 'Duplicated data',
                        position: 'top',
                    });
                }

            })
            .catch((error) => {
                console.log(error);
            }),

            this.title = '';
            this.description = '';
        },
    }
}
</script>


<style scoped>
    
    .titleOne {
        text-align: center;
        margin-top: 20px;
        line-height: 0;
    }

    .titleTwo {
       text-align: center;
        margin-top: 20px;
        line-height: 0;
    }

    .titleThree {
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