<template>
  <base-guide :active="3">
    <van-cell title="选择拥有的消防系统(多选)">
      <van-checkbox-group slot="label" v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in optionList"
            clickable
            :key="index"
            :title="item.systemName"
            @click="toggle(index)"
          >
            <van-checkbox
              :name="item.id"
              ref="checkboxes"
              slot="right-icon"
            ></van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-cell>
    <div slot="button">
      <base-button @click="$router.back()" class="safe-unit-but"
        >上一步</base-button
      >
      <base-button @click="hasFinish">完成</base-button>
    </div>
  </base-guide>
</template>

<script>
/**
 *  作者：0          时间：2019/7/1 14:20
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseGuide from "./BaseGuide";
export default {
  name: "FireSystem",
  components: {
    BaseGuide
  },
  props: {},
  data() {
    return {
      result: [],
      optionList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getList();
    let val = localStorage.getItem("guideForm");
    if (val) {
      this.result = JSON.parse(val).fireSystenArray;
      console.log(this.result);
    }
  },
  mounted() {},
  methods: {
    // todo 获取消防系统
    getList() {
      this.$axios.get(this.$api.GET_FIRE_SYSTEM).then(res => {
        if (res.success) {
          this.optionList = res.result;
        }
      });
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //  todo 完成
    hasFinish() {
      let f = JSON.parse(localStorage.getItem("guideForm"));
      f.fireSystenArray = this.result;
      f.fireUnitId = this.$store.state.userInfo.fireUnitID;
      this.$axios.put(this.$api.UPDATE_GUIDESET, f).then(res => {
        if (res.success) {
          localStorage.setItem("guideForm", JSON.stringify(f));
          // let role = this.$store.state.userInfo.rolelist.includes(1); // 角色
          // console.log(this.$store.state.userInfo);
          // let router = role ? "/fault" : "/patrol"; // 路由
          // this.$router.push(router);
          this.$router.push("./setting");
        }
      });
    }
  }
};
</script>

<style lang="scss"></style>
