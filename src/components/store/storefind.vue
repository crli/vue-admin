<template>
  <div class="storefind">
    <el-form :inline="true" :model="formInline" class="find-form">
      <el-form-item >
        <el-input v-model="formInline.user" placeholder="商家ID/名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'storefind',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../style/mixin';
  .find-form{
    text-align: center;
    margin-top: 50px;
  }
</style>
