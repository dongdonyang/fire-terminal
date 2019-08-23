<template>
  <BaseGuide :active="1">
    <div>
      <van-cell-group>
        <van-switch-cell
          v-model="checked"
          title="有消防维保单位"
        ></van-switch-cell>
        <div v-show="checked">
          <van-cell>
            <el-select
              style="width: 100%"
              v-model="safeUnitId"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="关键字查询维保单位"
              :remote-method="searchUnit"
              :loading="loading"
            >
              <el-option
                @click.native="getUnit(item)"
                v-for="item in safeUnitsOpt"
                :key="item.safeUnitId"
                :label="item.safeUnitName"
                :value="item.safeUnitId"
              >
              </el-option>
            </el-select>
          </van-cell>
        </div>
      </van-cell-group>
    </div>

    <!--        todo 底部按钮-->
    <div slot="button">
      <base-button @click="$router.back()" class="safe-unit-but"
        >上一步</base-button
      >
      <base-button @click="nextStep">下一步</base-button>
    </div>
  </BaseGuide>
</template>

<script>
/**
 *  作者：0          时间：2019/7/1 13:52
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseGuide from "./BaseGuide";
export default {
  name: "SafeUnit",
  components: {
    BaseGuide
  },
  props: {},
  data() {
    return {
      loading: false,
      safeUnitId: "",
      safeUnitName: "",
      safeUnitsOpt: [],
      checked: true,
      unitList: [],
      value: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    let val = localStorage.getItem("guideForm");
    if (val) {
      this.searchUnit(
        JSON.parse(localStorage.getItem("guideForm")).safeUnitName
      );
    }
  },
  mounted() {},
  methods: {
    // todo 维保单位模糊查询
    searchUnit(Name) {
      if (Name !== "") {
        this.loading = true;
        setTimeout(() => {
          this.$axios
            .get(this.$api.Get_Select_Safe_Units, {
              params: { Name }
            })
            .then(res => {
              if (res.success) {
                this.loading = false;
                this.safeUnitsOpt = res.result;
                if (localStorage.getItem("guideForm")) {
                  this.safeUnitId = res.result[0].safeUnitId;
                  this.safeUnitName = res.result[0].safeUnitName;
                }
              }
            });
        }, 200);
      } else {
        this.safeUnitsOpt = [];
      }
    },
    getUnit(val) {
      this.safeUnitName = val.safeUnitName;
    },
    //  todo 下一步
    nextStep() {
      let f = JSON.parse(localStorage.getItem("guideForm"));
      if (this.checked && !this.safeUnitId) {
        this.$toast("请选择维保单位");
        return;
      }
      if (this.safeUnitId) {
        f.safeUnitId = this.safeUnitId;
        f.safeUnitName = this.safeUnitName;
      }
      localStorage.setItem("guideForm", JSON.stringify(f));
      this.$router.push("./FirePatrol");
    }
  }
};
</script>

<style lang="scss"></style>
