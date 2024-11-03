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
];
