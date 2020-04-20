<template>
  <v-card>
    <v-form>
      <v-card-title>Moje dane</v-card-title>
      <v-divider />
      <v-card-text>
        <v-text-field label="Imię" color="primary"></v-text-field>
        <v-text-field label="Nazwisko" color="primary"></v-text-field>
        <v-text-field label="Adres" color="primary" loading></v-text-field>
        <v-text-field label="Miasto" color="primary" loading></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Anuluj</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success">Zapisz</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";

@Component
export default class AccountDataPanel extends Vue {}
</script>

<style scoped>
</style>