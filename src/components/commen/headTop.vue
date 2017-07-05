<template>
  <header>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">BD门户</template>
        <el-menu-item index="/storefind/index">门店查找</el-menu-item>
        <el-menu-item index="/storecreate/frist">门店创建</el-menu-item>
      </el-submenu >
      <el-menu-item index="2">首页</el-menu-item>
      <el-menu-item index="3">商家资源</el-menu-item>
      <el-menu-item index="4">合作项目</el-menu-item>
      <el-menu-item index="5">我的提成</el-menu-item>
      <el-menu-item index="6">消息提醒</el-menu-item>
      <el-menu-item index="7">欢迎您,xxx</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '2'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped lang="scss">
@import '../../style/mixin';
  header{
    width:100%
  }
</style>
