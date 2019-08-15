<template>
  <div class="base-play-sound" v-if="voiceTime">
    <!--    播放button-->
    <van-button type="primary" size="small" @click="playVoice">
      <img class="base-play-sound-img" alt="" src="../assets/zbxc_img_04.png" />
      <span>{{ voiceTime }}"</span>
    </van-button>

    <!--    删除按钮-->
    <van-icon v-if="!isEdit" name="clear" @click="deleteVoice"></van-icon>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/8 17:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BasePlaySound",
  components: {},
  model: {
    prop: "question",
    event: "change"
  },
  props: {
    question: Object, //用来向父组件传值、主要用来传递语音时间
    isEdit: Number, // 播放的状态
    voice: String, // 声音
    voiceTime: {
      type: Number,
      default: 0
    } // 时间
  },
  data() {
    return {
      player: Object
    };
  },
  computed: {},
  watch: {
    voice: function(val) {
      console.log("语音地址", val);
      val && this.createVoice();
    }
  },
  created() {},
  mounted() {},
  methods: {
    createVoice() {
      this.player = plus.audio.createPlayer(this.voice); // 创建播放对象
      // todo 创建对象存在延迟、容易获取不到时长、单位为秒（s），返回值可能是小数，若长度未知则返回-1。 如果还未获取到音频流信息则返回NaN，此时需要延迟获取。
      setTimeout(() => {
        this.voiceTime = this.player.getDuration(); // 获取音频的总长度 单位秒s
        this.question.voiceTime = this.voiceTime;
        console.log("语音时长", this.voiceTime);
      }, 500);
    },
    /**
     * @fileOverview 播放语音、显示语音秒数、和实时进度
     */
    playVoice() {
      let that = this;
      console.log("语音地址：" + this.voice);
      let p = this.player;
      p.play(
        function() {
          that.$toast("播放完毕");
        },
        function(e) {
          that.$toast(e.message);
        }
      );
    },
    /**
     * @fileOverview 删除当前声音对象
     */
    deleteVoice() {
      this.player.close();
      this.voiceTime = 0;
      this.voice = "";
    }
  }
};
</script>

<style lang="scss">
.base-play-sound {
  & > :nth-child(2) {
    margin-left: 4px;
    font-size: 18px;
    color: #f56c6c;
  }
  .van-button__text {
    display: flex;
  }
  &-img {
    height: 16px;
    margin: auto 5px;
  }
}
</style>
