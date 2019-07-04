<template>
  <div class="change-pass">
    <div>
      <base-nav title="修改密码"></base-nav>
      <base-form :form="form" :form-list="formList"></base-form>
    </div>
    <base-button>提交</base-button>
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
          value: ""
        },
        {
          icon: require("../../assets/wjmm_img_03.png"),
          remind: "请设置新密码",
          value: ""
        },
        {
          icon: require("../../assets/wjmm_img_04.png"),
          remind: "请再次输入密码",
          value: ""
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
@import "../../style/app";
.change-pass {
  @include my-flex();
}
</style>
