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
    //  详情页面、新增-0、编辑-1、查看-2、绑定的事当前激活的选项
    {
      path: "/FaultDetail/:status",
      name: "FaultDetail",
      component: () => import("./views/fault/FaultDetail.vue")
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
    //  维保单位
    {
      path: "/SafeUnit",
      name: "SafeUnit",
      component: () => import("./views/guide/SafeUnit.vue")
    },
    //  消防巡查
    {
      path: "/FirePatrol",
      name: "FirePatrol",
      component: () => import("./views/guide/FirePatrol.vue")
    },
    //  消防系统
    {
      path: "/FireSystem",
      name: "FireSystem",
      component: () => import("./views/guide/FireSystem.vue")
    },
    //  todo 消防预警
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/index.vue")
    },
    //  todo 登录
    {
      path: "/warning",
      name: "warning",
      component: () => import("./views/warning/index.vue")
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
