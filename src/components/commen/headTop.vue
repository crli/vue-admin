<template>
  <header>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect" :router="true">
      <li class="select">
        <div class="cascader">
        <el-cascader
          :options="options"
          @change="handleItemChange"
          change-on-select
          :props="props"
          v-model="selectedOptions"
        ></el-cascader></div>
      </li>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/resources">商家资源</el-menu-item>
      <el-menu-item index="3">合作项目</el-menu-item>
      <el-menu-item index="4">我的提成</el-menu-item>
      <el-menu-item index="5">消息提醒</el-menu-item>
      <el-menu-item index="6">欢迎您,xxx</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        activeIndex: '/home',
        options: [
          {
            url: '1',
            name: 'BD门户'
          },
          {
            url: '2',
            name: '技术部',
            children:[
              {
                url: '3',
                name: '前端',
              }
            ]
          },
          {
            url: '4',
            name: '市场部'
          },
          {
            url: '5',
            name: '人事部'
          }
        ],
        props: {
          value:'url',
          label: 'name',
          children:'children'
        },
        selectedOptions: ['1'],
        upath:''
      }
    },
    created(){
      this.upath = this.$route.path;
      let url = '/'+this.upath.split("/")[1];
      this.activeIndex = url;
      this.handleSelect(url)
    },
    methods: {
      ...mapMutations([
        'SET_ROUTER'
      ]),
      handleSelect(key) {
        switch (key) {
          case '/home':
            this.SET_ROUTER([
              {
                "name":"门店查找",
                "url":"/home/storefind",
                children:[
                  {
                    "name":"111",
                    "url":"/2222",
                  }
                ]
              },
              {
                "name":"门店创建",
                "url":"/home/storecreate",
                children:[]
              }
            ])

            break;
          case '/resources':
            this.SET_ROUTER([
              {
                "name":"公海",
                "url":"/resources/pub",
              },
              {
                "name":"私海",
                "url":"/resources/privately",
              },
              {
                "name":"我的拜访",
                "url":"/resources/visit",
              },
              {
                "name":"商家数据库",
                "url":"/resources/msq",
              },
            ])

            break;
          default:

            break;
        }
      },
      handleItemChange(val){
        console.log(val)
        // window.location.href = "http://www.baidu.com"+val[val.length-1]
      }
    }
  }
</script>
<style scoped lang="scss">
@import '../../style/mixin';
  header{
    width:100%;
    .select{
      float: left;
      position:relative;
      width:200px;
      height:36px;
      margin-left: 10px;
      .cascader{
        position:absolute;
        top:12px
      }

    }
    .el-menu-demo{border-radius: 0px !important}
  }
</style>
