<template lang="html">
  <CustomModal :render="true">
    <div class="modal-content">
      <q-stepper v-model="step" flat ref="stepper" color="primary" animated>
        <q-step :name="1" title="Ma situation" :done="step > 1">
          <div class="form-container-information">
            <div class="head-title">
              <p class="p-situation">
                Votre demande sera transmise à la faculté théologique évangélique de
                Montréal affiliée à ACADIA University
              </p>
              <p class="p-address">
                10710 avenue Hamelin Montréal, QC H2B 2G1, +1(514) 526-2003
              </p>
            </div>
            <div class="col-12 col-md-5">
              <div class="form-validate row">
                <div class="col" id="container-select">
                  <div class="form-radio-group">
                    <p class="p-text-form">Je suis :</p>
                    <q-option-group :options="options" type="radio" v-model="group" />
                  </div>
                  <br />
                  <div class="form-radio-group-two">
                    <p class="p-text-form-two">
                      Faites-vous une demande d’admission <br />
                      pour le certificat en relation d’aide (RCA) ?
                    </p>
                    <q-option-group
                      :options="options_two"
                      type="radio"
                      v-model="group_two"
                    />
                  </div>
                </div>
                <div class="col" id="container-condition">
                  <div class="form-condition">
                    <p class="p-text-condition">
                      <br />
                      1. Nous tenons à vous prévenir que la demande d’admission présente
                      des couts <br />
                      s’élevant à <strong> 75$ CAD</strong> pour l’étude de votre dossier.
                      Ce montant est non remboursable, <br />
                      peu importe l’issue de la décision.
                      <br />
                      2. Le candidat a <strong> 90 jours </strong> pour renvoyer toutes
                      les pièces administratives. Après ce délai, <br />
                      la demande alors « en suspens » sera annulée et il n’y aura pas de
                      remboursement des frais <br />
                      d’admission.
                      <br />
                      3. Nous vous encourageons à vous informer au préalable de votre
                      admissibilité au programme, <br />
                      en parcourant le <strong> <a>guide d’étude</a> </strong> ou en
                      contactant notre bureau des admissions :
                      <strong> <a>Cliquez-ici</a> </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-step>

        <q-step :name="2" title="Mes informations" :done="step > 2">
          <div class="col-lg-12 form-container-situation">
            <div class="col-12 col-md-5">
              <div class="form-validate row">
                <div class="col" id="container-personnel">
                  <div class="form-information-personnel">
                    <div class="p-title-information-personnel">
                      Vous êtes :
                      <p class="form-asterisk">*</p>
                    </div>
                    <q-option-group
                      :options="options_situations"
                      type="radio"
                      size="30px"
                      v-model="group"
                    />
                  </div>
                  <div class="form-information-adresse">
                    <p class="p-title-information-adresse">Votre adresse postale :</p>
                    <p class="form-asterisk-adresse">*</p>
                    <div class="form-input-adresse">
                      <q-input
                        class="adresse-postale"
                        rounded
                        outlined
                        v-model="text"
                        label="Adresse postale"
                      />
                    </div>
                    <div class="form-code-postale-etat">
                      <div class="col" id="code-postale-etat">
                        <q-input
                          class="code-postale"
                          rounded
                          outlined
                          v-model="text"
                          label="Code postal"
                        />
                        <q-input
                          class="etat"
                          rounded
                          outlined
                          v-model="text"
                          label="Etat"
                        />
                      </div>
                      <div class="col" id="ville-pays">
                        <q-input
                          class="ville"
                          rounded
                          outlined
                          v-model="text"
                          label="Ville"
                        />
                        <br />
                        <q-select
                          class="select-pays-residence"
                          rounded
                          outlined
                          v-model="model_pays"
                          :dense="dense"
                          :options="options_pays_residence"
                          label="Pays de résidence"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="form-information-professionnel">
                    <p class="p-title-information-professionnel">
                      Vos informations professionnelles :
                    </p>
                    <div class="col" id="container-professionnel">
                      <p class="form-asterisk-professionnel">*</p>
                      <q-select
                        class="select-pays-naissance"
                        rounded
                        outlined
                        v-model="model_pays_naissance"
                        :dense="dense"
                        :options="options_pays_naissance"
                        label="Pays de naissance"
                      />
                      <q-input
                        class="date-de-naissance"
                        rounded
                        outlined
                        label="Date de naissance"
                      />
                    </div>

                    <div class="form-input-adresse">
                      <q-input
                        class="adresse-mail"
                        rounded
                        outlined
                        v-model="text"
                        label="Adresse mail"
                      />
                    </div>
                    <div class="form" id="information-adresse-professionnel">
                      <div class="col">
                        <q-input
                          class="indicatif"
                          rounded
                          outlined
                          v-model="text"
                          label="Indicatif"
                        />
                        <q-input
                          class="telephone-mobile"
                          rounded
                          outlined
                          v-model="text"
                          label="Téléphone mobile"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          class="indicatif-domicile"
                          rounded
                          outlined
                          v-model="text"
                          label="Indicatif"
                        />
                        <q-input
                          class="telephone-domicile"
                          rounded
                          outlined
                          v-model="text"
                          label="Téléphone domicile"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col" id="container-personnel">
                  <div class="form-information-personnel">
                    <div class="p-title-information-personnel">
                      Vos informations professionnelles :
                      <p class="form-asterisk">*</p>
                    </div>
                    <q-option-group
                      :options="options_situations"
                      type="radio"
                      size="30px"
                      v-model="group"
                    />
                  </div>
                  <div class="form-information-adresse">
                    <p class="p-title-information-adresse">Votre adresse postale :</p>
                    <p class="form-asterisk-adresse">*</p>
                    <div class="form-input-adresse">
                      <q-input
                        class="adresse-postale"
                        rounded
                        outlined
                        v-model="text"
                        label="Adresse postale"
                      />
                    </div>
                    <div class="form-code-postale-etat">
                      <div class="col" id="code-postale-etat">
                        <q-input
                          class="code-postale"
                          rounded
                          outlined
                          v-model="text"
                          label="Code postal"
                        />
                        <q-input
                          class="etat"
                          rounded
                          outlined
                          v-model="text"
                          label="Etat"
                        />
                      </div>
                      <div class="col" id="ville-pays">
                        <q-input
                          class="ville"
                          rounded
                          outlined
                          v-model="text"
                          label="Ville"
                        />
                        <br />
                        <q-select
                          class="select-pays-residence"
                          rounded
                          outlined
                          v-model="model_pays"
                          :dense="dense"
                          :options="options_pays_residence"
                          label="Pays de résidence"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-step>

        <q-step :name="3" title="Mes programmes" :done="step > 3">
          Mes programmes
        </q-step>

        <q-step :name="4" title="Paiement"> Paiement </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <div class="form-btn-navigation">
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                no-caps
                :label="step === 4 ? 'Finish' : 'J\'ai bien compris'"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Précedent"
                class="q-ml-sm"
              />
            </div>
          </q-stepper-navigation>
          <br />
        </template>
      </q-stepper>
    </div>
  </CustomModal>
