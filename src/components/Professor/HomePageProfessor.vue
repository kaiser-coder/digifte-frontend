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
          <div class="menu">
            <q-item  active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="home"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Accueil</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to ="/home-professor/create-course" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="book"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Mes cours</q-item-label>
              </q-item-section>
            </q-item>

            <q-item active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="school"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Mes élèves</q-item-label>
              </q-item-section>
            </q-item>

            <q-item active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="book"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Mes ressources</q-item-label>
              </q-item-section>
            </q-item>

          </div>
        </q-list>
      </q-drawer>

      <!-- Content -->
      <q-page-container>
        <router-view/> 
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>

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
      AccountIcon
    },
    setup() {
      return {
        dialog: ref(false),
        drawer: ref(false),
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
  margin-top: 10em;
}

</style>
