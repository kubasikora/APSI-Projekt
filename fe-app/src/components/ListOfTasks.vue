<template>
  <v-expansion-panels :hover="true">
    <v-expansion-panel v-for="task in assignedTasks" :key="task.id">
      <v-expansion-panel-header>
        <span class="icon">
          <v-icon>mdi-account</v-icon>
        </span>
        <span class="boomer-name">
          <strong>{{ task.boomer }}</strong>
        </span>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card class="pa-2" outlined>
                <p>
                  <strong>Płatność:</strong><span>{{ task.order._payment.length == 0 ? ' brak' : " " + task.order._payment }}</span>
                </p>
                <strong>Dodatkowe informacje:</strong>
                <span>{{ task.order._extra.length == 0 ? ' brak' : task.order._extra }}</span>
              </v-card>
            </v-col>
            <v-card-actions>
              <v-dialog v-model="list" persistent max-width="40%">
                <template v-slot:activator="{ on }">
                  <v-btn color="accent" @click="showProductsList(task.id)" v-on="on">Zobacz listę</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Szczegóły zamówienia</v-card-title>
                  <v-card-text>
                    <p style="font-size: 20px; font-weight: bold">Lista produktów:</p>
                    <span v-for="product in products" v-bind:key="product.name">
                      <p @click="checkProduct(product)" style="font-size: 18px" :class="{bought: product.isBought}">{{ product.name }} : {{ product.countity }}</p>
                    </span>
                  </v-card-text>
                  <v-card-actions style="text-align: right">
                    <v-spacer></v-spacer>
                    <v-btn color="info" text @click="list = false">Ukryj</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              
              <v-dialog v-model="maps" max-width="50%">
                <v-card>
                  <v-card-title class="headline">Lokalizacja potrzebującego</v-card-title>
                  <span v-if="maps">
                    <PlaceSelection
                      :showButtons="false"
                      :boomLocLat="coords.x"
                      :boomLocLong="coords.y"
                    />
                  </span>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="maps = false">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                style="float:right;margin-bottom:3px;margin-left:10px"
                @click="showMap(task.order._coordinates)"
                color="error"
                fab
                x-small
              >
                <v-icon>mdi-map-search-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskVolunteer from "../models/TaskVolunteer";
import { namespace } from "vuex-class";
import Product from "../models/Product";
import OrdersService from "../services/OrdersService";
import PlaceSelection from "../components/PlaceSelection.vue";
import Coordinates from "../models/Coordinates";

const order = namespace("VolunteerOrders");
@Component({
  props: {
    tasks: Array as () => TaskVolunteer[]
  },
  components: {
    PlaceSelection
  }
})
export default class ListOfTasks extends Vue {
  @order.State
  public assignedTasks: Array<TaskVolunteer>;
  public coords: Coordinates = new Coordinates(0, 0);

  getList() {
    console.log("Lista");
  }

  showMap(coords: Coordinates) {
    this.coords = coords;
    this.maps = true;
  }
  
  checkProduct(product: Product){
    product.isBought = !product.isBought;
    const os = new OrdersService();
    os.changeProductState(product);
  }

  public list: Boolean = false;
  public maps: Boolean = false;
  public products: Array<Product> = new Array<Product>();

  async showProductsList(orderId: String) {
    this.products = new Array<Product>();
    const os = new OrdersService();
    const response = await os.getOrderDetails(orderId);
    this.products = response.products;
    console.log(this.products);
  }
}
</script>

<style scoped>
.icon {
  max-width: 5%;
}

.mdi::before {
  color: #5b5f97;
}

.boomer-name {
  font-size: 1.2rem;
  color: #5b5f97;
  margin-left: 1rem;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  background-color: #b8b8d1;
  color: #fff;
}

.v-expansion-panel--active > .v-expansion-panel-header .mdi::before {
  color: #fff;
}

.v-expansion-panel--active > .v-expansion-panel-header .boomer-name {
  color: #fff;
}

.bought {
  text-decoration: line-through solid;
}
</style>