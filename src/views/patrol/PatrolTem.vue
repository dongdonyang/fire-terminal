<template>
  <div class="patrol-tem">
    <van-cell>
      <van-dropdown-menu slot="title">
        <van-dropdown-item
          @change="getList"
          v-model="page.PatrolStatus"
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
        //值班记录
        {
          tableName: {
            title: "patrolUser",
            label: "creationTime",
            value: "patrolStatus"
          },
          listName: "patrolList",
          tableList: []
        },
        // 巡查记录
        {
          tableName: {
            title: "dutyUser",
            label: "creationTime",
            value: "dutyStatus"
          },
          listName: "dutyList",
          tableList: []
        }
      ],
      actions: [
        {
          text: "未指定",
          value: 0,
          className: "normal"
        },
        {
          text: "正常 ",
          value: 1,
          className: "normal"
        },
        {
          text: "绿色故障(已现场解决)",
          value: 2,
          className: "normal"
        },
        {
          text: "橙色故障(未现场解决)",
          value: 3,
          className: "notHandle"
        }
      ],
      page: {
        PatrolStatus: 0,
        FireUnitId: 3
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
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
      let paras = arguments.length; // 获取参数个数
      console.log(arguments);
      let list = this.table[this.active];
      let url = this.active ? "GET_DUTY_LIST" : "GET_PATROL_LIST";
      this.$axios
        .get(this.$api[url], {
          params: this.page
        })
        .then(res => {
          if (res.success) {
            list.tableList = list.tableList.concat(res.result[list.listName]);
            paras
              ? success(list.tableList.length, res.result.totalCount, this.page)
              : "";
          }
        });
    },
    //    todo 获取详情、新增、编辑、查看
    getDetail(val) {
      console.log(val);
      if (this.active) {
        this.$router.push(`./PatrolRecord/${this.active}`);
      } else {
        this.$router.push(`./DutyRecord/${this.active}/${val.patrolId}`);
      }
    },
    addList() {
      if (this.active) {
        this.$router.push(`./PatrolRecord/${this.active}`);
      } else {
        this.$router.push(`./DutyRecord/${this.active}/0`);
      }
    }
  }
};
</script>

<style lang="scss">
.patrol-tem {
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
  /*未解决*/
  .notHandle {
    color: #e6a23c;
  }
}
</style>
