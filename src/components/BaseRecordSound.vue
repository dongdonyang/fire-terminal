<template>
  <van-button
    type="default"
    @touchstart.native="startRecord"
    @touchmove.native="recording"
    @touchend.native="endRecord"
    >按住说话</van-button
  >
</template>

<script>
/**
 *  作者：0          时间：2019/7/8 17:44
 *  1,常量从js文件引入，不要定义魔术变量
 */
import myIcon from "../assets/zbxc_img_05.png"
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "BaseRecordSound",
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
      timeOutEvent: 0,
      record: Object
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * @fileOverview 开始录音、事件不足500ms显示录音事件太短弹窗
     */
    startRecord() {
      let that = this;
      this.timeOutEvent = setTimeout(that.longPress, 500);
    },
    /**
     * @fileOverview 上滑取消录音功能
     */
    recording() {
      console.log("滑动。。。");
    },
    /**
     * @fileOverview 录音进行中、弹出一个正在录音的界面、以及声音gif图标
     */
    longPress() {
      plus.device.vibrate(100);
      let that = this;
      console.log("录音中。。。。。");
      Toast({
        duration: 0,
        icon: myIcon
      });
      let r = plus.audio.getRecorder(); // 获取当前设备的录音对象
      this.record = r;
      if (r === null) {
        alert("Device not ready!");
        return;
      }
      r.record(
        { filename: "_doc/audio/" },
        function(recordFile) {
          alert("Audio record success!" + recordFile);
          Toast.clear();
          // todo 向外抛出一个创建语音对象的触发
          that.$emit("change", recordFile);
        },
        function(e) {
          alert("Audio record failed: " + e);
        }
      );
    },
    /**
     * @fileOverview 录音完成后、保存录音文件的路径、
     */
    endRecord() {
      this.record.stop();
      console.log("定时器：", this.timeOutEvent);
      clearTimeout(this.timeOutEvent); //清除定时器
    }
  }
};
</script>

<style lang="scss"></style>
