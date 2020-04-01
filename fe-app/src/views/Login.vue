<template>
  <CenteredLayout title="Zaloguj się w Helpado">
      <LoginForm />
      <template v-slot:actions>
        <v-spacer />
        <v-btn color="accent" @click="register"> Zarejestruj</v-btn>
        <v-btn color="primary" @click="login">Zaloguj</v-btn>
      </template>
  </CenteredLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CenteredLayout from "@/layouts/CenteredLayout.vue";
import LoginForm from "@/components/LoginForm.vue";

@Component({
  components: {
    CenteredLayout,
    LoginForm
  }
})
export default class LoginView extends Vue {
  public login(): void {
    this.$router.push({name: "Landing page"});
  }
  public register(): void {
    this.$router.push({name: "Registration page"});
  }
};
</script>
