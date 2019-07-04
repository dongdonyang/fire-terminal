<template>
  <div>
    <base-nav title="修改密码"></base-nav>
    <div>
      <van-cell-group>
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        ></van-field>
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        ></van-field>
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        ></van-field>
      </van-cell-group>
    </div>
    <div>
      <van-button class="large-but" type="primary" size="large"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 10:00
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "ChangePassword",
  components: {},
  props: {},
  data() {
    return {
      form: {}
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
