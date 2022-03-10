<template lang="">
  <div class="row">
    <q-btn
      class="q-ma-xs"
      :color="course.bgcolor"
      :label="course.title" v-for="course in btns" :key="course._id"
      @click="handleClick(course._id)"
      ref="btn"
    />
  </div>
</template>

<script setup>
/*eslint-disable*/
  import { defineEmits, computed } from 'vue';
  const props = defineProps({
    courses: Array
  });
  const emits = defineEmits()
  const btns = computed(() => {
    let result = []
    props.courses.forEach((c) => {
      result.push({ ...c, state: true })
    })
    console.log(result)
    return result
  })
  console.log('Courses list => ', props.courses)
  function handleClick(courseId) {
    btns.value.forEach((btn) => {
      if(btn._id !== courseId) {
        btn.state = false
        btn.bgcolor = 'grey'
      }
    })
    console.log('Btns states => ', btns.value)
    emits('onViewLessons', courseId)
  }
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>