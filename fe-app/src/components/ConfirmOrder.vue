<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="confirm-card" outlined>
            <v-card-title>Potwierdź listę zakupów</v-card-title>
            <v-card-text>
              <v-list style="width: 90%; margin: 1%">
                <v-list-item-group shaped flat expand>
                  <template v-for="(product, i) in newOrder.products">
                    <v-list-item color="primary" :key="'confirm'+i" active>
                      <v-list-item-content>
                        <v-list-item-title v-text="product.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="product.countity"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="i" />
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
          
          <v-card class="confirm-card" outlined>
            <v-card-title>Przekaż uwagi do zamówienia</v-card-title>
            <v-container>
              <v-row no-gutters style="height: 50px">
                <v-col cols="12">
                  <v-text-field
                    label="Uwagi do zamówienia (szczegóły adresu, wygodna godzina dostarczenia)"
                    solo
                    v-model="extra"
                    @change="updateExtra"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

          <v-card class="confirm-card" outlined>
            <v-card-title>Wybierz sposób płatności</v-card-title>
            <v-container>
              <v-row no-gutters style="height: 50px">
                <v-col cols="12">
                  <v-select
                    class="select-payment"
                    :items="payment"
                    @change="changeSelected"
                    label="Metoda płatności"
                    solo
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Order from "@/models/Order";
const orders = namespace("BoomerOrders");

@Component
export default class ConfirmOrder extends Vue {
  @orders.State
  private newOrder: Order;
  private extra: String = "";
  private payment: Array<String> = ["gotówka", "BLIK", "przelew"];
  private selectedPayment: String = "";
  @orders.Action
  private setExtra: (extra: String) => void;
  @orders.Action
  private setPayment: (payment: String) => void;
  private updateExtra() {
    this.setExtra(this.extra);
  }
  private changeSelected(e: String) {
    this.selectedPayment = e;
    this.setPayment(this.selectedPayment);
  }
}
</script>

<style scope>
.confirm-card {
  align-self: center;
  margin-bottom: 20px;
}
.select-payment {
  width: 100%;
}
</style>