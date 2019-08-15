<template>
  <div class="patrol-record">
    <base-nav title="巡查记录"></base-nav>
    <van-cell-group>
      <van-cell>
        <div slot="title">巡查方式：{{ type[patrolType] }}</div>
        <van-button
          v-if="patrolType && !id"
          size="mini"
          type="primary"
          @click="$router.push(`/PatrolDetail/${patrolType}/0`)"
          >+新增巡查轨迹</van-button
        >
      </van-cell>

      <!--      todo 有数据！-->
      <div v-if="list.length">
        <van-cell title="">
          <div slot="label">
            有效轨迹点{{ list.length }}个，发现0个问题，现场解决0个问题
          </div>
        </van-cell>
        <van-steps
          direction="vertical"
          :active="list.length"
          class="patrol-record-steps"
        >
          <van-step v-for="(item, index) in list" :key="index">
            <van-panel
              @click.native="getDetail(item)"
              class="patrol-record-panel"
              :title="item.patrolAddress"
              :desc="item.creationTime"
              :status="
                id
                  ? ProblemStatusName[item.patrolStatus]
                  : item.problemStatusName
              "
            >
              <div class="patrol-record-steps-info">
                <!--                选择的系统-->
                <div v-if="!id && item.systemId.length">
                  {{ item.systemId[0].systemName }}等共{{
                    item.systemId.length
                  }}
                  个系统
                </div>
                <div v-else>
                  {{ item.fireSystemName }}等共{{ item.fireSystemCount }}
                  个系统
                </div>
                <!--                语音/备注-->
                <van-button
                  class="patrol-record-steps-info-but"
                  v-if="item.problemRemakeType === 2"
                  type="primary"
                  size="small"
                >
                  <img
                    class="base-play-sound-img"
                    alt=""
                    src="../../assets/zbxc_img_04.png"
                  />
                  <span>语音</span>
                </van-button>
                <div v-else>{{ item.remakeText }}</div>
                <!--                照片-->
                <div>
                  <van-image
                    v-for="(y, i) in item.photoList"
                    :key="i"
                    fit="cover"
                    width="75px"
                    height="60px"
                    :src="y"
                  ></van-image>
                </div>
              </div>
            </van-panel>
            <!--            删除-->
            <van-icon
              v-if="!id"
              class="patrol-record-steps-i"
              name="clear"
              @click="deleteStep(index)"
            ></van-icon>
          </van-step>
        </van-steps>
      </div>

      <!--      todo 暂无数据！-->
      <div class="patrol-record-empty" v-else>
        <img width="5%" src="../../assets/zbxc_img_03.png" alt="" />
        <div>
          <img width="10%" src="../../assets/zbxc_img_02.png" alt="" />
          <span>还没有巡查轨迹哦！</span>
        </div>
      </div>
    </van-cell-group>

    <base-button @click="submit" v-if="list.length && !id">提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/9 14:29
 *  1,常量从js文件引入，不要定义魔术变量
 */
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "PatrolRecord",
  components: {},
  props: {},
  data() {
    return {
      ProblemStatusName: {
        0: "未指定",
        1: "正常",
        2: "绿色故障",
        3: "橙色故障"
      },
      list: [],
      patrolType: "",
      type: {
        0: "未设置巡查方式",
        1: "普通巡查",
        2: "扫码巡查"
      },
      patrolId: 0,
      id: 0
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getType();
    this.id = +this.$route.params.id;
    this.id ? this.getList() : this.getlocalList();
  },
  mounted() {},
  methods: {
    // todo 获取巡查方式
    getType() {
      this.$axios
        .get(this.$api.GET_PATROL_TYPE, {
          params: { FireUnitId: this.$store.state.userInfo.fireUnitID }
        })
        .then(res => {
          if (res.success) {
            this.patrolType = res.result.patrolType;
          }
        });
    },
    //  todo 获取巡查轨迹
    getList() {
      this.$axios
        .get(this.$api.GET_PATROL_TRACK_LIST, {
          params: { PatrolId: this.id }
        })
        .then(res => {
          if (res.success) {
            this.list = res.result;
            //  照片
            for (let i of res.result) {
              i.photoList = [];
              for (let y in i.patrolPhotosPath) {
                i.photoList.push(`${this.$url}${i.patrolPhotosPath[y]}`);
              }
            }
          }
        });
    },
    //  todo 获取本地巡查轨迹
    getlocalList() {
      let val = localStorage.getItem("patrolArray");
      if (val) {
        this.list = JSON.parse(val);
        console.log("本地数据", this.list);
      }
    },
    // 删除某一项
    deleteStep(index) {
      this.list.splice(index, 1);
      localStorage.setItem("patrolArray", JSON.stringify(this.list));
    },
    // todo 查看详情
    getDetail(item) {
      localStorage.setItem("patrolArrayDetail", JSON.stringify(item));
      this.$router.push(`/PatrolDetail/${this.patrolType}/1`);
    },
    // todo 新建一个巡查对象，然后返回ID，再依次添加数据
    submit() {
      Toast.loading({
        duration: 0,
        mask: true,
        message: "提交中"
      });
      let f = {
        userId: this.$store.state.userInfo.userId,
        fireUnitId: this.$store.state.userInfo.fireUnitID
      };
      this.$axios.post(this.$api.ADD_PATROL_TRACK, f).then(res => {
        if (res.success) {
          this.patrolId = res.result.patrolId;
          this.submitArray();
        }
      });
    },
    //todo 依次提交数组数据
    submitArray() {
      let that = this;
      for (let i of this.list) {
        (function() {
          console.log(i);
          console.log(that.patrolId);
          let task = plus.uploader.createUpload(
            `${that.$url}${that.$api.ADD_PATROL_TRACK_DETAIL}`,
            {
              method: "POST"
            },
            function(t, status) {
              console.log("请求成功后的返回数据：", t, status);
              // 上传完成
              if (status === 200) {
                localStorage.removeItem("patrolArray");
                Toast.clear();
                that.$toast.success("提交成功");
                that.$router.back();
              } else {
                that.$toast.fail("提交失败");
              }
            }
          );
          task.addData("PatrolId", String(that.patrolId)); // todo 必须是字符串！！！！！！！
          task.addData("PatrolAddress", i.patrolAddress);
          task.addData("SystemIdList", i.SystemIdList);
          task.addData("ProblemStatus", String(i.patrolStatus));
          task.addData("ProblemRemarkType", String(i.problemRemakeType));
          task.addData("ProblemRemark", i.remakeText);
          //照片
          for (let y in i.photoList) {
            task.addFile(i.photoList[y], {
              key: `LivePicture${Number(y) + 1}`
            });
          }
          //  声音
          task.addFile(i.remarkVioce, {
            key: `remarkVioce`
          });
          task.start();
        })();
      }
    }
  }
};
</script>

