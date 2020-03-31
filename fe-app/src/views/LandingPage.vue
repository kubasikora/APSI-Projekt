<template>
  <BaselineLayout title="Helpado">
    <v-card height="100%">
        <v-card-text>
            Siema
            <v-spacer/>
        </v-card-text>
    </v-card>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";

@Component({
  components: {
    BaselineLayout  
  }
})
export default class LoginView extends Vue {

};
</script>
