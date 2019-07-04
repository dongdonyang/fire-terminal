<template>
  <div class="register-one flex-between">
    <div>
      <base-nav title="消防管理员注册"></base-nav>
      <base-form :form="form" :form-list="formList"></base-form>
      <div class="register-one-notice">{{ notice }}</div>
    </div>

    <base-button @click="$router.push('/RegisterTwo')">下一步</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 16:39
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "RegisterOne",
  components: {},
  props: {},
  data() {
    return {
      notice:
        "管理员拥有全部权限，只能通过邀请码进行注册，请妥善保管邀请码，勿对外泄露。",
      form: {},
      formList: [
        {
          icon: require("../../assets/load_img_06.png"),
          remind: "请输入单位名称",
          value: "account"
        },
        {
          icon: require("../../assets/load_img_07.png"),
          remind: "请输入邀请码",
          value: "account"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
@import "../../style/app-variables";
.register-one {
  &-notice {
    padding: 15px;
    font-size: $notice-size;
    color: $notice-color;
  }
}
</style>
