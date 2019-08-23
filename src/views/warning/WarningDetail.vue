<template>
  <div class="warn-detail">
    <div>
      <base-nav title="消防警情处置"></base-nav>

      <van-cell-group>
        <!--        todo 预警单位信息-->
        <van-cell class="flex-title" :title="form.location">
          <div slot="label">
            <div>{{ form.alarm }}</div>
            <div>{{ form.checkTime }}</div>
          </div>
        </van-cell>

        <van-cell v-if="!status">
          <van-radio-group
            class="warn-detail-radio"
            v-model="form.checkStateValue"
          >
            <van-radio :name="1">误报</van-radio>
            <van-radio :name="2">测试</van-radio>
            <van-radio :name="3">真实火警</van-radio>
          </van-radio-group>
          <!--        todo 真实火警-->
          <van-cell v-show="form.checkStateValue === 3 && !status">
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

        <van-cell
          v-else
          title="核警情况"
          :value="form.checkStateName"
        ></van-cell>

        <!--        todo 查看用户信息-->
        <van-cell
          v-if="status"
          class="flex-title"
          :title="form.userName"
          :value="form.time"
          :label="form.userPhone"
        ></van-cell>

        <!--      todo 情况说明-->
        <describe-qusetion
          v-model="question"
          :voice="form.vioceUrl"
          :content="form.content"
          :isEdit="status"
        ></describe-qusetion>

        <!--      todo 现场照片-->
        <van-cell title="现场照片" v-if="photoList.length || !status">
          <shot-photo
            slot="label"
            v-model="photoList"
            :disabled="status"
          ></shot-photo>
        </van-cell>
      </van-cell-group>
    </div>

    <base-button @click="submit" v-if="!status">提交</base-button>
  </div>
</template>

<script>
import ShotPhoto from "../../components/ShotPhoto";
import DescribeQusetion from "../../components/DescribeQusetion";
/**
 *  作者：0          时间：2019/7/2 14:34
 *  1,常量从js文件引入，不要定义魔术变量
 */
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "WarningDetail",
  components: {
    ShotPhoto,
    DescribeQusetion
  },
  props: {},
  data() {
    return {
      question: {},
      photoList: [],
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
        // 为了同步更新才定义的
        location: "",
        checkTime: "",
        alarm: "",
        checkStateValue: 1
      },
      status: 0, // 状态
      checkId: 0,
      result: [1]
    };
  },
  computed: {},
  watch: {},
  created() {
    let p = this.$route.params;
    this.status = +p.status;
    this.checkId = p.checkId;
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
          let r = res.result;
          if (!this.status) {
            let { location, checkTime, alarm } = r;
            this.form.location = location;
            this.form.checkTime = checkTime;
            this.form.alarm = alarm;
          } else {
            this.form = r;
            // 照片转数组
            for (let x = 0; x < 4; x++) {
              let p = r[`pictureUrl_${x}`];
              !p || this.photoList.push(`${this.$url}${p}`); // 取代if判断
            }
            //  语音
            if (this.form.vioceUrl) {
              this.form.vioceUrl = `${this.$url}${this.form.vioceUrl}`;
            }
          }
        });
    },
    // todo 提交
    submit() {
      console.log(this.form);
      console.log("语音地址：", this.question.voice);
      console.log("照片地址：", this.photoList);
      let that = this;
      let task = plus.uploader.createUpload(
        `${this.$url}${this.$api.CHECK_ALARM}`,
        {
          method: "POST"
        },
        function(t, status) {
          console.log("请求成功后的返回数据：", t, status);
          // 上传完成
          if (status === 200) {
            Toast.clear();
            that.$toast.success("提交成功");
            that.$router.back();
          } else {
            that.$toast.fail("提交失败");
          }
        }
      );
      task.addData("UserId", this.$store.state.userInfo.userId);
      task.addData("CheckId", this.checkId); // todo 只能使用字符串！！！！！
      task.addData("CheckState", this.form.checkStateValue + "");
      task.addData("Content", this.question.content);
      task.addFile(this.question.voice, { key: "Voice" });
      if (this.photoList.length) {
        for (let i in this.photoList) {
          task.addFile(this.photoList[i], { key: `Picture${Number(i) + 1}` });
        }
      }
      task.start();
      Toast.loading({
        duration: 0,
        mask: true,
        message: "提交中"
      });
    }
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
