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
      :rules="[rules.required]"
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
           <v-radio-group v-model="role" row>
          <v-radio
            v-for="r in roles"
            :key="r.key"
            :label="`${r.label}`"
            :value="`${r.key}`"
          ></v-radio>
           </v-radio-group>
           <v-alert v-if="errorMessage" border="left" colored-border type="error" elevation="2">{{ errorMessage }}</v-alert>
           <v-spacer />
        <v-btn color="accent" @click="cancelRegistration"> Anuluj </v-btn>
        <v-btn color="primary" @click="createNewAccount">Stwórz nowe konto</v-btn>
  </v-form>
        
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Cookies from "js-cookie";

import RegistrationData from "../models/RegistrationData";
const register = namespace("Registration");
@Component
export default class RegistrationForm extends Vue {
    @register.State
    public userData: RegistrationData

    public role: String = ''
    @register.State
    public errorMessage: String

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

    @register.Action
    public resetData: () => void;
  
    @register.Action
    public registerNewAccount: () => Promise<boolean>
 
    public async createNewAccount(): Promise<void> {
      this.setRole(this.role)
      Cookies.remove("csrftoken");
      Cookies.remove("sessionID");
      const response = await this.registerNewAccount();
      if(response){
        this.$router.push({name: "New account"});
      }
    }

    public cancelRegistration(): void {
       this.resetData();
       this.$router.push({name: "Login"});
    };
     data () {
      return {
        show1: false,
        roles: [{label: "wolontariusz", key: "vol"}, {label:"potrzebujący", key: "BOOM"} ],
        rules: {
          required: (value: string) => !! value || 'Wymagane',
          min: (v: string) =>  v.length >= 8 || 'Hasło musi zawierać min. 8 znaków',
        },
      }
    }
}
</script>

<style>

</style>