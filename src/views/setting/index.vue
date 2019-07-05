<template>
  <div>
    <van-cell-group>
      <van-cell
        @click="toNext(item.router, index)"
        v-for="(item, index) in setList"
        :key="index"
        icon="location-o"
        :title="item.label"
        :value="item.content"
        is-link
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/6/27 14:02
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      setList: [
        {
          icon: "",
          label: "引导设置",
          router: "/AddWorker"
        },
        {
          icon: "",
          label: "绑定设置编号",
          router: "/BingNumber"
        },
        {
          icon: "",
          label: "修改密码",
          router: "/ChangePassword"
        },
        {
          icon: "",
          label: "技术支持",
          content: "天树聚城市智慧消防",
          router: "/TechnicalSupport"
        },
        {
          icon: "",
          label: "注销登录",
          router: ""
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 跳转到相应的页面
    toNext(rou, index) {
      rou ? this.$router.push(rou) : this.logOut();
    },
    //  todo 注销
    logOut() {
      this.$dialog
        .confirm({
          title: "注销登录",
          message: "您是否要注销登录？"
        })
        .then(() => {
          localStorage.removeItem("isLogin");
          localStorage.removeItem("setUserInfo");
          this.$router.push("login");
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="scss"></style>
