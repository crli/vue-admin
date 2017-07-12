<template>
  <section>
    <el-menu mode="vertical" theme="dark" :default-active="currentPath">
      <el-menu-item :index="item.url" :key="index" class="li-item" v-for="(item,index) in routers">{{item.name}} <router-link :to="item.url"class="list-a"></router-link></el-menu-item>
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
    },

  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .li-item{
    position:relative;
  }
  .list-a{
    display:inline-block;
    @include wh(100%,100%);
    position:absolute;
    left:0;
    top:0;
    z-index: 1
  }
</style>
