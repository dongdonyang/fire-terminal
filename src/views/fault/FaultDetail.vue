<template>
  <div>{{ info }}</div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/1 17:12
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "FaultDetail",
  components: {},
  props: {},
  data() {
    return {
      info: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.info = this.$route.params;
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss"></style>
