<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated> 
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          DigiFTE
        </q-toolbar-title>

        <mail-icon /> &nbsp; &nbsp;
        <forum-icon /> &nbsp; &nbsp;
        <account-icon/>
        
        <q-icon name="account" class="account">
          <q-menu>
            <q-list dense style="min-width: 160px">
              <q-item clickable v-close-popup>
                <account-icon/> &nbsp; <q-item-section> Mon profil</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <logout-icon/> &nbsp; 
                <q-item-section @click="dialog = true">
                  Se déconnecter
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon> 
      </q-toolbar>
    </q-header>

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section class="row items-center q-gutter-sm">
          <p>Souhaitez-vous vraiment vous déconnecter ?</p>
        </q-card-section>
        <div class="buttonLogoutConfirm" >
          <q-btn @click="logout" size="10px" color="primary" label="Oui" /> &nbsp; 
          <q-btn size="10px" style="background: #212121;color:white" label="Non" v-close-popup /> <br> <br>
        </div>
      </q-card>
    </q-dialog> 

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      class="bg-grey-10"
    >
      <q-list>
          <q-item-label header class="titleLabel"> ESPACE &nbsp; ETUDIANT </q-item-label>
            <div class="menu">
              <q-item to="/home-student/student-subscribe" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="book"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Mon cours</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/home-student/student-agenda" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="today"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Mon agenda</q-item-label>
                </q-item-section>
              </q-item>
            </div>
        </q-list>
      </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

import ForumIcon from 'vue-material-design-icons/Forum.vue';
import MailIcon from 'vue-material-design-icons/Mail.vue';
import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import AccountIcon from 'vue-material-design-icons/Account.vue';


export default defineComponent({
  name: 'HomePageStudent',

  components: {
    ForumIcon,
    MailIcon,
    LogoutIcon,
    AccountIcon
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      dialog: ref(false),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
  methods: {
    logout() {
      this.$q.sessionStorage.clear();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.$router.push('/signin');
    }
  }
})
</script>

<style scoped>
  .account {
    cursor: pointer;
  }

  .buttonLogoutConfirm {
    margin-left: 5.5rem;
  }

  .titleLabel {
    font-weight: bold;
  }

  .menu {
    color: rgb(255, 255, 255);
    margin-top: 10em;
  }
</style>