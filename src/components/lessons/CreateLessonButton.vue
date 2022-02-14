<template>
    <q-btn color="secondary" @click="fixed = true" label="Créer leçon" /> <br> <br>

    <!-- CRÉATION LEÇON -->
    <q-dialog v-model="fixed">
        <q-card>
            <q-card-section>
                <div class="text-h6">Création d'une leçon</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
                <form @submit.prevent="handleSubmitFormLesson">  
                    <q-input
                        outlined
                        label="Nom du leçon"
                        id="name"
                        v-model="lessonForm.name"
                        stack-label
                        required
                    /> <br> 

                    <q-input outlined v-model="lessonForm.date" label="Date du cours">
                        <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                >
                                    <q-date
                                        v-model="lessonForm.date"
                                        mask="YYYY-MM-DD"
                                        color="negative"
                                    >
                                        <div class="row items-center justify-end">
                                            <q-btn
                                                v-close-popup
                                                label="Close"
                                                color="#b71c1c"
                                                flat
                                            />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input> <br>

                    <q-input outlined v-model="lessonForm.time" label="Heure">
                        <template v-slot:prepend>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                >
                                    <q-time
                                    v-model="lessonForm.time"
                                    mask="HH:mm:ss"
                                    format24h
                                    color="negative"
                                    >
                                    <div class="row items-center justify-end">
                                        <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="#b71c1c"
                                        flat
                                        />
                                    </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input> <br>

                    <q-btn
                        size="18px"
                        type="submit"
                        style="
                            background: #7e807c;
                            color: white;
                            width: 330px;
                            margin-left: 0.5rem;
                        "
                        label="Créer"
                        v-close-popup
                    />      
                </form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup>
    import { ref } from 'vue';

    const emits = defineEmits(['onSubmitLesson']);
    const lessonForm = ref({});


    // UI States
    const fixed = ref(false);

    function handleSubmitFormLesson() {
        emits('onSubmitLesson', lessonForm.value)
    }


</script>