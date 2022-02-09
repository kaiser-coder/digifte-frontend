<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <router-view/>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
    import {onBeforeMount} from 'vue';
    import { useRouter } from 'vue-router';
    import { useQuasar } from 'quasar';

    const $router = useRouter();
    const $q = useQuasar();

    onBeforeMount(() => {
        /*eslint-disable*/
       if($q.sessionStorage.getItem('current_user')) {
           $router.push('/app/home')
       }
    })
</script>