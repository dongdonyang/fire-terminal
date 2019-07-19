<template>
  <div class="base-play-sound">
    <van-button type="primary" size="small" @click="playVoice">
      <img class="base-play-sound-img" alt="" src="../assets/zbxc_img_04.png" />
      <span>{{ playTime }}"</span>
    </van-button>

    <van-icon v-if="!status" name="clear" @click="deleteVoice"></van-icon>
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
    prop: "voice",
    event: "change"
  },
  props: {
    voice: String,
    status: Number
  },
  data() {
    return {
      player: Object,
      playTime: Number
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    createVoice(voice) {
      this.player = plus.audio.createPlayer(voice); // 创建播放对象
      // todo 创建对象存在延迟、容易获取不到时长、单位为秒（s），返回值可能是小数，若长度未知则返回-1。 如果还未获取到音频流信息则返回NaN，此时需要延迟获取。
      setTimeout(() => {
        this.playTime = this.player.getDuration(); // 获取音频的总长度 单位秒s
      }, 500);
    },
    /**
     * @fileOverview 播放语音、显示语音秒数、和实时进度
     */
    playVoice() {
      console.log("语音地址：" + this.voice);
      let p = this.player;
      p.play(
        function() {
          alert("Audio play success!");
        },
        function(e) {
          alert("Audio play error: " + e.message);
        }
      );
    },
    /**
     * @fileOverview 删除当前声音对象
     */
    deleteVoice() {
      this.player.close();
      this.$emit("change", "");
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
