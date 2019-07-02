<template>
  <div>
    <van-cell :title="title" @click="show = true">
      <van-button size="mini" icon="plus" type="primary">新增</van-button>
    </van-cell>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group>
        <van-cell
          @click="getDetail"
          v-for="(item, index) in list"
          :key="index"
          title="张全升"
          value="正常"
          label="2019-6-26 12:00"
        ></van-cell>
      </van-cell-group>
    </van-list>

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
      list: [],
      loading: false,
      finished: false,
      title: "全部来源",
      show: false,
      actions: [{ name: "选项1" }, { name: "选项2" }, { name: "选项3" }]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
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
