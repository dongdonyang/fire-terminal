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
    >
      <span
        slot="cellValue"
        slot-scope="scope"
        :style="{ color: scope.item.checkStateValue ? '' : '#0385fe' }"
      >
        {{ scope.item.checkStateName }}
      </span>
      <span slot="cellLabel" slot-scope="scope">
        <div>{{ scope.item.alarm }}</div>
        <div>{{ scope.item.time }}</div>
      </span>
    </base-list>
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
      page: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.page.FireUnitId = this.$store.state.userInfo.fireUnitID;
  },
  mounted() {},
  methods: {
    // todo 下拉刷新
    onLoad() {
      this.tableList = [];
      this.page.SkipCount = 0;
      // this.getList();
    },
    // todo 获取消防预警数据
    getList(success) {
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
