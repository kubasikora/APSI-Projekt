<template>
  <v-carousel cycle height="250" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item 
      v-for="(item, i) in srcs" :key="i"
      :src="item"
      >
      <!-- <v-sheet :color="colors[i]" height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">{{ slide }}</div>
        </v-row>
      </v-sheet> -->
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EntryCarousel extends Vue {
  private srcs: Array<String> = ['baba.jpg', 'biedronka-senior.jpg', 'aktualnosci_senior-hero.jpg', 'harold.jpg', 'pomoc.jpg']
  private colors: Array<String> = ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'];
  private slides: Array<String> = ['Pierwszy', 'Drugi', 'Trzeci', 'Czwarty', 'Piąty'];
};
</script>