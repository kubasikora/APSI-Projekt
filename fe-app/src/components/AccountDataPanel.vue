<template>
<div>
  <v-card style="margin-bottom: 20px">
  <v-card-title>Twoja ocena</v-card-title>
  <v-card-subtitle>{{ rating.toFixed(2) }} / 5.00</v-card-subtitle>
  </v-card>
  <v-card>
    <v-form>
      <v-card-title>Moje dane</v-card-title>
      <v-divider />
      <v-card-text>
        <v-text-field v-model="firstName" label="Imię" color="primary" :loading="loading" :disabled="loading"></v-text-field>
        <v-text-field v-model="lastName" label="Nazwisko" color="primary" :loading="loading" :disabled="loading"></v-text-field>
        <v-text-field v-model="address" label="Adres" color="primary" :loading="loading" :disabled="loading"></v-text-field>
        <v-text-field v-model="city" label="Miasto" color="primary" :loading="loading" :disabled="loading"></v-text-field>
         <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Data urodzenia"
              readonly
              :loading="loading"
              :disabled="loading"
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="picker"
            v-model="date"
            locale="pl"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="abortProfileEdition">Anuluj</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="saveProfileEdition">Zapisz</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import { namespace } from "vuex-class";
import Profile from "@/models/Profile";

const account = namespace("Account");

interface PickerInterface {
  activePicker: String
};

interface MenuInterface {
  save: (date: String) => void;
};

@Component
export default class AccountDataPanel extends Vue {
  private menu: Boolean = false;
  private date: string = "";
  private address: String = "";
  private city: String = "";
  private firstName: String = "";
  private lastName: String = "";

  @account.State
  public loading: boolean;

  @account.State
  public profile: Profile;

  @account.Action
  public loadProfile: () => void;

  @account.Action
  public saveProfile: (profile: Profile) => void;

  private padNumber(num: Number): string {
    if(num < 10)
      return "0" + num.toString();
    return num.toString();
  }

  public rating: Number = 0.0;

  async mounted(){
    await this.loadProfile();
    const date: Date = this.profile.dateOfBirth;
    if(date){
      const printableDate: string = `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}`;
      this.$refs.menu.save(printableDate);
      this.date = printableDate;
    }

    this.firstName = this.profile.firstName;
    this.lastName = this.profile.lastName;
    this.address = this.profile.address;
    this.city = this.profile.city;
    this.rating = this.profile.rating;
  }

  $refs: Vue["$refs"] & {
    picker: PickerInterface,
    menu: MenuInterface
  }

  @Watch('menu')
  watchMenu(newVal: string) {
    newVal && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
  }

  public async save(date: String){
    this.$refs.menu.save(date);
  }

  public saveProfileEdition(){
    const newProfile: Profile = new Profile(this.profile.id, this.firstName, this.lastName, this.address, this.city, new Date(this.date));
    this.saveProfile(newProfile);
  }

  public abortProfileEdition(){
    this.loadProfile();
    const date: Date = this.profile.dateOfBirth;
    if(date){
      const printableDate: string = `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}`;
      this.$refs.menu.save(printableDate);
      this.date = printableDate;
    }

    this.firstName = this.profile.firstName;
    this.lastName = this.profile.lastName;
    this.address = this.profile.address;
    this.city = this.profile.city;
  }
}
</script>

<style scoped>
</style>