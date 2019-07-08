<template>
  <van-button plain type="primary" @click="playVoice">语音播放</van-button>
</template>

<script>
/**
 *  作者：0          时间：2019/7/8 17:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BasePlaySound",
  components: {},
  props: {
    voice: String
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * @fileOverview 播放语音、显示语音秒数、和实时进度
     */
    playVoice() {
      console.log("语音地址：" + this.voice);
      let p = plus.audio.createPlayer(this.voice);
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

<style lang="scss"></style>
