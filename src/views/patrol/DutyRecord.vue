<template>
  <div class="duty-record">
    <base-nav title="值班记录"></base-nav>
    <van-cell-group>
      <van-cell title="值班人员" :value="form.dutyUser"></van-cell>
      <van-cell>
        <van-row slot="title" type="flex" justify="space-between">
          <van-col>值班记录</van-col>
          <van-col style="color: #969799"
            >请填写纸质值班记录、并拍照存档</van-col
          >
        </van-row>
        <shot-photo slot="label" v-model="photoList1"></shot-photo>
      </van-cell>

      <van-switch-cell
        v-model="form.checked"
        title="发现问题"
      ></van-switch-cell>

      <div v-show="form.checked">
        <describe-qusetion></describe-qusetion>

        <van-switch-cell
          v-model="form.checked1"
          title="是否已解决"
        ></van-switch-cell>

        <van-cell title="附件现场问题图片">
          <shot-photo slot="label" v-model="photoList2"></shot-photo>
        </van-cell>
      </div>
    </van-cell-group>

    <base-button @click="submit">提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/9 13:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
import ShotPhoto from "../../components/ShotPhoto";
import DescribeQusetion from "../../components/DescribeQusetion";
export default {
  name: "DutyRecord",
  components: {
    ShotPhoto,
    DescribeQusetion
  },
  props: {},
  data() {
    return {
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
          }
        });
    },
    //  todo 新增值班记录
    submit() {
      let f = this.form;
      let one = this.photoList1.length;
      let two = this.photoList2.length;
      f.FireUnitId = this.id;
      f.FireUnitUserId = this.$store.state.userInfo.userId;
      if (one) {
        for (let i in this.photoList1) {
          f[`DutyPicture${i + 1}`] = this.photoList1[i];
        }
      }
      if (two) {
        for (let i in this.photoList2) {
          f[`ProblemPicture${i + 1}`] = this.photoList2[i];
        }
      }
      this.$axios.post(this.$api.ADD_DUTY_INFO, f).then(res => {
        if (res.success) {
          this.$toast.success("保存成功");
        }
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
