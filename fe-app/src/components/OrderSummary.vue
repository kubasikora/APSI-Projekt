<template>
  <v-card outlined>
    <v-card-title>
      <strong style="margin-right: 5px">Wolontariusz:</strong>
      {{ order.volunteer }}
    </v-card-title>
    <v-card-text>
      <p>
        <strong>Sposób płatności:&nbsp;</strong>
        {{ !order._payment || order._payment.length == 0 ? "brak" : order.payment }}
        <br />
        <strong>Komentarz:&nbsp;</strong>
        {{ !order._extra || order._extra.length == 0 ? "brak" : order._extra }}
      </p>
      <v-card class="pa-2" outlined>
        <strong style="margin-left:10px">Zamówione produkty:</strong>
        <v-list style="overflow-y: auto;">
          <div class="no-product" v-if="order._products.length == 0">Brak produktów</div>
          <v-list-item-group shaped flat expand>
            <template v-for="product in order._products">
              <v-list-item color="primary" :key="'my'+product.name" active>
                <v-list-item-icon>
                  <v-icon>{{getCategory(product.productType)}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="product.name" style="float: left; width: 50%">{</v-list-item-title>
                  <v-list-item-subtitle v-text="product.countity" style="float: right; width: 50%"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox :input-value="product.isBought" color="accent" disabled></v-checkbox>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>

      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" style="text-align: right">
              <v-dialog v-model="showConfirmation" persistent max-width="40%">
                <v-card>
                  <v-card-title class="headline">Realizacja zamówienia</v-card-title>
                  <v-card-text>
                    Jak oceniasz zamówienie?
                    <v-radio-group v-model="radioGroup">
                      <v-radio v-for="n in 5" :key="n" :label="`${n}`" :value="n"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent" text @click="setRating(order)">Oceń</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn @click="finishOrder(order)" color="accent">Zamknij zlecenie</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import OrdersService from "../services/OrdersService";
import Order from "../models/Order";
import Profile from "../models/Profile";
import ProfileService from "../services/ProfileService";

@Component
export default class OrderSummary extends Vue {
  @Prop() order: Order;
  public showConfirmation: Boolean = false;
  public radioGroup: Number = 3;

  private categories = [
    { category: "Piekarnia", icon: "baguette" },
    { category: "Sklep spożywczy", icon: "basket-outline" },
    { category: "Warzywa/owoce", icon: "food-apple-outline" },
    { category: "Drogeria", icon: "toothbrush-paste" },
    { category: "Apteka", icon: "hospital-box-outline" },
    { category: "Inne", icon: "check" }
  ];

  private getCategory(cat: String) {
    const category = this.categories.find(category => {
      if (category.category == cat) return `mdi-` + category.icon;
    });
    if (category) return `mdi-` + category.icon;
    else return `mdi-`;
  }

  public async finishOrder(order: Order) {
    console.log(order);
    const os = new OrdersService();
    const response = await os.markOrderAsCompleted(order);
    this.showConfirmation = true;
  }

  public setRating(order: Order) {
    const ps = new ProfileService();
    console.log(this.radioGroup);
    ps.setRating(order.volunteerId, this.radioGroup);
    this.showConfirmation = false;
    this.$router.push("/b/hello");
  }
}
</script>

<style>
</style>