<template>
  <BaselineLayout title="Helpado">
    <v-container>
      <v-row>
        <v-col offset="1">
          <h1>Zarządzanie kontem</h1>
        </v-col>  
      </v-row>
      <v-row>
        <v-col cols="10" offset="1">
          <AccountDataPanel />
          <AccountActionsPanel />
        </v-col>
      </v-row>
    </v-container>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import AccountActionsPanel from "@/components/AccountActionsPanel.vue";
import AccountDataPanel from "@/components/AccountDataPanel.vue";

@Component({
  components: {
    BaselineLayout,
    AccountActionsPanel,
    AccountDataPanel
  }
})
export default class AccountManagerPageView extends Vue {}
</script>

<style scoped>
</style>