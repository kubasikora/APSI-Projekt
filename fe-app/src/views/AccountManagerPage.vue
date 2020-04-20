<template>
  <BaselineLayout title="Helpado">
    <v-container>
      <v-row>
        <v-col>
          <h1>Zarządzanie kontem</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="10">
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

          <v-card class="action-card">
            <v-form>
              <v-card-title>Akcje</v-card-title>
              <v-divider />
              <v-card-actions>
                <h3 class="action-label">Usuń konto:</h3>
                <v-spacer></v-spacer>
                <v-btn color="#f00" class="alert-button">Potwierdź</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";

@Component({
  components: {
    BaselineLayout
  }
})
export default class AccountManagerPageView extends Vue {}
</script>

<style scoped>
.alert-button {
  color: white;
}

.action-label {
  margin-left: 0.5rem;
}

.action-card {
  margin: 2rem 0;
}
</style>