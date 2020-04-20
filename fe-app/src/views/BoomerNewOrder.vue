<template>
  <BaselineLayout title="Helpado">
    <v-container>
     <v-bottom-navigation
     @change="help"
      v-model="activeBtn"
      color="success"
      grow
    >
      <v-btn>
        <span>Wybierz produkty</span>
        <v-icon>mdi-basket-fill</v-icon>
      </v-btn>
  
      <v-btn >
        <span>Wybierz miejsce dostawy</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
  
      <v-btn>
        <span>Złóż zamówienie</span>
        <v-icon>mdi-message-plus-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
     <v-card class="order-card">
         <NewOrderList v-if="activeBtn == 0"></NewOrderList>
         <PlaceSelection v-else-if="activeBtn == 1"></PlaceSelection>
         <ConfirmOrder v-else></ConfirmOrder>   
    </v-card>

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

     private activeBtn: Number = 0
     
};
</script>

<style scoped>
.order-card{
    height: 70vh
}
</style>