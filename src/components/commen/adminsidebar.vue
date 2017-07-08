<template>
  <section>
    <el-menu mode="vertical" theme="dark" :default-active="currentPath" router>

      <el-menu-item :index="item.url" :key="index" class="li-item"v-for="(item,index) in routers">{{item.name}}</el-menu-item>

    </el-menu>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'adminsidebar',
    data(){
      return{
        currentPath:this.$route.path
      }
    },
    computed: {
      ...mapGetters([
        'routers'
      ])
    },
    watch:{
      '$route'(to,from){
        this.currentPath = to.path;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
</style>
