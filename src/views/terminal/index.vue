<template>
  <div class="terminal-index">
    <van-dropdown-menu>
      <van-dropdown-item
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
    ></base-list>

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
        label: "standard",
        value: "stateName"
      },
      page: {
        FireUnitId: 3,
        Option: 0
      },
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
}
</style>
