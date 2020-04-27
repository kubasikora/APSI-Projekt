<template>
<CenteredLayout title="Załóż konto">
      <RegistrationForm />
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

export default class RegistrationPageView extends Vue {



}
</script>

<style>

</style>