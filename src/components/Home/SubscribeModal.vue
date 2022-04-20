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
                      v-model="group_situations"
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
                        v-model="adresse_postale"
                        label="Adresse postale"
                      />
                    </div>
                    <div class="form-code-postale-etat">
                      <div class="col" id="code-postale-etat">
                        <q-input
                          class="code-postale"
                          rounded
                          outlined
                          v-model="code_postale"
                          label="Code postal"
                        />
                        <q-input
                          class="etat"
                          rounded
                          outlined
                          v-model="etat"
                          label="Etat"
                        />
                      </div>
                      <div class="col" id="ville-pays">
                        <q-input
                          class="ville"
                          rounded
                          outlined
                          v-model="ville"
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
                        v-model="model_date"
                      >
                        <q-icon class="icon-event" name="event">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <div class="q-pa-md">
                              <q-date v-model="model_date" />
                            </div>
                          </q-popup-proxy>
                        </q-icon>
                      </q-input>
                    </div>

                    <div class="form-input-adresse">
                      <q-input
                        class="adresse-mail"
                        rounded
                        outlined
                        v-model="adresse_mail"
                        label="Adresse mail"
                      />
                    </div>
                    <div class="form" id="information-adresse-professionnel">
                      <div class="col">
                        <q-input
                          class="indicatif"
                          rounded
                          outlined
                          v-model="indicatif"
                          label="Indicatif"
                        />
                        <q-input
                          class="telephone-mobile"
                          rounded
                          outlined
                          v-model="telephone_mobile"
                          label="Téléphone mobile"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          class="indicatif-domicile"
                          rounded
                          outlined
                          v-model="indicatif_domicile"
                          label="Indicatif"
                        />
                        <q-input
                          class="telephone-domicile"
                          rounded
                          outlined
                          v-model="telephone_domicile"
                          label="Téléphone domicile"
                        />
                        <q-input
                          class="code-etudiant"
                          rounded
                          outlined
                          v-model="code_etudiant"
                          label="Code étudiant permanent"
                        />
                      </div>
                      <div class="form-second-information-professionnel">
                        <p class="p-title-second-information-professionnel">
                          Vos informations professionnelles :
                        </p>
                        <q-option-group
                          :options="options_second_situations"
                          type="radio"
                          size="30px"
                          v-model="group"
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
          <div class="row">
            <div class="col">
              <div class="form-programmes">
                <p class="p-title-programme">Vos informations professionnelles :</p>
                <q-option-group
                  :options="options_programmes_etudes"
                  type="radio"
                  size="30px"
                  v-model="group_programme_etude"
                />
              </div>
              <div class="form-options-programmes">
                <p class="p-title-programme">Programmes souhaités :</p>
                <q-option-group
                  :options="options_programmes_souhaités"
                  type="radio"
                  size="30px"
                  v-model="group_programme_souhaités"
                />
              </div>
            </div>
            <div class="col">
              <div class="form-options-rythme-etude">
                <p class="p-title-rythme-etude">Mon rythme d'étude :</p>
                <q-option-group
                  :options="options_rythme_etude"
                  type="radio"
                  size="30px"
                  v-model="group_rythme_etude"
                />
              </div>
              <div class="form-options-etudes">
                <p class="p-title-option-etude">
                  Si vous désirez suivre vos études à distance, <br />
                  merci de bien vouloir choisir l’option vous <br />
                  correspondant :
                </p>
                <q-option-group
                  :options="options_etudes"
                  type="radio"
                  size="30px"
                  v-model="group_etudes"
                />
              </div>
            </div>
            <div class="col">
              <div class="form-faculté">
                <p class="p-title-faculté">Comment avez-vous connu la Faculté ?</p>
                <q-option-group
                  :options="options_facultés"
                  type="radio"
                  size="30px"
                  v-model="group_facultés"
                />
              </div>
            </div>
          </div>
        </q-step>

        <q-step :name="4" title="Paiement">
          <div class="row">
            <div class="col">
              <div class="form-total-price">
                <p class="p-total-price">TOTAL</p>
                <p class="p-price">$75,00CAN</p>
              </div>
              <div class="form-information-bancaire">
                <p class="p-title-informations-bancaires">Informations bancaires</p>
                <div class="form-input-carte-bancaire">
                  <q-input
                    class="carte-bancaire"
                    rounded
                    outlined
                    v-model="carte_bancaire"
                    label="Nom du propriétaire de la carte"
                  />
                  <q-input
                    class="numero-carte"
                    rounded
                    outlined
                    v-model="numero_carte"
                    label="Numéro de la carte"
                  />
                  <div class="form-input-date-paiement">
                    <q-input
                      class="date-expiration"
                      rounded
                      outlined
                      v-model="model_date"
                      label="Date d'éxpiration"
                    >
                      <q-icon class="icon-event" name="event">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <div class="q-pa-md">
                            <q-date v-model="model_date" />
                          </div>
                        </q-popup-proxy>
                      </q-icon>
                    </q-input>

                    <q-input class="cvc" rounded outlined v-model="cvc" label="CVC" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="form-conditions-bancaires">
                <q-option-group
                  class="conditions-bancaires"
                  :options="options_conditions_bancaires"
                  type="radio"
                  size="30px"
                  v-model="group_conditions_bancaires"
                />
              </div>
            </div>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="row">
            <div class="col-lg-2 text-center q-ml-auto">
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                :label="stepperLabel"
                class="btn-next"
                unelevated
                rounded
              />
              <q-btn
                v-if="step > 1"
                flat
                no-caps
                color="primary"
                @click="$refs.stepper.previous()"
                label="Etape précedente"
                class="btn-prev"
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

