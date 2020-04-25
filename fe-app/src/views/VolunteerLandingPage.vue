<template>
  <BaselineLayout>
    <div class="find-boomers">
      <v-btn block x-large color="secondary">Znajdź potrzebujących w okolicy</v-btn>
    </div>

    <v-divider></v-divider>
    <div class="list-title">Twoje zlecenia</div>
    <v-divider></v-divider>

    <div class="task-list">
      <ListOfTasks v-bind:tasks="tasksData"></ListOfTasks>
    </div>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import ListOfTasks from "@/components/ListOfTasks.vue";
import { Boomer } from '../models/TaskInterface';

@Component({
  components: {
    BaselineLayout,
    ListOfTasks
  }
})
export default class VolunteerLandingPageView extends Vue {
  // TODO: wywalic statyczna tablice i zamienic na dane z API
  tasksData: Boomer[] = [
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