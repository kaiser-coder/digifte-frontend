<template>
   <q-btn :label="btnLabel"  @click="submitStudent" :color="btnColor"/>
</template>

<script setup>
   import { ref, onMounted } from 'vue';
   import { useQuasar } from 'quasar';
   import { useCourseStore } from 'src/stores/course';

   const props = defineProps({
      courseId: String,
      isSubscribed: Boolean
   });
   const $q = useQuasar();

   /*Stores*/
   const courseStore = useCourseStore();

   /*States*/
   const student = ref($q.sessionStorage.getItem('user_id'));
   const appToken = ref($q.sessionStorage.getItem('app_token'));

   /*UI states*/
   const btnColor = ref('secondary');
   const btnLabel = ref('Subscribe');

   onMounted(() => {
      /*eslint-disable*/
      if(props.isSubscribed) {
         btnColor.value = 'red';
         btnLabel.value = 'Subscribed';
      }
   })

   function submitStudent() {
     /*  console.log('Data submit course =>', {courseId: props.courseId, student: student.value});
      throw ''; */

      courseStore.submitCourse(appToken.value, {courseId: props.courseId, student: student.value})
         .then((result) => {
            console.log('Subscribed student =>', result);
            
            $q.notify({
               type: 'positive',
               message: '',
               position: 'top-right'
            })
         })
         .catch((error) => {
            $q.notify({
               type: 'negative',
               message: error.message,
               position: 'top-right'
            })
         })
   }
</script>