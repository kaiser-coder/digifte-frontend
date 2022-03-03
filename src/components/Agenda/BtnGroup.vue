<template>
  <q-btn-group>
    <q-btn @click="handleToday" color="blue-grey-4" glossy text-color="white" push label="Aujourd'hui" />
    <q-btn label="Prev" icon="navigate_before" @click="handlePrev" color="blue-grey-4" glossy text-color="white" />
    <q-btn label="Next" icon-right="navigate_next" @click="handleNext" color="blue-grey-4" glossy text-color="white"  />
  </q-btn-group>
</template>

<script setup>

  import { defineEmits } from 'vue'

  const emits = defineEmits(['onToday', 'onPrev', 'onNext']);

  function handleToday() {
    emits('onToday')
  }

  function handlePrev() {
    emits('onPrev')
  }

  function handleNext() {
    emits('onNext')
  }

</script>
