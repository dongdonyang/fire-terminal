<template>
  <div class="duty-record">
    <base-nav title="值班记录"></base-nav>
    <van-cell-group>
      <van-cell title="值班人员" :value="form.dutyUser"></van-cell>
      <van-switch-cell
        v-model="form.checked"
        title="发现问题"
      ></van-switch-cell>
      <van-cell title="值班记录" value="请填写纸质值班记录">
        <div slot="label">照片</div>
      </van-cell>
      <div>
        <van-cell title="问题描述"></van-cell>
        <van-switch-cell
          v-model="form.checked1"
          title="是否已解决"
        ></van-switch-cell>
        <van-cell title="附件现场问题图片"></van-cell>
      </div>
    </van-cell-group>
    <base-button>提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/9 13:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "DutyRecord",
  components: {},
  props: {},
  data() {
    return {
      form: {},
      status: 0,
      id: 0
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.$route);
    let { id, status } = this.$route.params;
    this.status = status * 1;
    this.id = id * 1;
    id ? this.getinfo() : ""; // 查看状态才进行查询
  },
  mounted() {},
  methods: {
    //  todo 获取详情
    getinfo() {
      this.$axios
        .get(this.$api.GET_DUTY_INFO, {
          params: { DutyId: this.id }
        })
        .then(res => {
          if (res.success) {
            this.form = res.result;
          }
        });
    }
  }
};
</script>

<style lang="scss">
.duty-record {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  & > :nth-child(2) {
    flex: 2 0 auto;
  }
}
</style>
