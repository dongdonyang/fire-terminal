const API = {
  //  todo 登录注册
  Add: "/api/services/app/FireUnitUser/Add", //添加账号
  USER_LOGIN: "/api/services/app/FireUnitUser/UserLoginForMobile", //用户登录
  QUERY_FIRE_UNIT_LIKE_NAME: "/api/services/app/FireUnit/QueryFireUnitLikeName", //查询防火单位名称(模糊查询)
  INVITAT_VERIFY: "/api/services/app/FireUnit/InvitatVerify", //邀请码验证
  USER_REGISTUSER_REGIST: "/api/services/app/FireUnitUser/UserRegist", //用户注册

  // todo 引导页
  GET_FIRE_UNIT_PEOPLE: "/api/services/app/AppGuideSet/GetFireUnitPeople", //获取防火单位工作人员
  GetUserInfo: "/api/services/app/AppGuideSet/GetUserInfo", //获取工作人员详情
  UpdateUserInfo: "/api/services/app/AppGuideSet/UpdateUserInfo", //编辑工作人员信息
  ADD_USER: "/api/services/app/AppGuideSet/AddUser", //新增工作人员

  // todo 维保单位和消防巡查
  UpdateGuideSet: "/api/services/app/AppGuideSet/UpdateGuideSet", //更新防火单位引导设置
  GetFireUnitInfo: "/api/services/app/FireUnit/GetFireUnitInfo", //防火单位详情

  //todo 设施故障
  GET_BREAK_DOWNLIST: "/api/services/app/BreakDownService/GetBreakDownlist", //获取设施故障列表
  GET_BREAK_DOWN_INFO: "/api/services/app/BreakDownService/GetBreakDownInfo", //获取设施故障详情
  UPDATE_BREAK_DOWN_INFO:
    "/api/services/app/BreakDownService/UpdateBreakDownInfo", //更新设施故障详情

  // todo 消防系统
  GET_FIRE_SYSTEM: "/api/services/app/AppGuideSet/GetFireSystem", //获取消防系统
  GetFireUnitSystem: "/api/services/app/AppGuideSet/GetFireUnitSystem", //获取防火单位消防系统
  UpdateFireUnitSystem: "/api/services/app/AppGuideSet/UpdateFireUnitSystem", //更新防火单位消防系统
  AddFireSystem: "/api/services/app/AppGuideSet/AddFireSystem", //增加消防系统

  //  todo 终端设备
  GET_END_DEVICE_OPTIONS: "/api/services/app/Device/GetEndDeviceOptions", //获取终端设备筛选选项
  GET_FIRE_UNIT_END_DEVICE_STATE:
    "/api/services/app/Device/GetFireUnitEndDeviceState", //获取防火单位的终端状态
  GET_RECORD_ANALOG: "/api/services/app/Device/GetRecordAnalog", //获得防火单位终端历史记录

  //  todo 消防预警
  GET_ALARM_CHECKS: "/api/services/app/Alarm/GetAlarmChecks", //获取指定防火单位警情数据
  GET_ALARM_CHECK_DETAIL: "/api/services/app/Alarm/GetAlarmCheckDetail", //查询给定checkId的警情详细信息
  CHECK_ALARM: "/api/services/app/Alarm/CheckAlarm", //核警某一条警情[FromForm]

  //  todo 值班
  GET_DUTY_LIST: "/api/services/app/DutyAndPatrolService/GetDutylist", //获取值班记录列表
  GET_DUTY_INFO: "/api/services/app/DutyAndPatrolService/GetDutyInfo", //获取值班记录详情
  ADD_DUTY_INFO: "/api/services/app/DutyAndPatrolService/AddDutyInfo", //新增值班记录

  //todo 巡查
  GET_PATROL_LIST: "/api/services/app/DutyAndPatrolService/GetPatrollist", //获取巡查记录列表
  GET_PATROL_TRACK_LIST:
    "/api/services/app/DutyAndPatrolService/GetPatrolTrackList", //获取巡查记录轨迹
  GetFireUnitlSystem:
    "/api/services/app/DutyAndPatrolService/GetFireUnitlSystem", //获取防火单位消防系统
  AddPatrolTrack: "/api/services/app/DutyAndPatrolService/AddPatrolTrack", //添加巡查记录
  GET_PATROL_TYPE: "/api/services/app/DutyAndPatrolService/GetPatrolType", //新增时获取巡查记录类别

  //  todo 设置
  ADD_EQUIPMENT_NO: "/api/services/app/AppGuideSet/AddEquipmentNo", //绑定设施编码
  GetEquipmentNoInfo: "/api/services/app/AppGuideSet/GetEquipmentNoInfo", //扫码获取信息
  ADD_ADVICE: "/api/services/app/Version/Add", //添加建议
  Get_Select_Safe_Units: "/api/services/app/SafeUnit/GetSelectSafeUnits", //选择查询维保单位
  CHANGE_PASSWORD: "/api/services/app/FireDeptUser/ChangePassword" //修改密码
};
export default API;
