<template>
<div>
     <v-row style="margin-top: 5%">
     <v-slider
         
          v-model="distance"
          :min="10"
          :max="20000"
          :disabled="false"
          :readonly="false"
           :thumb-size="50"
            thumb-label="always"
          label="Zasięg wyszukiwania"
        >
        <template v-slot:thumb-label="{ value }">
              {{(value/1000).toFixed(2)+" km" }}
            </template></v-slider>
    
      <v-dialog
        v-model="dialog"
        width="80%"
      >
        <template v-slot:activator="{ on }">
          <v-btn
                 color="warning"
                  dark
                  small
                  left
                  top
                  fab
                   v-on="on"
                >
                  <v-icon>mdi-map-marker</v-icon>
                </v-btn>
        </template>
  
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Zaznacz swoje położenie
          </v-card-title>
  
          <v-card-body>
         <PlaceSelection :showButtons="false" />
          </v-card-body>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
     </v-row>
     <v-row align="center"
            justify="center">
       <v-btn large color="accent" @click="search">Szukaj</v-btn>
     </v-row>
</div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import PlaceSelection from "@/components/PlaceSelection.vue";

const tasks = namespace("Tasks");
const order = namespace("BoomerOrders");
@Component({
  components: {
  PlaceSelection
  }
})
export default class SearchingBoomerPanel extends Vue {
     private distance: Number= 100;
     private dialog: Boolean = false;
      @order.Action
    public setCoordinates: (coordinates: Array<number>) => void
     @tasks.Action
     public getCreatedOrders: (distance: Number) => void
    
    search(){

        this.getCreatedOrders(this.distance)
    }
     mounted() {
       {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(position => {
            this.setCoordinates([position.coords.latitude, position.coords.longitude])

      },
      error => {
        console.log("Error getting location");
      });
      
  }
}
  }

}
</script>

<style >

</style>