<template lang="">
    <div class="row">
        <q-btn class="q-ma-xs" color="primary" :label="course.title" v-for="course in courses" :key="course._id"/>
    </div>
</template>

<script setup>
  defineProps({
    courses: Object
  })
</script>

<style lang="sass" scoped>
    .my-card
        width: 100%
        max-width: 250px
</style>
