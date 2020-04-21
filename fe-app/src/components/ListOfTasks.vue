<template>
  <v-expansion-panels
    :hover="true">

    <v-expansion-panel v-for="task in tasks" :key="task">
      <v-expansion-panel-header>
        <span class="icon">
          <v-icon>mdi-account</v-icon>
        </span>
        <span>{{ task.name }}</span>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-container>
          <v-row>
            <v-col>
              <v-card class="pa-2" tile>
                Adres:
                <span>{{ task.residence.street + ' ' + task.residence.homeNumber }}</span>
                <span v-if="task.residence.aptNumber">{{ '/' + task.residence.aptNumber }}</span>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-2" tile>Numer telefonu: {{ task.phoneNumber }}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card class="pa-2" tile>Data dostarczenia: {{ task.due }}</v-card>
            </v-col>
            <v-col>
              <v-btn v-on:click="getList(task.listID)">Zobacz listę</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Boomer } from "src/models/TaskInterface";

@Component({
  props: {
    tasks: Array as () => Boomer[],
  }
})
export default class ListOfTasks extends Vue {
    
}
</script>

<style>
.icon {
  max-width: 5%;
}
</style>