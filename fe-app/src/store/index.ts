import Vue from 'vue'
import Vuex from 'vuex'
import Login from "@/store/modules/login";
import Registration from "@/store/modules/registration"
import BoomerOrders from "@/store/modules/boomerOrders"
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Login,
    Registration,
    BoomerOrders
  }
});

export default store;
