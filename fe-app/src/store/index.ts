import Vue from 'vue'
import Vuex from 'vuex'
import Login from "@/store/modules/login";
import Registration from "@/store/modules/registration";
import Account from "@/store/modules/account";
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Login,
    Registration,
    Account
  }
});

export default store;
