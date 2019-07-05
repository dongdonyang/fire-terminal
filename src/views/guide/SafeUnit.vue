<template>
  <BaseGuide :active="1">
    <div>
      <van-cell-group>
        <van-switch-cell
          v-model="checked"
          title="有消防维保单位"
        ></van-switch-cell>
      </van-cell-group>
      <div v-show="checked">
        <van-search
          @change="getList"
          placeholder="请输入维保单位名称"
          v-model="value"
        ></van-search>
        <van-cell
          @click="setUnit(item)"
          v-for="(item, index) in unitList"
          :key="index"
          :title="item.safeUnitName"
        ></van-cell>
      </div>
    </div>

    <!--        todo 底部按钮-->
    <div slot="button">
      <base-button @click="$router.back()" class="safe-unit-but"
        >上一步</base-button
      >
      <base-button @click="$router.push('./FirePatrol')">下一步</base-button>
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
      unitList: [],
      value: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 模糊查询维保单位
    getList() {
      this.$axios
        .get(this.$api.Get_Select_Safe_Units, {
          params: { Name: this.value }
        })
        .then(res => {
          if (res.success) {
            this.unitList = res.result;
          }
        });
    },
    //  todo 选取维保单位
    setUnit(item) {
      this.value = item.safeUnitName;
    }
  }
};
</script>

<style lang="scss"></style>
