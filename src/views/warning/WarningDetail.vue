<template>
  <div class="warn-detail">
    <div>
      <base-nav title="消防警情处置"></base-nav>

      <van-cell-group>
        <van-cell
          class="flex-title"
          :title="form.location ? form.location : '******'"
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
                @click="isSpeak = !isSpeak"
                width="90%"
                src="../../assets/zbxc_btn_yuyin.png"
              />
            </van-col>
          </van-row>
          <div slot="label">
            <van-field
              type="textarea"
              rows="6"
              :maxlength="200"
              v-model="form.value"
              placeholder="情况简要描述、200字以内"
            >
              <base-play-sound slot="button" :voice="playUrl"></base-play-sound>
            </van-field>
            <div class="warn-detail-speck" v-show="isSpeak">
              <base-record-sound v-model="playUrl"></base-record-sound>
            </div>
          </div>
        </van-cell>

        <!--      todo 现场照片-->
        <van-cell title="现场照片">
          <div slot="label" class="warn-detail-photolist">
            <img
              v-show="photoList.length < 3"
              @click="$refs.BasePhoto.show = true"
              src="../../assets/zbxc_btn_paizhao.png"
            />
            <div v-for="(item, index) in photoList" :key="index">
              <img :src="item" />
              <van-icon
                name="cross"
                @click="photoList.splice(index, 1)"
              ></van-icon>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>

    <!--    todo 图片上传方式-->
    <base-photo ref="BasePhoto" v-model="photoList"></base-photo>

    <base-button>提交</base-button>
  </div>
</template>

<script>
import BasePhoto from "../../components/BasePhoto";
/**
 *  作者：0          时间：2019/7/2 14:34
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "WarningDetail",
  components: { BasePhoto },
  props: {},
  data() {
    return {
      playUrl: "",
      photoList: [],
      isSpeak: false,
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
      form: {
        photoList: []
      },
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
    //  todo 上传照片
    uploadPhone() {}
  }
};
</script>

<style lang="scss">
@import "../../style/app";
.warn-detail {
  background-color: #fff;
  @include my-flex();
  &-radio {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }
  /*输入语音按钮位置*/
  &-speck {
    position: absolute;
    left: 38%;
    top: 72%;
  }
  &-photolist {
    display: flex;
    justify-content: start;
    & > div {
      margin: 0 8px;
      width: 100px;
      height: 90px;
      img {
        object-fit: cover;
        width: 100px;
        height: 90px;
      }
      i {
        font-size: 20px;
        left: 80px;
        top: -94px;
        position: relative;
      }
    }
    & > img {
      width: 100px;
      height: 90px;
    }
  }
}
</style>
