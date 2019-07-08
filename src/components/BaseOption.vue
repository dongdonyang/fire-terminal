<template>
  <div>
    <van-action-sheet v-model="show" :actions="actions"></van-action-sheet>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/8 16:03
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseOption",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      actions: [
        { name: "选项" },
        { name: "选项", loading: true },
        { name: "禁用选项", disabled: true }
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

<style lang="scss"></style>
