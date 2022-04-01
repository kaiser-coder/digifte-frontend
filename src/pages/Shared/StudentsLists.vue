<template lang="">
    <div>
        <h5>Listes des étudiants</h5>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="text-center">Nom</th>
            <th class="text-center">Télephone</th>
            <th class="text-center">Email</th>
            <th class="text-center">Organisation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student, key in students" :key="key">
            <td class="text-center">{{ student.columns[7].value }}</td>
            <td class="text-center">{{ student.columns[0].value }}</td>
            <td class="text-center">{{ student.columns[3].value }}</td>
            <td class="text-center">{{ student.columns[4].value }}</td>
            <td class="text-center">{{ student.columns[1].value }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
</template>

<script lang="ts" setup>

/*eslint-disable*/

import { useStudentStore } from 'src/stores/students';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

const studentStore = useStudentStore();
const $q = useQuasar();

const { students } = storeToRefs(studentStore);

onBeforeMount(() => {
  const { app_token, sf_token } = $q.sessionStorage.getAll();
  studentStore.getAll(app_token, sf_token).then((result) => {
    result.map((r) => students.value.push(r));
  });
  console.log(students.value);
  
})

</script>

<style lang="">
    
</style>