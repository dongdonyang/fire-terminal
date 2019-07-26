<template>
  <div class="duty-record">
    <base-nav title="值班记录"></base-nav>
    <van-cell-group>
      <van-cell title="值班人员" :value="form.dutyUser"></van-cell>
      <van-cell>
        <van-row slot="title" type="flex" justify="space-between">
          <van-col>值班记录</van-col>
          <van-col v-if="!id" style="color: #969799"
            >请填写纸质值班记录、并拍照存档</van-col
          >
        </van-row>
        <shot-photo
          :disabled="id"
          slot="label"
          v-model="photoList1"
        ></shot-photo>
      </van-cell>

      <van-switch-cell
        v-if="!id"
        v-model="form.hasMatter"
        title="发现问题"
      ></van-switch-cell>
      <div v-else>
        <van-cell
          title="问题类型"
          :value="getStatus[form.dutyStatus]"
        ></van-cell>
        <describe-qusetion :disabled="id" :form="form"></describe-qusetion>
        <van-cell title="附件现场问题图片">
          <shot-photo
            slot="label"
            :disabled="id"
            v-model="photoList2"
          ></shot-photo>
        </van-cell>
      </div>

      <div v-show="form.hasMatter">
        <describe-qusetion
                v-model="question"
          :voice.sync="form.voice"
          content.sync="form.content"
        ></describe-qusetion>

        <van-switch-cell
          v-model="form.isSolve"
          title="是否已解决"
        ></van-switch-cell>

        <van-cell title="附件现场问题图片">
          <shot-photo slot="label" v-model="photoList2"></shot-photo>
        </van-cell>
      </div>
    </van-cell-group>

    <base-button @click="submit" v-if="!id">提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/9 13:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
import ShotPhoto from "../../components/ShotPhoto";
import DescribeQusetion from "../../components/DescribeQusetion";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "DutyRecord",
  components: {
    ShotPhoto,
    DescribeQusetion
  },
  props: {},
  data() {
    return {
      question:{},
      getStatus: {
        0: "指定 ",
        1: "正常 ",
        2: "绿色故障",
        3: "橙色故障"
      },
      photoList1: [],
      photoList2: [],
      form: {},
      status: 0,
      id: 0
    };
  },
  computed: {},
  watch: {},
  created() {
    let { id, status } = this.$route.params;
    this.status = status * 1;
    this.id = +id;
    +id
      ? this.getinfo()
      : (this.form.dutyUser = this.$store.state.userInfo.name); // 查看状态才进行查询
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
            this.form.content = res.result.problemRemark;
            //  值班记录照片
            if (this.form.dutyPhtosPath.length) {
              for (let i in this.form.dutyPhtosPath) {
                this.photoList1.push(
                  `${this.$url}${this.form.dutyPhtosPath[i]}`
                );
              }
            }
            //   问题照片
            if (this.form.problemPhtosPath.length) {
              for (let i in this.form.problemPhtosPath) {
                this.photoList2.push(
                  `${this.$url}${this.form.problemPhtosPath[i]}`
                );
              }
            }
          }
        });
    },
    //  todo 新增值班记录
    submit() {
      console.log(this.question);
      console.log("语音地址：", this.form);
      console.log("照片地址：", this.photoList1);
      console.log("照片地址：", this.photoList2);
      let that = this;
      let task = plus.uploader.createUpload(
        `http://fd.sctsjkj.com:5081${this.$api.ADD_DUTY_INFO}`,
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
      task.addFile(this.question.voice, { key: "RemarkVioce" });
      task.addData("FireUnitUserId", this.$store.state.userInfo.userId);
      task.addData("FireUnitId", this.$store.state.userInfo.fireUnitID);
      task.addData("CheckId", this.checkId);
      task.addData(
        "CheckState",
        this.form.hasMatter ? (this.form.isSolve ? 2 : 3) : 1
      );
      task.addData("DutyRemark", this.question.content);
      // 值班记录图片
      if (this.photoList1.length) {
        for (let i in this.photoList1) {
          task.addFile(this.photoList1[i], {
            key: `DutyPicture${Number(i) + 1}`
          });
        }
      }
      //现场问题图片
      if (this.photoList2.length) {
        for (let i in this.photoList2) {
          task.addFile(this.photoList2[i], {
            key: `ProblemPicture${Number(i) + 1}`
          });
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
.duty-record {
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  & > :nth-child(2) {
    flex: 2 0 auto;
  }
}
</style>
