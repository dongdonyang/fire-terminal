<template>
  <base-guide :active="0" class="add-worker">
    <div>
      <van-panel
        class="add-worker-content"
        v-for="(item, index) in userList"
        :key="index"
        :title="item.name"
        :desc="item.account"
      >
        <!--        <div slot="header">11</div>-->
        <div slot="footer" class="add-worker-content-buts">
          <van-button size="small">编辑</van-button>
          <van-button size="small" type="danger" @click="deleteUser(item)"
            >删除</van-button
          >
        </div>
      </van-panel>

      <!--        todo 添加人员-->
      <div class="add-worker-add">
        <van-button @click="show = true" type="info">添加人员</van-button>
      </div>
    </div>

<!--    todo 底部按钮-->
    <van-button
      slot="button"
      class="large-but"
      type="primary"
      size="large"
      @click="$router.push('./SafeUnit')"
      >下一步</van-button
    >

    <!--      todo 添加人员弹窗-->
    <van-popup
      class="add-worker-dia"
      v-model="show"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-nav-bar title="新增工作人员">
        <van-icon name="cross" slot="right" @click="show = false"></van-icon>
      </van-nav-bar>

      <div>
        <div>
          <van-cell-group>
            <van-field v-model="form.name" placeholder="请输入真实姓名">
              <img slot="left-icon" src="../../assets/load_img_02.png" alt="" />
            </van-field>

            <van-field v-model="form.account" placeholder="请输入手机号">
              <img slot="left-icon" src="../../assets/load_img_03.png" alt="" />
            </van-field>
          </van-cell-group>

          <div class="add-worker-dia-set">
            <p>设置角色</p>
            <ul>
              <li v-for="(item, index) in setInfo" :key="index">{{ item }}</li>
            </ul>
            <van-checkbox-group v-model="form.rolelist">
              <van-checkbox name="FireUnitDuty ">值班员</van-checkbox>
              <van-checkbox name="FireUnitPatrol ">巡查员</van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
        <van-button
          class="large-but"
          type="primary"
          size="large"
          @click="setUser"
          >确定</van-button
        >
      </div>
    </van-popup>
  </base-guide>
</template>

<script>
/**
 *  作者：0          时间：2019/6/28 14:19
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseGuide from "./BaseGuide";
import { beforeDel } from "../../plugins/public";

export default {
  name: "AddWorker",
  components: {
    BaseGuide
  },
  props: {},
  data() {
    return {
      userList: [],
      show: false,
      form: {},
      setInfo: [
        "使用手机号登录系统，初始密码是666666",
        "值班员拥有值班记录功能权限",
        "巡查员拥有消防巡查功能权限",
        "可同时拥有值班员和巡查员角色"
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    // todo 查询人员列表
    getList() {
      this.$axios
        .get(this.$api.GET_FIRE_UNIT_PEOPLE, {
          params: { AccountID: 3 }
        })
        .then(res => {
          if (res.success) {
            this.userList = res.result;
          }
        });
    },
    // todo 删除人员
    deleteUser(val) {
      beforeDel(val.name)
        .then(() => {})
        .catch(() => {});
    },
    //  todo 新增、编辑人员
    setUser() {
      this.$axios.post(this.$api.ADD_USER, this.form).then(res => {
        if (res.success) {
          this.$toast.success(`新增人员成功！`);
          this.show = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.add-worker {
  &-content {
    margin-bottom: 16px;
    &-buts {
      text-align: right;
      & > :first-child {
        margin: 0 20px;
      }
    }
  }
  &-add {
    margin-top: 20px;
    text-align: center;
  }

  /*todo 弹窗*/
  &-dia {
    display: flex;
    flex-direction: column;
    /* todo dia content*/
    & > :nth-child(2) {
      flex: 2 0 auto;
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* todo 设置提醒*/
    &-set {
      background-color: #f5f5f5;
      border-radius: 5px;
      padding: 5px 10px 10px 10px;
      margin-top: 10px;
      li {
        color: #bcbcbc;
      }
      & > :last-child {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
      }
    }
  }
}
</style>
