<template>
  <div>
    <base-nav title="消防管理员注册"></base-nav>
    <van-cell-group>
      <van-field v-model="form.account" placeholder="请输入单位名称">
        <img
          width="70%"
          slot="left-icon"
          src="../../assets/load_img_06.png"
          alt=""
        />
      </van-field>

      <van-field v-model="form.account" placeholder="请输入邀请码">
        <img
          width="70%"
          slot="left-icon"
          src="../../assets/load_img_07.png"
          alt=""
        />
      </van-field>
    </van-cell-group>
    <small
      >管理员拥有全部权限，只能通过邀请码进行注册，请妥善保管邀请码，勿对外泄露。</small
    >
    <div>
      <van-button
        class="large-but"
        type="primary"
        size="large"
        @click="$router.push('/RegisterTwo')"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 16:39
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "RegisterOne",
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
