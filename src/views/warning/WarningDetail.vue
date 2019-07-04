<template>
  <div class="warn-detail">
    <base-nav title="消防警情处置"></base-nav>

    <van-cell-group>
      <van-cell
        :title="form.location"
        :value="form.checkTime"
        :label="form.alarm"
      ></van-cell>

      <van-cell>
        <van-radio-group class="warn-detail-radio" v-model="radio">
          <van-radio :name="1">误报</van-radio>
          <van-radio :name="2">测试</van-radio>
          <van-radio :name="0">真实火警</van-radio>
        </van-radio-group>

        <!--        todo 真实火警-->
        <van-cell v-show="!radio">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in noticeList"
                clickable
                :key="index"
                :title="item.label"
                @click="toggle(index)"
              >
                <van-checkbox
                  :name="item.value"
                  ref="checkboxes"
                  slot="right-icon"
                ></van-checkbox>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-cell>
      </van-cell>

      <!--      todo 情况说明-->
      <van-cell>
        <van-row slot="title" type="flex" justify="space-between">
          <van-col span="6">情况说明</van-col>
          <van-col span="2">
            <img
              @click="getVoice"
              width="90%"
              src="../../assets/zbxc_btn_yuyin.png"
            />
          </van-col>
        </van-row>
        <van-field
          slot="label"
          type="textarea"
          rows="6"
          :maxlength="200"
          v-model="form.value"
          placeholder="情况简要描述、200字以内"
        ></van-field>
      </van-cell>

      <!--      todo 现场照片-->
      <van-cell title="现场照片">
        <div slot="label">
          <img
            @click="uploadPhone"
            width="30%"
            src="../../assets/zbxc_btn_paizhao.png"
          />
        </div>
      </van-cell>
    </van-cell-group>

    <div>
      <van-button class="large-but" type="primary" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 14:34
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "WarningDetail",
  components: {},
  props: {},
  data() {
    return {
      noticeList: [
        {
          value: 1,
          label: "通知工作人员"
        },
        {
          value: 2,
          label: "通知微型消防站"
        },
        {
          value: 3,
          label: "通知119"
        }
      ],
      form: {},
      status: 0, // 状态
      checkId: 0,
      result: [],
      radio: 1
    };
  },
  computed: {},
  watch: {},
  created() {
    ({ status: this.status, checkId: this.checkId } = this.$route.params);
    this.getInfo();
  },
  mounted() {},
  methods: {
    // todo 火情通知多选框
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //  todo 获取预警详情
    getInfo() {
      this.$axios
        .get(this.$api.GET_ALARM_CHECK_DETAIL, {
          params: { checkId: this.checkId }
        })
        .then(res => {
          this.form = res.result;
        });
    },
    //  todo 获取声音
    getVoice() {
      console.log("获取声音");
    },
    //  todo 上传照片
    uploadPhone() {}
  }
};
</script>

<style lang="scss">
.warn-detail {
  &-radio {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }
}
</style>
