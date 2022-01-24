<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <router-view/>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'BlankLayout'
})
</script>