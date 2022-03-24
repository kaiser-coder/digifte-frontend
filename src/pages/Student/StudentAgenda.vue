<template lang="">
    <div>
        <div class="chip">
            
        </div> <br>
        <TheCalendar/>
    </div>
</template>

<script setup>
import TheCalendar from 'src/components/Agenda/TheCalendar.vue'

</script>

<style scoped>
    .chip {
        display: inline-block;
        padding: 22px 903px;
        height: 30px;
        /* font-size: 18px; */
        line-height: 50px;
        border-radius: 25px;
        background-color: #f1f1f1;
    }
</style>