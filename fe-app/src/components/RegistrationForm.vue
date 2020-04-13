<template>
  <v-form>
      <v-text-field
      label="Imię"
      name="name"
      type="text"
      @input="setName"
    />
    <v-text-field
      label="Nazwisko"
      name="lastName"
      type="text"
      @input="setLastName"
    />
      <v-text-field
      label="Numer telefonu"
      name="phone"
      type="text"
      @input="setPhone"
      append-outer-icon="mdi-phone"
    />
    <v-text-field
      v-model="userData.email"
      label="Email"
      name="email"
      type="text"
      :rules="rules.required"
      append-outer-icon="mdi-email-outline"
    />
    <v-text-field
            :value="userData.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="password1"
            label="Hasło"
            counter
            @click:append="show1 = !show1"
            @input="setPassword"
          ></v-text-field>
    <v-text-field
            v-model="password2"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.passwordMatch]"
            :type="show2 ? 'text' : 'password'"
            name="password2"
            label="Powtórz hasło"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>

           <v-radio-group row>
          <v-radio
            v-for="r in roles"
            :key="r"
            :label="`${r}`"
            @mouseup="setRole(r)"
          ></v-radio>
           </v-radio-group>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import RegistrationData from "../models/RegistrationData";
const register = namespace("Registration");
@Component
export default class RegistrationForm extends Vue {
    @register.State
    public userData: RegistrationData

    @register.Action
    public setName: (newName: String) => void

    @register.Action
    public setLastName: (newLastName: String) => void

    @register.Action
    public setPhone: (newPhone: String) => void

    @register.Action
    public setEmail: (newEmail: String) => void

    @register.Action
    public setRole: (newRole: String) => void

    @register.Action
    public setPassword: (newPassword: String) => void
     data () {
      return {
        show1: false,
        show2: false,
        password2: '',
        role: '',
        roles: ["wolontariusz", "odbiorca pomocy"],
        rules: {
          required: (value: string) => !! value || 'Wymagane',
          min: (v: string) =>  v.length >= 8 || 'Hasło musi zawierać min. 8 znaków',
          passwordMatch: ( v: string, checkPasswords: Boolean) => !(!(v == this.userData.password) && checkPasswords) || "Hasła muszą byc takie same"
        },
      }
    }
}
</script>

<style>

</style>