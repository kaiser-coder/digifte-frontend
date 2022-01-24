<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar class="bg-red-10">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="drawer = !drawer"
          />
          <q-toolbar-title>DigiFTE</q-toolbar-title>

          <mail-icon /> &nbsp; &nbsp; <forum-icon /> &nbsp; &nbsp;
          <account-icon />

          <q-icon name="account" class="account">
            <q-menu>
              <q-list dense style="min-width: 160px">
                <q-item clickable v-close-popup>
                  <account-icon /> &nbsp;
                  <q-item-section> Mon profil</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <logout-icon /> &nbsp;
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
          <div class="buttonLogoutConfirm">
            <q-btn @click="logout" size="10px" style="background: #b71c1c;color:white" label="Oui" />
              &nbsp;
            <q-btn size="10px" style="background: #212121;color:white" label="Non" v-close-popup />
            <br />
            <br />
          </div>
        </q-card>
      </q-dialog>

      <q-drawer
        v-model="drawer"
        show-if-above
        bordered
        :width="250"
        class="bg-grey-10"
      >
        <q-list>
          <q-item-label header class="titleLabel"> ESPACE &nbsp; PROFESSEUR </q-item-label>
            <div>
              <template v-for="(menuItem, index) in menuList" :key="index">
                <q-item class="menu" clickable :active="menuItem.label === 'Outbox'" v-ripple>
                  <q-item-section avatar>
                    <q-icon :name="menuItem.icon" />
                  </q-item-section>
                  <q-item-section>
                    {{ menuItem.label }}
                  </q-item-section>
                </q-item>
              </template>
            </div>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">

const menuList = [
  {
    icon: 'today',
    label: 'Mon calendrier'
  },
  {
    icon: 'book',
    label: 'Mes cours'
  },
  {
    icon: 'school',
    label: 'Mes élèves'
  },
  {
    icon: 'resources',
    label: 'Mes ressources'
  }
]

import { defineComponent, ref } from 'vue';

import ForumIcon from 'vue-material-design-icons/Forum.vue';
import MailIcon from 'vue-material-design-icons/Mail.vue';
import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import AccountIcon from 'vue-material-design-icons/Account.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    ForumIcon,
    MailIcon,
    LogoutIcon,
    AccountIcon,
  },
  setup() {
    return {
      dialog: ref(false),
      drawer: ref(false),
      menuList,
    };
  },
  methods: {
    logout() {
      /*eslint-disable*/
      this.$q.sessionStorage.clear();
      this.$router.push('/signin');
    },
  },
});
</script>

<style scoped>
.account {
  cursor: pointer;
}

.buttonLogoutConfirm {
  margin-left: 5.5rem;
}

.title {
  color: rgb(95, 95, 104);
  font-weight: bold;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}

.titleLabel {
  font-weight: bold;
}

.menu {
  color: rgb(255, 255, 255);
  top: 150px;
}
</style>
