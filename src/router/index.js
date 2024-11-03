import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import moduleRoutes from "./importAll";

const constantRoutes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

console.log(import.meta.env.BASE_URL, "import.meta.env.BASE_URL");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes, ...moduleRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
