<template>
  <div>
    <van-tabs
      color="#0385fe"
      class="fault-index"
      v-model="active"
      swipeable
    >
      <van-tab title="待处理"><index-tem :active="active"></index-tem></van-tab>
      <van-tab title="处理中"><index-tem :active="active"></index-tem></van-tab>
      <van-tab title="已解决"><index-tem :active="active"></index-tem></van-tab>
    </van-tabs>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/6/27 14:00
 *  1,常量从js文件引入，不要定义魔术变量
 */
import IndexTem from "./IndexTem";
export default {
  name: "index",
  components: {
    IndexTem
  },
  props: {},
  data() {
    return {
      active: 0,
      info: {}
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

.fault-index {
  .van-tabs__wrap {
    z-index: 0;
  }
  /*.van-tabs__nav--card {*/
  /*  margin: 10px;*/
  /*  border-radius: 0;*/
  /*}*/
  /*.van-tabs__content {*/
  /*  margin-top: 4px;*/
  /*}*/
}
</style>
