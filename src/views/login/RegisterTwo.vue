<template>
  <div>
    <base-nav title="消防管理员注册"></base-nav>
    <van-cell-group>
      <van-field
        v-for="(item, index) in formList"
        :key="index"
        :v-model="item.value"
        :placeholder="item.label"
      >
        <img width="70%" slot="left-icon" :src="item.img" alt="" />
      </van-field>
    </van-cell-group>
    <div>
      <van-button type="primary" size="large" class="large-but"
        >注册</van-button
      >
    </div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 16:40
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "RegisterTwo",
  components: {},
  props: {},
  data() {
    return {
      form: {},
      formList: [
        {
          img: require("../../assets/load_img_06.png"),
          label: "请输入单位名称",
          value: ""
        },
        {
          img: require("../../assets/load_img_06.png"),
          label: "请输入真实姓名",
          value: ""
        },
        {
          img: require("../../assets/load_img_06.png"),
          label: "请输入手机号",
          value: ""
        },
        {
          img: require("../../assets/load_img_06.png"),
          label: "请输入登录密码",
          value: ""
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss"></style>
