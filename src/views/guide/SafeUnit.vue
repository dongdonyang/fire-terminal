<template>
  <BaseGuide :active="1">
    <div>
      <van-cell-group>
        <van-switch-cell
          v-model="checked"
          title="有消防维保单位"
        ></van-switch-cell>
      </van-cell-group>
      <van-search
        v-show="checked"
        placeholder="请输入维保单位名称"
        v-model="value"
      ></van-search>
    </div>

    <!--        todo 底部按钮-->
    <div slot="button">
      <van-button
        type="primary"
        size="large"
        @click="$router.push('./FirePatrol')"
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
 *  作者：0          时间：2019/7/1 13:52
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseGuide from "./BaseGuide";
export default {
  name: "SafeUnit",
  components: {
    BaseGuide
  },
  props: {},
  data() {
    return {
      checked: true,
      value: ""
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
