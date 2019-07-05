import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vant";
import "./plugins/BaseComponents"; // 基础公共组件
import api from "./plugins/api.js";
import axios from "./plugins/axios.js";
import Cookies from "js-cookie";

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.prototype.$cookies = Cookies;
Vue.config.productionTip = false;

//todo 获取用户信息、然后存在vuex中、以供全局使用、目前根据session中的数据来判断有没有登录的，因为cookie后端设置前端获取不到
let val = localStorage.getItem("setUserInfo");
if (val) {
  let info = JSON.parse(val);
  let tok = localStorage.getItem("isLogin");
  console.log("token信息：", tok);
  console.log("用户信息：", info);
  store.commit("setUserInfo", info, tok);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