import { ref, computed, defineProps } from 'vue';
import CustomModal from 'src/components/lib/CustomModal.vue';

defineProps({
  renderModal: Boolean,
});

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const fullDay = `${mm}/${dd}/${yyyy}`;

const model_date = ref(fullDay);

const dense = ref(true);

const step = ref(1);
const stepperLabel = computed(() => {
  if (step.value === 1) {
    return "J'ai bien compris";
  } else if (step.value === 2 || step.value === 3) {
    return 'Etape suivante';
  } else {
    return 'Envoyer';
  }
});

const adresse_postale = ref('');
const code_postale = ref('');
const ville = ref('');
const etat = ref('');
const adresse_mail = ref('');
const indicatif = ref('');
const telephone_mobile = ref('');
const indicatif_domicile = ref('');
const telephone_domicile = ref('');
const code_etudiant = ref('');
const carte_bancaire = ref('');
const numero_carte = ref('');
const date_expiration = ref('');
const cvc = ref('');

const group = ref(null);
const group_two = ref(null);
const group_programme_etude = ref(null);
const group_programme_souhaités = ref(null);
const group_situations = ref(null);
const group_rythme_etude = ref(null);
const group_facultés = ref(null);
const group_etudes = ref(null);
const group_conditions_bancaires = ref(null);
const model_pays = ref(null);
const model_pays_naissance = ref(null);

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

const options_second_situations = [
  { label: 'Visa étudiant temporaire', value: 'visa' },
  { label: 'Résident permanent', value: 'resident_permanent' },
  { label: 'Citoyen(ne) Canadien(ne) ', value: 'citoyen_canadien' },
  {
    label: 'Étudiant à distance RESIDENT à l’étranger',
    value: 'etudiant_à_l_etranger',
  },
];

const options_programmes_etudes = [
  { label: 'Niveau secondaire ou inférieur', value: 'secondaire_inferieur' },
  { label: 'Niveau collégial ou universitaire ', value: 'collegial_universitaire' },
  {
    label: 'Niveau collégial/universitaire anglophone',
    value: 'universitaire_collegial',
  },
];

const options_programmes_souhaités = [
  { label: 'Certificat d’étude biblique (CEB)', value: 'ceb' },
  { label: 'Certificat en relation d’aide (CRA)', value: 'cra' },
  { label: 'Baccalauréat en théologie (BTH)', value: 'bth' },
  { label: 'Maitrise en divinité (MDIV)', value: 'mdiv' },
  { label: 'Maitrise en théologie (MTH) ', value: 'mth' },
  { label: 'Maitrise en théologie pratique (MTHP) ', value: 'mthp' },
  { label: 'Maitrise en Arts (traduction de la bible)', value: 'traduction_bible' },
  { label: 'Maitrise en Arts (ma théologie) ', value: 'collegial_universitaire' },
  { label: ' Etudiant libre 1er cycle', value: 'premier_cycle' },
  { label: 'Etudiant libre 2eme cycle', value: 'deuxieme_cycle' },
];

const options_rythme_etude = [
  { label: 'Temps plein (4 cours et plus)', value: 'temps_plein' },
  { label: 'Temps partiel (3 cours ou moins)', value: 'temps_partiel' },
];

const options_etudes = [
  {
    label: 'Etudiant canadien (ou RP) à distance vivant au Québec',
    value: 'rp_quebec',
  },
  {
    label: 'Etudiant canadien (ou RP) à distance vivant au Canada hors Québec',
    value: 'rp_canada',
  },
  {
    label: 'Etudiant étranger à distance vivant au Canada',
    value: 'etudiant_distance_canada',
  },
  {
    label: 'Etudiant étranger à distance vivant au Québec',
    value: 'etudiant_distance_quebec',
  },
  {
    label: ' Etudiant étranger à distance vivant hors Canada',
    value: 'etudiant_distance_hors_canada',
  },
];

