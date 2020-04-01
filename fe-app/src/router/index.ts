import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const registration = "Registration page";
const routes = [
  {
    path: '/', name: 'Login', component: () => import("@/views/Login.vue")
  },
  {
    path: '/hello', name: "Landing page", component: () => import("@/views/LandingPage.vue")
  },
  {
    path: '/registration', name: registration, component: () => import("@/views/RegistrationPage.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