<style lang="scss">
.patrol-record {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  & > :nth-child(2) {
    flex: 2 0 auto;
  }
  &-panel {
    .van-panel__header {
      & > :nth-child(1) {
        flex: 2 0 auto;
      }
      & > :nth-child(2) {
        flex: 1 0 auto;
      }
      &::after {
        border-bottom-style: dashed;
      }
    }
    .van-panel__content {
      padding: 10px;
    }
  }

  /*进度条*/
  &-steps {
    &-i {
      position: absolute;
      right: 4px;
      top: 4px;
      font-size: 16px;
      color: #f56c6c;
    }
    /*取消多余的线条*/
    .van-step::after {
      border-width: 0;
    }
    .van-step__title {
      border-left: 1px solid #ebedf0;
      border-right: 1px solid #ebedf0;
    }
    .van-panel__header-value {
      color: #409eff;
    }
    &-info {
      & > :nth-child(2) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      /*照片*/
      .van-image {
        margin: 5px 8px 0 8px;
      }
      /*语音按钮*/
      &-but {
        .van-button__text {
          display: flex;
        }
      }
    }
  }

  &-sound {
    & > :nth-child(2) {
      margin-left: 4px;
      font-size: 18px;
      color: #f56c6c;
    }
    .van-button__text {
      display: flex;
    }
    &-img {
      height: 16px;
      margin: auto 5px;
    }
  }

  /*无数据*/
  &-empty {
    text-align: center;
    padding: 15px;
    & > div {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 260px;
      left: 30%;
      color: #aeadad;
      img {
        padding-right: 10px;
      }
    }
  }
}
</style>
