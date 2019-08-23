<template>
  <div>
    <van-cell-group>
      <van-cell
        @click="toNext(item.router, index)"
        v-for="(item, index) in setList"
        :key="index"
        :title="item.label"
        :value="item.content"
        is-link
      >
        <img
          slot="icon"
          width="18px"
          height="20px"
          style="margin-right: 10px"
          :src="item.icon"
          alt=""
        />
      </van-cell>
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
          icon: require("../../assets/site_img_01.png"),
          label: "引导设置",
          router: "/AddWorker"
        },
        {
          icon: require("../../assets/site_img_02.png"),
          label: "绑定设置编码",
          router: "/CodeList"
        },
        {
          icon: require("../../assets/site_img_03.png"),
          label: "修改密码",
          router: "/ChangePassword"
        },
        {
          icon: require("../../assets/site_img_04.png"),
          label: "技术支持",
          content: "天树聚城市智慧消防",
          router: "/TechnicalSupport"
        },
        {
          icon: require("../../assets/site_img_05.png"),
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
    //  todo 跳转到相应的页面、或者注销
    toNext(rou, index) {
      rou ? this.$router.push(rou) : this.logOut();
    },
    //  todo 注销
    logOut() {
      let that = this;
      this.$dialog
        .confirm({
          title: "注销登录",
          message: "您是否要注销登录？"
        })
        .then(() => {
          this.$axios.post(this.$api.USER_LOGOUT).then(res => {
            if (res.success) {
              localStorage.removeItem("isLogin");
              localStorage.removeItem("setUserInfo");
              this.$router.push("login");
            }
          });
        })
        .catch(() => {});
      this.setBackButton(function() {
        that.$dialog.close();
      });
    }
  }
};
</script>

<style lang="scss"></style>
