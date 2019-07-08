<template>
  <div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    ></van-action-sheet>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/8 11:30
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BasePhoto",
  components: {},
  model: {
    prop: "list",
    event: "change"
  },
  props: {
    list: Array
  },
  data() {
    return {
      show: false,
      actions: [{ name: "拍照" }, { name: "相册中选取" }]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 类型选择、0-拍照、2-图库中选择
    onSelect(item, index) {
      this.show = false;
      console.log(item, index);
      index ? this.getPhoto() : this.Photograph();
    },
    //    todo 拍照
    Photograph() {
      let that = this;
      let cmr = plus.camera.getCamera();
      let res = cmr.supportedImageResolutions[0];
      let fmt = cmr.supportedImageFormats[0];
      console.log("Resolution: " + res + ", Format: " + fmt);
      cmr.captureImage(
        function(path) {
          that.list.push(path);
          alert("Capture image success: " + `./${path}`);
        },
        function(error) {
          alert("Capture image failed: " + error.message);
        },
        { resolution: res, format: fmt }
      );
    },

    //    todo 相册中选取
    getPhoto() {
      let that = this;
      plus.gallery.pick(
        function(path) {
          that.list.push(path);
          alert(path);
          console.log(path);
        },
        function(e) {
          console.log("取消选择图片");
        },
        { filter: "image" }
      );
    }
  }
};
</script>

<style lang="scss"></style>
