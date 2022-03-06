<template>
    <div class="row" v-for="(course, index) in custom" :key="index">
    {{ course }}
      <q-btn
        class="q-ma-xs"
        :color="course.color"
        :label="course.title"
        @click="handleClick(course.id)"
        :outline="course.clicked"
      />
    </div>
</template>

<script setup>
  /*eslint-disable*/
  import { defineEmits, computed } from 'vue';
  import { useCourseStore } from 'src/stores/course';

  const courseStore = useCourseStore();
  const emits = defineEmits(['onViewLessons'])
  const custom = computed(() => {
    return courseStore.courses.map((c) => {
      const {_id, title, bgcolor} = c;
      return { id: _id, title: title, color: bgcolor, clicked: false, active: bgcolor, inactive: 'grey' }
    })
  })

  function handleClick(courseId) {
    /*eslint-disable*/
    custom.value.forEach((c) => {
      c.clicked = true
      return c
    })

    emits('onViewLessons', courseId)
  }
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>
