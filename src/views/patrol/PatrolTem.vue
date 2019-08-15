<template>
  <div class="patrol-tem">
    <van-cell>
      <van-dropdown-menu slot="title">
        <van-dropdown-item
          title="故障来源"
          @change="getList"
          v-model="page[table[active].pageName]"
          :options="actions"
        ></van-dropdown-item>
      </van-dropdown-menu>
      <van-button size="mini" icon="plus" type="primary" @click="addList"
        >新增</van-button
      >
    </van-cell>

    <!--    todo list-->
    <base-list
      :table-list="table[active].tableList"
      :table-name="table[active].tableName"
      @onLoad="getList"
      @cellClick="getDetail"
      @refresh="getList"
    >
      <span
        :class="getStatus(scope.item, 'className')"
        slot="cellValue"
        slot-scope="scope"
        >{{ getStatus(scope.item) }}</span
      >
    </base-list>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 09:12
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "PatrolTem",
  components: {},
  props: {
    // todo 当前激活的选项
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      table: [
        // 值班记录
        {
          tableName: {
            title: "dutyUser",
            label: "creationTime",
            value: "dutyStatus"
          },
          listName: "dutyList",
          pageName: "DutyStatus",
          tableList: []
        },
        //巡查记录
        {
          tableName: {
            title: "patrolUser",
            label: "creationTime",
            value: "patrolStatus"
          },
          listName: "patrolList",
          pageName: "PatrolStatus",
          tableList: []
        }
      ],
      actions: [
        {
          text: "未指定",
          value: 0
        },
        {
          text: "正常 ",
          value: 1,
          className: "normal"
        },
        {
          text: "绿色故障",
          value: 2,
          className: "handle"
        },
        {
          text: "橙色故障",
          value: 3,
          className: "notHandle"
        }
      ],
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
    // todo 获取中文字段、获取class+
    getStatus(val, label = "text") {
      let x = this.actions.find(item => {
        return item.value === val[this.table[this.active].tableName.value];
      });
      return x ? x[label] : "";
    },
    //  todo 获取list、值班记录、巡查记录
    getList(success) {
      let x = arguments[0] instanceof Object;
      let p = this.page;
      let list = this.table[this.active];
      if (!x) {
        p.SkipCount = 0;
        list.tableList = [];
      }
      let url = this.active ? "GET_PATROL_LIST" : "GET_DUTY_LIST";
      this.$axios
        .get(this.$api[url], {
          params: p
        })
        .then(res => {
          if (res.success) {
            list.tableList = list.tableList.concat(res.result[list.listName]);
            x ? success(list.tableList.length, res.result.totalCount, p) : "";
          }
        });
    },
    //    todo 获取详情、编辑、查看
    getDetail(val) {
      let u = `./${this.active ? "PatrolRecord" : "DutyRecord"}/${
        this.active ? val.patrolId : val.dutyId
      }`;
      this.$router.push(u);
    },
    // todo 新增
    addList() {
      let u = `./${this.active ? "PatrolRecord" : "DutyRecord"}/0`;
      if (this.active) {
        this.$axios.get(this.$api.GET_ADD_ALLOW).then(res => {
          if (!res.result.success) {
            this.$router.push(u);
          } else {
            this.$toast(res.result.failCause);
          }
        });
      } else {
        this.$router.push(u);
      }
    }
  }
};
</script>

<style lang="scss">
.patrol-tem {
  /*下拉框*/
  .van-dropdown-menu {
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
    .van-dropdown-item--down {
      top: 135px !important;
    }
  }
  & > :nth-child(1) {
    &::after {
      border-width: 0;
    }
  }
  /*正常*/
  .normal {
    color: #67c23a;
  }
  /*已解决正常*/
  .handle {
    color: #67c23a;
  }
  /*未解决*/
  .notHandle {
    color: #e6a23c;
  }
}
</style>
