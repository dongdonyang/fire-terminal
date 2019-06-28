<template>
  <div>
    <!--    todo 头部-->
    <van-nav-bar left-text="返回" right-text="按钮"></van-nav-bar>
    <!--    todo 内容-->
    <router-view />
    <!--      todo 底部导航栏-->
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in tabBars"
        :key="index"
        :icon="item.icon"
        info="5"
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
    this.getRole();
  },
  mounted() {
    this.$router.push("/login");
  },
  methods: {
    //    todo 角色判断、管理员-设置故障、其余角色进入值班巡查、且没有底部四个导航按钮、用户的角色得存在vuex中
    getRole() {
      if (0) {
        this.active = 0;
        this.$router.push("fault");
      } else {
        this.active = 1;
        this.$router.push("patrol");
      }
    }
  }
};
</script>

<style lang="scss"></style>
