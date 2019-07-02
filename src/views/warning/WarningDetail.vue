<template>
  <div class="warn-detail">
    <base-nav title="消防警情处置"></base-nav>

    <van-cell-group>
      <van-cell
        title="A座14楼楼道配电箱"
        value="2019-6-27 14:41"
        label="剩余电流式探测器  320mA[标准:0-300mA]"
      ></van-cell>

      <van-cell>
        <van-radio-group class="warn-detail-radio" v-model="radio">
          <van-radio :name="1">误报</van-radio>
          <van-radio :name="2">测试</van-radio>
          <van-radio :name="0">真实火警</van-radio>
        </van-radio-group>
        <!--        todo 真实火警-->
        <van-cell v-show="!radio" title="警情通知">
          <van-checkbox-group v-model="result">
            <van-checkbox v-for="(item, index) in 3" :key="item" :name="item">
              复选框 {{ item }}
            </van-checkbox>
          </van-checkbox-group>
        </van-cell>
      </van-cell>

      <!--      todo 情况说明-->
      <van-cell title="情况说明" value="语音"> </van-cell>

      <!--      todo 现场照片-->
      <van-cell title="现场照片"> </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 14:34
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "WarningDetail",
  components: {},
  props: {},
  data() {
    return {
      result: [],
      radio: 1
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.warn-detail {
  &-radio {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }
}
</style>
