<template>
  <v-expansion-panels :hover="true">
    <v-expansion-panel v-for="task in assignedTasks" :key="task.id">
      <v-expansion-panel-header>
        <span class="icon">
          <v-icon>mdi-account</v-icon>
        </span>
        <span class="boomer-name">
          <strong>{{ task.boomer }}</strong>
        </span>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-container>
          <v-row>
            <v-col>
              <v-card class="pa-2" tile>
                <strong>Współrzędne:</strong>
                <span>{{ task.order.getCoordinates().x + ' ' + task.order.getCoordinates().y }}</span>
              </v-card>
            </v-col>
            <v-col>
              <v-btn color="accent" v-on:click="getList()">Zobacz listę</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskVolunteer from "../models/TaskVolunteer";
import { namespace } from "vuex-class";

const order = namespace("VolunteerOrders");
@Component({
  props: {
    tasks: Array as () => TaskVolunteer[]
  }
})
export default class ListOfTasks extends Vue {
  @order.State
  public assignedTasks: Array<TaskVolunteer>;
  
  getList() {
    console.log("Lista");
  }
}
</script>

<style scoped>
.icon {
  max-width: 5%;
}

.mdi::before {
  color: #5b5f97;
}

.boomer-name {
  font-size: 1.2rem;
  color: #5b5f97;
  margin-left: 1rem;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  background-color: #b8b8d1;
  color: #fff;
}

.v-expansion-panel--active > .v-expansion-panel-header .mdi::before {
  color: #fff;
}

.v-expansion-panel--active > .v-expansion-panel-header .boomer-name {
  color: #fff;
}
</style>