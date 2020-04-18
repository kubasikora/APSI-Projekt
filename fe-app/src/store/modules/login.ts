import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import LoginCredentials from "@/models/LoginCredentials";
import LoginResponse from "@/models/LoginResponse";
import LoginService from "@/services/LoginService";
import LogoutResponse from '@/models/LogoutResponse';

@Module({namespaced: true})
export default class Login extends VuexModule {
  credentials: LoginCredentials = new LoginCredentials("", "");
  loading: boolean = false;
  errorMessage: String = "";

  @Mutation
  setNewCredentials(credentials: LoginCredentials): void {
    this.credentials = credentials;
  }

  @Mutation
  setLoadingState(newLoadingState: boolean): void {
    this.loading = newLoadingState;
  }

  @Mutation
  setErrorMessage(errorMessage: String): void {
    this.errorMessage = errorMessage;
  }

  @Action
  setEmail(newEmail: String){
    const newCredentials: LoginCredentials = new LoginCredentials(newEmail, this.credentials.password);
    this.context.commit("setNewCredentials", newCredentials);
    if(this.errorMessage){
      this.context.commit("setErrorMessage", "");
    }
  }

  @Action
  setPassword(newPassword: String){
    const newCredentials: LoginCredentials = new LoginCredentials(this.credentials.email, newPassword);
    this.context.commit("setNewCredentials", newCredentials);
    if(this.errorMessage){
      this.context.commit("setErrorMessage", "");
    }
  }

  @Action
  resetCredentials(){
    const newCredentials: LoginCredentials = new LoginCredentials("", "");
    this.context.commit("setNewCredentials", newCredentials);
  }

  @Action
  async logUsingCredentials(): Promise<Boolean> {
    this.context.commit("setLoadingState", true);

    const srv: LoginService = new LoginService();
    const response: LoginResponse = await srv.login(this.credentials);
    this.context.dispatch("resetCredentials");
    
    this.context.commit("setLoadingState", false);
    if(!response.state)
      this.context.commit("setErrorMessage", response.message);

    return response.state;
  }

  @Action
  async logout(): Promise<Boolean> {
    const srv: LoginService = new LoginService();
    const response: LogoutResponse = await srv.logout();
    if(!response.state){
      alert("Wylogowanie nie powiodło się, spróbuj jeszcze raz");
    }

    return response.state;
  }
};