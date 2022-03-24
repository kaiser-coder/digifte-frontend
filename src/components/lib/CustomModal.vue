<template lang="html">
    <q-dialog :model-value="render">
        <q-card class="card-container">
             <q-card-section class="card-title q-pb-none">
                <div class="title">{{ title }}</div>
                <q-space />
                <q-btn class="btn-close" icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="q-pa-lg">
               <slot></slot>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
    import { ref, defineProps } from 'vue';

    interface Props {
        title?: string,
        render: boolean
    }

    defineProps<Props>()

</script>

<style lang="scss">
    .card-container {
        outline: rgba(163, 189, 219, .8) solid 40px;
        border-radius: 30px !important;
        max-width: 80vw;
    }

    .card-title {
        display: flex;
        align-items: center;
    }

    .btn-close {
        background-color: #A9C1DC;
        color: white;
        width: 30px;
        height: 30px;
    }

    .title {
        text-align: center;
        font: normal normal bold 30px/40px Montserrat;
        letter-spacing: 2.7px;
        color: #00427A;
    }

    .cta {
        background-color: #046CC4;
        border-radius: 25px;
        font: normal normal bold 15px/15px Montserrat;
        letter-spacing: 1.62px;
        color: #FFFFFF;
        text-transform: initial;
        padding: 0 38px !important;
    }
</style>