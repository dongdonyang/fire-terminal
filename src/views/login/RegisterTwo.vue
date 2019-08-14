<template>
  <div class="flex-between">
    <div>
      <base-nav title="消防管理员注册"></base-nav>
      <van-cell title="单位名称">{{ form.fireUnitName }}</van-cell>
      <base-form :form="form" :form-list="formList"></base-form>
    </div>

    <base-button @click="logon">注册</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 16:40
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "RegisterTwo",
  components: {},
  props: {},
  data() {
    return {
      form: {},
      formList: [
        // {
        //   icon: require("../../assets/load_img_06.png"),
        //   remind: "请输入单位名称",
        //   value: "fireUnitName"
        // },
        {
          icon: require("../../assets/load_img_08.png"),
          remind: "请输入真实姓名",
          value: "userName"
        },
        {
          icon: require("../../assets/load_img_09.png"),
          remind: "请输入手机号",
          value: "phone"
        },
        {
          icon: require("../../assets/wjmm_img_03.png"),
          remind: "请输入登录密码",
          type: "password",
          value: "password"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.form.fireUnitName = localStorage.getItem("unitName");
    this.form.invitatCode = localStorage.getItem("invitatCode");
  },
  mounted() {},
  methods: {
    //  todo 注册
    logon() {
      this.$axios
        .post(this.$api.USER_REGISTUSER_REGIST, this.form)
        .then(res => {
          if (res.success) {
            this.$toast.success("注册成功");
            this.$router.push("/login");
          }
        });
    }
  }
};
</script>

<style lang="scss"></style>
