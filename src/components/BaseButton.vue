<template>
  <div class="base-button">
    <van-button :class="myClass" :type="myType" :size="mySize" @click="myClick">
      <slot>提交</slot>
    </van-button>
  </div>
</template>

<script>
/**
 *  可配置大小、类型、class样式
 *  作者：0          时间：2019/7/4 09:02
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseButton",
  components: {},
  props: {
    mySize: {
      type: String,
      default: "large"
    },
    myType: {
      type: String,
      default: "primary"
    },
    myClass: {
      type: String,
      default: "base-button-def"
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * @fileOverview 按钮点击事件、暂无参数、若需要可以加上原生事件
     */
    myClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
.base-button {
  padding: 10px 15px;
  &-def {
    background-color: #0392fe;
    border-color: #0392fe;
    border-radius: 5px;
  }
}
</style>
