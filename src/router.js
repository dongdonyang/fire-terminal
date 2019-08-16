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
          meta: {
            active: 0,
            keepAlive: true //该字段表示该页面需要缓存
          },
          component: () => import("./views/fault/index.vue")
        },
        //  todo 值班巡逻
        {
          path: "patrol",
          name: "patrol",
          meta: {
            active: 1,
            keepAlive: true //该字段表示该页面需要缓存
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
      path: "/FaultDetail/:status/:breakDownId",
      name: "FaultDetail",
      component: () => import("./views/fault/FaultDetail.vue")
    },
    //  todo 值班巡逻
    //  详情页面、新增、编辑、删除
    {
      path: "/PatrolDetail/:type/:id",
      name: "PatrolDetail",
      component: () => import("./views/patrol/PatrolDetail.vue")
    },
    //  值班记录、新增、查看
    {
      path: "/DutyRecord/:id",
      name: "DutyRecord",
      component: () => import("./views/patrol/DutyRecord.vue")
    },
    //  巡逻记录、新增、查看
    {
      path: "/PatrolRecord/:id",
      name: "PatrolRecord",
      component: () => import("./views/patrol/PatrolRecord.vue")
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
    //  提建议
    {
      path: "/AddAdvice",
      name: "AddAdvice",
      component: () => import("./views/setting/AddAdvice.vue")
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
      meta: {
        keepAlive: true //该字段表示该页面需要缓存
      },
      component: () => import("./views/warning/index.vue")
    },
    /**
     * @fileOverview 预警详情、查看、新增
     * @param ststus {Number} 状态对应编辑还是查看
     * @param checkId {Number} 当前预警Id
     */
    {
      path: "/WarningDetail/:status/:checkId",
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
// todo 登录判定 Cookies.get("isLogin")没取到值
router.beforeEach(function(to, from, next) {
  console.log(localStorage.getItem("isAdmin"));
  if (localStorage.getItem("isLogin")) {
    if (to.name === "login" || to.name === "home" || to.name === null) {
      if (localStorage.getItem("isAdmin")) {
        // 角色判断
        next("/fault");
      } else {
        next("/patrol");
      }
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
