<template>
  <div class="patrol-record">
    <base-nav title="巡查记录"></base-nav>
    <van-cell-group>
      <van-cell :title="type[patrolType]">
        <!--        todo 可以优化合并-->
        <van-button
          v-if="!patrolType"
          size="mini"
          type="primary"
          @click="$router.push(`/PatrolDetail/${patrolType}/0`)"
          >+新增巡查轨迹</van-button
        >
        <van-button-
          v-else
          size="mini"
          type="primary"
          @click="$router.push('/FirePatrol')"
          >设置</van-button-
        >
      </van-cell>
      <div v-if="list.length">
        <van-cell title="">
          <div slot="label">
            有效轨迹点{{ list.length }}个，发现0个问题，现场解决0个问题
          </div>
        </van-cell>
        <van-steps direction="vertical" :active="8">
          <van-step v-for="(item, index) in list" :key="index">
            <van-panel
              class="patrol-record-panel"
              :title="item.patrolAddress"
              :desc="item.localTime"
              :status="item.problemStatusName"
            >
              <div>
                <!--                选择的系统-->
                <div v-if="item.systemId.length">
                  {{ item.systemId[0].systemName }}等共{{
                    item.systemId.length
                  }}
                  个系统
                </div>
                <!--                语音-->
                <!--                照片-->
                <shot-photo v-model="item.photoList"></shot-photo>
              </div>
            </van-panel>
          </van-step>
        </van-steps>
      </div>

      <div class="patrol-record-empty" v-else>
        <img width="4%" src="../../assets/zbxc_img_03.png" alt="" />
        <div>
          <img width="10%" src="../../assets/zbxc_img_02.png" alt="" />
          <span>还没有巡查轨迹哦！</span>
        </div>
      </div>
    </van-cell-group>

    <base-button @click="submit">提交</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/9 14:29
 *  1,常量从js文件引入，不要定义魔术变量
 */
import ShotPhoto from "../../components/ShotPhoto";
export default {
  name: "PatrolRecord",
  components: { ShotPhoto },
  props: {},
  data() {
    return {
      list: [],
      patrolType: 0,
      type: {
        0: "未设置巡查方式",
        1: "普通巡查",
        2: "扫码巡查"
      },
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
          }
        });
    },
    //  todo 获取本地巡查轨迹
    getlocalList() {
      let val = localStorage.getItem("patrolArray");
      console.log(val);
      if (val) {
        this.list = JSON.parse(val);
      }
    },
    //  todo 提交
    submit() {
      localStorage.removeItem("patrolArray");
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
      &::after {
        border-bottom-style: dashed;
      }
    }
    .van-panel__content {
      padding: 10px;
    }
  }
  &-empty {
    text-align: center;
    padding: 15px;
    & > div {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 240px;
      left: 30%;
      color: #aeadad;
      img {
        padding-right: 10px;
      }
    }
  }
}
</style>
