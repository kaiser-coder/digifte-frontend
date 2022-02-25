<template lang="">
    <div class="row">
      <q-btn class="q-ma-xs" :color="course.bgcolor" :label="course.title" v-for="course in courses" :key="course._id" @click="handleClick(course._id)"/>
    </div>
</template>

<script setup>
  import { defineEmits } from 'vue';

  defineProps({
    courses: Object
  });

  const emits = defineEmits();

  function handleClick(courseId) {
    emits('onViewLessons', courseId)
  }
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>
