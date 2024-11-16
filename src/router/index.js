import { createRouter, createWebHistory } from "vue-router";
import moduleRoutes from "./importAll";

const constantRoutes = [
  {
    path: "/",
    // redirect: "/map-line",
    redirect: "/map-line-loop-hover",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes, ...moduleRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
