<template>
  <div class="patrol-detail">
    <div>
      <base-nav title="新增巡查轨迹"></base-nav>
      <van-cell-group>
        <!--        扫码巡查-->
        <div v-if="type === 2 && !id">
          <base-form
            @codeInfo="getAddress"
            :form="form"
            :form-list="formList"
          ></base-form>
          <van-cell-group v-if="form.patrolAddress">
            <van-cell title="巡查地址">{{ form.patrolAddress }}</van-cell>
            <van-cell title="巡查系统">{{ form.fireSystemName }}</van-cell>
          </van-cell-group>
        </div>

        <!--        一般巡查-->
        <div v-else-if="type !== 2 && !id">
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

        <!--        查看-->
        <div v-else>
          <van-cell title="巡查时间">{{ form.creationTime }}</van-cell>
          <van-cell title="巡查地点">{{ form.patrolAddress }}</van-cell>
          <van-cell title="巡查系统">{{ form.fireSystemName }}</van-cell>
          <van-cell title="巡查结果">
            <div
              :style="{ color: $store.state.getStatusColor[form.patrolStatus] }"
            >
              {{ $store.state.getStatus[form.patrolStatus] }}
            </div>
          </van-cell>
          <!--      todo 情况说明-->
          <describe-qusetion
            :isEdit="id"
            :voice="form.remarkVioce"
            :content="form.remakeText"
          ></describe-qusetion>
        </div>

        <!--        添加、语音、文字-->
        <van-switch-cell
          v-if="!id"
          v-model="form.hasMatter"
          title="发现问题"
        ></van-switch-cell>
        <div v-show="form.hasMatter && !id">
          <describe-qusetion v-model="question"></describe-qusetion>

          <van-switch-cell
            v-model="form.isSolve"
            title="是否已解决"
          ></van-switch-cell>
        </div>

        <van-cell title="现场照片">
          <shot-photo v-if="!id" slot="label" v-model="photoList"></shot-photo>
          <shot-photo
            v-else
            slot="label"
            :disabled="id"
            v-model="form.photoList"
          ></shot-photo>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="patrol-detail-but" v-if="!id">
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
      tmid: "", // 定时器
      unitList: [],
      type: 0,
      id: 0,
      photoList: [],
      question: {},
      form: {
        patrolAddress: "",
        fireSystemName: "",
        systemId: [],
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
  watch: {
    "form.equiNo": function(val) {
      let that = this;
      window.clearTimeout(that.tmid);
      if (val) {
        that.tmid = setTimeout(() => {
          that.getAddress(val);
        }, 500);
      }
    }
  },
  created() {
    let { id, type } = this.$route.params;
    this.id = +id;
    this.type = +type;
    !+id ? this.getUnit() : "";
  },
  mounted() {
    // 为了能创建语音对象，语音对象是watch中创建的，放在created中不能监听的到。为什么呢
    this.id ? this.getLocalDetail() : "";
  },
  methods: {
    // todo 多选
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
    // todo 查看、获取本地数据
    getLocalDetail() {
      let val = localStorage.getItem("patrolArrayDetail");
      if (val) {
        this.form = JSON.parse(val);
        if (this.form.patrolId && this.form.problemRemakeType === 2) {
          this.form.remarkVioce = `${this.$url}${this.form.remakeText}`;
        }
        console.log("查看详情", this.form);
      }
    },
    // todo 根据条码获取地址信息
    getAddress(code) {
      this.$axios
        .get(this.$api.GET_EQUIPMENTNO_INFO, {
          params: { EquiNo: code }
        })
        .then(res => {
          if (res.success) {
            this.form.patrolAddress = res.result.address;
            this.form.fireSystemName = res.result.fireSystemName;
          }
        });
    },
    //  todo 本地保存
    submit() {
      let f = this.form;
      if (!f.patrolAddress) {
        this.$toast("请输入地点");
        return;
      }
      f.patrolStatus = f.hasMatter ? (f.isSolve ? 2 : 3) : 1;
      f.problemStatusName = f.hasMatter
        ? f.isSolve
          ? "绿色故障"
          : "橙色故障"
        : "正常";
      //系统，类别
      if (this.type === 1) {
        let arr = [];
        for (let x of this.form.systemId) {
          arr.push(x.id);
        }
        this.form.SystemIdList = arr.join(",");
      } else {
        this.form.SystemIdList = "5";
      }
      console.log(this.form.SystemIdList);
      // 照片
      if (this.photoList.length) {
        for (let i in this.photoList) {
          f[`livePicture${Number(i) + 1}`] = this.photoList[i];
          f.photoList.push(this.photoList[i]);
        }
      }
      //语音
      if (this.question.voice) {
        f.remakeText = "";
        f.remarkVioce = this.question.voice;
        f.playVoiceTime = this.question.voiceTime;
        f.problemRemakeType = 2;
      } else {
        f.remarkVioce = "";
        f.remakeText = this.question.content;
        f.problemRemakeType = 1;
      }
      //当前时间
      f.creationTime = new Date().toLocaleString();
      console.log(this.form);

      let val = localStorage.getItem("patrolArray");
      if (!val) {
        val = [];
      } else {
        val = JSON.parse(val);
      }
      val.unshift(f);
      console.log(val);
      localStorage.setItem("patrolArray", JSON.stringify(val));
      this.$toast.success("本地保存成功,请尽快提交");
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
      width: 50%;
    }
    & > :nth-child(1) {
      button {
        background-color: #00b7e4;
        border-color: #00b7e4;
      }
    }
  }
}
</style>
