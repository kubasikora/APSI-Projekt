import Vue from 'vue'
import Vuex from 'vuex'
import Login from "@/store/modules/login";
import Registration from "@/store/modules/registration"
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Login,
    Registration
  }
});

export default store;
