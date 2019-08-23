<template>
  <div class="bing-number">
    <div>
      <base-nav title="绑定设施编号"></base-nav>
      <base-form
        :form="form"
        :form-list="formList"
        @codeInfo="setCode"
      ></base-form>

      <van-cell title="设施所属消防系统（单选）">
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
      id: 0,
      form: {
        equiNo: ""
      },
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
    console.log(this.$route);
    this.id = +this.$route.params.id;
    let f = this.$route.query;
    if (this.id) {
      this.form.equiNo = f.equiNo;
      this.form.address = f.address;
      this.form.id = f.id;
      this.form.opreation = 1; // 0-删除，1-修改
    }
    this.getUnit();
  },
  mounted() {},
  methods: {
    setCode(val) {
      this.form.equiNo = val;
    },
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
      let a = this.id
        ? this.$axios.put(this.$api.UPDATE_EQUIPMENTNO_INFO, this.form)
        : this.$axios.post(this.$api.ADD_EQUIPMENT_NO, this.form);
      a.then(res => {
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
