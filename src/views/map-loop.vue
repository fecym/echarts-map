<template>
  <div class="map-page">
    <map-header />
    <div id="map-container" />
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import * as echarts from "echarts";
import "echarts-gl";
import mapJson from "@/assets/json/china.json";
import { mapName, mapOptions } from "@/utils/contant";
import MapHeader from "@/views/map-header.vue";

const mapChart = ref(null);
const timer = ref(null);
const index = ref(-1);

function resizeMap() {
  mapChart.value?.resize();
}

function initMap() {
  mapChart.value = echarts.init(document.getElementById("map-container"));
  echarts.registerMap(mapName, mapJson);
  mapChart.value.setOption(mapOptions);
  window.addEventListener("resize", resizeMap);
}

function onMouseover(ev) {
  console.log(ev.data, "ev");
  // 停止定时器，清除之前的高亮
  clearInterval(timer.value);
  timer.value = null;
  console.log(timer.value);
  mapChart.value.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    dataIndex: index.value,
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
  const dataLength = mapJson.features.length;
  index.value = 0;
  clearInterval(timer.value);
  timer.value = setInterval(() => {
    // 清除之前的高亮
    mapChart.value.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: index.value,
    });
    // 计算下一个要高亮的索引
    index.value = (index.value + 1) % dataLength;
    // 当前下标高亮
    mapChart.value.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: index.value,
    });
    mapChart.value.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index.value,
    });
  }, 2000);
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
