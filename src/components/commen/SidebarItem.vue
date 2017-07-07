<template>
  <div>
    <template v-for="(item,index) in routes">
      <el-menu-item :index="item.url" @click="ddd()">{{item.name}}</el-menu-item>
      <!--<el-menu default-active="2" class="el-menu-vertical-demo"  theme="dark">
        <el-submenu index="1" v-if="item.children.length">
          <template slot="title">{{item.name}}</template>
          <el-menu-item-group  v-for="(data,key,index) in item.children" :key="key">
            <el-menu-item :index="data.url">{{data.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu> -->
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
    methods:{
      ddd(aa){
        console.log(aa)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

