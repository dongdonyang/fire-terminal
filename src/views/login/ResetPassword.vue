<template>
  <div class="reset-pass">
    <div>
      <base-nav title="忘记密码"></base-nav>
      <base-form :form="form" :form-list="formList"></base-form>
    </div>

    <base-button @click="resetPassword">确定</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 16:01
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "ResetPassword",
  components: {},
  props: {},
  data() {
    return {
      form: {},
      formList: [
        {
          icon: require("../../assets/wjmm_img_03.png"),
          remind: "请设置新密码",
          value: "account"
        },
        {
          icon: require("../../assets/wjmm_img_04.png"),
          remind: "请再次输入密码",
          value: "account"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 重置密码、跳转到登录页面
    resetPassword() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
@import "../../style/app";
.reset-pass {
  @include my-flex();
}
</style>
