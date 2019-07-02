<template>
  <div class="index">
    <!--    todo 头部-->
    <van-nav-bar @click-right="$router.push('./warning')">
      <div slot="left">
        <img src="../assets/ssgz_img_01.png" alt="" />
        <div>22222222</div>
      </div>
      <img slot="right" src="../assets/ssgz_btn_alarm.png" alt="" />
    </van-nav-bar>

    <!--    todo 内容-->
    <router-view />

    <!--      todo 底部导航栏-->
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in tabBars"
        :key="index"
        :icon="item.icon"
        info=""
        replace
        :to="item.router"
        >{{ item.label }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/6/27 12:02
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      tabBars: [
        {
          label: "设置故障",
          icon: "home-o",
          router: "fault"
        },
        {
          label: "值班巡查",
          icon: "search",
          router: "patrol"
        },
        {
          label: "物联终端",
          icon: "friends-o",
          router: "terminal"
        },
        {
          label: "我的设置",
          icon: "setting-o",
          router: "setting"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.active = this.$route.meta.active;
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.index {
  & > :first-child {
    color: #fff;
    background: linear-gradient(to right, #0385fe, #039dfe);
    img {
      width: 70%;
    }
  }
}
</style>
