<template>
  <van-cell class="describe-qusetion">
    <van-row slot="title" type="flex" justify="space-between">
      <van-col>情况描述</van-col>
      <van-col v-if="!isEdit">
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

    <!--    编辑-->
    <div slot="label" v-if="!isEdit">
      <van-field
        v-if="!question.voice"
        type="textarea"
        rows="6"
        :maxlength="200"
        v-model="question.content"
        :placeholder="!isSpeak ? '情况简要描述、200字以内' : ''"
      >
      </van-field>
      <div v-show="question.voice" style="height: 164px">
        <!--        todo 播放声音-->
        <base-play-sound
          :isEdit="isEdit"
          :voice.sync="question.voice"
          v-model="question"
        ></base-play-sound>
      </div>

      <van-row
        class="describe-qusetion-speck"
        v-show="isSpeak"
        type="flex"
        justify="center"
      >
        <!--        todo 收集声音-->
        <base-record-sound v-model="question.voice"></base-record-sound>
      </van-row>
    </div>

    <!--    查看-->
    <div slot="label" v-else>
      <div
        v-if="!voice"
        style="word-wrap: break-word;
              word-break: normal;
              width: 95vw"
      >
        {{ content }}
      </div>
      <base-play-sound :isEdit="isEdit" :voice.sync="voice"></base-play-sound>
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
  model: {
    prop: "question",
    event: "change"
  },
  props: {
    question: Object, //用来向父组件传值
    voice: {
      type: String,
      default: ""
    }, // 声音
    content: String, //文本
    voiceTime: Number, //声音时长
    isEdit: {
      type: Number,
      default: 0
    } //是否可以编辑
  },
  data() {
    return {
      isSpeak: false //显示录音文本框
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
