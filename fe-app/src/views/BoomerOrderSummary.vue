<template>
  <BaselineLayout title="Helpado">
    <v-container>
      <OrderSummary v-if="order" :order="this.order"/>
    </v-container>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import OrderService from "../services/OrdersService";
import Order from "../models/Order";
import OrderSummary from "@/components/OrderSummary.vue";

@Component({
  components: {
    BaselineLayout,
    OrderSummary
  }
})
export default class BoomerOrderSummary extends Vue {
  @Prop({required: true}) orderId: String;
  public order: Order | null = null;

  async mounted(){
    const os = new OrderService();
    this.order = await os.getFullOrder(this.orderId);
  }

};
</script>

<style scoped>
.order-card{
    height: 60%
}
</style>