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
                 <v-dialog v-model="dialog" persistent max-width="40%">
                     <template v-slot:activator="{ on }">
                          <v-btn color="accent"  v-on="on" >Zrealizuj</v-btn>
                     </template>
                 <v-card>
                 <v-card-title class="headline">Realizacja zamówienia</v-card-title>
                    <v-card-text>..........NIE WIEM CO TU NAPISAĆ.......</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="accent" text @click="confirm(task.order.id) ">Zgadzam się</v-btn>
                        <v-btn  color="info" text @click="dialog = false">Anuluj</v-btn>
                    </v-card-actions>
                </v-card>
             </v-dialog>
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
  @tasks.Action
  public takeOrder:(id: Number)=>Promise<void>

    public  dialog: Boolean = false
  public confirm(id:Number):void{
      this.takeOrder(id)
      this.dialog = false

  }



}
</script>

<style>


</style>