<template>
  <base-guide :active="3">
    <div>
      <div>选择拥有的消防系统</div>
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in 4"
            clickable
            :key="index"
            :title="`复选框 ${item}`"
            @click="toggle(index)"
          >
            <van-checkbox
              :name="item"
              ref="checkboxes"
              slot="right-icon"
            ></van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
    <div slot="button">
      <base-button @click="$router.back()" class="safe-unit-but">上一步</base-button>
      <base-button @click="hasFinash">完成</base-button>
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
      result: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //  todo 完成
    hasFinash() {
      let role = this.$store.state.userInfo.rolelist.includes(1); // 角色
      console.log(this.$store.state.userInfo);
      let router = role ? "/fault" : "/patrol"; // 路由
      this.$router.push(router);
    }
  }
};
</script>

<style lang="scss"></style>
