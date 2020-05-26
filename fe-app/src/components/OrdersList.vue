<template>
<div style="margin-top: 1%">
  <v-expansion-panels
    :hover="true"
    v-if="createdTasks.length!=0">

    <v-expansion-panel v-for="task in createdTasks" :key="task.id">
      <v-expansion-panel-header>
        <span class="icon">
          <v-icon>mdi-clipboard-list-outline</v-icon>
        </span>
        <span class="boomer-name">
            <strong style="float: left">{{ task.boomer }}</strong>
     </span>
     <!-- <span style="margin-right: 1%">{{task.order.products.length}} produktów </span> -->
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-container>
          <v-row>
            <v-col>
              <v-card class="pa-2" tile>
                <strong>Komentarz: </strong>
                <span>{{ task.order.extra }} </span>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-2" tile><strong>Płatność:</strong> {{ task.order.payment }}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
            </v-col>
            <v-col>
                <v-btn color="info">Zobacz listę</v-btn>
                <v-btn color="accent" >Zrealizuj</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel> 
  </v-expansion-panels>
    <v-sheet v-else color="secondary lighten-1" style="padding: 0.5%; 
    color:white; 
    text-align: center; 
    margin-top: 4%">Brak zamówień</v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import TaskVolunteer from '@/models/TaskVolunteer.ts'
const tasks = namespace("Tasks");
@Component({
  components: {
 
  }
})
export default class OrdersList extends Vue{
 
  @tasks.State
  public createdTasks: Array<TaskVolunteer>



}
</script>

<style>


</style>