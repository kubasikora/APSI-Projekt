<template>
<BaselineLayout>
  <v-container>
    <v-row>
        <v-col offset="1">
          <h1>Wyszukaj nowe zlecenie</h1>
        </v-col>  
      </v-row>
      <v-row>
        <v-col cols="10" offset="1">
            <SearchingBoomerPanel />
            <OrdersList />
          
        </v-col>
      </v-row>
  </v-container>
</BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import SearchingBoomerPanel from "@/components/SearchingBoomerPanel.vue"
import OrdersList from "@/components/OrdersList.vue"

@Component({
  components: {
    BaselineLayout,
    SearchingBoomerPanel,
    OrdersList
  }
})

export default class  FindYourBoomerPage extends Vue {

}
</script>

<style>

</style>