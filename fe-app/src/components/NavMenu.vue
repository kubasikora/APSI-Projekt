<template>
  <v-list dense>
    <v-img src="@/assets/logo.png" alt="logo" class="logo" />
    <v-divider></v-divider>
    <v-list-item link>
      <v-list-item-action>
         <v-icon>mdi-home</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item link>
      <v-list-item-action>
        <v-icon>mdi-mail</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Kontakt</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item link :to="'/'">
      <v-list-item-action>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Wyloguj</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavMenu extends Vue {

};
</script>

<style scoped>
.logo {
    margin: 2rem auto;
    max-height: 200px;
    max-width: 200px;
}
</style>