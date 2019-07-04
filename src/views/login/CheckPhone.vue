<template>
  <div class="check-phone flex-between">
    <div>
      <base-nav title="忘记密码"></base-nav>
      <base-form
        :form="form"
        :form-list="formList"
        @mySlotClick="getCode"
      ></base-form>
    </div>

    <base-button @click="$router.push('ResetPassword')">下一步</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 16:01
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "CheckPhone",
  components: {},
  props: {},
  data() {
    return {
      form: {},
      formList: [
        {
          icon: require("../../assets/load_img_02.png"),
          remind: "请输入手机号",
          value: ""
        },
        {
          icon: require("../../assets/wjmm_img_02.png"),
          remind: "请输入短信验证码",
          value: "",
          mySolt: "sendCode"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 获取短信验证码
    getCode() {}
  }
};
</script>

<style lang="scss">
.check-phone {
}
</style>
