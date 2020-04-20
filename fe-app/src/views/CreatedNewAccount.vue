<template>
 <CenteredLayout title="Konto zostało założone">
     <template v-slot:actions>
          <v-container fluid>
             <v-row>
                 <v-col cols=5>
                <v-img src="@/assets/logo.png" class="logo" />
                 </v-col>
                 <v-col cols=1 />
                 <v-col>
                <v-btn class="button-log" color="accent" @click="goToLoginPage"> Zaloguj się</v-btn>
                 </v-col>
             </v-row>
        </v-container>
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
    width: 100%;
}
.button-log{
    margin-top: 25%
}

</style>