import { createRouter, createWebHistory } from "vue-router";
import MapHome from "../components/MapHome.vue";

const routes = [
  {
    path: "/",
    name: "MapHome",
    component: MapHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
