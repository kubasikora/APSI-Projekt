import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/', name: 'Login', component: () => import("@/views/Login.vue")
  },
  {
    path: '/hello', name: "Landing page", component: () => import("@/views/LandingPage.vue")
  },
  {
    path: '/registration', name: 'Registration page', component: () => import("@/views/RegistrationPage.vue")
  },
  {
      path: '/newAccount', name: 'New account', component: () => import("@/views/CreatedNewAccount.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
