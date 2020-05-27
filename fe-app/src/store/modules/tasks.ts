import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import OrdersService from '@/services/OrdersService';
import TasksVolunteerResponse from '@/models/TasksVolunteerResponse';
import TaskVolunteer from '@/models/TaskVolunteer';

@Module({namespaced: true})
export default class Tasks extends VuexModule {

    createdTasks : Array<TaskVolunteer> = []
    distance : Number = 0

    @Mutation
    setCreatedTasks(newTasks: Array<TaskVolunteer>):void{
        this.createdTasks = newTasks;
    }
    @Mutation
    setDistance(dist: Number): void {
        this.distance = dist
    }
    @Action
     async getCreatedOrders(distance: Number): Promise<void> {
    console.log('orders')
    const coords = this.context.rootState.BoomerOrders.newOrder.coordinates

    const srv: OrdersService = new OrdersService();
    //const response: TasksResponse 
    const response : TasksVolunteerResponse = await srv.getOrders(coords, distance);
    this.context.commit("setDistance", distance)
    this.context.commit("setCreatedTasks", response.taskArray);      
    
  }
  @Action
  async takeOrder(id: Number): Promise<void> {
      const srv: OrdersService = new OrdersService();
      const coords = this.context.rootState.BoomerOrders.newOrder.coordinates

      console.log(id)
      const resp = await srv.assignToOrder(id);
      console.log(resp)
      const response : TasksVolunteerResponse = await srv.getOrders(coords, this.distance);
     this.context.commit("setCreatedTasks", response.taskArray);  
  }
}