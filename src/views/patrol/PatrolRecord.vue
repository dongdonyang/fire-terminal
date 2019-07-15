<template>
  <div class="patrol-record">
    <base-nav title="巡查记录"></base-nav>
    <van-cell-group>
      <van-cell title="一般巡查">
        <van-button
          size="mini"
          type="primary"
          @click="$router.push('/PatrolDetail/0')"
          >+新增巡查轨迹</van-button
        >
      </van-cell>
      <van-cell title="">
        <div slot="label">有效轨迹点7个，发现2个问题，现场解决1个问题</div>
      </van-cell>
      <van-steps direction="vertical" :active="8">
        <van-step v-for="(item, index) in 8" :key="index">
          <van-panel
            class="patrol-record-panel"
            title="标题"
            desc="描述信息"
            status="状态"
          >
            <div>内容</div>
          </van-panel>
        </van-step>
      </van-steps>
    </van-cell-group>

    <base-button>提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/9 14:29
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "PatrolRecord",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.patrol-record {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  & > :nth-child(2) {
    flex: 2 0 auto;
  }
  &-panel {
    .van-panel__header {
      &::after {
        border-bottom-style: dashed;
      }
    }
    .van-panel__content {
      padding: 10px;
    }
  }
}
</style>
