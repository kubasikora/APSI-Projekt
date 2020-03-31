<template>
  <v-footer absolute inset :elevation="24" color="primary">
    <span class="white--text">&copy; 2020 Architektura i Projektowanie Systemów Informatycznych</span>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {

};
</script>

