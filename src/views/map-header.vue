<template>
  <div class="nav">
    <div class="nav-item" v-for="item in nacList" :key="item.title">
      <router-link :to="item.route">{{ item.title }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const nacList = ref([
  { title: "地图飞线", route: "/map-line" },
  { title: "循环高亮", route: "/map-loop" },
  { title: "同时支持", route: "/map-line-loop" },
  { title: "hover支持", route: "/map-line-loop-hover" },
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

    a {
      color: #ffffff;
      text-decoration: none;
    }
  }
}
</style>
