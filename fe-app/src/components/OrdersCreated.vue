<template>
  <div style="margin-top: 1%">
    <v-expansion-panels :hover="true" v-if="orders.length!=0">
      <v-expansion-panel v-for="order in orders" :key="order.id">
        <v-expansion-panel-header>
          <span class="icon">
            <v-icon>mdi-clipboard-list-outline</v-icon>
          </span>
          <span class="boomer-name">
            <strong style="float: left">Liczba produktów:</strong>
            <span style="margin-left: 5px">{{ order._products.length }}</span>
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card class="pa-2" outlined>
                  <v-container>
                    <v-row>
                      <v-col cols="9">
                        <strong>Komentarz:</strong>
                        {{ order._extra }}
                      </v-col>
                      <v-col cols="3">
                        <strong>Płatność:</strong>
                        {{ order._payment }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12">
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
                            <v-list-item-title
                              v-text="product.name"
                              style="float: left; width: 50%"
                            >{</v-list-item-title>
                            <v-list-item-subtitle
                              v-text="product.countity"
                              style="float: right; width: 50%"
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                             <v-checkbox
                              :input-value="product.isBought"
                              color="accent"
                              disabled
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-sheet
      v-else
      color="secondary lighten-1"
      style="padding: 0.5%; 
    color:white; 
    text-align: center; 
    margin-top: 4%"
    >Brak zamówień</v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import TaskVolunteer from "../models/TaskVolunteer";
import OrdersService from "../services/OrdersService";
import Order from "../models/Order";
import Product from "../models/Product";

const tasks = namespace("Tasks");
@Component({
  components: {}
})
export default class OrdersCreated extends Vue {
  public orders: Array<Order> = new Array<Order>();
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

  async mounted() {
    const os = new OrdersService();
    const response = await os.myOrders();
    this.orders = response;
  }
}
</script>

<style>
.no-product {
  color: #b8b8d1;
  text-align: center;
}
.order-list {
  background-color: #b8b8d1;
}

.bought {
  text-decoration: line-through solid;
}
</style>