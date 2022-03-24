<template lang="">
  <div>
    <div class="chip"></div>
    <br />
    <TheCalendar />
    <CustomModal :render="true">
      <div class="row q-gutter-md" id="form-msg">
        <div class="col-4 form-head">
          <div class="title"> Mon message pour l'école</div>
          <div class="red-border"></div>
        </div>
        <form class="col-4 form">
          <q-select
            rounded
            outlined
            v-model="model"
            :options="options"
            label="Choisissez votre sujet"
          />
          <q-input rounded outlined label="Objet" />
          <q-input type="textarea" outlined v-model="text" label="Message" />
          <q-file
            class="files"
            v-model="files"
            label="Ajouter un pièce-jointe"
            filled
            multiple
          />
          <q-radio
            class="form-radio"
            v-model="shape"
            label="Recevoir une copie par mail"
          />

          <q-btn
            class="btn-send-msg"
            type="submit"
            no-caps
            text-color="white"
            rounded
            unelevated
            label="Envoyer"
          />
        </form>
      </div>
    </CustomModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import TheCalendar from 'src/components/Agenda/TheCalendar.vue';
import CustomModal from 'src/components/lib/CustomModal.vue';

const model = ref(null);
const shape = ref(null);
const files = ref(null);

const options = [
  'Les psaumes',
  'Corinthiens',
  'Livres de Mathieu',
  'Histoire de David',
  'Apocalypse',
];
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

.form-radio {
  font-family: normal normal normal 12px/70px Montserrat;
  letter-spacing: 1.08px;
  color: #3b3738;
  opacity: 1;
}

#form-msg {
  width: 60vw;
}

.btn-send-msg {
  width: 150px;
  float: right;
  background: #00427a 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 16px;
  opacity: 1;
}

.red-border {
  background: #c41526 0% 0% no-repeat padding-box;
  border-radius: 11px;
  width: 15px;
  height: 120px;
  margin-inline: 20px;
}

.form label {
  margin-bottom: 20px;
}

.title {
  text-align: right;
  font: normal normal bold 33px /25px Montserrat;
  letter-spacing: 1.8px;
  color: #00427a;
  line-height: 1.2em;
  margin-right: 30px;
}

.form-head {
    display: flex;
    flex-direction: row;
    padding-top: 70px;
}
</style>
