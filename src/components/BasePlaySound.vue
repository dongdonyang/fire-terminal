<template>
  <div class="base-play-sound">
    <van-button type="primary" size="small" @click="playVoice">
      <img class="base-play-sound-img" alt="" src="../assets/zbxc_img_04.png" />
      <span>{{ playTime }}"</span>
    </van-button>

    <van-icon name="clear" @click="voice = ''"></van-icon>
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
    voice: String
  },
  data() {
    return {
      player: Object,
      playTime: Number
    };
  },
  computed: {},
  watch: {},
  created() {
    this.player = plus.audio.createPlayer(this.voice); // 创建播放对象
    this.playTime = this.player.getDuration(); // 获取音频的总长度 单位秒s
    console.log("shijian",this.playTime);
  },
  mounted() {},
  methods: {
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
