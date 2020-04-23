<template>
    <div>
        <v-card
        class="mx-auto"
        max-width="1200"
        height="580"
        tile
      >
      <v-row>
          <v-col cols="1"/>
      <v-col cols="8">
            <v-text-field
              label="Wpisz nazwę produktu"
              solo
              v-model="newProduct"
            ></v-text-field>
          </v-col>
        <v-col cols="2">
          <v-btn large color="error">Dodaj</v-btn>
        </v-col>
      </v-row>
        <v-list
          :disabled="disabled"
          :dense="dense"
          :two-line="twoLine"
          :three-line="threeLine"
          :shaped="shaped"
          :flat="flat"
          :subheader="subheader"
          :sub-group="subGroup"
          :nav="nav"
          :avatar="avatar"
          :rounded="rounded"
        >
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :inactive="inactive"
            >
              <v-list-item-avatar v-if="avatar">
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NewOrderList extends Vue {
    public newProduct: String

}
</script>

<style>

</style>