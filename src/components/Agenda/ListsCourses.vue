<template lang="">
    <div class="row">
      <q-btn class="q-ma-xs" :color="course.bgcolor" :label="course.title" v-for="course in courses" :key="course._id" @click="handleClick(course._id)" :outline="false" ref="btn"/>
    </div>
</template>

<script setup>
  import { defineEmits } from 'vue';

  const props = defineProps({
    courses: Array
  });

  const emits = defineEmits()

  console.log('Courses list => ', props.courses)

  function handleClick(courseId) {
    /*eslint-disable*/
    emits('onViewLessons', courseId)
  }
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>
