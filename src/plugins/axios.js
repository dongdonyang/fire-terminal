import axios from "axios";
import store from "../store";

const service = axios.create({
  baseURL: "http://fd.sctsjkj.com:5080",
  timeout: 30000
});
// todo 打包上线后统一加上后端地址
// axios.defaults.baseURL = "http://fd.sctsjkj.com:5080";
console.log("service.baseURL", service.baseURL);

service.interceptors.request.use(
  function(config) {
    // let value = config.params;
    // if (value) {
    //   value.UserId = store.state.userInfo.userId; // 给所有请求加上用户id
    // }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function(response) {
    return Promise.resolve(response.data);
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default service;
