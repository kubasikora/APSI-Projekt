<template>
  <v-form>
    <v-text-field
      label="Email"
      name="email"
      type="email"
    />

    <v-text-field
      id="password"
      label="Hasło"
      name="password"
      type="password"
    />
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginForm extends Vue {

};
</script>
