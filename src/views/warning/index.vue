<template>
  <div>
    <base-nav title="消防预警"></base-nav>

    <!--    todo 内容-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group>
        <van-cell
          @click="getDetail(item)"
          v-for="(item, index) in list"
          :key="index"
          title="A座14楼楼道配电箱"
          value="已过期"
          label="剩余电流式探测器  320mA[标准:0-300mA]"
        ></van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/1 15:46
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // todo 详情、核警
    getDetail() {
      this.$router.push(`/WarningDetail/1`);
    },
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
    }
  }
};
</script>

<style lang="scss"></style>
