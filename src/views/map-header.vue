<template>
  <div class="nav">
    <div class="nav-item" v-for="item in nacList" :key="item.title">
      <router-link :to="item.route">{{ item.title }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const nacList = ref([
  { title: "地图飞线", route: "/map-line" },
  { title: "循环高亮", route: "/map-loop" },
]);
</script>

<style lang="scss">
.nav {
  display: flex;
  height: 40px;
  background-color: #000;
  line-height: 40px;

  .nav-item {
    width: 90px;
    color: #fff;
    text-align: center;
  }
}
</style>
