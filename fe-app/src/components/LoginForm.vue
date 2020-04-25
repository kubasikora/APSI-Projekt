<template>
  <v-form>
    <div v-if="loading" class="loading">
      <v-progress-circular size="64" rotate="10" width="2" indeterminate color="accent"></v-progress-circular>
    </div>
    <div v-else>
      <v-text-field
        :value="credentials.email"
        label="Email"
        name="email"
        type="email"
        @input="setEmail"
      />

      <v-text-field
        :value="credentials.password"
        id="password"
        label="Hasło"
        name="password"
        type="password"
        @input="setPassword"
      />
      <v-alert v-if="errorMessage" border="left" colored-border type="error" elevation="2">{{ errorMessage }}</v-alert>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import LoginCredentials from "@/models/LoginCredentials";
const login = namespace("Login");

@Component
export default class LoginForm extends Vue {
  @login.State
  public credentials: LoginCredentials;

  @login.State
  public errorMessage: String;

  @login.State
  public loading: Boolean;

  @login.Action
  public setEmail: (newEmail: String) => void;

  @login.Action
  public setPassword: (newPassword: String) => void;

  mounted(){
    this.setEmail("");
    this.setPassword("");
  }
};
</script>

<style scoped>
.error-message {
  color: red;
}

.loading { 
  width: 64px;
  margin: auto;
}
</style>