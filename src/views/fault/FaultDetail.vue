<template>
  <div class="fault-detail">
    <base-nav :title="title[active]"></base-nav>

    <van-cell-group>
      <van-cell
        class="flex-title"
        :title="info.userName"
        :value="info.source"
        :label="info.creationTime"
      ></van-cell>

      <van-cell title="问题描述">
        <div slot="label">
          <span>{{ info.remakeText }}</span>
          <div>
            <van-image
              v-for="(item, index) in info.patrolPhotosPath"
              :key="index"
              width="100"
              height="90"
              fit="cover"
              :src="`http://fd.sctsjkj.com:5081` + item"
            ></van-image>
          </div>
        </div>
      </van-cell>

      <van-cell title="问题处理">
        <div slot="label" class="fault-detail-label">
          <van-switch-cell
            v-model="form.checked"
            title="是否已解决"
          ></van-switch-cell>
          <van-cell title="问题处理途径">
            <div slot="label">
              <van-radio-group v-model="form.radio">
                <van-radio name="1">单选框 1</van-radio>
                <van-radio name="2">单选框 2</van-radio>
              </van-radio-group>
            </div>
          </van-cell>
          <van-cell title="备注">
            <van-field
              slot="label"
              v-model="form.suggest"
              type="textarea"
              rows="6"
              placeholder="在这请输入您的备注信息"
            ></van-field>
          </van-cell>
        </div>
      </van-cell>
    </van-cell-group>

    <base-button>提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/1 17:12
 *  1,常量从js文件引入，不要定义魔术变量
 *  待处理-新增、处理中-编辑、已处理-查看
 */
export default {
  name: "FaultDetail",
  components: {},
  props: {},
  data() {
    return {
      title: ["设施故障待处理", "设施故障处理中", "设置故障已解决"],
      info: {},
      active: 0,
      breakDownId: 0,
      form: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.active = this.$route.params.status * 1;
    this.breakDownId = this.$route.params.breakDownId * 1;
    this.getDetail();
  },
  mounted() {},
  methods: {
    //  todo 获取设施故障详情
    getDetail() {
      this.$axios
        .get(this.$api.GET_BREAK_DOWN_INFO, {
          params: { BreakDownId: this.breakDownId }
        })
        .then(res => {
          if (res.success) {
            this.info = res.result;
          }
        });
    }
  }
};
</script>

<style lang="scss">
.fault-detail {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  & > :nth-child(2) {
    flex: 2 0 auto;
  }
  &-label {
    & > div {
      background-color: #f0f0f0;
    }
  }
}
</style>
