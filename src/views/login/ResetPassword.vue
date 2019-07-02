<template>
  <div class="reset-pass">
    <base-nav title="忘记密码"></base-nav>
    <van-cell-group>
      <van-field v-model="form.account" placeholder="请设置新密码">
        <img
          width="70%"
          slot="left-icon"
          src="../../assets/wjmm_img_03.png"
          alt=""
        />
      </van-field>

      <van-field v-model="form.account" placeholder="请再次输入密码">
        <img
          width="70%"
          slot="left-icon"
          src="../../assets/wjmm_img_04.png"
          alt=""
        />
      </van-field>
    </van-cell-group>
    <div>
      <van-button
        class="large-but"
        type="primary"
        size="large"
        @click="resetPassword"
        >确定</van-button
      >
    </div>
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
      form: {}
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
.reset-pass {
  & > :last-child {
    padding: 15px;
    margin-top: 15px;
  }
}
</style>
