import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  routes: [
    //  todo 首页
    {
      path: "/",
      name: "home",
      component: () => import("./views/index.vue"),
      children: [
        //  todo 设施故障
        {
          path: "fault",
          name: "fault",
          component: () => import("./views/fault/index.vue")
        },
        //  todo 值班巡逻
        {
          path: "patrol",
          name: "patrol",
          component: () => import("./views/patrol/index.vue")
        },
        //  todo 物联终端
        {
          path: "terminal",
          name: "terminal",
          component: () => import("./views/terminal/index.vue")
        },
        //  todo 我的设置
        {
          path: "setting",
          name: "setting",
          component: () => import("./views/setting/index.vue")
        }
      ]
    },
    //  todo 设施故障
    {
      path: "",
      name: "",
      component: () => import("./views/")
    },
    //  todo 值班巡逻
    {
      path: "",
      name: "",
      component: () => import("./views/")
    },
    //  todo 物联终端
    {
      path: "",
      name: "",
      component: () => import("./views/")
    },
    //  todo 我的设置
    {
      path: "",
      name: "",
      component: () => import("./views/")
    },
    //  todo 引导
    {
      path: "",
      name: "",
      component: () => import("./views/")
    },
    //  todo 登录
    {
      path: "",
      name: "",
      component: () => import("./views/")
    },
    //  todo 注册
    {
      path: "",
      name: "",
      component: () => import("./views/")
    }
  ]
});
export default router;
