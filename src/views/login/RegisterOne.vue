<template>
  <div class="register-one flex-between">
    <div>
      <base-nav title="消防管理员注册"></base-nav>
      <base-form :form="form" :form-list="formList"> </base-form>
      <div v-show="isShowName" class="register-one-unit">
        <van-cell
          @click="setName(x)"
          title="111"
          v-for="(x, y) in nameList"
          :key="y"
          :title="x.fireUnitName"
        ></van-cell>
      </div>
      <div class="register-one-notice">{{ notice }}</div>
    </div>

    <base-button @click="checkCode">下一步</base-button>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/2 16:39
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "RegisterOne",
  components: {},
  props: {},
  data() {
    return {
      isShowName: false,
      nameList: [],
      notice:
        "管理员拥有全部权限，只能通过邀请码进行注册，请妥善保管邀请码，勿对外泄露。",
      form: {},
      formList: [
        {
          icon: require("../../assets/load_img_06.png"),
          remind: "请输入防火单位名称",
          value: "fireUnitName"
        },
        {
          icon: require("../../assets/load_img_07.png"),
          remind: "请输入邀请码",
          value: "invitatCode"
        }
      ]
    };
  },
  computed: {},
  watch: {
    "form.fireUnitName": function() {
      setTimeout(() => {
        this.getName();
      }, 1000);
    }
  },
  created() {},
  mounted() {},
  methods: {
    // todo 选择单位名称
    setName(item) {
      this.form.fireUnitName = item.fireUnitName;
      this.isShowName = false;
    },
    // todo 模糊查询防火单位名称
    getName() {
      this.$axios
        .post(this.$api.QUERY_FIRE_UNIT_LIKE_NAME, {
          MatchName: this.form.fireUnitName
        })
        .then(res => {
          if (res.success) {
            this.nameList = res.result;
            this.isShowName = true;
          }
        });
    },
    //  todo 验证邀请码
    checkCode() {
      this.$axios.post(this.$api.INVITAT_VERIFY, this.form).then(res => {
        if (res.success) {
          if (res.result.success) {
            localStorage.setItem("unitName", this.form.fireUnitName);
            localStorage.setItem("invitatCode", this.form.invitatCode);
            this.$router.push("/RegisterTwo");
          } else {
            this.$toast.fail(res.result.failCause);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../style/app-variables";
.register-one {
  &-unit {
    position: absolute;
    top: 98px;
    width: 100vw;
  }
  &-notice {
    padding: 15px;
    font-size: $notice-size;
    color: $notice-color;
  }
}
</style>
