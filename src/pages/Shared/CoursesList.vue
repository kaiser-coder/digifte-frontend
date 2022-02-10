<template>
  <div>
    <h4 class="titleThree">Listes cours</h4>
    <br />
    <q-btn color="primary" @click="small = true" label="Nouveau cours" /> <br />
    <br />
    <div>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-center">Titre</th>
            <th class="text-center">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cursor-pointer"
            v-for="(course, index) in courses"
            :key="index"
            @click="handleViewDetail(course._id)"
          >
            <td class="text-center" v-text="course.title"></td>
            <td class="text-center" v-text="course.description"></td>
            <!-- <td class="text-center">
                            <q-btn label="Détails"  color="secondary"/>
                        </td> -->
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <q-dialog v-model="small">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Création cours</div>
        </q-card-section>

        <q-separator /> <br />

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
            />
            <br />
            <q-input
              outlined
              type="description"
              label="Description"
              id="description"
              v-model="description"
              stack-label
              :dense="dense"
              required
            />
            <br />
            <q-btn
              size="18px"
              type="submit"
              style="
                background: #7e807c;
                color: white;
                width: 250px;
                margin-left: 0.5rem;
              "
              v-close-popup
              label="Enregistrer"
            />
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';
  import { useCourseStore } from 'src/stores/course';

  /* Stores*/
  const coursesStore = useCourseStore();

  /* Plugins imports */
  const $router = useRouter();
  const $q = useQuasar();

  /*UI states*/
  const dense = ref(false);
  const small = ref(false);

  /* States */
  const courses = ref([]);

  // Functions
  function handleViewDetail(courseId) {
    /*eslint-disable*/
    $router.push(`/app/courses/details/${courseId}`);
  }

  onMounted(() => {
    const appToken = $q.sessionStorage.getItem('app_token');

    coursesStore.courses = [];
    coursesStore.getAll(appToken).then((result) => {
      console.log(result.data);
      result.data.map((d) => {
        coursesStore.courses.push(d);
        courses.value.push(d);
      }); 
    });
  });
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