</template>

<script setup>
/*eslint-disable*/

import { ref } from 'vue';
import CustomModal from 'src/components/lib/CustomModal.vue';

defineProps({
  renderModal: Boolean,
});

const dense = ref(true);
const step = ref(1);
const group = ref(null);
const model_pays = ref(null);
const model_pays_naissance = ref(null);
const group_two = ref(null);
const options = [
  { label: 'Citoyen canadien ou résident au Quebec', value: 'citoyen' },
  {
    label: 'Etudiant(e) international(e) résident hors Canada',
    value: 'etudiant',
  },
];
const options_two = [
  { label: 'Oui', value: 'oui' },
  { label: 'Non', value: 'non' },
];

const options_situations = [
  { label: 'Citoyen(ne) Canadien(ne) (Québec) ', value: 'quebec' },
  { label: 'Citoyen(ne) Canadien(ne) (Hors Québec) ', value: 'hors_quebec' },
  { label: 'Résident(e) permanent(e)', value: 'resident' },
  {
    label: 'Étudiant(e) international(le) (ETUDI) sur place',
    value: 'etudiant_sur_place',
  },
  {
    label: 'Étudiant(e) international(le) (ETUDI) à distance',
    value: 'etudiant_a_distance',
  },
];

const options_pays_residence = [
  { label: 'Canada', value: 'canada' },
  { label: 'France', value: 'france' },
  { label: 'USA', value: 'usa' },
  { label: 'Allemagne', value: 'allemagne' },
];

const options_pays_naissance = [
  { label: 'Canada', value: 'canada' },
  { label: 'France', value: 'france' },
  { label: 'USA', value: 'usa' },
  { label: 'Allemagne', value: 'allemagne' },
];
</script>

<style lang="css">
/*Attribut for navigation*/
.q-stepper__header.row.items-stretch.justify-between.q-stepper__header--standard-labels {
  border: 1px solid white;
  background-color: #ededed;
  border-radius: 76px;
}

/* Attribut for icon*/
.q-stepper__dot.row.flex-center.q-stepper__line.relative-position {
  display: none;
}

/*Attribut for input*/
.q-field--outlined.q-field--rounded .q-field__control {
  height: 40px;
  width: 384px;
}

.select-pays-residence.q-field--dense .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.adresse-postale .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.code-postale .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.etat .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.ville .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.date-de-naissance .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.adresse-mail .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.indicatif .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.indicatif-domicile .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.telephone-mobile .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.telephone-domicile .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.modal-content {
  width: 80vw;
  height: 60vh;
  overflow: hidden;
}

#subscribe-title {
  margin: 25px;
}

.p-situation {
  text-align: center;
  font: normal normal normal 15px/25px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
}

.p-address {
  text-align: center;
  margin-top: -13px;
  font: normal normal normal 12px/25px Montserrat;
  letter-spacing: 1.08px;
  color: #707070;
}

