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
              <v-card class="pa-2" tile>
                <strong>Współrzędne:</strong>
                <span> {{ task.order._coordinates.x + ' ' + task.order._coordinates.y }}</span>
              </v-card>
            </v-col>
            <v-col cols="12" style="text-align: right">
              <v-dialog v-model="list" persistent max-width="40%">
                  <template v-slot:activator="{ on }">
                    <v-btn color="accent" @click="showProductsList(task.id)" v-on="on">Zobacz listę</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">Szczegóły zamówienia</v-card-title>
                    <v-card-text>
                      <p style="font-size: 20px; font-weight: bold">Lista produktów: </p>
                      <span v-for="product in products" v-bind:key="product.name">
                        <p style="font-size: 18px">{{ product.name }} : {{ product.countity }}</p>
                      </span>
                    </v-card-text>
                    <v-card-actions style="text-align: right">
                      <v-spacer></v-spacer>
                      <v-btn color="info" text @click="list = false">Ukryj</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-col>
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

const order = namespace("VolunteerOrders");
@Component({
  props: {
    tasks: Array as () => TaskVolunteer[]
  }
})
export default class ListOfTasks extends Vue {
  @order.State
  public assignedTasks: Array<TaskVolunteer>;
  
  getList() {
    console.log("Lista");
  }

  public list: Boolean = false;
  public products: Array<Product> = new Array<Product>();

  async showProductsList(orderId: String) {
    this.products = new Array<Product>();
    const os = new OrdersService();
    const response = await os.getOrderDetails(orderId);
    this.products = response.products;
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
</style>