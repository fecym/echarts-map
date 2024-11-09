<template>
  <div class="map-page">
    <map-header />
    <div id="map-container" />
  </div>
</template>
<script setup>
import * as echarts from "echarts";
// import "echarts-gl";
import { onBeforeUnmount, onMounted, ref } from "vue";
import mapJson from "@/assets/json/china.json";

import {
  genLinesSeries,
  genPointSeries,
  getCoordsByName,
  mapName,
  mapOptions,
  pinghuCoords,
  provinceNames,
} from "@/utils/contant";
import MapHeader from "@/views/map-header.vue";
import cloneDeep from "lodash/cloneDeep";

const mapChart = ref(null);
const timer = ref(null);
const index = ref(-1);
const options = ref(null);

options.value = cloneDeep(mapOptions);
options.value.tooltip.show = false;

const pointSeries = genPointSeries([pinghuCoords], "平湖市");
options.value.series.push(pointSeries);

function resizeMap() {
  mapChart.value?.resize();
}

function initMap() {
  mapChart.value = echarts.init(document.getElementById("map-container"));
  echarts.registerMap(mapName, mapJson);
  mapChart.value.setOption(options.value);
  window.addEventListener("resize", resizeMap);
}

function onMouseover(ev) {
  const data = ev.data;
  console.log(data, "ev");
  // 停止定时器，清除之前的高亮
  clearInterval(timer.value);
  timer.value = null;
  mapChart.value.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    name: data.name,
  });
  if (!data.adcode || !data.name) return;
  highlightAreaAndAddPoint(data.name);
}

function highlightAreaAndAddPoint(name) {
  if (options.value.series.length > 2) {
    options.value.series.length = Math.min(options.value.series.length, 2);
  }

  const coordsObj = getCoordsByName(name);

  const lineData = [{ coords: [pinghuCoords.coords, coordsObj.center] }];
  // 添加一个点
  options.value = {
    ...options.value,
    series: [
      ...options.value.series,
      genPointSeries([coordsObj], name),
      genLinesSeries(lineData),
    ],
  };
  mapChart.value.setOption(options.value);
  // 当前下标高亮
  mapChart.value.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    name,
  });
  mapChart.value.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    name,
  });
}

function removeEvent() {
  mapChart.value.off("mouseover", onMouseover);
  mapChart.value.off("mouseout", mapActive);
}

function bindEvent() {
  // 鼠标划入
  mapChart.value.on("mouseover", onMouseover);
  // 鼠标划出重新定时器开始
  mapChart.value.on("mouseout", mapActive);
}

function mapActive() {
  const dataLength = provinceNames.length;
  index.value = 0;
  clearInterval(timer.value);
  timer.value = setInterval(() => {
    // 清除之前的高亮
    mapChart.value.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      name: provinceNames[index.value],
    });
    // 计算下一个要高亮的索引
    index.value = (index.value + 1) % dataLength;
    highlightAreaAndAddPoint(provinceNames[index.value]);
  }, 3000);
}

onMounted(() => {
  initMap();
  bindEvent();
  mapActive();
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
  removeEvent();
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
