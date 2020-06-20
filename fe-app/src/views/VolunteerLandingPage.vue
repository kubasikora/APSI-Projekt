<template>
  <BaselineLayout>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="action-button">
            <v-btn block x-large color="secondary" v-on:click="goToFindYourBoomer()">Znajdź potrzebujących w okolicy</v-btn>
          </div>

          <v-divider></v-divider>
          <div class="list-title">Twoje zlecenia</div>
          <v-divider></v-divider>

          <div class="task-list">
            <ListOfTasks></ListOfTasks>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import ListOfTasks from "@/components/ListOfTasks.vue";
import { Boomer } from "../models/TaskInterface";
import { namespace } from "vuex-class";


const order = namespace("VolunteerOrders");
@Component({
  components: {
    BaselineLayout,
    ListOfTasks
  }
})
export default class VolunteerLandingPageView extends Vue {

  @order.Action 
  public getTasksList: () => void;


  mounted() {
    this.getTasksList();
  }  

  // TODO: do zrobienia jak bedzie dostepne API
  getList(id: number) {
    console.log(id);
  }

  goToFindYourBoomer() {
    this.$router.push({path: '/v/findNewOrder'});
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

.task-list {
  padding: 1rem 0;
}
</style>