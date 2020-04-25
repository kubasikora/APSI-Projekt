<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="showDrawer"
      temporary
      app
    >
      <NavMenu></NavMenu>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      class="white--text"
    >
      <v-app-bar-nav-icon color="white" @click.stop="showDrawer = !showDrawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer/>

      <p class="loginMessage" v-if="loginMessage">Zalogowano jako: <span class="loginMessage loginUsername">{{ loginMessage }}</span></p>
      <v-img src="@/assets/logo.png" class="logo" />
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-heights"
        fluid
      >
        <v-row>
          <v-col>
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import NavMenu from "@/components/NavMenu.vue";
import LoginService from "@/services/LoginService";

@Component({
  components: {
    Footer,
    NavMenu
  }
})
export default class BaselineLayout extends Vue {
  private title: String = "Helpado";
  private showDrawer: boolean = false;
  
  get loginMessage(): String {
    const srv = new LoginService();
    return srv.getUsername();
  }
};
</script>

<style scoped>
.logo {
    margin-top: 4px;
    max-height: 48px;
    max-width: 48px;
}

.loginMessage {
  margin: auto;
  color: white;
}

.loginUsername {
  font-weight: bold;
  padding-right: 5px;
}
</style>