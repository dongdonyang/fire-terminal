<template>
  <div>
    <base-nav title="新增巡查轨迹"></base-nav>
    <van-cell-group>
      <van-cell title="巡查地点" value="内容"></van-cell>
      <van-cell title="巡查系统" value="内容"></van-cell>
      <van-switch-cell
        v-model="form.checked"
        title="发现问题"
      ></van-switch-cell>
      <van-cell title="现场照片" value="内容"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 09:39
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "PatrolDetail",
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

<style lang="scss"></style>
