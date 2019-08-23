import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vant";
import "./plugins/element";
import "./plugins/BaseComponents"; // 基础公共组件
import api from "./plugins/api.js";
import axios from "./plugins/axios.js";
import Cookies from "js-cookie";
import { Toast } from "vant";

Vue.use(Toast);

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.prototype.$cookies = Cookies;
Vue.prototype.$url = "http://fd.sctsjkj.com:5081"; // 服务器地址
Vue.config.productionTip = false;
// 修改物理返回键
Vue.prototype.setBackButton = function(fun) {
  plus.key.removeEventListener("backbutton", function() {});
  plus.key.addEventListener("backbutton", function() {
    fun();
    plus.key.removeEventListener("backbutton", function() {});
    plus.key.addEventListener("backbutton", function() {
      // alert(location.hash.split("/")[1]);
      let url = location.hash.split("/")[1];
      if (
        url === "fault" ||
        url === "patrol" ||
        url === "terminal" ||
        url === "setting" ||
        url === "guide" ||
        url === "login"
      ) {
        // 处于app首页,满足退出app操作
        plus.runtime.quit();
      } else {
        window.history.back();
      }
      // plus.key.removeEventListener("backbutton", function() {});
    });
  });
};

// todo 设置状态栏颜色

//todo 获取用户信息、然后存在vuex中、以供全局使用、目前根据session中的数据来判断有没有登录的，因为cookie后端设置前端获取不到
let val = localStorage.getItem("setUserInfo");
if (val) {
  let info = JSON.parse(val);
  let tok = localStorage.getItem("isLogin");
  console.log("token信息：", tok);
  console.log("用户信息：", info);
  store.commit("setUserInfo", info, tok);
}

// document.addEventListener("plusready", function() {
//   // 注册返回按键事件
//   plus.key.addEventListener("backbutton", function() {
//     window.history.back();
//     // let t = setTimeout(()=>{
//     //
//     // },200)
//   });
// });

document.addEventListener("plusready", function() {
  let time = ""; // 用来存上一次按键时间；
  plus.key.addEventListener(
    "backbutton",
    function() {
      let url = location.hash.split("/")[1];
      if (
        url === "fault" ||
        url === "patrol" ||
        url === "terminal" ||
        url === "setting" ||
        url === "guide" ||
        url === "login"
      ) {
        // 处于app首页,满足退出app操作
        console.log("满足条件");
        if (new Date() - time < 2000) {
          // 小于2s,退出程序
          plus.runtime.quit();
        } else {
          // 大于2s，重置时间戳，
          time = new Date();
          Toast("再次点击退出");
        }
        return;
      } else {
        // console.log("不满足条件");
        window.history.back();
      }
    },
    false
  );
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
