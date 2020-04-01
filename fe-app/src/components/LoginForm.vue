<template>
  <v-form>
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

  @login.Action
  public setEmail: (newEmail: String) => void

  @login.Action
  public setPassword: (newPassword: String) => void
};
</script>
