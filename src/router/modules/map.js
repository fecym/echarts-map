export default [
  {
    path: "/map-loop",
    name: "map-loop",
    component: () => import("@/views/map-loop.vue"),
  },
  {
    path: "/map-line",
    name: "map-line",
    component: () => import("@/views/map-line.vue"),
  },
  {
    path: "/map-line-loop",
    name: "map-line-loop",
    component: () => import("@/views/map-line-loop.vue"),
  },
  {
    path: "/map-line-loop-hover",
    name: "map-line-loop-hover",
    component: () => import("@/views/map-line-loop-hover.vue"),
  },
];
