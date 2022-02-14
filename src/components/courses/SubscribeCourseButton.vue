<template>
   <q-btn :label="btnLabel"  @click="submitStudent" :color="btnColor"/>
</template>

<script setup>
   import { ref, onMounted } from 'vue';

   const props = defineProps({
      isSubscribed: Boolean
   });

   const emits = defineEmits(['onSubscribeStudent']);

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
      emits('onSubscribeStudent')
   }
</script>