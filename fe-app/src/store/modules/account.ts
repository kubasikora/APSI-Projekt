import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ProfileService from "@/services/ProfileService";
import Profile from "@/models/Profile";


@Module({namespaced: true})
export default class Account extends VuexModule {
  profile: Profile = new Profile("", "", "", "", "", new Date());
  loading: boolean = false;
  errorMessage: String = "";
  errorMessageModal: String = "";
  loadingModal: boolean = false;

  @Mutation
  setNewProfile(profile: Profile): void {
    this.profile = profile;
  }

  @Mutation
  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  @Mutation
  setErrorMessage(errorMessage: String): void {
    this.errorMessage = errorMessage;
  }

  @Mutation
  setLoadingModal(loading: boolean): void {
    this.loadingModal = loading;
  }

  @Mutation
  setErrorMessageModal(errorMessage: String): void {
    this.errorMessageModal = errorMessage;
  }

  @Action
  async loadProfile(){
    const srv: ProfileService = new ProfileService();
    this.context.commit("setLoading", true);
    const {state, responseCode, profile}  = await srv.getPersonalInfo();
    if(state) {
        this.context.commit("setNewProfile", profile);
        this.context.commit("setErrorMessage", "");
    }
    else 
        this.context.commit("setErrorMessage", `Wystąpił błąd ${responseCode}. Proszę spróbuje ponownie później`)

    this.context.commit("setLoading", false);
  }

  @Action
  async saveProfile(profile: Profile){
    const srv: ProfileService = new ProfileService();
    this.context.commit("setLoading", true);
    const {state, responseCode, profile: newProfile} = await srv.saveMyProfile(profile);
    if(state) {
      this.context.commit("setNewProfile", newProfile);
      this.context.commit("setErrorMessage", "");
    }
    else 
      this.context.commit("setErrorMessage", `Wystąpił błąd ${responseCode}. Proszę spróbuje ponownie później`)

    this.context.commit("setLoading", false);
  }

  @Action
  async changePassword(password: String): Promise<Boolean> {
    const srv: ProfileService = new ProfileService();
    this.context.commit("setLoadingModal", true);
    const { state, responseCode } = await srv.changePassword(password);
    if(state) 
      this.context.commit("setErrorMessageModal", "");
    else 
      this.context.commit("setErrorMessageModal", `Wystąpił błąd ${responseCode}. Proszę spróbuje ponownie później`)

    this.context.commit("setLoadingModal", false);
    return state;
  }

  @Action 
  async deleteUser(): Promise<Boolean> {
    const srv: ProfileService = new ProfileService();
    this.context.commit("setLoadingModal", true);
    const { state, responseCode } = await srv.deleteAccount();
    if(state) 
      this.context.commit("setErrorMessageModal", "");
    else 
      this.context.commit("setErrorMessageModal", `Wystąpił błąd ${responseCode}. Proszę spróbuje ponownie później`)

    this.context.commit("setLoadingModal", false);
    return state;
  }
}