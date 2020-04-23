<template>
    <div style="height: 90%; width=100%">
         <l-map
      style="height: 100%; width: 90%"
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

    private zoomUpdated (zoom: Number) : void{
      this.zoom = zoom;
    }
    private centerUpdated (center: Array<Number>): void {
      this.center = center;
    }
    updateMarker(marker: L.LatLng){
        console.log('before',this.marker)
       this.marker = marker
       console.log('after', this.marker)
       

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

</style>