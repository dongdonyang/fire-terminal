<template>
  <van-cell class="describe-qusetion">
    <van-row slot="title" type="flex" justify="space-between">
      <van-col>问题描述</van-col>
      <van-col v-if="!disabled">
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
    <div slot="label" v-if="!disabled">
      <van-field
        v-show="!form.voice"
        type="textarea"
        rows="6"
        :maxlength="200"
        v-model="form.content"
        placeholder="情况简要描述、200字以内"
      >
      </van-field>
      <div v-show="form.voice" style="height: 164px">
        <!--        todo 播放声音-->
        <base-play-sound
          :status="disabled"
          v-model="form.voice"
          ref="playSound"
        ></base-play-sound>
      </div>

      <van-row
        class="describe-qusetion-speck"
        v-show="isSpeak"
        type="flex"
        justify="center"
      >
        <!--        todo 收集声音-->
        <base-record-sound
          v-model="form.voice"
          @createVoice="voice => $refs.playSound.createVoice(voice)"
        ></base-record-sound>
      </van-row>
    </div>
    <div slot="label" v-else>
      <div>{{ form.content }}</div>
      <base-play-sound
        v-show="disabled"
        ref="playSound2"
        :status="disabled"
      ></base-play-sound>
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
  props: {
    form: {},
    disabled: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isSpeak: false,
      hasVoice: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  查看的时候创建语音对象
    createPlayer(val) {
      this.$refs.playSound2.createVoice(val);
    }
  }
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
