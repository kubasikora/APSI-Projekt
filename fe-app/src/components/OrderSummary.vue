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
                <v-btn @click="$router.push({path: `/b/summary/${order.id}`})" color="accent">Zamknij zlecenie</v-btn>
              </v-col>
            </v-row>
        </v-container>
    </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import OrderService from "../services/OrdersService";
import Order from "../models/Order";

@Component
export default class OrderSummary extends Vue {
  @Prop() order: Order;

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
}
</script>

<style>
</style>