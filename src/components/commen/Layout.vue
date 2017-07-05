<template>
  <div class="admin-wrapper">
    <headTop class="sidebar-container" />
    <div class="main-container">
      <adminMain/>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/commen/headTop';
  import adminMain from '@/components/commen/adminMain';
  export default {
    name: 'layout',
    components: {headTop,adminMain},
  }
</script>

<style  lang="scss" scoped>
  @import '../../style/mixin';
  .admin-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .main-container{

    }
  }

</style>
