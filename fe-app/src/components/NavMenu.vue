<template>
  <v-list dense>
    <v-img src="@/assets/logo.png" alt="logo" class="logo" />
    <v-divider></v-divider>
    <v-list-item link :to="goHomePath">
      <v-list-item-action>
         <v-icon>mdi-home</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="isLoggedIn && role == Role.Boomer" @click="goToNewOrder">
      <v-list-item-action>
        <v-icon>mdi-cart-outline</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Złóż zamówienie</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item link :to='{name: "Manage account"}'>
      <v-list-item-action>
        <v-icon>mdi-account-box</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Mój profil</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item link v-if="isLoggedIn" @click="logoutUser">
      <v-list-item-action>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Wyloguj</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item link v-else @click="goToLogin">
      <v-list-item-action>
        <v-icon>mdi-login</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Zaloguj</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import LoginService from "@/services/LoginService";
import Role from "@/roles";

const login = namespace("Login");

interface PathObject {
  path?: String,
  name?: String
};

@Component
export default class NavMenu extends Vue {
  @login.Action
  public logout: () => Promise<Boolean>

  public async logoutUser(): Promise<void> {
    const response = await this.logout();
    if(response){
      this.$router.push({name: "Guest landing page"});
    }
  }

  public goToLogin(): void {
    this.$router.push({ name: "Login" })
  }
  public goToNewOrder(): void{
      this.$router.push({name: "Boomer new order page"})
  }

  get isLoggedIn(): Boolean {
    const srv = new LoginService();
    return srv.isLoggedIn();
  }

  get goHomePath(): PathObject {
    const srv = new LoginService();
    const role = srv.getRole();
    if(role == Role.Boomer)
      return { name: "Boomer landing page" };
    else if(role == Role.Volunteer)
      return { name: "Volunteer landing page" };
    else
      return { name: "Login" };
  }
};
</script>

<style scoped>
.logo {
    margin: 2rem auto;
    max-height: 200px;
    max-width: 200px;
}
</style>