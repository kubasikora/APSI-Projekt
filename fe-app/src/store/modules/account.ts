import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ProfileService from "@/services/ProfileService";
import Profile from "@/models/Profile";


@Module({namespaced: true})
export default class Account extends VuexModule {
  profile: Profile = new Profile("", "", "", "", new Date());
  loading: boolean = false;
  errorMessage: String = "";

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
}