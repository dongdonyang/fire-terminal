import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Cookies from "js-cookie";

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
          meta: {
            active: 0
          },
          component: () => import("./views/fault/index.vue")
        },
        //  todo 值班巡逻
        {
          path: "patrol",
          name: "patrol",
          meta: {
            active: 1
          },
          component: () => import("./views/patrol/index.vue")
        },
        //  todo 物联终端
        {
          path: "terminal",
          name: "terminal",
          meta: {
            active: 2
          },
          component: () => import("./views/terminal/index.vue")
        },
        //  todo 我的设置
        {
          path: "setting",
          name: "setting",
          meta: {
            active: 3
          },
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
    //  详情页面、新增、编辑、删除
    {
      path: "/PatrolDetail/:status",
      name: "PatrolDetail",
      component: () => import("./views/patrol/PatrolDetail.vue")
    },
    //  todo 物联终端
    {
      path: "",
      name: "",
      component: () => import("./views/")
    },
    //  todo 我的设置
    //  绑定设施编号
    {
      path: "/BingNumber",
      name: "BingNumber",
      component: () => import("./views/setting/BingNumber.vue")
    },
    //  修改密码
    {
      path: "/ChangePassword",
      name: "ChangePassword",
      component: () => import("./views/setting/ChangePassword.vue")
    },
    //  技术支持
    {
      path: "/TechnicalSupport",
      name: "TechnicalSupport",
      component: () => import("./views/setting/TechnicalSupport.vue")
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
    //  todo 登录
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/index.vue")
    },
    //  验证手机号
    {
      path: "/CheckPhone",
      name: "CheckPhone",
      meta: {
        notCheck: 1
      }, // 跳过登录验证
      component: () => import("./views/login/CheckPhone.vue")
    },
    //  重置密码
    {
      path: "/ResetPassword",
      name: "ResetPassword",
      meta: {
        notCheck: 1
      }, // 跳过登录验证
      component: () => import("./views/login/ResetPassword.vue")
    },
    //  todo 消防预警
    {
      path: "/warning",
      name: "warning",
      component: () => import("./views/warning/index.vue")
    },
    //  预警详情、查看、新增
    {
      path: "/WarningDetail/:status",
      name: "WarningDetail",
      component: () => import("./views/warning/WarningDetail.vue")
    },
    //  todo 注册
    {
      path: "/RegisterOne",
      name: "RegisterOne",
      meta: {
        notCheck: 1
      }, // 跳过登录验证
      component: () => import("./views/login/RegisterOne.vue")
    },
    {
      path: "/RegisterTwo",
      name: "RegisterTwo",
      meta: {
        notCheck: 1
      }, // 跳过登录验证
      component: () => import("./views/login/RegisterTwo.vue")
    }
  ]
});
// todo 登录判定
router.beforeEach(function(to, from, next) {
  if (Cookies.get("isLogin")) {
    //表示登陆状态
    if (to.name === "login") {
      next("/home");
    } else {
      next();
    }
  } else {
    if (to.name !== "login" && !to.meta.notCheck) {
      next("/login");
    } else {
      next(); //放行了,不能少，否则不会执行跳转
    }
  }
});
export default router;
