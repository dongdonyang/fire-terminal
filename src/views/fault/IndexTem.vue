<template>
  <div class="index-tem">
    <van-cell
      :title="title"
      :value="`${page.total}条`"
      @click="show = true"
    ></van-cell>
    <base-list
      @cellClick="getDetail"
      @onLoad="getList"
      @refresh="getList"
      :table-name="tableName"
      :table-list="tableList"
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
      actions: [{ name: "选项1" }, { name: "选项2" }, { name: "选项3" }],
      page: {
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
    // todo 获取list
    getList(success) {
      this.$axios
        .get(this.$api.GET_BREAK_DOWNLIST, {
          params: this.page
        })
        .then(res => {
          this.tableList = this.tableList.concat(res.result.breakDownList);
          this.page.total = res.result.totalCount;
          success(this.tableList.length, res.result.totalCount, this.page);
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
    &::after{
      border-width: 0;
    }
  }
}
</style>
