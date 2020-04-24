<template>
    <div>
      <v-row>
          <v-col cols="1"/>
            <v-col cols="6">
            <v-text-field
              label="Wpisz nazwę produktu"
              solo
              v-model="newProduct.desciption"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
              <v-select
            :items="categories.map(cat=> {return cat.category})"
            label="Wybierz kategorię"
            solo
          ></v-select>
          </v-col>
        <v-col cols="2">
          <v-btn  @click="addNewProduct" color="error">Dodaj</v-btn>
        </v-col>
      </v-row>
        <v-list style="height: 45vh; overflow-y: auto;">
        <div  class= "no-product" v-if="productList.length == 0">Brak produktów</div>
        <v-list-item-group v-else v-model="productList" flat disabled color="primary">
          <v-list-item
            v-for="(product, i) in productList"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="product.category"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="product.desciption"></v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
          </v-list-item>
        </v-list-item-group>
        </v-list>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Product from "../models/Product";
import { namespace } from "vuex-class";
import BoomerOrders from "../store/modules/boomerOrders";
import Order from "../models/Order";

const orders = namespace("BoomersOrders")

@Component
export default class NewOrderList extends Vue {
    public newProduct: Product = new Product();
    @orders.State
    private newOrder: Order;
    public productList: Array<Product> = new Array<Product>()
    private categories = [{
        category: "Piekarnia",
        icon: "baguette" },
        { category: 'Sklep spożywczy', 
        icon: 'basket-outline'},
        {category:'Warzywa/owoce',
        icon: 'food-apple-outline'},{
            category:'Drogeria', 
            icon: 'toothbrash-paste'},
            {category: 'Apteka',
            icon: 'hospital-box-outline'}
            ,{category: "Inne",
            icon:  "Inne"}]

    @orders.Action
    private setNewProducts: (products: Array<Product>) => void
    private addNewProduct(){
        this.productList.push(this.newProduct)
        this.newProduct = new Product()
        
    }

}
</script>

<style>

.no-product{
    color: #b8b8d1;
    text-align: center;
}
</style>