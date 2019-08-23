<template>
  <div class="index">
    <!--    todo 头部-->
    <van-nav-bar @click-right="$router.push('./warning')">
      <div slot="left">
        <img src="../assets/ssgz_img_01.png" alt="" />
        <span style="margin-left: 5px">{{ $store.state.userInfo.name }}</span>
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
        replace
        :to="item.router"
      >
        <span>{{ item.label }}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.normal"
        />
      </van-tabbar-item>
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
          label: "设施故障",
          active: require("../assets/ssgz_btn_blue01.png"),
          normal: require("../assets/ssgz_btn_gray01.png"),
          router: "fault"
        },
        {
          label: "值班巡查",
          active: require("../assets/ssgz_btn_blue02.png"),
          normal: require("../assets/ssgz_btn_gray02.png"),
          router: "patrol"
        },
        {
          label: "物联终端",
          active: require("../assets/ssgz_btn_blue03.png"),
          normal: require("../assets/ssgz_btn_gray03.png"),
          router: "terminal"
        },
        {
          label: "我的设置",
          active: require("../assets/ssgz_btn_blue04.png"),
          normal: require("../assets/ssgz_btn_gray04.png"),
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
  .van-nav-bar{
    line-height: 32px;
  }
  & > :first-child {
    color: #fff;
    /*background: linear-gradient(to right, #0385fe, #039dfe);*/
    background-color: #0385fe;
    position: sticky;
    top: 0;
    img{
      width: 20px;
    }
    &::after {
      border-width: 0;
    }
  }
}
</style>
