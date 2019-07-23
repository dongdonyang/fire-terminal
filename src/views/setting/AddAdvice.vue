<template>
  <div class="add-advice">
    <div>
      <base-nav title="我要提建议"></base-nav>
      <van-field
        v-model="suggest"
        type="textarea"
        rows="12"
        placeholder="在这请输入您的建议内容"
      ></van-field>
    </div>
    <base-button @click="submit">提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/3 09:43
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "AddAdvice",
  components: {},
  props: {},
  data() {
    return {
      suggest: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 提交建议
    submit() {
      this.$axios
        .post(this.$api.ADD_ADVICE, { suggest: this.suggest })
        .then(res => {
          if (res.success) {
            this.$toast.success("提交建议成功");
            this.$router.back();
          }
        });
    }
  }
};
</script>

<style lang="scss">
@import "../../style/app";
.add-advice {
  @include my-flex();
}
</style>
