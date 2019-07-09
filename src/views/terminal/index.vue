<template>
  <div class="terminal-index">
    <van-cell title="全部终端" value="内容" @click="show = true"></van-cell>

    <!--    todo list-->
    <base-list
      @onLoad="getList"
      @refresh="getList"
      :table-list="tableList"
      :table-name="tableName"
    ></base-list>

    <!--    todo 选择框-->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    ></van-action-sheet>
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
        label: "stateName",
        value: "standard"
      },
      page: {
        FireUnitId: 3
      },
      show: false,
      actions: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOptions();
  },
  methods: {
    // todo 获取list数据
    getList(success) {
      this.$axios
        .get(this.$api.GET_FIRE_UNIT_END_DEVICE_STATE, {
          params: this.page
        })
        .then(res => {
          this.tableList = this.tableList.concat(res.result.items);
          success(this.tableList.length, res.result.totalCount, this.page);
        });
    },
    // todo 获取选项
    getOptions() {
      this.$axios.get(this.$api.GET_END_DEVICE_OPTIONS).then(res => {
        this.actions = res.result;
      });
    },
    // todo 选择
    onSelect(item) {
      this.show = false;
      this.$toast(item.name);
      this.page.Option = item.value;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.terminal-index {
  & > :nth-child(1) {
    &::after {
      border-width: 0;
    }
  }
}
</style>
