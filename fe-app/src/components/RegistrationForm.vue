<template>
  <v-form>
      <v-text-field
      label="Imię"
      name="name"
      type="text"
    />
    <v-text-field
      label="Nazwisko"
      name="lastName"
      type="text"
    />
      <v-text-field
      label="Numer telefonu"
      name="phone"
      type="text"
      append-outer-icon="mdi-phone"
    />
    <v-text-field
      v-model="email"
      label="Email"
      name="email"
      type="text"
      :rules="rules.required"
      append-outer-icon="mdi-email-outline"
    />
    <v-text-field
            v-model="password1"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="password1"
            label="Hasło"
            counter
            @click:append="show1 = !show1"
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

           <v-radio-group>
          <v-radio
            v-for="r in roles"
            :key="r"
            :label="`${r}`"
            :value="r"
             v-model="role"
          ></v-radio>
           </v-radio-group>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class RegistrationForm extends Vue {
     data () {
      return {
        email: '',
        show1: false,
        show2: false,
        password1: '',
        password2: '',
        role: '',
        roles: ["wolontariusz", "odbiorca pomocy"],
        rules: {
          required: (value: string) => !! value || 'Wymagane',
          min: (v: string) =>  v.length >= 8 || 'Hasło musi zawierać min. 8 znaków',
          passwordMatch: ( v: string, password1: string, checkPasswords: Boolean) => !(!(v == password1) && checkPasswords) || "Hasła muszą byc takie same"
        },
      }
    }
}
</script>

<style>

</style>