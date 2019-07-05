<template>
  <div class="warn-index">
    <base-nav title="消防预警"></base-nav>

    <!--    todo 内容-->
    <base-list
      ref="BaseList"
      @onLoad="getList"
      @cellClick="getDetail"
      @refresh="getList"
      :tableList="tableList"
      :tableName="tableName"
    ></base-list>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/1 15:46
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      tableList: [],
      tableName: {
        title: "location",
        value: "checkStateName",
        label: "alarm"
      }, // 展示的字段
      page: {
        FireUnitId: 3,
        MaxResultCount: 10, // 查询当前页面的数量
        total: 0,
        SkipCount: 0, // 跳过的查询的数量
        current: 1 // 当前页面
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // todo 获取消防预警数据
    getList(getBefore, success) {
      getBefore(this.tableList, this.page); // 清除滚动设置的page、table数据
      this.$axios
        .get(this.$api.GET_ALARM_CHECKS, {
          params: this.page
        })
        .then(res => {
          if (res.success) {
            this.tableList = this.tableList.concat(res.result.items);
            success(this.tableList.length, res.result.totalCount, this.page); // 回调函数
          }
        });
    },
    // todo 详情、核警
    getDetail(item) {
      this.$router.push(
        `/WarningDetail/${item.checkStateValue}/${item.checkId}`
      );
    }
  }
};
</script>

<style lang="scss">
.warn-index {
  .van-cell__title {
    flex: 2 0 auto;
  }
}
</style>
