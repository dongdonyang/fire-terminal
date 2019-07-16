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
          // todo 获取拍照后的真实地址
          plus.io.resolveLocalFileSystemURL(
            path,
            function(entry) {
              that.getBase64(entry.fullPath, function(base64Img) {
                that.list.push(base64Img);
                alert("Capture image success: " + `base64Img`);
              });
            },
            function(e) {
              alert(e.message);
            }
          );
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
          // base64转码
          console.log(path);
          that.getBase64(path, function(base64Img) {
            that.list.push(base64Img);
            alert(base64Img);
            console.log(base64Img);
          });
        },
        function(e) {
          console.log("取消选择图片");
        },
        { filter: "image" }
      );
    },

    //  todo 将照片转码成base64
    getBase64(url, callback, outputFormat) {
      let canvas = document.createElement("CANVAS"),
        ctx = canvas.getContext("2d"),
        img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL(outputFormat || "image/png");
        callback.call(this, dataURL);
        canvas = null;
      };
      img.src = url;
    }
  }
};
</script>

<style lang="scss"></style>
