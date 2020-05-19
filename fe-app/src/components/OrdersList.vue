<template>
<div style="margin-top: 1%">
  <v-expansion-panels
    :hover="true">

    <v-expansion-panel v-for="task in createdTasks" :key="task.id">
      <v-expansion-panel-header>
        <span class="icon">
          <v-icon>mdi-account</v-icon>
        </span>
        <span class="boomer-name"><strong>{{ task.boomer }}</strong></span>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-container>
          <!-- <v-row>
            <v-col>
              <v-card class="pa-2" tile>
                <strong>Adres: </strong>
                <span>{{ task.residence.street + ' ' + task.residence.homeNumber }}</span>
                <span v-if="task.residence.aptNumber">{{ '/' + task.residence.aptNumber }}</span>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-2" tile><strong>Numer telefonu:</strong> {{ task.phoneNumber }}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card class="pa-2" tile><strong>Data dostarczenia:</strong> {{ task.due }}</v-card>
            </v-col>
            <v-col>
              <v-btn color="accent" v-on:click="getList(task.listID)">Zobacz listę</v-btn>
            </v-col>
          </v-row> -->
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
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