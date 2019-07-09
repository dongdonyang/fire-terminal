<template>
  <div class="patrol-tem">
    <van-cell :title="title">
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
    ></base-list>

    <!--      todo 选项-->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    ></van-action-sheet>
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
      title: "全部来源",
      show: false,
      actions: [{ name: "选项1" }, { name: "选项2" }, { name: "选项3" }],
      page: {
        FireUnitId: 3
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 获取list、值班记录、巡查记录
    getList(success) {
      let list = this.table[this.active];
      let url = this.active ? "GET_DUTY_LIST" : "GET_PATROL_LIST";
      this.$axios
        .get(this.$api[url], {
          params: this.page
        })
        .then(res => {
          if (res.success) {
            list.tableList = list.tableList.concat(res.result[list.listName]);
            success(list.tableList.length, res.result.totalCount, this.page);
          }
        });
    },
    //    todo 选项
    onSelect(item) {
      this.show = false;
      this.title = item.name;
      this.$toast(item.name);
    },
    //    todo 获取详情、新增、编辑、查看
    getDetail() {
      this.$router.push(`./PatrolDetail/${this.active}`);
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
  & > :nth-child(1) {
    &::after {
      border-width: 0;
    }
  }
}
</style>
