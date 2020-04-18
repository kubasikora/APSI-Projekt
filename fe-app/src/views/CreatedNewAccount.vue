<template>
 <CenteredLayout title="Konto zostało założone">
     <template v-slot:actions>
        <v-img src="@/assets/logo.png" class="logo" />
        <v-spacer />
        <v-btn color="accent" @click="goToLoginPage"> Przejdź do strony logowania</v-btn>
      </template>
  </CenteredLayout>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CenteredLayout from "@/layouts/CenteredLayout.vue";

@Component({
  components: {
    CenteredLayout
  }
})

export default class  CreatedNewAccount extends Vue {

    private goToLoginPage(): void {
        this.$router.push({name: "Login"});
    }
}
</script>

<style>
.logo {
    width: 20%;
    margin-bottom: 5%
}

</style>