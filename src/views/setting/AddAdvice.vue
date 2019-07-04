<template>
  <div>
    <base-nav title="我要提建议"></base-nav>
    <van-field
      v-model="value"
      type="textarea"
      rows="12"
      placeholder="在这请输入您的建议内容"
    ></van-field>
    <div>
      <van-button class="large-but" type="primary" size="large"
        >提交</van-button
      >
    </div>
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
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss"></style>