const options_pays_residence = [
  { label: 'Canada', value: 'canada' },
  { label: 'France', value: 'france' },
  { label: 'USA', value: 'usa' },
  { label: 'Allemagne', value: 'allemagne' },
];

const options_facultés = [
  { label: 'Par notre site internet', value: 'site_internet' },
  { label: 'Par votre église', value: 'eglise' },
  { label: 'Par une tierce personne ', value: 'tierce_personne' },
  { label: 'Par notre plateforme Teachable', value: 'plateforme_teachable' },
  { label: 'Par notre Facebook', value: 'facebook' },
  { label: 'Par un courriel de publicité', value: 'courriel_publicité' },
];

const options_conditions_bancaires = [
  {
    label:
      'J’accepte les conditions générales de la Faculté de Théologie Évangélique affiliée Acadia University mentionnées dans le guide des études et j’ai compris que les 75$ de frais d’admission sont non remboursables ',
    value: 'conditions_generales',
  },
  {
    label:
      'J’accepte le délai de 90 jours qui m’est donné pour envoyer toutes les pièces administratives. Après ce délai, la demande alors « en suspens » sera annulée et iln’y aura pas de remboursement des frais d’admission.',
    value: 'delai',
  },
];

const options_pays_naissance = [
  { label: 'Canada', value: 'canada' },
  { label: 'France', value: 'france' },
  { label: 'USA', value: 'usa' },
  { label: 'Allemagne', value: 'allemagne' },
];
</script>

<style lang="css">
.btn-next,
.btn-prev {
  width: 256px;
  letter-spacing: 1.62px;
}

.btn-prev,
.btn-prev:hover {
  background-color: transprent !important;
}

/*ATTRIBUT CUSTOM QUASAR */
/* For navigation*/
.q-stepper__header.row.items-stretch.justify-between.q-stepper__header--standard-labels {
  border: 1px solid white;
  background-color: #ededed;
  height: 50px;
  border-radius: 76px;
}

/*Menu navigation*/
.q-stepper__label.q-stepper__line.relative-position {
  margin-top: -23px;
}

/* For icon*/
.q-stepper__dot.row.flex-center.q-stepper__line.relative-position {
  display: none;
}

/*For radio */
.conditions-bancaires .q-radio__label.q-anchor--skip {
  margin-top: 29px;
}

/*For asterisk  */
.conditions-bancaires .q-radio__label.q-anchor--skip:after {
  content: '*';
  font: normal normal bold 18px/40px Montserrat;
  color: #c41526;
}

/*For input*/
.q-field--outlined.q-field--rounded .q-field__control {
  height: 40px;
  width: 384px;
}

/*For line in navigation*/
.q-stepper--horizontal .q-stepper__label:after {
  display: none;
}

/*For radio position */
.form-conditions-bancaires
  /* .q-radio.cursor-pointer.no-outline.row.inline.no-wrap.items-center */
  .q-radio__inner.relative-position.q-radio__inner--falsy {
  margin-top: -40px;
}

/*For radio position margin  */
.form-conditions-bancaires
  .q-radio.cursor-pointer.no-outline.row.inline.no-wrap.items-center {
  margin-left: 16px;
}

/*For size label in menu on information */
#container-professionnel
  .container-professionnel
  .q-field__control-container.col.relative-position.row.no-wrap.q-anchor--skip {
  font-size: 13px;
}

/*For size icon on input date birthday*/
#container-professionnel .q-icon.notranslate.material-icons.icon-event {
  top: 10px;
  font-size: 21px;
  color: #707070;
}

/*For size icon on menu paiement*/
.date-expiration .q-icon.notranslate.material-icons.icon-event {
  top: 10px;
  font-size: 21px;
  color: #707070;
}

.select-pays-residence.q-field--dense .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.carte-bancaire .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.date-expiration .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.cvc .q-field__label {
  top: 10px !important;
  font-size: 13px !important;
}

