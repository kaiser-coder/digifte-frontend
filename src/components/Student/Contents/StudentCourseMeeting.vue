<template>
    <div>
        <div id="buttonGroup" class="q-pa-md q-gutter-sm">
            <q-btn-group>
                <q-btn 
                    color="secondary" 
                    glossy 
                    label="Participer à la réunion" 
                /> &nbsp;
                <!-- <q-btn 
                    color="secondary" 
                    glossy 
                    label="S'inscrire à un cours" 
                    @click="fixed = true"
                /> &nbsp; -->
                <!-- <q-btn 
                    color="secondary" 
                    glossy 
                    label="Cours de leçon" 
                    @click="alert = true"
                /> -->
            </q-btn-group>

            <q-dialog v-model="alert">
                <q-card>
                    <q-card-section>
                    <div class="text-h6">Voulez-vous ajouter un cours ?</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section style="max-height: 20vh" class="scroll">
                        <form >
                            <div class="q-gutter-md" style="max-width: 300px">
                                <div class="buttonConfirmCours" >
                                    <q-btn  size="15px" color="secondary" label="Valider" v-close-popup /> &nbsp; 
                                    <q-btn size="15px" style="background: #212121;color:white" label="Annuler" color="#9C9998" v-close-popup /> <br> <br>
                                </div>
                            </div>
                        </form>
                    </q-card-section>
                </q-card>
            </q-dialog>

            <courses-list :courses="courses"/>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount, onMounted } from 'vue';
import { useCourseStore } from 'src/stores/course';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

// Components
import CoursesLists from './CoursesLists';

export default {
    components: {
        /*eslint-disable*/
        CoursesLists
    },
    setup () {
        /* Plugins import */
        const $q = useQuasar();
        const router = useRoute();

        /* Stores */
        const coursesStore = useCourseStore();

        /* States */
        const courses = ref(coursesStore.courses);
        const alert = ref(false);
        const text = ref('');

        /* Lifecycles */
        onBeforeMount(() =>{
            /*eslint-disable*/
            if (!$q.sessionStorage.getItem('current_user')) {
                router.push('/')
            }
        })

        onMounted(() => {
            const token = $q.sessionStorage.getItem('app_token');
            /* 
                Récupère la liste des courses (API) et affecte le state "courses" avec les valeurs
            */
            coursesStore.getAll(token).then((result) => result.data.map((d) => coursesStore.courses.push(d))) 
        })

        return {
            alert,
            text,
            courses
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