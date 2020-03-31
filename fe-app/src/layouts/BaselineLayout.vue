<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="showDrawer"
      temporary
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-mail</v-icon>
          </v-list-item-action>
          <v-list-drawer
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-navigation-drawer/>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-drawer
          <v-list-item-content>
            <v-list-item-title>Wyloguj</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      class="white--text"
    >
      <v-app-bar-nav-icon color="white" @click.stop="showDrawer = !showDrawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer/>
      <v-img src="@/assets/logo.png" class="logo" />
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
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

@Component({
  components: {
    Footer
  }
})
export default class BaselineLayout extends Vue {
  private title: String = "Helpado";
  private showDrawer: boolean = false;
};
</script>

<style scoped>
.logo {
    margin-top: 4px;
    max-height: 48px;
    max-width: 48px;
}
</style>