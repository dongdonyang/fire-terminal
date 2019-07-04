<template>
  <van-cell-group class="base-form">
    <van-field
      v-for="(item, index) in formList"
      :key="index"
      v-model="form[item.value]"
      :placeholder="item.remind"
      :label="item.label"
    >
      <img :width="iconWidth" slot="left-icon" :src="item.icon" alt="" />
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
      default: "80%"
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
      console.log("erweim");
    }
  }
};
</script>

<style lang="scss">
  .base-form{
    & > div{
      line-height: 25px;
    }
  }
</style>
