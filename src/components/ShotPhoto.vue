<template>
  <div class="shot-photo">
    <img
      v-if="photoList.length < 3 && !disabled"
      width="100px"
      height="60px"
      @click="$refs.BasePhoto.show = true"
      src="../assets/zbxc_btn_paizhao.png"
    />
    <div v-for="(item, index) in photoList" :key="index">
      <img v-if="!disabled" @click="previewPic(index)" :src="item" />
      <img v-else @click="previewPic(index)" :src="`http://fd.sctsjkj.com:5081${item}`" />
      <van-icon
        v-if="!disabled"
        name="cross"
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
  display: flex;
  justify-content: start;
  /*height: 100px;*/
  /*& > :first-child {*/
  /*  margin: auto 8px auto 0;*/
  /*}*/
  & > div {
    margin: 0 6px;
    width: 100px;
    height: 90px;
    img {
      object-fit: cover;
      width: 100px;
      height: 90px;
    }
    i {
      font-size: 20px;
      left: 80px;
      top: -94px;
      position: relative;
    }
  }
}
</style>
