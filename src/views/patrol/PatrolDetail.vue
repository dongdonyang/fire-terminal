<template>
  <div class="patrol-detail">
    <div>
      <base-nav title="新增巡查轨迹"></base-nav>
      <van-cell-group>
        <!--        扫码巡查-->
        <base-form
          v-if="type === 2"
          :form="form"
          :form-list="formList"
        ></base-form>

        <!--        一般巡查-->
        <div v-else>
          <base-form :form="form" :form-list="formList1"></base-form>
          <van-cell title="巡查系统">
            <van-checkbox-group slot="label" v-model="form.systemId">
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in unitList"
                  clickable
                  :key="index"
                  :title="item.systemName"
                  @click="toggle(index)"
                >
                  <van-checkbox
                    :name="item"
                    ref="checkboxes"
                    slot="right-icon"
                  ></van-checkbox>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </van-cell>
        </div>

        <van-switch-cell
          v-model="form.hasMatter"
          title="发现问题"
        ></van-switch-cell>
        <div v-show="form.hasMatter">
          <describe-qusetion :form="form"></describe-qusetion>
          <van-switch-cell
            v-model="form.isSolve"
            title="是否已解决"
          ></van-switch-cell>
        </div>
        <van-cell title="现场照片">
          <shot-photo slot="label" v-model="photoList"></shot-photo>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="patrol-detail-but">
      <base-button @click="submit">保存并返回</base-button>
      <base-button @click="submit">保存并继续添加</base-button>
    </div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 09:39
 *  1,常量从js文件引入，不要定义魔术变量
 */
import shotPhoto from "../../components/ShotPhoto";
import DescribeQusetion from "../../components/DescribeQusetion";
export default {
  name: "PatrolDetail",
  components: {
    shotPhoto,
    DescribeQusetion
  },
  props: {},
  data() {
    return {
      unitList: [],
      type: 0,
      id: 0,
      photoList: [],
      form: {
        photoList: [],
        systemList: []
      },
      formList: [
        {
          label: "设施编码",
          remind: "输入或扫描设施编码",
          value: "equiNo",
          mySolt: "scan"
        }
      ],
      formList1: [
        {
          label: "巡查地点",
          remind: "输入地点名称",
          value: "patrolAddress"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUnit();
    let { id, type } = this.$route.params;
    this.id = +id;
    this.type = +type;
  },
  mounted() {},
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //  todo 获取消防系统
    getUnit() {
      this.$axios.get(this.$api.GET_FIRE_SYSTEM).then(res => {
        if (res.success) {
          this.unitList = res.result;
        }
      });
    },
    //  todo 本地保存
    submit() {
      let f = this.form;
      f.problemStatus = f.hasMatter ? (f.isSolve ? 2 : 3) : 1;
      f.problemStatusName = f.hasMatter
        ? f.isSolve
          ? "绿色故障"
          : "橙色故障"
        : "正常";
      // 照片
      if (this.photoList.length) {
        for (let i in this.photoList) {
          f[`livePicture${Number(i) + 1}`] = this.photoList[i];
          f.photoList.push(this.photoList[i]);
        }
      }
      //语音
      if (f.voice) {
        f.problemRemark = "";
        f.remarkVioce = f.voice;
        f.problemRemarkType = 2;
      } else {
        f.remarkVioce = "";
        f.problemRemark = f.content;
        f.problemRemarkType = 1;
      }
      //当前时间
      f.localTime = new Date().toLocaleString();
      console.log(this.form);

      let val = localStorage.getItem("patrolArray");
      if (!val) {
        val = [];
      } else {
        val = JSON.parse(val);
      }
      val.push(f);
      console.log(val);
      localStorage.setItem("patrolArray", JSON.stringify(val));
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
@import "../../style/app";
.patrol-detail {
  @include my-flex();
  background-color: #fff;
  &-but {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    & > div {
      width: 45%;
    }
  }
}
</style>
