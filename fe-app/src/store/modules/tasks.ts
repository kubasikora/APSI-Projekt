import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import OrdersService from '@/services/OrdersService';
import TasksVolunteerResponse from '@/models/TasksVolunteerResponse';
import TaskVolunteer from '@/models/TaskVolunteer';

@Module({namespaced: true})
export default class Tasks extends VuexModule {

    createdTasks : Array<TaskVolunteer> = []

    @Mutation
    setCreatedTasks(newTasks: Array<TaskVolunteer>):void{
        this.createdTasks = newTasks;
    }
    @Action
     async getCreatedOrders(distance: Number): Promise<void> {
    console.log('orders')
    const coords = this.context.rootState.BoomerOrders.newOrder.coordinates

    const srv: OrdersService = new OrdersService();
    //const response: TasksResponse 
    const response : TasksVolunteerResponse = await srv.getOrders(coords, distance);
    this.context.commit("setCreatedTasks", response.taskArray);

      
    
  }
}