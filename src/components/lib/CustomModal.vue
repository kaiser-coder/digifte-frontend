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

            <!-- <q-card-actions align="right" class="q-pa-lg">
                <q-btn class="cta" :label="cta" v-close-popup />
            </q-card-actions> -->
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue';

    interface Props {
        title?: string,
        render: boolean
    }

    defineProps<Props>()

</script>

<style lang="scss">
    .card-container {
        outline: rgba(163, 189, 219, .8) solid 18px;
        border-radius: 30px !important;
        max-width: 90vw !important;
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
        font-family: normal normal bold 30px/40px Montserrat;
        letter-spacing: 2.7px;
        color: #00427A;
    }

    .cta {
        background-color: #046CC4;
        border-radius: 25px;
        font-family: normal normal bold 15px/15px Montserrat;
        letter-spacing: 1.62px;
        color: #FFFFFF;
        text-transform: initial;
        padding: 0 38px !important;
    }
</style>