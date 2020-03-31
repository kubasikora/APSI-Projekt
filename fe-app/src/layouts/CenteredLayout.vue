<template>
  <v-app id="inspire">
    <v-app-bar
      app   
      color="primary"
    >
      <v-img src="@/assets/logo.png" class="logo" />
      <v-toolbar-title class="white--text">Helpado</v-toolbar-title>
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
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                flat
              >
                <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
              </v-toolbar> 
              <slot></slot>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      app
      color="primary"
    >
      <span class="white--text">&copy; 2020 Architektura i Projektowanie Systemów Informatycznych</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      title: String,
      source: String,
    },
  }
</script>

<style scoped>
.logo {
    max-height: 48px;
    max-width: 48px;
    margin-right: 0.5rem;
}
</style>