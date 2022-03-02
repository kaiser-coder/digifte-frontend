<template>
   <q-btn :label="btnLabel"  @click="submitStudent" :color="btnColor"/>
</template>

<script setup>
   import { computed } from 'vue';

   const props = defineProps({
      isSubscribed: Boolean
   });

   const emits = defineEmits(['onSubscribeStudent']);

   /*UI states*/
   const btnColor = computed(() => {
    if(props.isSubscribed) {
      return 'red'
    }
    return 'secondary'
   });

   const btnLabel = computed(() => {
    if(props.isSubscribed) {
      return 'Subscribed'
    }
    return 'Subscribe'
   });

   function submitStudent() {
      emits('onSubscribeStudent')
   }
</script>
