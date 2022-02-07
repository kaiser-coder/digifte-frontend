<template>
  <q-drawer
      :modelValue="open"
      show-if-above
      bordered
      :width="250"
      class="bg-grey-10"
    >
      <q-list>
        <q-item-label header class="titleLabel">{{menu.title}}</q-item-label>
      
        <div class="menu">
          <q-item 
            :to="item.link" 
            active-class="q-item-no-link-highlighting" 
            v-for="item, key in menu.items" :key="key"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.label}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer> 
</template>

<script setup lang="ts">
  import {MenuType} from './models';

  /*eslint-disable*/
  const props = defineProps({
    open: Boolean,
    // @ts-ignore
    menu: MenuType
  })

</script>

<style scoped>
  .titleLabel {
    font-weight: bold;
  }

  .menu {
    color: rgb(255, 255, 255);
    margin-top: 10em;
  }
</style>