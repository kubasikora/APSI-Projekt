<template>
    
    <BaselineLayout>
        <v-card outlined>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <div class="list-title">Historia zleceń</div>
                  <v-divider></v-divider>

                  <div class="task-list">
                      <OrdersDone></OrdersDone>
                  </div>
                </v-col>
              </v-row>
            </v-container>
        </v-card>


    </BaselineLayout>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import OrdersDone from "@/components/OrdersDone.vue";

@Component({
  components: {
    BaselineLayout,
    OrdersDone
  }
})
export default class BoomerHistoryPageView extends Vue {


}

</script>

<style scoped>

.list-title {
  padding: 1rem 1rem 1rem 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: #5b5f97;
}

</style>