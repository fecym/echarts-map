import { createRouter, createWebHistory } from "vue-router";
import moduleRoutes from "./importAll";
import { getMicroAppName, isMicroApp } from "@/utils/micro.js";

const constantRoutes = [
  {
    path: "/",
    // redirect: "/map-line",
    redirect: "/map-line-loop-hover",
  },
];

const router = createRouter({
  history: createWebHistory("/" + isMicroApp() ? getMicroAppName() : ""),
  routes: [...constantRoutes, ...moduleRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
