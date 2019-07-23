<template>
  <div class="change-pass">
    <div>
      <base-nav title="修改密码"></base-nav>
      <base-form :form="form" :form-list="formList"></base-form>
    </div>
    <base-button @click="submit">提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 10:00
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "ChangePassword",
  components: {},
  props: {},
  data() {
    return {
      form: {},
      formList: [
        {
          icon: require("../../assets/wjmm_img_02.png"),
          remind: "请输入原密码",
          value: "oldPassword",
          type: "password"
        },
        {
          icon: require("../../assets/wjmm_img_03.png"),
          remind: "请设置新密码",
          value: "newPassword",
          type: "password"
        },
        {
          icon: require("../../assets/wjmm_img_04.png"),
          remind: "请再次输入密码",
          value: "sureNewPassword",
          type: "password"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 修改密码
    submit() {
      if (this.form.newPassword !== this.form.sureNewPassword) {
        this.$toast.fail("两次密码不一致！");
        return;
      }
      this.form.account = 123456789;
      // this.form.account = this.$store.state.userInfo.account;
      this.$axios.post(this.$api.CHANGE_PASSWORD, this.form).then(res => {
        if (res.success) {
          if (res.result.success) {
            this.$toast.success("修改密码成功！");
            this.$router.back();
          } else {
            this.$toast.fail(res.result.failCause);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../style/app";
.change-pass {
  @include my-flex();
}
</style>
