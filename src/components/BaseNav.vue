<template>
  <van-nav-bar
    class="base-nav"
    :title="title"
    :left-arrow="showLeft"
    :right-text="rightText"
    @click-left="$router.back()"
    @click-right="$emit('onClickRight')"
  >
    <slot name="rightText" slot="right"></slot>
  </van-nav-bar>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 14:41
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "Base",
  components: {},
  props: {
    title: {
      type: String,
      default: "标题"
    },
    rightText: {
      type: String,
      default: ""
    },
    showLeft: {
      type: Boolean,
      default: true
    }
  },
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

<style lang="scss">
.base-nav {
  z-index: 999 !important;
  background-color: #0385fe;
  /*background: linear-gradient(to right, #0385fe, #039dfe);*/
  position: sticky;
  top: 0;
  & > div,
  i {
    color: #fff !important;
  }
  &::after {
    border-width: 0;
  }
  /*  右侧文字*/
  .van-nav-bar__text {
    color: #fff;
  }
}
</style>
