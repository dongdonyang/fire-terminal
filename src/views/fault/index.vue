<template>
  <p>{{ info }}</p>
</template>

<script>
/**
 *  作者：0          时间：2019/6/27 14:00
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      info: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.test();
  },
  mounted() {},
  methods: {
    test() {
      this.$axios.get(this.$api.GET_FIRE_UNIT_TYPE_HISTOGRAM).then(res => {
        this.info = res;
      });
    }
  }
};
</script>

<style lang="scss"></style>
