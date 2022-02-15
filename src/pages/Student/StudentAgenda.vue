<template>
    <div>
        <h3 class="titleContent" >Agenda</h3>
        <TheCalendar/>
    </div>
</template>

<script setup>
    import TheCalendar from 'src/components/TheCalendar.vue';
</script>

<style>
    .titleContent {
        text-align: center;
        margin-top: 20px;
        line-height: 0.5;
    }
</style>