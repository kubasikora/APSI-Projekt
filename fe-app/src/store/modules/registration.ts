import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import RegistrationData from "@/models/RegistrationData";
import RegistrationServiceResponse from "@/models/RegistrationServiceResponse";
import RegistrationService from "@/services/RegistrationService";

@Module({namespaced: true})
export default class Registration extends VuexModule {
  userData: RegistrationData = new RegistrationData("", "","","","","");
  loading: boolean = false;
  errorMessage: String = "";

  @Mutation
  setNewData(userData: RegistrationData): void {
    this.userData = userData;
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
  setName(newName: String){
    const newData: RegistrationData = new RegistrationData(newName, this.userData.lastName, this.userData.phone, this.userData.email, this.userData.password, this.userData.role);
    this.context.commit("setNewData", newData);
    if(this.errorMessage){
      this.context.commit("setErrorMessage", "");
    }
  }

  @Action
  setLastName(newLastName: String){
    const newData: RegistrationData = new RegistrationData(this.userData.name, newLastName, this.userData.phone, this.userData.email, this.userData.password, this.userData.role);
    this.context.commit("setNewData", newData);
    if(this.errorMessage){
      this.context.commit("setErrorMessage", "");
    }
  }

  @Action
  setPhone(newPhone: String){
    const newData: RegistrationData = new RegistrationData(this.userData.name, this.userData.lastName, newPhone, this.userData.email,this.userData.password, this.userData.role);
    this.context.commit("setNewData", newData);
    if(this.errorMessage){
      this.context.commit("setErrorMessage", "");
    }
  }

  @Action
  setRole(newRole: String){
      const newData: RegistrationData = new RegistrationData(this.userData.name, this.userData.lastName, this.userData.phone, this.userData.email, this.userData.password, newRole);
      this.context.commit("setNewData", newData);
      if(this.errorMessage){
        this.context.commit("setErrorMessage", "");
      }
    }

    @Action
    setEmail(newEmail: String){
        const newData: RegistrationData = new RegistrationData(this.userData.name, this.userData.lastName, this.userData.phone, newEmail, this.userData.password, this.userData.role)
        this.context.commit("setNewData", newData);
        if(this.errorMessage){
          this.context.commit("setErrorMessage", "");
        }
    }
 @Action
 setPassword(newPassword: String){
    const newData: RegistrationData = new RegistrationData(this.userData.name, this.userData.lastName, this.userData.phone, this.userData.email, newPassword, this.userData.role)
    this.context.commit("setNewData", newData);
    if(this.errorMessage){
      this.context.commit("setErrorMessage", "");
    }
 }


  @Action
  resetData(){
    const newData: RegistrationData = new RegistrationData("", "", "","","","");
    this.context.commit("setNewData", newData);
  }

  @Action
  async registerNewAccount(): Promise<Boolean> {
    this.context.commit("setLoadingState", true);
    const srv: RegistrationService = new RegistrationService();
    const response: RegistrationServiceResponse = await srv.register(this.userData);
    this.context.commit("setLoadingState", false);
    if(!response.state)
      this.context.commit("setErrorMessage", response.errorMessage);
    
    return response.state;
  }

//   @Action
//   async logUsingCredentials(): Promise<boolean> {
//     this.context.commit("setLoadingState", true);

//     const srv: LoginService = new LoginService();
//     const response: LoginServiceResponse = await srv.login(this.credentials);
//     this.context.dispatch("resetCredentials");
    
//     this.context.commit("setLoadingState", false);
//     if(response.state)
//       return true;
//     else {
//       this.context.commit("setErrorMessage", response.message);
//       return false;
//     } 
//   }
};