<template>
  <v-app id="helpado">
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style>
html, body {
  font-family: "Roboto", sans-serif;
}
</style>