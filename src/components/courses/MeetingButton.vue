<template>
   <q-btn :color="btnColor" @click="handleClick" :label="btnLabel" :disable="isDisabled"/>    
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
   const isDisabled = ref(false);

   onMounted(() => {
      /*eslint-disable*/
      const userRole = $q.sessionStorage.getItem('current_user').roles[0];

      if(userRole === 'student' && props.lesson.meeting === undefined) {
         isDisabled.value = true;
      }

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