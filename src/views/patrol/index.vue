<template>
  <div>
    <van-tabs color="#0385fe" class="patrol-index" v-model="active">
      <van-tab title="值班记录"
        ><patrol-tem :active="active"></patrol-tem
      ></van-tab>
      <van-tab title="巡查记录"
        ><patrol-tem :active="active"></patrol-tem
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/6/27 14:01
 *  1,常量从js文件引入，不要定义魔术变量
 */
import PatrolTem from "./PatrolTem";
export default {
  name: "index",
  components: {
    PatrolTem
  },
  props: {},
  data() {
    return {
      active: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

  }
};
</script>

<style lang="scss">
.patrol-index {
}
</style>
