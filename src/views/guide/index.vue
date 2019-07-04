<template>
  <div class="guide">
    <!--    TODO 头部title-->
    <div>
      <base-nav title="引导设置" :show-left="false"></base-nav>
      <div class="guide-main">
        <div>
          <img width="90%" src="../../assets/load_img_01.png" alt="" />
          <p v-for="(item, index) in contents" :key="index">{{ item }}</p>
        </div>
      </div>
    </div>

    <base-button @click="$router.push('AddWorker')">开始</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/6/27 14:01
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      contents: [
        "感谢您使用城市智慧消防作业终端！",
        "首先，我们需要您进行一些初步设置，以使得系统更贴切符合贵公司的实际情况。",
        "初期设置的所有数据，如果后期发生了更改，您都可以进行修改",
        "接下来开始吧！"
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
.guide {
  @include my-flex();
  &-main {
    margin-top: 50px;
    padding: 10px 20px;
    text-align: center;
  }
}
</style>
