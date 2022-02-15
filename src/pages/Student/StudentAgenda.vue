<template>
    <div>
        <h3 class="titleContent" >Planning</h3>
            <ListsCourses />
            <TheCalendar />
    </div>
</template>

<script setup>
    import TheCalendar from 'src/components/Agenda/TheCalendar.vue';
    import ListsCourses from 'src/components/Agenda/ListsCourses.vue'
</script>

<style>
    .titleContent {
        text-align: center;
        margin-top: 2px;
        line-height: 0.5;
    }
</style>