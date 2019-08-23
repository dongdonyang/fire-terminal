<template>
  <div class="fault-detail">
    <base-nav :title="title[active]"></base-nav>

    <van-cell-group>
      <van-cell
        class="flex-title"
        :title="form.userName"
        :value="$store.state.getAction[form.source]"
        :label="form.creationTime"
      ></van-cell>

      <!--      todo 建议抽离图片展示-->
      <van-cell title="问题描述">
        <div slot="label">
          <div class="fault-detail-text">{{ form.remakeText }}</div>
          <shot-photo v-model="form.photoList" :disabled="1"></shot-photo>
        </div>
      </van-cell>

      <div v-if="active === '2'">
        <van-cell title="解决时间" :value="form.solutionTime"></van-cell>
        <van-cell
          title="处理途径"
          :value="form.solutionWay === 1 ? '自行处理' : '维保叫修'"
        ></van-cell>
        <van-cell title="备注信息" :label="form.remark"></van-cell>
      </div>

      <van-cell v-else title="问题处理">
        <div slot="label" class="fault-detail-label">
          <van-switch-cell
            v-model="handleStatus"
            title="是否已解决"
          ></van-switch-cell>
          <van-cell title="问题处理途径">
            <div slot="label" class="fault-detail-label-radio">
              <van-radio-group v-model="form.solutionWay">
                <van-radio :name="1">自行处理</van-radio>
                <van-radio :name="2">维保叫修</van-radio>
              </van-radio-group>
            </div>
          </van-cell>
          <van-cell title="备注">
            <van-field
              slot="label"
              v-model="form.remark"
              type="textarea"
              rows="6"
              placeholder="在这请输入您的备注信息"
            ></van-field>
          </van-cell>
        </div>
      </van-cell>
    </van-cell-group>

    <base-button @click="submit" v-if="active !== '2'">提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/1 17:12
 *  1,常量从js文件引入，不要定义魔术变量
 *  待处理-新增、处理中-编辑、已处理-查看
 */
import ShotPhoto from "../../components/ShotPhoto";
export default {
  name: "FaultDetail",
  components: {
    ShotPhoto
  },
  props: {},
  data() {
    return {
      handleStatus: false,
      title: ["设施故障待处理", "设施故障处理中", "设置故障已解决"],
      active: 0,
      breakDownId: 0,
      form: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    ({
      status: this.active,
      breakDownId: this.breakDownId
    } = this.$route.params);
    this.getDetail();
  },
  mounted() {},
  methods: {
    // todo 更新设施故障、表单验证
    submit() {
      let f = this.form;
      f.breakDownId = this.breakDownId;
      f.handleStatus = this.handleStatus ? "3" : "2";
      this.$axios.put(this.$api.UPDATE_BREAK_DOWN_INFO, f).then(res => {
        if (res.success) {
          if (res.result.success) {
            this.$toast.success("保存成功");
            this.$router.back();
          } else {
            this.$toast(res.result.failCause);
          }
        }
      });
    },
    //  todo 获取设施故障详情
    getDetail() {
      this.$axios
        .get(this.$api.GET_BREAK_DOWN_INFO, {
          params: { BreakDownId: this.breakDownId }
        })
        .then(res => {
          if (res.success) {
            this.form = res.result;
            this.form.solutionWay = this.form.solutionWay
              ? this.form.solutionWay
              : 1;
            //  遍历照片
            this.form.photoList = [];
            for (let i of res.result.patrolPhotosPath) {
              this.form.photoList.push(`${this.$url}${i}`);
            }
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
  /*问题描述文字*/
  &-text {
    margin: 0 0 5px 4px;
  }
  &-remake {
    margin-top: 8px;
  }
  &-label {
    & > div {
      /*background-color: #f0f0f0;*/
    }
    &-radio {
      padding: 8px;
      .van-radio {
        height: 28px;
      }
    }
  }
}
</style>
