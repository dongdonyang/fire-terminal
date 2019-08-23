<template>
  <div>
    <base-nav
      title="设施编号列表"
      @onClickRight="$router.push('./BingNumber/0')"
    >
      <van-icon name="plus" slot="rightText"></van-icon>
    </base-nav>
    <base-form
      :form="form"
      :form-list="formList"
      @codeInfo="setCode"
    ></base-form>
    <base-list
      @onLoad="getList"
      @refresh="getList"
      :table-name="tableName"
      :table-list="tableList"
    >
      <span slot="cellTitle" slot-scope="scope">
        {{ scope.item.equiNo }} ({{ scope.item.fireSystemName }})
      </span>
      <span slot="cellValue" slot-scope="scope">
        <div>
          <img
            @click="
              $router.push({
                path: `./BingNumber/${scope.item.id}`,
                query: scope.item
              })
            "
            src="../../assets/guide_btn_edit.png"
            width="30px"
            height="30px"
            style="margin-right: 6px"
            alt=""
          />
          <img
            @click="deleteCode(scope.item)"
            src="../../assets/guide_btn_del.png"
            width="30px"
            height="30px"
            alt=""
          />
        </div>
      </span>
      <span slot="cellLabel" slot-scope="scope">{{ scope.item.address }}</span>
    </base-list>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/8/20 13:53
 *  1,常量从js文件引入，不要定义魔术变量
 */
import { beforeDel } from "../../plugins/public";
export default {
  name: "CodeList",
  components: {},
  props: {},
  data() {
    return {
      tmid: "", // 定时器
      form: {
        equiNo: ""
      },
      formList: [
        {
          label: "设施编码",
          remind: "输入或扫描设施编码",
          value: "equiNo",
          mySolt: "scan"
        }
      ],
      tableList: [],
      tableName: {
        title: "userName",
        smallTitle: "phone",
        label: "creationTime",
        value: "source"
      },
      page: {
        total: 0
      }
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
  created() {},
  mounted() {},
  methods: {
    setCode(val) {
      this.form.equiNo = val;
    },
    // todo 删除
    deleteCode(val) {
      beforeDel(val.equiNo)
        .then(() => {
          this.$axios
            .put(this.$api.UPDATE_EQUIPMENTNO_INFO, {
              opreation: 0,
              id: val.id
            })
            .then(res => {
              if (res.success) {
                this.$toast.success("删除成功");
                this.getList();
              }
            });
        })
        .catch(() => {});
    },
    // todo 查询
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
    //  todo 获取编码列表
    getList(success) {
      let x = arguments[0] instanceof Object;
      let p = this.page;
      if (!x) {
        p.SkipCount = 0;
        this.tableList = [];
      }
      this.$axios
        .get(this.$api.GET_EQUIPMENTNO_LIST, {
          params: this.page
        })
        .then(res => {
          if (res.success) {
            this.tableList = this.tableList.concat(res.result.equipmentNoList);
            p.total = res.result.totalCount;
            x ? success(this.tableList.length, res.result.totalCount, p) : "";
          }
        });
    }
  }
};
</script>

<style lang="scss"></style>
