<template>
  <div class="tec-sup">
    <base-nav title="技术支持"></base-nav>
    <img width="100%" src="../../assets/site_img_09.png" />
    <van-cell-group>
      <van-cell title="技术支持电话：13865699955" icon="location-o"></van-cell>
      <van-cell title="我要提建议" icon="location-o" is-link @click="$router.push('/AddAdvice')"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 10:01
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "TechnicalSupport",
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

<style lang="scss">
.tec-sup {
}
</style>
