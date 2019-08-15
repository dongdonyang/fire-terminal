import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // todo 巡查结果字段替换
    getStatus: {
      0: "未指定",
      1: "正常",
      2: "绿色异常",
      3: "橙色异常"
    },
    // 巡查结果字段颜色
    getStatusColor: {
      0: "",
      1: "#67c23a",
      2: "#67c23a",
      3: "#e6a23c"
    },
    getAction: {
      0: "未指定",
      1: "值班",
      2: "巡查",
      3: "物联终端"
    },
    userInfo: {}, // 用户登录信息、1-管理员、2-值班员、3-巡查员
    token: 0 // 保存的登录token信息
  },

  // todo this.$store.commit("increment")
  mutations: {
    // 设置用户信息
    setUserInfo(state, payload = {}, token = 0) {
      state.userInfo = payload ? payload : {};
      state.token = token;
    }
  },

  // todo this.$store.dispatch("increment")
  actions: {}
});
