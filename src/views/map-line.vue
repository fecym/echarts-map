<template>
  <div class="map-page">
    <map-header />
    <div id="map-container" />
  </div>
</template>
<script setup>
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from "vue";
import * as echarts from "echarts";
// import "echarts-gl";
import mapJson from "@/assets/json/china.json";

import {
  genLinesSeries,
  genPointSeries,
  mapName,
  mapOptions,
  pinghuCoords,
  provinceCenters,
} from "@/utils/contant";

const MapHeader = defineAsyncComponent(() => import("@/views/map-header.vue"));

const mapChart = ref(null);

const lineData = provinceCenters.map(x => {
  return { coords: [pinghuCoords.coords, x.center] };
});

const options = {
  ...mapOptions,
  series: [
    ...mapOptions.series,
    genPointSeries(provinceCenters, "中心点"),
    genLinesSeries(lineData),
  ],
};

function resizeMap() {
  mapChart.value?.resize();
}

function initMap() {
  mapChart.value = echarts.init(document.getElementById("map-container"));
  echarts.registerMap(mapName, mapJson);
  mapChart.value.setOption(options);
  window.addEventListener("resize", resizeMap);
}

onMounted(() => {
  initMap();
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeMap);
});
</script>

<style lang="scss">
.map-page {
  width: 100%;
  background-color: #004e92;

  #map-container {
    margin: auto;
    width: 1000px;
    height: calc(100vh - 40px);
  }
}
</style>
