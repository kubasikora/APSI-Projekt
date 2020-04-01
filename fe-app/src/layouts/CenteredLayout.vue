<template>
  <v-app id="inspire">
    <v-app-bar app color="primary">
      <v-img src="@/assets/logo.png" class="logo" />
      <v-toolbar-title class="white--text">{{ headerTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                flat
              >
                <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
              </v-toolbar> 
              <v-card-text>
                <slot></slot>
              </v-card-text>
              <v-card-actions>
                <slot name="actions"></slot>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
 
@Component({
  components: {
    Footer
  }
})
export default class CenteredLayout extends Vue {
  private headerTitle: String = "Helpado";
  @Prop({required: true}) title: String; 
};
</script>

<style scoped>
.logo {
    max-height: 48px;
    max-width: 48px;
    margin-right: 0.5rem;
}
</style>