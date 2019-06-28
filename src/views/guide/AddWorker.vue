<template>
  <base-guide :active="0" class="add-worker">
    <div class="add-worker-content">
      <van-panel title="张大龙" desc="13878787578">
        <div slot="footer">
          <van-button size="small">编辑</van-button>
          <van-button size="small" type="danger">删除</van-button>
        </div>
      </van-panel>

      <!--        todo 添加人员-->
      <van-button
        @click="show = true"
        class="add-worker-add"
        plain
        type="primary"
        >添加人员</van-button
      >
    </div>

    <van-button slot="button" class="large-but" type="primary" size="large"
      >下一步</van-button
    >

    <!--      todo 添加人员-->
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-nav-bar title="新增工作人员">
        <van-icon name="cross" slot="right" @click="show = false"></van-icon>
      </van-nav-bar>

      <van-cell-group>
        <van-field v-model="form.account" placeholder="请输入真实姓名">
          <img slot="left-icon" src="../../assets/load_img_02.png" alt="" />
        </van-field>

        <van-field v-model="form.password" placeholder="请输入手机号">
          <img slot="left-icon" src="../../assets/load_img_03.png" alt="" />
        </van-field>
      </van-cell-group>

      <div class="">
        设置角色
      </div>
      <van-button class="large-but" type="primary" size="large"
        >确定</van-button
      >
    </van-popup>
  </base-guide>
</template>

<script>
/**
 *  作者：0          时间：2019/6/28 14:19
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseGuide from "./BaseGuide";
export default {
  name: "AddWorker",
  components: {
    BaseGuide
  },
  props: {},
  data() {
    return {
      show: false,
      form: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.add-worker {
  &-add {
    margin: 20px 0;
  }
}
</style>
