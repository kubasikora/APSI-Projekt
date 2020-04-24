<template>
    <div class= "map-card">
         <l-map
      class = "map"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
     <l-marker 
     :lat-lng="marker"
     :draggable="drag"
     @update:latLng="updateMarker"
     ></l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import { LatLng } from "leaflet";
import { namespace } from "vuex-class";
import Order from "@/models/Order";

const order = namespace("BoomerOrders");
@Component({
  components: {
  LMap,
  LTileLayer,
  LMarker,
  }
})
export default class PlaceSelection extends Vue {
    private center : Array<Number> = [0, 0]
    private url:  String = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    private zoom: Number = 15
    private bounds = null
    private attribution: String = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    private marker: LatLng = new LatLng(0,0)
    private drag : Boolean = true

    // @login.State
    // public loading: Boolean;

   @order.Action
    public setCoordinates: (coordinates: Array<number>) => void
    private zoomUpdated (zoom: Number) : void{
      this.zoom = zoom;
    }
    private centerUpdated (center: Array<Number>): void {
      this.center = center;
    }
    updateMarker(marker: L.LatLng){
       this.marker = marker
       this.setCoordinates([this.marker.lat, this.marker.lng])
    }
    mounted() {
       {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(position => {
            this.center = [position.coords.latitude, position.coords.longitude];
            this.marker.lat = position.coords.latitude, 
            this.marker.lng =position.coords.longitude;

      },
      error => {
        console.log("Error getting location");
      });
  }
}
  }
}
</script>

<style>
.map {
    height: 80%; 
    width: 100%;
    align-self: center;
}
.map-card {
    height: 63vh; 
    width: 100%;
}

</style>