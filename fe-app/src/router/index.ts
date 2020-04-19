import Vue from "vue";
import VueRouter from "vue-router";
import LoginService from '@/services/LoginService';
import Role from '@/roles';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Guest landing page",
    component: () => import("@/views/GuestLandingPage.vue"),
    meta: { blockForAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
    meta: { blockForAuth: true }
  },
  {
    path: "/v/hello",
    name: "Volunteer landing page",
    component: () => import("@/views/VolunteerLandingPage.vue"),
    meta: { requiresAuth: true, requiredRole: Role.Volunteer }
  },
  {
    path: "/b/hello",
    name: "Boomer landing page",
    component: () => import("@/views/BoomerLandingPage.vue"),
    meta: { requiresAuth: true, requiredRole: Role.Boomer }
  },
  {
    path: "/registration",
    name: "Registration page",
    component: () => import("@/views/RegistrationPage.vue"),
    meta: { blockForAuth: true }
  },
  {
   path: "/newAccount", 
   name: "New account", 
   component: () => import("@/views/CreatedNewAccount.vue"),
   meta: { blockForAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  const auth: LoginService = new LoginService();
  const isLoggedIn: Boolean = auth.isLoggedIn()
  const role: Role = auth.getRole();

  if(to.matched.some(record => record.meta && record.meta.requiresAuth && record.meta.requiredRole == Role.Boomer)){
    if(isLoggedIn){
      if(role == Role.Boomer){ // zalogowany jako boomer
        next();
      } else { // zalogowany jako volunteer
        next({ path: "/v/hello", query: { redirect: to.fullPath } });
      }
    } else { // niezalogowany
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  }

  if(to.matched.some(record => record.meta && record.meta.requiresAuth && record.meta.requiredRole == Role.Volunteer)){
    if(isLoggedIn){
      if(role == Role.Volunteer){ // zalogowany jako volunteer
        next();
      } else { // zalogowany jako boomer
        next({ path: "/b/hello", query: { redirect: to.fullPath } });
      }
    } else { // niezalogowany
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  }

  if(to.matched.some(record => record.meta && record.meta.blockForAuth)){
    if(isLoggedIn){ // jest zalogowany a nie powinien
      if(role == Role.Volunteer){ //jest volunteer
        next({ path: "/v/hello", query: { redirect: to.fullPath } });
      }
      else if(role == Role.Boomer){ // jest boomer
        next({ path: "/b/hello", query: { redirect: to.fullPath } });
      } else {
        next();
      }
    }
  } 

  next(); // jest git
});

export default router;
