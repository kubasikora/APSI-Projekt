import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import OrdersService from '@/services/OrdersService';
import TaskVolunteer from '@/models/TaskVolunteer';
import TasksVolunteerResponse from '@/models/TasksVolunteerResponse';

@Module({ namespaced: true })
export default class VolunteerOrders extends VuexModule {
    loading: Boolean = false;
    responseStatus: Number;
    assignedTasks: TaskVolunteer[];

    @Mutation
    setLoadingState(newLoadingState: boolean): void {
        this.loading = newLoadingState;
    }

    @Mutation
    setErrorMessage(status: Number): void {
        this.responseStatus = status;
    }

    @Mutation
    setAssignedTasks(tasks: TaskVolunteer[]) {
        this.assignedTasks = tasks;
    }

    @Action
    async getTasksList(): Promise<void> {
        this.context.commit("setLoadingState", true);
        const ordersService = new OrdersService();
        const response: TasksVolunteerResponse = await ordersService.getUsersOrders()

        console.log(response);
        this.context.commit("setAssignedTasks", response.taskArray);
    }
}