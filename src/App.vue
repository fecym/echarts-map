<template>
  <router-view />
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
#map-tooltip {
  width: 195px;
  height: 110px;
  padding: 12px;
  box-sizing: border-box;
  color: #fff;
  border-radius: 4px;
  background: rgba(231, 176, 72, 0.2);
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.3);
  border: 1px solid #fbda9c;
  backdrop-filter: blur(5px);
  span {
    display: block;
    line-height: 1.6;
  }
}
</style>
