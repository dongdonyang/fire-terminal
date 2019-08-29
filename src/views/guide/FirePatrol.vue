<template>
  <BaseGuide :active="2">
    <van-cell title="选择巡查方式">
      <van-cell-group slot="label">
        <van-cell
          label="通常巡查消防设施的方式，直接填报巡查记录并提交巡查问题"
        >
          <el-radio slot="title" v-model="radio" label="1">一般巡查</el-radio>
        </van-cell>
        <van-cell
          label="通过扫描消防设施上的设施码，填报巡查记录并提交巡查问题"
        >
          <el-radio slot="title" v-model="radio" label="2">扫码巡查</el-radio>
        </van-cell>
      </van-cell-group>
    </van-cell>
    <div slot="button">
      <base-button @click="$router.back()" class="safe-unit-but"
        >上一步</base-button
      >
      <base-button @click="nextStep">下一步</base-button>
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
    return {
      radio: "1"
    };
  },
  computed: {},
  watch: {},
  created() {
    let val = localStorage.getItem("guideForm");
    if (val) {
      this.radio = JSON.parse(val).patrol;
    }
  },
  mounted() {},
  methods: {
    //  todo 下一步
    nextStep() {
      let f = JSON.parse(localStorage.getItem("guideForm"));
      f.patrol = this.radio;
      localStorage.setItem("guideForm", JSON.stringify(f));
      this.$router.push("./FireSystem");
    }
  }
};
</script>

<style lang="scss"></style>
