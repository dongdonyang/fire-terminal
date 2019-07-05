<template>
  <base-guide :active="0" class="add-worker">
    <div>
      <base-list
        @refresh="getList"
        @onLoad="getList"
      >
        <van-cell-group>
          <van-cell
            class="add-worker-cell"
            v-for="(item, index) in userList"
            :key="index"
          >
            <div>
              <img
                class="add-worker-cell-typeImg"
                v-for="i in item.rolelist"
                :key="i"
                :src="iconList[i]"
              />
            </div>
            <div>{{ item.name }}</div>
            <div>{{ item.account }}</div>
            <div>
              <img src="../../assets/guide_btn_edit.png" @click="editUser(item)" alt="" />
              <img src="../../assets/guide_btn_del.png" alt="" />
            </div>
          </van-cell>
        </van-cell-group>
        <!--        <div slot="cellValue" slot-scope="slotProp">-->
        <!--          <img-->
        <!--            v-for="i in slotProp.item.rolelist"-->
        <!--            :key="i"-->
        <!--            :src="iconList[i]"-->
        <!--            style="width: 20%;margin: 0 5px"-->
        <!--          />-->
        <!--        </div>-->
      </base-list>

      <!--        todo 添加人员-->
      <div class="add-worker-add">
        <a @click="openPopup">+添加人员</a>
      </div>
    </div>

    <!--    todo 底部按钮-->
    <base-button slot="button" @click="$router.push('./SafeUnit')"
      >下一步</base-button
    >

    <!--      todo 添加人员弹窗-->
    <van-popup
      class="add-worker-dia"
      v-model="show"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-nav-bar :title="popupTitle">
        <van-icon name="cross" slot="right" @click="show = false"></van-icon>
      </van-nav-bar>

      <div>
        <div>
          <base-form :form="form" :form-list="formList"></base-form>
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
        <base-button @click="setUser">确定</base-button>
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
      popupTitle: "",
      tableName: {
        title: "name",
        label: "account"
      },
      formList: [
        {
          icon: require("../../assets/load_img_02.png"),
          remind: "请输入真实姓名",
          value: "name"
        },
        {
          icon: require("../../assets/load_img_03.png"),
          remind: "请输入手机号",
          value: "account"
        }
      ],
      iconList: {
        1: require("../../assets/guide_img_01.png"),
        2: require("../../assets/guide_img_03.png"),
        3: require("../../assets/guide_img_02.png")
      },
      userList: [],
      show: false,
      form: {
        fireUnitInfoID: this.$store.state.userInfo.fireUnitID
      },
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
  mounted() {},
  methods: {
    // todo 打开新增人员弹窗
    openPopup() {
      this.form = {};
      this.form.fireUnitInfoID = this.$store.state.userInfo.fireUnitID;
      this.popupTitle = "新增工作人员";
      this.show = true;
    },
    // todo 编辑人员
    editUser(val) {
      console.log(val);
      this.popupTitle = "编辑工作人员";
      this.form = val;
      this.show = true;
    },
    // todo 查询人员列表
    getList(success) {
      this.$axios
        .get(this.$api.GET_FIRE_UNIT_PEOPLE, {
          params: { AccountID: this.$store.state.userInfo.userId }
        })
        .then(res => {
          if (res.success) {
            this.userList = res.result;
            success(this.userList.length);
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
          this.getList();
          this.$toast.success(`新增人员成功！`);
          this.show = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../style/app-variables";
.add-worker {
  &-cell {
    line-height: 60px;
    .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &>:first-child{
        width: 20px;
        display: flex;
        flex-direction: column;
      }
      & >:last-child{
        display: flex;
        justify-content: end;
        img{
          height: 30px;
          width: 30px;
          margin-right: 5px;
        }
      }
    }
    &-typeImg {
      margin: 3px;
      height: 20px;
      width: 20px;
    }
  }
  &-content {
    margin-bottom: 6px;
    &-buts {
      text-align: right;
      & > :first-child {
        margin: 0 20px;
      }
    }
  }
  &-add {
    color: $text-button-color;
    padding: 20px;
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
        color: $notice-color;
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
