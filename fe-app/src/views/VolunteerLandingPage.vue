<template>
  <BaselineLayout>
    <div class="find-boomers">
      <v-btn block x-large color="secondary">Znajdź potrzebujących w okolicy</v-btn>
    </div>

    <v-divider></v-divider>
    <div class="list-title">Twoje zlecenia</div>
    <v-divider></v-divider>

    <div class="task-list">
      <ListOfTasks v-bind:tasks="boomers"></ListOfTasks>
    </div>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import ListOfTasks from "@/components/ListOfTasks.vue";
// import { Boomer } from "src/models/TaskInterface.vue";
// import ExampleTasksData from 'src/models/TaskInterface.vue';

@Component({
  components: {
    BaselineLayout,
    ListOfTasks
  }
})
export default class VolunteerLandingPageView extends Vue {

  // TODO: ogarnac ladowanie przykladowych danych
  // boomers() {
  //   return ExampleTasksData;
  // }

  // TODO: do zrobienia jak bedzie dostepne API
  getList(id: number) {
    console.log(id);
  }
}
</script>

<style scoped>

.v-btn:not(.v-btn--round).v-size--x-large {
  min-height: 8rem;
}

.v-btn:not(.v-btn--round).v-size--x-large {
  font-size: 2rem;
}

.find-boomers {
  padding: 0 0 1rem 0;
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