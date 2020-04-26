<template>
  <BaselineLayout title="Helpado">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="action-button">
            <v-btn block x-large color="secondary" v-on:click="goToNewOrder()">Dodaj nowe zlecenie</v-btn>
          </div>

          <v-divider></v-divider>

          <div class="action-button">
            <v-btn block x-large color="secondary">Zapisane listy zakupów</v-btn>
          </div>

          <v-divider></v-divider>

          <div class="action-button">
            <v-btn block x-large color="secondary">Historia zamówień</v-btn>
          </div>

          <v-divider></v-divider>
            <div class="list-title">Twoje zlecenia</div>
          <v-divider></v-divider>

          Lista zleceń coming soon :)
        </v-col>
      </v-row>
    </v-container>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import EntryCarousel from "@/components/EntryCarousel.vue";

@Component({
  components: {
    BaselineLayout,
    EntryCarousel
  }
})
export default class BoomerLandingPageView extends Vue {
  // TODO: lista zlecen boomera

  goToNewOrder() {
    this.$router.push({path: '/b/newOrder'});
  }  
}
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--x-large {
  min-height: 8rem;
  font-size: 2rem;
}

.v-divider {
  margin: 1rem 0 1rem 0;
}

.list-title {
  padding: 1rem 1rem 1rem 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: #5b5f97;
}

</style>