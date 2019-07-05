<template>
  <div class="base-guide">
    <!--    TODO 头部title-->
    <base-nav title="引导设置"></base-nav>

    <!--      todo 步骤-->
    <van-steps :active="active" class="base-guide-step">
      <van-step v-for="(item, index) in steps" :key="index">
<!--        <img width="30%" :src="item.activeIcon" slot="active-icon" alt="" />-->
<!--        <img width="30%" :src="item.inactiveIcon" slot="inactive-icon" alt="" />-->
        {{ item.name }}</van-step
      >
    </van-steps>

    <!--      todo 插槽-->
    <div class="base-guide-main">
      <slot>内容</slot>
      <div id="guide-but">
        <slot name="button">按钮</slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/6/28 14:34
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseGuide",
  components: {},
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      steps: [
        {
          name: "工作人员",
          activeIcon: require("../../assets/guide_img_green01.png"),
          inactiveIcon: require("../../assets/guide_img_gray01.png")
        },
        {
          name: "维保单位",
          activeIcon: require("../../assets/guide_img_green02.png"),
          inactiveIcon: require("../../assets/guide_img_gray02.png")
        },
        {
          name: "消防巡查",
          activeIcon: require("../../assets/guide_img_green03.png"),
          inactiveIcon: require("../../assets/guide_img_gray03.png")
        },
        {
          name: "消防系统",
          activeIcon: require("../../assets/guide_img_green04.png"),
          inactiveIcon: require("../../assets/guide_img_gray04.png")
        }
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
.base-guide {
  display: flex;
  flex-direction: column;
  &-step {
    min-height: 60px;
    z-index: 0;
  }
  &-main {
    margin-top: 6px;
    flex: 2 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > :first-child {
      flex: 4 0 auto;
    }
  }
}
</style>
