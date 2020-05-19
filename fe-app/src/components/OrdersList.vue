<template>
<div style="margin-top: 1%">
  <v-expansion-panels
    :hover="true">

    <v-expansion-panel v-for="task in tasks" :key="task.listID">
      <v-expansion-panel-header>
        <span class="icon">
          <v-icon>mdi-account</v-icon>
        </span>
        <span class="boomer-name"><strong>{{ task.name }}</strong></span>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-container>
          <v-row>
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
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Boomer } from "../models/TaskInterface";
@Component({
  components: {
 
  }
})
export default class OrdersList extends Vue{
   private  tasks: Boomer[] = [
 {
      name: "Robert Wojtas",
      residence: {
        street: "Ułańska",
        homeNumber: 12
      },
      phoneNumber: "606115394",
      due: "15-04-2020",
      listID: 1
    },
    {
      name: "Paweł Żakieta",
      residence: {
        street: "Kartuzy",
        homeNumber: 69,
        aptNumber: 69
      },
      phoneNumber: "696969696",
      due: "19-04-2020",
      listID: 2
    },
    {
      name: "Jakub Sikora",
      residence: {
        street: "Arka Gdynia",
        homeNumber: 10
      },
      phoneNumber: "111115394",
      due: "15-07-2020",
      listID: 3
    },
    {
      name: "Krzysiu Bednarski",
      residence: {
        street: "Warszawa",
        homeNumber: 420,
        aptNumber: 69
      },
      phoneNumber: "696969696",
      due: "01-11-2020",
      listID: 4
    }
  ];

  // TODO: do zrobienia jak bedzie dostepne API
  getList(id: number) {
    console.log(id);
  }


}
</script>

<style>

</style>