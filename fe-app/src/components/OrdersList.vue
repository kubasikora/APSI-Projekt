<template>
  <div style="margin-top: 1%">
    <v-expansion-panels :hover="true" v-if="createdTasks.length!=0">
      <v-expansion-panel v-for="task in createdTasks" :key="task.id">
        <v-expansion-panel-header>
          <span class="icon">
            <v-icon>mdi-clipboard-list-outline</v-icon>
          </span>
          <span class="boomer-name">
            <strong style="float: left">{{ task.boomer }}</strong>
          </span>
          <!-- <span style="margin-right: 1%">{{task.order.products.length}} produktów </span> -->
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col>
                <v-card class="pa-2" tile>
                  <p style="padding: 5px; padding-bottom: 0px"><strong>Komentarz:</strong> {{ task.order.extra }}</p>
                  <p style="padding: 5px; padding-bottom: 0px"><strong>Płatność:</strong> {{ task.order.payment }}</p>
                </v-card>
              </v-col>
            </v-row>
            <v-row justify="space-between">
              <v-col>
                <v-dialog v-model="list" persistent max-width="40%">
                  <template v-slot:activator="{ on }">
                    <v-btn color="info" @click="showProductsList(task.id)" v-on="on">Zobacz listę</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">Szczegóły zamówienia</v-card-title>
                    <v-card-text>
                      <p style="font-size: 20px; font-weight: bold">Lista produktów: </p>
                      <span v-for="product in products" v-bind:key="product.name">
                        <p style="font-size: 18px">{{ product.name }} : {{ product.countity }}</p>
                      </span>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="info" text @click="list = false">Ukryj</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col style="text-align: right">
                <v-dialog v-model="dialog" persistent max-width="40%">
                  <template v-slot:activator="{ on }">
                    <v-btn color="accent" v-on="on">Zrealizuj</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">Realizacja zamówienia</v-card-title>
                    <v-card-text>Czy potwierdzasz zamówienie?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="accent" text @click="confirm(task) ">Potwierdzam</v-btn>
                      <v-btn color="info" text @click="dialog = false">Anuluj</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
import Product from "../models/Product";

const tasks = namespace("Tasks");
@Component({
  components: {}
})
export default class OrdersList extends Vue {
  @tasks.State
  public createdTasks: Array<TaskVolunteer>;
  @tasks.Action
  public takeOrder: (task: TaskVolunteer) => Promise<void>;

  public dialog: Boolean = false;
  public list: Boolean = false;
  public products: Array<Product> = new Array<Product>();

  public confirm(task: TaskVolunteer): void {
    this.takeOrder(task);
    this.dialog = false;
  }

  async showProductsList(orderId: String) {
    this.products = new Array<Product>();
    const os = new OrdersService();
    const response = await os.getOrderDetails(orderId);
    this.products = response.products;
  }
}
</script>

<style>
</style>