<template>
  <div class="admin-wrapper">
    <headTop class="sidebar-container" />
    <div class="main-container">
      <div class="sidebar-wrapper">
          <adminsidebar class="sidebar-container" />
      </div>
      <div class="main-wrapper">
          <adminMain/>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/commen/headTop';
  import adminMain from '@/components/commen/adminMain';
  import adminsidebar from '@/components/commen/adminsidebar';
  export default {
    name: 'layout',
    components: {headTop,adminMain,adminsidebar},
  }
</script>

<style  lang="scss" scoped>
  @import '../../style/mixin';
  .admin-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .main-container{
      position: fixed;
      top: 60px;
      width: 100%;
      bottom:0;
      .sidebar-wrapper {
        position:absolute;
          width: 210px;
          bottom: 0;
          top: 0;
          left: 0;
          z-index: 1001;
          overflow: hidden;
          background: #324157;
      }
      .sidebar-container {
          position: absolute;
          width:100%;
          top: 0;
          bottom: 0;
          left: 0;
          overflow-y: scroll;
      }
      .main-wrapper {
         position:absolute;
          bottom: 0;
          top: 0;
          left: 210px;
          right:0;
          z-index: 1001;overflow-y: scroll;

      }
    }
  }

</style>
