<template>
  <div class="hello">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
    ></van-nav-bar>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-cell-group>
      <van-cell title="单元格" value="内容"></van-cell>
      <van-cell title="单元格" value="内容" label="描述信息"></van-cell>
    </van-cell-group>
    <van-icon name="chat" info="9"></van-icon>
    <van-icon name="chat" info="99+"></van-icon>
    <van-row>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row>

    <van-row>
      <van-col span="4">span: 4</van-col>
      <van-col span="10" offset="4">offset: 4, span: 10</van-col>
    </van-row>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <van-panel>
      <p>1231231231eqweqweqwe</p>
      <p>1231231231eqweqweqwe</p>
      <p>1231231231eqweqweqwe</p>
      <p>1231231231eqweqweqwe</p>
      <p>1212312we</p>
    </van-panel>
    <van-panel>
      <p>1231231231eqweqweqwe</p>
      <p>1231231231eqweqweqwe</p>
      <p>1231231231eqweqweqwe</p>
      <p>1231231231eqweqweqwe</p>
      <p>1212312we</p>
    </van-panel>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <van-tag>标签</van-tag>
    <van-tag type="danger">标签</van-tag>
    <van-tag type="primary">标签</van-tag>
    <van-tag type="success">标签</van-tag>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <p>1231231231eqweqweqwe</p>
    <van-steps direction="vertical" :active="2">
      <van-step>
        <van-panel>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1212312we</p>
        </van-panel>
      </van-step>
      <van-step>
        <van-panel>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1212312we</p>
        </van-panel>
      </van-step>
      <van-step>
        <van-panel>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1231231231eqweqweqwe</p>
          <p>1212312we</p>
        </van-panel>
      </van-step>
    </van-steps>
    <van-skeleton title :row="3"></van-skeleton>
    <van-row>
      <van-col offset="12" span="12">offset: 12, span: 12</van-col>
    </van-row>
    <van-tabbar>
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" info="20">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
