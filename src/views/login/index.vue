<template>
  <div class="login">
    <!--    TODO 头部title-->
    <van-nav-bar class="header-style" title="登录"></van-nav-bar>

    <!--    todo 登录main-->
    <div class="login-main">
      <div>
        <img width="90%" src="../../assets/load_img_01.png" alt="" />
        <p>{{ title }}</p>
      </div>
      <van-cell-group>
        <van-field v-model="form.account" placeholder="请输入手机号">
          <img slot="left-icon" src="../../assets/load_img_02.png" alt="" />
        </van-field>

        <van-field
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        >
          <img slot="left-icon" src="../../assets/load_img_03.png" alt="" />
        </van-field>
      </van-cell-group>
      <div class="login-main-pass">
        <van-checkbox v-model="isAuto">自动登录</van-checkbox>
        <van-button type="primary" size="small">忘记密码</van-button>
      </div>
      <van-button
        @click="login"
        class="login-main-but large-but"
        type="primary"
        size="large"
        >登录</van-button
      >
      <van-button
        class="login-main-but-last large-but"
        type="primary"
        size="large"
        >注册</van-button
      >
    </div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/6/27 14:01
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      isAuto: true,
      title: "防火单位作业终端",
      form: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 登录、判断之前有没有设置过引导页，没有设置则跳转引导页，否则根据角色跳转到相应的页面、判断是否勾选自动登录
    login() {
      let f = this.form;
      if (!f.account || !f.password) {
        this.$toast("请输入账号和密码！");
        return;
      }
      this.$axios.post(this.$api.USER_LOGIN, f).then(res => {
        if (res.success) {
          let r = res.result;
          let role = r.rolelist.includes(1); // 角色
          let router = role ? "/fault" : "/patrol"; // 路由
          // 账号错误
          if (!r.success) {
            this.$toast(r.failCause);
            return;
          }
          // 是否自动登录
          this.$cookies.set("isLogin", 1);
          this.$cookies.set("userInfo", r);
          this.$store.commit("setUserInfo", r);
          // if (this.isAuto) {
          // } else {
          // }
          //  是否跳转引导页
          if (r.guideFlage) {
            this.$router.push("/guide");
          } else {
            // 角色不同跳不同的主页、权限不同
            this.$router.push(router);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  /*  todo 登录main*/
  &-main {
    margin-top: 50px;
    padding: 10px 20px;
    & > :nth-child(1) {
      text-align: center;
    }
    &-pass {
      display: flex;
      justify-content: space-between;
      padding: 20px 16px;
    }
    &-but {
      &-last {
        margin-top: 20px;
      }
    }
  }
}
</style>
