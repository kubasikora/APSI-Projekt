import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import LoginCredentials from "@/models/LoginCredentials";

@Module({namespaced: true})
export default class Login extends VuexModule {
  credentials: LoginCredentials = new LoginCredentials("", "");

  @Mutation
  setNewCredentials(credentials: LoginCredentials): void {
    this.credentials = credentials;
  }

  @Action
  setEmail(newEmail: String){
    const newCredentials: LoginCredentials = new LoginCredentials(newEmail, this.credentials.password);
    this.context.commit("setNewCredentials", newCredentials);
  }

  @Action
  setPassword(newPassword: String){
    const newCredentials: LoginCredentials = new LoginCredentials(this.credentials.email, newPassword);
    this.context.commit("setNewCredentials", newCredentials);
  }

  @Action
  resetCredentials(){
    const newCredentials: LoginCredentials = new LoginCredentials("", "");
    this.context.commit("setNewCredentials", newCredentials);
  }
};