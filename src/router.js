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
      path: "/guide",
      name: "guide",
      component: () => import("./views/guide/index.vue")
    },
    //  工作人员
    {
      path: "/AddWorker",
      name: "AddWorker",
      component: () => import("./views/guide/AddWorker.vue")
    },
    // //  维保单位
    // {
    //   path: "/AddWorker",
    //   name: "AddWorker",
    //   component: () => import("./views/guide/AddWorker.vue")
    // },
    // //  消防巡查
    // {
    //   path: "/AddWorker",
    //   name: "AddWorker",
    //   component: () => import("./views/guide/AddWorker.vue")
    // },
    // //  消防系统
    // {
    //   path: "/AddWorker",
    //   name: "AddWorker",
    //   component: () => import("./views/guide/AddWorker.vue")
    // },
    //  todo 登录
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/index.vue")
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
