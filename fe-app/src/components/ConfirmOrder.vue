<template>
    <div>
        <v-row>
            <v-col cols='1' />
            <v-col cols="9">
        <v-card class="confirm-card">
        <v-list style="height: 35vh;width: 90%; overflow-y: auto; margin: 1%">
        <v-list-item-group shaped flat expand >
            <template   v-for="(product, i) in newOrder.products">
          <v-list-item
          color="primary"
            :key="i"
            active
          >
            <v-list-item-content>
              <v-list-item-title v-text="product.description"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider  :key="i"/>
            </template>
        </v-list-item-group>
        </v-list>
         <v-text-field
         style="width: 95%; margin:1%"
              label="Uwagi do zamówienia (szczegóły adresu, wygodna godzina dostarczenia)"
              solo
              v-model="extra"
              @change="updateExtra"
            ></v-text-field>
        </v-card>
        </v-col>
     </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Order from "@/models/Order";
const orders = namespace("BoomerOrders")

@Component
export default class ConfirmOrder extends Vue {
    @orders.State
    private newOrder: Order;
    private extra: String = '';
    @orders.Action
    private setExtra: (extra: String) => void
    private updateExtra() {
        this.setExtra(this.extra)
        
    }

}
</script>

<style scope>
.confirm-card{
    align-self: center;
}
</style>