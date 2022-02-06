<template>
  This is sidebar
  <q-drawer
      model-value="open"
      show-if-above
      bordered
      :width="250"
      class="bg-grey-10"
    >
      <q-list>
        <q-item-label header class="titleUserRole">ADMINISTRATEUR</q-item-label>
      
        <div class="menu">
          <q-item to="/home-admnistrator/student-follow" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="lesson"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Suivi des élèves</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/home-admnistrator/registration-management" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="video"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Suivi des inscriptions</q-item-label>
            </q-item-section>
          </q-item>

          <q-item  active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="video"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Ajout des docs</q-item-label>
            </q-item-section>
          </q-item>

          <q-item  active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="video"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Les cours</q-item-label>
            </q-item-section>
          </q-item>

          <q-item  active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="video"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Gestion des professeurs et assistants</q-item-label>
            </q-item-section>
          </q-item>
        
          <q-item  active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="video"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Gestion des plannings académique</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer> 
</template>

<script setup="props">
  /*eslint-disable*/
  const { open } = props
</script>
