import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import Order from '@/models/Order';
import Coordinates from '@/models/Coordinates';
import Product from '@/models/Product';

@Module({namespaced: true})
export default class BoomerOrders extends VuexModule {
    newOrder: Order = new Order([],new Coordinates())
    
    @Mutation
    setNewData(order: Order): void {
      this.newOrder = order
    }
    @Action
    setNewProducts(products: Array<Product>): void {
        const order : Order = new Order(products, this.newOrder.coordinates)
        this.context.commit("setNewData", order)

    }

    @Action
    setCoordinates(coordinates: Array<Number>){
     const coords: Coordinates = new Coordinates(coordinates[0], coordinates[1])
     const order : Order = new Order(this.newOrder.products, coords)
     this.context.commit("setNewData", order)
      }
}