<template>
  <div class="bing-number">
    <div>
      <base-nav title="绑定设施编号"></base-nav>
      <base-form :form="form" :form-list="formList"></base-form>

      <van-cell title="设施所属消防系统">
        <van-radio-group slot="label" v-model="form.fireSystemId">
          <van-cell-group>
            <van-cell
              @click="toggle(item)"
              v-for="(item, index) in unitList"
              :key="index"
              :title="item.systemName"
              clickable
            >
              <van-radio slot="right-icon" :name="item.id"></van-radio>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <!--        <van-checkbox-group v-model="form.fireSystemId" slot="label">-->
        <!--          <van-cell-group>-->
        <!--            <van-cell-->
        <!--              v-for="(item, index) in unitList"-->
        <!--              clickable-->
        <!--              :key="item"-->
        <!--              :title="item.systemName"-->
        <!--              @click="toggle(index)"-->
        <!--            >-->
        <!--              <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />-->
        <!--            </van-cell>-->
        <!--          </van-cell-group>-->
        <!--        </van-checkbox-group>-->
      </van-cell>
    </div>

    <base-button @click="submit">提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 09:57
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BingNumber",
  components: {},
  props: {},
  data() {
    return {
      form: {},
      formList: [
        {
          label: "设施编码",
          remind: "输入或扫描设施编码",
          value: "equiNo",
          mySolt: "scan"
        },
        {
          label: "具体位置",
          remind: "请输入具体位置",
          value: "address"
        }
      ],
      unitList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUnit();
  },
  mounted() {},
  methods: {
    toggle(item) {
      this.$set(this.form, "fireSystemId", item.id);
    },
    //  todo 获取消防系统
    getUnit() {
      this.$axios.get(this.$api.GET_FIRE_SYSTEM).then(res => {
        if (res.success) {
          this.unitList = res.result;
        }
      });
    },
    //  todo 提交
    submit() {
      this.$axios.post(this.$api.ADD_EQUIPMENT_NO, this.form).then(res => {
        if (res.success) {
          if (res.result.success) {
            this.$toast.success("绑定成功！");
            this.$router.back();
          } else {
            this.$toast.fail(res.result.failCause);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../style/app";
.bing-number {
  background-color: #fff;
  @include my-flex();
}
</style>
