<template>
   <q-btn color="primary" @click="showCourseForm" label="Nouveau cours" /> <br />
   <br />

  <q-dialog v-model="small">
   <q-card style="width: 300px">
      <q-card-section>
         <div class="text-h6">Création cours</div>
      </q-card-section>

      <q-separator /> <br />

      <q-card-section class="q-pt-none">
         <form @submit.prevent="handleSubmit">
         <q-input
            outlined
            label="Titre"
            id="title"
            v-model="form.title"
            stack-label
            :dense="false"
            required
         />
         <br />
         <q-input
            outlined
            type="description"
            label="Description"
            id="description"
            v-model="form.description"
            stack-label
            :dense="false"
            required
         />
         <br />
         <q-btn
            size="18px"
            type="submit"
            style="
               background: #7e807c;
               color: white;
               width: 250px;
               margin-left: 0.5rem;
            "
            label="Enregistrer"
         />
         </form>
      </q-card-section>
   </q-card>
   </q-dialog>
</template>

<script setup>
   import { ref } from 'vue'

   const emit = defineEmits(['onSubmitForm']);
   
   /*UI states*/
   const small = ref(false);

   /*States*/
   const form = ref({});

   function handleSubmit() {
      emit('onSubmitForm', form.value);
      small.value = false
   }

   function showCourseForm() {
      small.value = true
      console.log('New course button ', small.value)
  }

</script>