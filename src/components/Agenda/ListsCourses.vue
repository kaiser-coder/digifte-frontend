<template>
    <div class="row" v-for="(button, index) in buttons" :key="index">
    {{ button }}
      <q-btn
        class="q-ma-xs"
        :color="button.color"
        :label="button.title"
        @click="handleClick(button.id)"
      />
    </div>
</template>

<script setup>
  /*eslint-disable*/
  import { defineEmits, ref, onMounted } from 'vue';
  import { useCourseStore } from 'src/stores/course';

  const courseStore = useCourseStore();
  const emits = defineEmits(['onViewLessons'])
  const buttons = ref([])

  onMounted(() => {
    console.log('Mounted is called', courseStore.courses);
    courseStore.courses.forEach((c) => {
      const {_id, title, bgcolor} = c;
      console.count('Loop')
      // return { id: _id, title: title, color: bgcolor, clicked: false, active: bgcolor, inactive: 'grey' }
      buttons.value += 'coucou'
    })
  })

  function handleClick(courseId) {
    /*eslint-disable*/
    buttons.value.forEach((btn) => {
      if(btn.id === courseId) {
        btn.clicked = true
      }
    })

    // console.log('buttons states => ', buttons.value)
    console.log('Buttons => ', buttons.value)

    emits('onViewLessons', courseId)
  }
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>
