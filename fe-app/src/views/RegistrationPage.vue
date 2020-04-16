<template>
<CenteredLayout title="Załóż konto">
      <RegistrationForm />
      <template v-slot:actions>
        <v-spacer />
        <v-btn color="accent" @click="cancelRegistration"> Anuluj </v-btn>
        <v-btn color="primary" @click="createNewAccount">Stwórz nowe konto</v-btn>
      </template>
  </CenteredLayout>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CenteredLayout from "@/layouts/CenteredLayout.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import { namespace } from "vuex-class";
const register = namespace("Registration");

@Component({
  components: {
    CenteredLayout,
    RegistrationForm
  }
})

export default class RegistrationPage extends Vue {

@register.Action
    public resetData: () => void;
@register.Action
  public registerNewAccount: () => Promise<boolean>
 
  public async createNewAccount(): Promise<void> {
    const response = await this.registerNewAccount();
    if(response){
      this.$router.push({name: "New account"});
    }
  }

    public cancelRegistration(): void {
       this.resetData();
       this.$router.push({name: "Login"});
    };

}
</script>

<style>

</style>