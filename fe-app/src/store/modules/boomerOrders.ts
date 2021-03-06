import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import Order from '@/models/Order';
import Coordinates from '@/models/Coordinates';
import Product from '@/models/Product';
import OrdersService from '@/services/OrdersService';
import OrderResponse from '@/models/OrderResponse';

@Module({namespaced: true})
export default class BoomerOrders extends VuexModule {
    newOrder: Order = new Order([],new Coordinates(), "", "")
    loading: Boolean = false
    errorMessage: String = ""
    orderEl: Number = 1
    
    
    @Mutation
  setLoadingState(newLoadingState: boolean): void {
    this.loading = newLoadingState;
  }

  @Mutation
  setErrorMessage(errorMessage: String): void {
    this.errorMessage = errorMessage;
  }
  @Mutation
  setOrderElement(el: Number): void {
      this.orderEl = el
  }
    @Mutation
    setNewData(order: Order): void {
      this.newOrder = order
    }
    @Action
    setNewProducts(products: Array<Product>): void {
        const order : Order = new Order(products, this.newOrder.coordinates, this.newOrder.extra, this.newOrder.payment)
        this.context.commit("setNewData", order)

    }

    @Action
    setCoordinates(coordinates: Array<Number>){
     const coords: Coordinates = new Coordinates(coordinates[0], coordinates[1])
     console.log(coords)
     const order : Order = new Order(this.newOrder.products, coords, this.newOrder.extra, this.newOrder.payment)
     this.context.commit("setNewData", order)
      }
    @Action
    setExtra(extra: String) {
        const order : Order = new Order(this.newOrder.products, this.newOrder.coordinates, extra, this.newOrder.payment)
        this.context.commit("setNewData", order)
    }
    @Action
    clearOrder() {
        const order : Order = new Order([],new Coordinates(), "", "")
        this.context.commit("setNewData", order)
        this.context.commit("setOrderElement", 1)

    }
    @Action
    updateOrderElement(el: Number){
        console.log('update', el)
        this.context.commit("setOrderElement",el)
    }
    @Action
    setPayment(payment: String){
        const order : Order = new Order(this.newOrder.products, this.newOrder.coordinates, this.newOrder.extra, payment)
        this.context.commit("setNewData", order)
    }
    @Action
    async createNewOrder(): Promise<Boolean> {
    this.context.commit("setLoadingState", true);
    console.log('create')

    const srv: OrdersService = new OrdersService();
    const response: OrderResponse = await srv.addOrder(this.newOrder);
    // this.context.dispatch("resetCredentials");
    
    this.context.commit("setLoadingState", false);
    if(!response.state)
      this.context.commit("setErrorMessage", response.message);

    return response.state;
  }
}