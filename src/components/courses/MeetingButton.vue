<template>
   <q-btn :color="btnColor" @click="handleClick" :label="btnLabel" />    
</template>

<script setup>
   import { ref, onMounted } from 'vue';
   import { useQuasar } from 'quasar';

   const $q = useQuasar();

   const props = defineProps({
      lesson: Object
   })
   const emits = defineEmits(['handleLaunchMeeting', 'createMeeting'])

   const btnColor = ref('amber');
   const btnLabel = ref('Créer meeting');

   onMounted(() => {
      /*eslint-disable*/
      const userRole = $q.sessionStorage.getItem('current_user').roles[0];

      if(props.lesson.meeting !== undefined || userRole === 'student') {
         btnColor.value = 'brown-5';
         btnLabel.value = 'Lancer meeting';
      }
   })

   function handleClick() {
      if(props.lesson.meeting !== undefined) {
         /*eslint-disable*/
         emits('onLaunchMeeting', props.lesson.meeting.join_url);
      } else {
         emits('onCreateMeeting', props.lesson);
      }
   }

</script>