<template>
  <div class="terminal-index">
    <van-dropdown-menu>
      <van-dropdown-item
        title="终端状态"
        @change="getList"
        v-model="page.Option"
        :options="actions"
      ></van-dropdown-item>
    </van-dropdown-menu>

    <!--    todo list-->
    <base-list
      @onLoad="getList"
      @refresh="getList"
      :table-list="tableList"
      :table-name="tableName"
    >
      <div slot-scope="scope" slot="cellValue" class="terminal-index-analog">
        <div>{{ scope.item.stateName }}</div>
        <span>{{ scope.item.analog }}</span>
        <span>[标准{{ scope.item.standard }}]</span>
      </div>
    </base-list>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/6/27 14:03
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
        title: "name",
        label: "location",
        value: "stateName"
      },
      page: {
        Option: 0
      },
      actions: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.page.FireUnitId = this.$store.state.userInfo.fireUnitID;
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    // todo 获取list数据
    getList(success) {
      let x = arguments[0] instanceof Object;
      let p = this.page;
      if (!x) {
        p.SkipCount = 0;
        this.tableList = [];
      }
      this.$axios
        .get(this.$api.GET_FIRE_UNIT_END_DEVICE_STATE, {
          params: p
        })
        .then(res => {
          let r = res.result;
          this.tableList = this.tableList.concat(r.items);
          x ? success(this.tableList.length, r.totalCount, p) : "";
        });
    },
    // todo 获取选项
    getOptions() {
      this.$axios.get(this.$api.GET_END_DEVICE_OPTIONS).then(res => {
        this.actions = JSON.parse(
          JSON.stringify(res.result).replace(/name/g, "text")
        );
      });
    }
  }
};
</script>

<style lang="scss">
.terminal-index {
  .van-dropdown-menu {
    padding: 10px 15px;
    height: 22px;
    &:after {
      border-width: 0;
    }
    .van-dropdown-menu__item {
      justify-content: left;
      & > span::after {
        top: 8px;
      }
    }
  }
  & > :nth-child(1) {
    &::after {
      border-width: 0;
    }
  }
  &-analog {
    & > div {
      color: #10dd01;
    }
    & > :nth-child(2) {
      color: #10dd01;
      margin: 0 10px;
    }
  }
}
</style>
