<template>
  <section>
    <el-menu mode="vertical" theme="dark" :default-active="$route.path">
      <sidebaritem :routes='routers'></sidebaritem>
    </el-menu>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import sidebaritem from './SidebarItem';
  export default {
    name: 'adminsidebar',
    mounted(){

    },
    computed: {
      ...mapGetters([
        'routers'
      ])
    },

    components: { sidebaritem },
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
</style>
