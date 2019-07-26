<template>
  <div>
    <van-pull-refresh
      :disabled="isRefresh"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多数据啦"
        @load="onLoad"
      >
        <!--          todo 建议将多次出现的设置为默认内容-->
        <slot>
          <van-cell-group>
            <van-cell
              @click="cellClick(item, $event)"
              v-for="(item, index) in tableList"
              :key="index"
              :title="item[tableName.title] || '暂无信息'"
              :value="item[tableName.value]"
              :label="item[tableName.label]"
            >
              <!--              todo 插入头部-->
              <slot slot="title" :item="item" name="cellTitle"> </slot>
              <!--              todo 插入内容-->
              <slot :item="item" name="cellValue"> </slot>
              <!--              todo 插入label-->
              <slot slot="label" :item="item" name="cellLabel"> </slot>
            </van-cell>
          </van-cell-group>
        </slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
/**   下拉刷新，上滑加载组件
 *  作者：0          时间：2019/7/3 11:54
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseList",
  components: {},
  props: {
    tableList: {
      type: Array,
      default() {
        return [];
      }
    },
    //  todo 字段的匹配名
    tableName: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false
    };
  },
  computed: {
    // todo 能否刷新页面
    isRefresh: function() {
      let val = this.tableList.length < 10 ? true : false;
      return val;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     *@fileoverview 下拉刷新数据
     * @param {Array} tables list中的数据
     * @param {Object} page 分页对象
     */
    onRefresh() {
      let that = this;
      this.$emit("refresh", function success() {
        that.isLoading = false;
        that.$toast("刷新成功");
      });
    },
    /**
     * @fileoverview 上滑加载更多数据，使用回调函数来设置异步请求之后的操作、以下注释皆是回调函数的
     * @param {Number} size 当前数据长度
     * @param {Number} total 数据总数
     */
    onLoad() {
      let that = this;
      this.$emit("onLoad", function success(size, total = 5, page = {}) {
        page.SkipCount = size;
        that.loading = false;
        if (size >= total) {
          that.finished = true;
        }
      });
    },
    /**
     * @fileOverview 行点击事件
     * @param {Object} item 行的数据对象
     * @param {Object} event 原生的点击事件
     */
    cellClick(item, event) {
      this.$emit("cellClick", item, event);
    }
  }
};
</script>

<style lang="scss"></style>
