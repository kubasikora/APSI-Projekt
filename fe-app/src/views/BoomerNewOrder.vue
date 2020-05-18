<template>
  <BaselineLayout title="Helpado">
    <v-container>
     <v-stepper v-model="orderEl">
      <v-stepper-header>
        <v-stepper-step :complete="orderEl > 1" step="1">Wybierz produkty</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="orderEl > 2" step="2">Wybierz miejsce dostawy</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Potwierdź zamówienie</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
            <NewOrderList/>
        </v-stepper-content>
  
        <v-stepper-content step="2">
           <PlaceSelection />
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <ConfirmOrder /> 
           <v-dialog v-model="dialog" persistent max-width="50%">
        <v-card>
          <v-card-title class="headline">Zamówienie zostało złożone</v-card-title>
          <v-card-text>Jego status sprawdzisz w zakładce "Moje zamówienia"</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" text @click="closeDialog">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
          <v-btn
            color="accent"
            @click="createOrder">
            Złóż zamówienie
          </v-btn>
          <v-btn color="info" @click="updateOrderElement(2)">Wróć</v-btn>
           <v-alert v-if="errorMessage" border="left" colored-border type="error" elevation="2">{{ errorMessage }}</v-alert>
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
import { namespace } from "vuex-class";
const order = namespace("BoomerOrders");

@Component({
  components: {
    BaselineLayout,
    NewOrderList,
    ConfirmOrder,
    PlaceSelection
  }
})
export default class BoomerNewOrder extends Vue {

    // private e1: Number = 1
     private on :Boolean= false
     private dialog :Boolean= false
     @order.State
     private errorMessage: String
     @order.State
     private orderEl: Number

     @order.Action
     private updateOrderElement: ()=> void

    @order.Action
    private createNewOrder:  () => Promise<Boolean>
      public async createOrder(): Promise<void> {
        const response = await this.createNewOrder();
    if(response){
      this.dialog = true
    }
      }
    @order.Action
    private clearOrder: ()=> void
    private closeDialog () : void {
        this.dialog = false
        this.clearOrder()
        this.$router.push({ name: "Boomer landing page"})
        

    }
     
};
</script>

<style scoped>
.order-card{
    height: 60%
}
</style>