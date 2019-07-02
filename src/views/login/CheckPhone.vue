<template>
  <div class="check-phone">
    <base-nav title="忘记密码"></base-nav>
    <van-cell-group>
      <van-field v-model="form.account" placeholder="请输入手机号">
        <img
          width="70%"
          slot="left-icon"
          src="../../assets/load_img_02.png"
          alt=""
        />
      </van-field>

      <van-field
        v-model="form.sms"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <img
          width="70%"
          slot="left-icon"
          src="../../assets/wjmm_img_02.png"
          alt=""
        />
        <van-button slot="button" size="small" type="primary"
          >发送验证码</van-button
        >
      </van-field>
    </van-cell-group>
    <div>
      <van-button
        class="large-but"
        type="primary"
        size="large"
        @click="$router.push('ResetPassword')"
        >下一步</van-button
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
  name: "CheckPhone",
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
  methods: {}
};
</script>

<style lang="scss">
.check-phone {
  & > :last-child {
    margin-top: 15px;
    padding: 15px;
  }
}
</style>