.numero-carte .q-field__label {
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

.code-etudiant .q-field__label {
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
  letter-spacing: 0.35px;
  color: #707070;
  opacity: 1;
}

.form-second-information-professionnel {
  margin-top: 21px;
  margin-inline: 5px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 0.35px;
  color: #707070;
}

.form-programmes {
  margin-inline: 5px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 0.35px;
  color: #707070;
}

.form-options-rythme-etude {
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 0.35px;
  color: #707070;
}

.form-options-programmes {
  margin-top: 25px;
  margin-inline: 5px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 0.35px;
  color: #707070;
}

.form-options-etudes {
  margin-top: 54px;
  margin-inline: 5px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 0.35px;
  color: #707070;
}

.form-faculté {
  margin-top: 0px;
  margin-inline: 67px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 0.35px;
  color: #707070;
}

.p-title-information-personnel {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: -2px;
  line-height: 27px;
  white-space: pre;
  color: #707070;
}

.p-title-second-information-professionnel {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: -2px;
  line-height: 27px;
  white-space: pre;
  color: #707070;
}

.p-title-programme {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  line-height: 27px;
  color: #707070;
}

.p-title-programme {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  line-height: 27px;
  color: #707070;
}

.p-title-option-etude {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  line-height: 27px;
  color: #707070;
}

.p-title-rythme-etude {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  line-height: 27px;
  color: #707070;
}

.p-title-faculté {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  line-height: 27px;
  color: #707070;
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
}

.p-title-information-adresse {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: -2px;
  line-height: 27px;
  white-space: pre;
  color: #707070;
}

.p-title-information-professionnel {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: -2px;
  line-height: 27px;
  white-space: pre;
  color: #707070;
}

.p-text-form-two {
  font: normal normal bold 15px/70px Montserrat;
  letter-spacing: 1.35px;
  margin-bottom: 3px;
  margin-left: 3px;
  line-height: 30px;
  white-space: pre;
  color: #707070;
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
}

.information-adresse {
  margin-top: 29px;
  margin-inline: 104px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
}

#container-select {
  margin-left: -34px;
}

.form-radio-group-two {
  margin-inline: 104px;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 1.35px;
  color: #707070;
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
  font: normal normal bold 18px/40px Montserrat;
  color: #c41526;
  margin-left: 103px;
  margin-top: -35px;
}

.form-asterisk-pays-naissance {
  font: normal normal bold 18px/40px Montserrat;
  color: #c41526;
  margin-left: 315px;
  margin-top: -35px;
}

.form-asterisk-professionnel {
  margin-left: 316px;
  margin-top: -35px;
  font: normal normal bold 18px/40px Montserrat;
  color: #c41526;
}

.form-asterisk-adresse {
  font-size: 15px;
  font: normal normal bold 18px/40px Montserrat;
  color: #c41526;
  margin-left: 205px;
  margin-top: -37px;
}

.form-asterisk-first-condition {
  font-size: 15px;
  font: normal normal bold 18px/40px Montserrat;
  color: #c41526;
  margin-left: 129px;
  margin-top: -37px;
}

.form-asterisk-condition {
  font-size: 15px;
  font: normal normal bold 18px/40px Montserrat;
  color: #c41526;
  margin-left: 129px;
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

.code-etudiant {
  font-size: 10px;
  width: 400px;
  margin-top: 13px;
  height: 34px;
  margin-left: 0px;
  letter-spacing: 1.35px;
  color: #707070;
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
  margin-top: 6px;
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
  top: 412px;
}

/*STYLE FOR PAIEMENT */
.form-total-price {
  display: flex;
  width: 317px;
  height: 50px;
  background-color: #7b93af;
}

.p-total-price {
  color: white;
  margin-left: 39px;
  font: normal normal bold 24px/51px Montserrat;
  letter-spacing: 1.8px;
}

.p-price {
  font: normal normal bold 19px/26px Montserrat;
  margin-left: 247px;
  margin-top: 10px;
  letter-spacing: 1.8px;
  color: #7b93af;
}

.form-information-bancaire {
  width: 443px;
  height: 250px;
  margin-top: 65px;
  border-radius: 15px;
  background-color: #ededed;
}

.p-title-informations-bancaires {
  text-align: center;
  font: normal normal bold 18px/70px Montserrat;
  letter-spacing: 1.8px;
  color: #707070;
}

.form-input-carte-bancaire {
  margin-inline: 78px;
}

.form-input-date-paiement {
  display: flex;
}

.numero-carte {
  margin-top: 5px;
  background-color: white;
  border-radius: 25px;
}

.date-expiration {
  margin-top: 5px;
  background-color: white;
  width: 150px;
  border-radius: 25px;
}

.cvc {
  margin-top: 5px;
  background-color: white;
  width: 133px;
  margin-left: 6px;
  border-radius: 25px;
}

.carte-bancaire {
  background-color: white;
  border-radius: 25px;
}

.form-conditions-bancaires {
  width: 100%;
  height: 261px;
  margin-top: 109px;
  border-radius: 15px;
  background-color: #e4ecf5;
  font: normal normal normal 12px/30px Montserrat;
  letter-spacing: 0.35px;
  margin-inline: 5px;
  color: #707070;
}

.conditions-bancaires {
  margin-top: 28px;
}
</style>
