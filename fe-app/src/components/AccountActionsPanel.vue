<template>
  <v-card class="action-card">
    <v-form>
      <v-card-title>Akcje</v-card-title>
      <v-divider />
      <v-row>
        <v-col cols="6">
          <h3 class="action-label">Zmień hasło:</h3>
        </v-col>
        <v-col cols="6">
          <v-spacer />
          <v-btn color="success" class="alert-button button-col">Zmień</v-btn>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col cols="6">
          <h3 class="action-label">Usuń konto:</h3>
        </v-col>
        <v-col cols="6">
          <v-spacer />
          <v-btn color="#f00" class="alert-button button-col">Usuń</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";

@Component
export default class AccountActionsPanel extends Vue {}
</script>

<style scoped>
.alert-button {
  color: white;
}

.action-label {
  margin-left: 1rem;
}

.action-card {
  margin: 2rem 0;
}

.button-col {
  float: right;
  margin: 0 10px;
}
</style>