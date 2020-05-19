import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

@Module({namespaced: true})
export default class Tasks extends VuexModule {

    createdTasks : Array<Object> = []

    @Mutation
    setCreatedTasks(newTasks: Array<Object>){
        this.createdTasks = newTasks;

    }
}