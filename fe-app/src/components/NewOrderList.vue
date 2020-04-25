<template>
    <div>
      <v-row>
          <v-col cols="1"/>
            <v-col cols="6">
            <v-text-field
              label="Wpisz nazwę produktu"
              solo
              v-model="newProduct.description"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
              <v-select
            :items="categories.map(cat=> {return cat.category})"
            @change="changeSelected"
            label="Wybierz kategorię"
            solo
          ></v-select>
          </v-col>
        <v-col cols="2">
          <v-btn  @click="addNewProduct" color="error">Dodaj</v-btn>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="1"/>
          <v-col cols="9">
        <v-card>
        <v-list style="height: 45vh; overflow-y: auto;">
        <div  class= "no-product" v-if="productList.length == 0">Brak produktów</div>
        <v-list-item-group shaped flat expand >
            <template   v-for="(product, i) in productList">
          <v-list-item
          color="primary"
            :key="i"
            active
          >
            <v-list-item-icon>
              <v-icon>{{getCategory(product.category)}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="product.description"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider  :key="i"/>
            </template>
        </v-list-item-group>
        </v-list>
        </v-card>
         </v-col>       
      </v-row>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Product from "../models/Product";
import { namespace } from "vuex-class";
import BoomerOrders from "../store/modules/boomerOrders";
import Order from "../models/Order";

const orders = namespace("BoomerOrders")

@Component
export default class NewOrderList extends Vue {
    public newProduct: Product = new Product();
    public productList: Array<Product> = new Array<Product>()
    private selectedCategory : String = "Inne"
    private categories = [{
        category: "Piekarnia",
        icon: "baguette" },
        { category: 'Sklep spożywczy', 
        icon: 'basket-outline'},
        {category:'Warzywa/owoce',
        icon: 'food-apple-outline'},{
            category:'Drogeria', 
            icon: 'toothbrush-paste'},
            {category: 'Apteka',
            icon: 'hospital-box-outline'}
            ,{category: "Inne",
            icon:  "check"}]

    @orders.Action
    private setNewProducts: (products: Array<Product>) => void
    private addNewProduct(){
        this.newProduct.category = this.selectedCategory
        this.productList.push(this.newProduct)
        this.newProduct = new Product()
        this.setNewProducts(this.productList)
    }
    private getCategory(cat: String){
        const category = this.categories.find(category => {if (category.category == cat) return `mdi-`+category.icon})
        if(category)
            return `mdi-`+category.icon
        else
            return `mdi-`
    }
    private changeSelected(e: String){
        this.selectedCategory = e
    }

}
</script>

<style>

.no-product{
    color: #b8b8d1;
    text-align: center;
}
.order-list {
    background-color: #b8b8d1;
}
</style>