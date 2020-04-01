<template>
<CenteredLayout title="Załóż konto">
      <RegistrationForm />
      <template v-slot:actions>
        <v-spacer />
        <v-btn color="accent"> Anuluj </v-btn>
        <v-btn color="primary">Stwórz nowe konto</v-btn>
      </template>
  </CenteredLayout>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CenteredLayout from "@/layouts/CenteredLayout.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";


@Component({
  components: {
    CenteredLayout,
    RegistrationForm
  }
})

export default class RegistrationPage extends Vue {

}
</script>

<style>

</style>