import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupMountApp, isMicroApp } from "./utils/micro.js";

const initApp = (props = {}) => {
  const app = createApp(App);
  app.use(router).use(store);
  app.mount(props?.container?.querySelector("#app") || "#app");
  return app;
};
if (!isMicroApp()) {
  initApp();
} else {
  setupMountApp(initApp);
}