.p-text-form {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: 13px;
  line-height: 30px;
  white-space: pre;
  color: #707070;
  opacity: 1;
}

.form-information-personnel {
  margin-top: 50px;
  margin-inline: 104px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
  opacity: 1;
}

.p-title-information-personnel {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: -2px;
  line-height: 27px;
  white-space: pre;
  color: #707070;
  opacity: 1;
}

.form-input-adresse {
  margin-bottom: 5px;
}

.form-code-postale-etat {
  margin-top: -8px;
}

.form-information-adresse {
  margin-top: 29px;
  margin-inline: 104px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
  opacity: 1;
}

.p-title-information-adresse {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: -2px;
  line-height: 27px;
  white-space: pre;
  color: #707070;
  opacity: 1;
}

.p-title-information-professionnel {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: -2px;
  line-height: 27px;
  white-space: pre;
  color: #707070;
  opacity: 1;
}

.p-text-form-two {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: 3px;
  line-height: 30px;
  white-space: pre;
  color: #707070;
  opacity: 1;
}

#container-condition {
  margin-left: -129px;
}

#container-professionnel {
  margin-bottom: 11px;
}

#code-postale-etat {
  margin-top: 18px;
  padding-bottom: 9px;
}

#information-adresse-professionnel {
  margin-bottom: 13px;
}

.form-condition {
  width: 100%;
  height: 289px;
  white-space: pre;
  background-color: #e4ecf5;
  border-radius: 15px;
}

.p-text-condition {
  letter-spacing: 1.35px;
  line-height: 30px;
  margin-left: 20px;
  color: #707070;
}

.form-radio-group {
  margin-inline: 104px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
  opacity: 1;
}

#container-personnel {
  margin-top: -49px;
}

.information-personnel {
  margin-top: 41px;
  margin-inline: 104px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
  opacity: 1;
}

.information-adresse {
  margin-top: 29px;
  margin-inline: 104px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
  opacity: 1;
}

#container-select {
  margin-left: -34px;
}

.form-radio-group-two {
  margin-inline: 104px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
  opacity: 1;
}

.btn-validation {
  border-radius: 53px;
  font: normal normal bold 16px/21px Montserrat;
  margin-inline: 543px;
  margin-top: 50px;
  letter-spacing: 1.62px;
  color: #ffffff;
}

.form-asterisk {
  color: red;
  font-weight: bold;
  margin-left: 103px;
  margin-top: -35px;
}

.form-asterisk-pays-naissance {
  color: red;
  font-weight: bold;
  margin-left: 315px;
  margin-top: -35px;
}

.form-asterisk-professionnel {
  color: red;
  font-weight: bold;
  margin-left: 348px;
  margin-top: -35px;
}

.form-asterisk-adresse {
  color: red;
  font-size: 15px;
  font-weight: bold;
  margin-left: 205px;
  margin-top: -37px;
}

.btn-confirm-situation {
  border-radius: 53px;
  font: normal normal bold 16px/21px Montserrat;
  margin-inline: 543px;
  margin-top: 50px;
  letter-spacing: 1.62px;
  color: #ffffff;
}

.code-postale {
  font-size: 10px;
  width: 132px;
  height: 34px;
  margin-left: 0px;
  letter-spacing: 1.35px;
  color: #707070;
}

.etat {
  font-size: 10px;
  width: 245px;
  height: 34px;
  margin-top: -34px;
  margin-left: 140px;
  letter-spacing: 1.35px;
  color: #707070;
}

.indicatif {
  font-size: 10px;
  width: 132px;
  height: 34px;
  margin-left: 0px;
  letter-spacing: 1.35px;
  color: #707070;
}

.indicatif-domicile {
  font-size: 10px;
  width: 132px;
  height: 34px;
  margin-top: 11px;
  margin-left: 0px;
  letter-spacing: 1.35px;
  color: #707070;
}

.telephone-mobile {
  font-size: 10px;
  width: 245px;
  height: 34px;
  margin-top: -34px;
  margin-left: 140px;
  letter-spacing: 1.35px;
  color: #707070;
}

.telephone-domicile {
  font-size: 10px;
  width: 245px;
  height: 34px;
  margin-top: -34px;
  margin-left: 140px;
  letter-spacing: 1.35px;
  color: #707070;
}

#ville-pays {
  margin-top: 6px;
}

.ville {
  font-size: 10px;
  width: 132px;
  height: 34px;
  margin-left: 0px;
  letter-spacing: 1.35px;
  color: #707070;
}

.date-de-naissance {
  margin-top: 4px;
  width: 200px;
  height: 34px;
  margin-left: 0px;
  letter-spacing: 1.35px;
  color: #707070;
}

.select-pays-residence {
  margin-top: -13px;
}

.select-pays-naissance {
  /* position: absolute; */
  top: 412px;
}

.form-btn-navigation {
  position: absolute;
  top: 547px;
  left: 586px;
}
</style>
