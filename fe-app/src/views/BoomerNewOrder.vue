<template>
  <BaselineLayout title="Helpado">
    <v-container>
     <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Wybierz produkty</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">Wybierz miejsce dostawy</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Potwierdź zamówienie</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
            <NewOrderList/>
          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Dalej
          </v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="2">
           <PlaceSelection />
          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Dalej
          </v-btn>
          <v-btn color="info" @click="e1 = 1">Wróć</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <ConfirmOrder />  
          <v-btn
            color="accent">
            <!-- @click="e1 = 1" -->
            Złóż zamówienie
          </v-btn>
          <v-btn color="info" @click="e1 = 2">Wróć</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </v-container>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import NewOrderList from "@/components/NewOrderList.vue";
import ConfirmOrder from "@/components/ConfirmOrder.vue";
import PlaceSelection from "@/components/PlaceSelection.vue";

@Component({
  components: {
    BaselineLayout,
    NewOrderList,
    ConfirmOrder,
    PlaceSelection
  }
})
export default class BoomerNewOrder extends Vue {

     private e1: Number = 1
     
};
</script>

<style scoped>
.order-card{
    height: 60%
}
</style>