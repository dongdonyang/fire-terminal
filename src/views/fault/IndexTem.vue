<template>
  <div class="index-tem">
    <van-cell :value="`${page.total}条`">
      <van-dropdown-menu slot="title">
        <van-dropdown-item
          title="问题来源"
          @change="getList"
          v-model="page.Source"
          :options="actions"
        ></van-dropdown-item>
      </van-dropdown-menu>
    </van-cell>

    <base-list
      @cellClick="getDetail"
      @onLoad="getList"
      @refresh="getList"
      :table-name="tableName"
      :table-list="tableList"
    >
      <span slot="cellTitle" slot-scope="scope">
        {{ scope.item.userName }} {{ scope.item.phone }}
      </span>
      <span slot="cellValue" slot-scope="scope">{{
        getSource(scope.item.source)
      }}</span>
    </base-list>

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
 *  作者：0          时间：2019/7/1 16:16
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "IndexTem",
  components: {},
  props: {
    // todo 当前激活的选项、用来判断详情的类型、新增、编辑、查看
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tableList: [],
      tableName: {
        title: "userName",
        smallTitle: "phone",
        label: "creationTime",
        value: "source"
      },
      title: "全部来源",
      show: false,
      actions: [
        {
          text: "未指定",
          value: 0
        },
        {
          text: "值班 ",
          value: 1
        },
        {
          text: "巡查 ",
          value: 2
        },
        {
          text: "物联终端 ",
          value: 3
        }
      ],
      page: {
        Source: 0,
        FireUnitId: 143,
        HandleStatus: this.active + 1,
        total: 0
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // todo 获取来源中文名
    getSource(val) {
      let x = this.actions.find(item => {
        return item.value === val;
      });
      return x ? x.text : "";
    },
    // todo 获取list
    getList(success) {
      let x = arguments[0] instanceof Object;
      let p = this.page;
      if (!x) {
        p.SkipCount = 0;
        this.tableList = [];
      }
      this.$axios
        .get(this.$api.GET_BREAK_DOWNLIST, {
          params: p
        })
        .then(res => {
          this.tableList = this.tableList.concat(res.result.breakDownList);
          p.total = res.result.totalCount;
          success(this.tableList.length, res.result.totalCount, p);
        });
    },
    //    todo 选项
    onSelect(item) {
      this.show = false;
      this.title = item.name;
      this.$toast(item.name);
    },
    // todo 查看详情、编辑
    getDetail(val) {
      console.log(val);
      this.$router.push(`./FaultDetail/${this.active}/${val.breakDownId}`);
    }
  }
};
</script>

<style lang="scss">
.index-tem {
  & > :first-child {
    /*margin-bottom: 4px;*/
    &::after {
      border-width: 0;
    }
  }
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
}
</style>
