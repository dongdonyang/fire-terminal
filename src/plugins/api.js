const API = {
  //  todo 登录注册
  Add: "/api/services/app/FireUnitUser/Add", //添加账号
  USER_LOGIN: "/api/services/app/FireUnitUser/UserLogin", //用户登录

  // todo 引导页
  GetFireUnitPeople: "/api/services/app/AppGuideSet/GetFireUnitPeople", //获取防火单位工作人员
  GetUserInfo: "/api/services/app/AppGuideSet/GetUserInfo", //获取工作人员详情
  UpdateUserInfo: "/api/services/app/AppGuideSet/UpdateUserInfo", //编辑工作人员信息
  AddUser: "/api/services/app/AppGuideSet/AddUser", //新增工作人员

  // todo 维保单位和消防巡查
  UpdateGuideSet: "/api/services/app/AppGuideSet/UpdateGuideSet", //更新防火单位引导设置
  GetFireUnitInfo: "/api/services/app/FireUnit/GetFireUnitInfo", //防火单位详情

  // todo 消防系统
  GetFireSystem: "/api/services/app/AppGuideSet/GetFireSystem", //获取消防系统
  GetFireUnitSystem: "/api/services/app/AppGuideSet/GetFireUnitSystem", //获取防火单位消防系统
  UpdateFireUnitSystem: "/api/services/app/AppGuideSet/UpdateFireUnitSystem", //更新防火单位消防系统
  AddFireSystem: "/api/services/app/AppGuideSet/AddFireSystem", //增加消防系统
  GET_FIRE_UNIT_TYPE_HISTOGRAM:
      "/api/services/app/BigScreen/GetFireUnitTypeHistogram", // 防火单位：类型柱状图
};
export default API;
