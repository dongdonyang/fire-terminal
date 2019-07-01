<template>
  <BaseGuide :active="2">
    <div>
      <h4>选择巡查方式</h4>
      <van-cell-group>
        <van-cell
          title="一般巡查"
          label="通常巡查消防设施的方式，直接填报巡查
记录并提交巡查问题"
        ></van-cell>
        <van-cell
          title="扫码巡查"
          label="通过扫描消防设施上的设施码，填报巡查
记录并提交巡查问题"
        ></van-cell>
      </van-cell-group>
    </div>
    <div slot="button">
      <van-button
        type="primary"
        size="large"
        @click="$router.push('./FireSystem')"
        >下一步</van-button
      >
      <van-button type="primary" size="large" @click="$router.back()"
        >上一步</van-button
      >
    </div>
  </BaseGuide>
</template>

<script>
/**
 *  作者：0          时间：2019/7/1 14:07
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseGuide from "./BaseGuide";
export default {
  name: "FirePatrol",
  components: {
    BaseGuide
  },
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
