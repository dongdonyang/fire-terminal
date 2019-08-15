<template>
  <van-cell-group class="base-form">
    <van-field
      v-for="(item, index) in formList"
      :key="index"
      v-model="form[item.value]"
      :placeholder="item.remind"
      :label="item.label"
      :type="item.type"
    >
      <img
        v-if="item.icon"
        :width="iconWidth"
        :height="iconHeight"
        slot="left-icon"
        :src="item.icon"
        alt=""
      />
      <!--      todo 发送短信验证码-->
      <van-button
        v-if="item.mySolt === 'sendCode'"
        slot="button"
        size="small"
        type="primary"
        @click="mySlotClick"
        >发送验证码</van-button
      >
      <!--      todo 扫一扫-->
      <img
        v-else-if="item.mySolt === 'scan'"
        width="60%"
        slot="button"
        src="../assets/site_btn_saoma.png"
        alt=""
        @click="getCode"
      />
    </van-field>
    <slot></slot>
  </van-cell-group>
</template>

<script>
/**
 *  作者：0          时间：2019/7/4 09:01
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseField",
  components: {},
  props: {
    form: {
      type: Object
    },
    //  todo form 字段、图标、提醒文字、类型（密码、等）
    formList: {
      type: Array
    },
    iconWidth: {
      type: String,
      default: "18px"
    },
    iconHeight: {
      type: String,
      default: "20px"
    }
  },
  data() {
    return {
      barcode: Object
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * @fileOverview slot按钮点击事件
     */
    mySlotClick() {
      this.$emit("mySlotClick");
    },
    /**
     * @fileOverview 扫描一维码、二维码信息
     */
    getCode() {
      let that = this;
      this.barcode = plus.barcode.create("barcode", [plus.barcode.QR], {
        width: "100%",
        height: "100%"
      });
      plus.key.addEventListener("backbutton", function() {
        that.barcode.close();
      });
      this.barcode.onmarked = this.onmarked;
      plus.webview.currentWebview().append(this.barcode);
      this.barcode.start();
    },
    onmarked(type, result) {
      let that = this;
      console.log(type, result);
      let text = "未知: ";
      switch (type) {
        case plus.barcode.QR:
          text = "QR: ";
          break;
        case plus.barcode.EAN13:
          text = "EAN13: ";
          break;
        case plus.barcode.AZTEC:
          text = "AZTEC: ";
          break;
      }
      alert(text + result);
      that.$emit("codeInfo", result);
      this.barcode.close();
    }
  }
};
</script>

<style lang="scss">
.base-form {
  .van-cell,
  .van-field {
    height: 52px !important;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  & > div {
    line-height: 25px;
  }
  .van-field__body {
    width: 100%;
  }
}
</style>
