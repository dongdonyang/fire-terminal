<template>
  <div>
    <van-cell :title="title" @click="show = true">
      <van-button size="mini" icon="plus" type="primary">新增</van-button>
    </van-cell>

    <!--    todo list-->
    <base-list
      :table-list="table"
      :table-name="tableName"
      @onLoad="getList"
      @cellClick="getDetail"
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
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      table: [],
      tableName: {
        title: "dutyUser",
        label: "creationTime",
        value: "dutyStatus"
      },
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
  created() {
    console.log(this.active);
  },
  mounted() {},
  methods: {
    //  todo 获取list、值班记录、巡查记录
    getList() {
      let url = this.active ? "GET_DUTY_LIST" : "GET_PATROL_LIST";
      this.$axios
        .get(this.$api[url], {
          params: this.page
        })
        .then(res => {
          if (res.success) {
            this.table = res.result;
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
    }
  }
};
</script>

<style lang="scss"></style>
