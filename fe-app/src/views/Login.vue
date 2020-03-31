<template>
  <CenteredLayout title="Zaloguj się w Helpado">
    <v-card-text>
      <v-form>
        <v-text-field
          label="Login"
          name="login"
          type="text"
        />

        <v-text-field
          id="password"
          label="Hasło"
          name="password"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="accent">Zarejestruj</v-btn>
      <v-btn color="primary">Zaloguj</v-btn>
    </v-card-actions>
  </CenteredLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CenteredLayout from "@/layouts/CenteredLayout.vue";

@Component({
  components: {
    CenteredLayout
  }
})
export default class LoginView extends Vue {

};
</script>
