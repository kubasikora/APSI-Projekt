import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import Order from '@/models/Order';
import Coordinates from '@/models/Coordinates';
import Product from '@/models/Product';
import OrdersService from '@/services/OrdersService';
import OrderResponse from '@/models/OrderResponse';

@Module({namespaced: true})
export default class BoomerOrders extends VuexModule {
    newOrder: Order = new Order([],new Coordinates(), "")
    loading: Boolean = false
    errorMessage: String = ""
    
    @Mutation
  setLoadingState(newLoadingState: boolean): void {
    this.loading = newLoadingState;
  }

  @Mutation
  setErrorMessage(errorMessage: String): void {
    this.errorMessage = errorMessage;
  }
    @Mutation
    setNewData(order: Order): void {
    console.log('order',order)
      this.newOrder = order
    }
    @Action
    setNewProducts(products: Array<Product>): void {
        console.log('setproducts', products)
        const order : Order = new Order(products, this.newOrder.coordinates, this.newOrder.extra)
        this.context.commit("setNewData", order)

    }

    @Action
    setCoordinates(coordinates: Array<Number>){
     const coords: Coordinates = new Coordinates(coordinates[0], coordinates[1])
     const order : Order = new Order(this.newOrder.products, coords, this.newOrder.extra)
     this.context.commit("setNewData", order)
      }
    @Action
    setExtra(extra: String) {
        const order : Order = new Order(this.newOrder.products, this.newOrder.coordinates, extra)
        this.context.commit("setNewData", order)
    }
    @Action
    async createNewOrder(): Promise<Boolean> {
    this.context.commit("setLoadingState", true);

    const srv: OrdersService = new OrdersService();
    const response: OrderResponse = await srv.addOrder(this.newOrder);
    // this.context.dispatch("resetCredentials");
    
    this.context.commit("setLoadingState", false);
    if(!response.state)
      this.context.commit("setErrorMessage", response.message);

    return response.state;
  }
}