import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'modern-normalize';
import "virtual:uno.css";
import "./styles/main.css";
import VConsole from "vconsole";

const app = createApp(App);

// Only enable VConsole in development mode
if (import.meta.env.DEV) {
  new VConsole();
}

const ctx = {
  app,
  router,
};

// 安装所有模块
Object.values(import.meta.glob('./modules/*.js', { eager: true }))
  .forEach(i => i.install?.(ctx))
app.mount("#app");
