<template>
  <div class="shot-photo">
    <img
      v-if="!disabled && photoList.length < 3"
      width="100px"
      height="60px"
      @click="$refs.BasePhoto.show = true"
      src="../assets/zbxc_btn_paizhao.png"
    />
    <div v-for="(item, index) in photoList" :key="index">
      <van-image
        width="100px"
        height="90px"
        @click="previewPic(index)"
        :src="item"
        fit="cover"
      ></van-image>
      <van-icon
        v-if="disabled"
        name="clear"
        @click="photoList.splice(index, 1)"
      ></van-icon>
    </div>
    <!--    todo 图片上传方式-->
    <base-photo ref="BasePhoto" v-model="photoList"></base-photo>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/16 10:24
 *  1,常量从js文件引入，不要定义魔术变量
 */
import { ImagePreview } from "vant";
import Vue from "vue";

Vue.use(ImagePreview);
export default {
  name: "ShotPhoto",
  components: {},
  model: {
    prop: "photoList",
    event: "change"
  },
  props: {
    photoList: Array,
    // 是否是只读
    disabled: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //    todo 图片预览
    previewPic(index) {
      ImagePreview({
        images: this.photoList,
        startPosition: index,
        closeOnPopstate: true
      });
    }
  }
};
</script>

<style lang="scss">
.shot-photo {
  margin: 5px 0;
  display: flex;
  justify-content: start;
  /*height: 100px;*/
  /*& > :first-child {*/
  /*  margin: auto 8px auto 0;*/
  /*}*/

  & > div {
    /*删除*/
    & > :nth-child(2) {
      font-size: 20px;
      left: -12px;
      top: -78px;
      position: relative;
      color: #f56c6c;
    }
  }
}
</style>
