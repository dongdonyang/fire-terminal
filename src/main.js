import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vant";
import api from "./plugins/api.js";
import axios from "./plugins/axios.js";

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
