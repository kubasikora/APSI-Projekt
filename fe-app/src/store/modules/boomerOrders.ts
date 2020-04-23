import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import Order from '@/models/Order';

@Module({namespaced: true})
export default class BoomerOrders extends VuexModule {
    newOrder: Order = new Order([],)

}