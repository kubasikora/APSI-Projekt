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
import { namespace } from "vuex-class";
import CenteredLayout from "@/layouts/CenteredLayout.vue";
import LoginForm from "@/components/LoginForm.vue";
import LoginCredentials from "@/models/LoginCredentials";

const login = namespace("Login");

@Component({
  components: {
    CenteredLayout,
    LoginForm
  }
})
export default class LoginPageView extends Vue {
  @login.Action
  public logUsingCredentials: () => Promise<Boolean>

  public async login(): Promise<void> {
    const response = await this.logUsingCredentials();
    if(response){
      this.$router.push({name: "Volunteer landing page"});
    }
  }
  public register(): void {
    this.$router.push({name: "Registration page"});
  }
};
</script>
