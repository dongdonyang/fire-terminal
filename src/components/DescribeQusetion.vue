<template>
  <van-cell class="describe-qusetion">
    <van-row slot="title" type="flex" justify="space-between">
      <van-col>问题描述</van-col>
      <van-col>
        <img
          width="24px"
          height="24px"
          @click="isSpeak = !isSpeak"
          :src="
            require(`../assets/` +
              `${isSpeak ? 'zbxc_btn_jianpan.png' : 'zbxc_btn_yuyin.png'}`)
          "
        />
      </van-col>
    </van-row>
    <div slot="label">
      <van-field
        v-if="!form.playUrl"
        type="textarea"
        rows="6"
        :maxlength="200"
        v-model="form.value"
        placeholder="情况简要描述、200字以内"
      >
      </van-field>
      <div v-else style="height: 164px">
        <base-play-sound
          :key="form.playUrl"
          v-model="form.playUrl"
        ></base-play-sound>
      </div>

      <van-row
        class="describe-qusetion-speck"
        v-show="isSpeak"
        type="flex"
        justify="center"
      >
        <base-record-sound v-model="form.playUrl"></base-record-sound>
      </van-row>
    </div>
  </van-cell>
</template>

<script>
/**
 *  作者：0          时间：2019/7/16 11:14
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "DescribeQusetion",
  components: {},
  props: {},
  data() {
    return {
      isSpeak: false,
      form: {}
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
.describe-qusetion {
  .van-cell,
  .van-field,
  /*取消下划线*/
  .van-field--min-height::after {
    border-width: 0;
  }
  &-speck {
    position: absolute;
    bottom: 12px;
    left: 40%;
  }
}
</style>
