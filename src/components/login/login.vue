<template>
  <div class="login">

    <el-form :model="ruleForm" :rules="loginrules" ref="ruleForm" label-width="0px" class="login-form" >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" placeholder="用户名" v-model="ruleForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="passworld">
        <el-input type="password" placeholder="密码" v-model="ruleForm.passworld" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {StaffLogin} from '@/service/getData'
import {setCookie} from '@/config/mUtils'
  export default {
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          passworld: '',
        },
        loginrules: {
          username: [
            { required: true, validator: validateUser, trigger: 'blur' }
          ],
          passworld: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ]
        },
        loading: false,
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            StaffLogin(this.ruleForm.username,this.ruleForm.passworld).then((response)=>{
              this.loading = false;
              if(response.data.Code == 0){
                setCookie("ATOKEN",response.data.Msg)
                this.$router.push("/admin/index")
              }else{
                this.$message({
                  message: response.data.Msg,
                  type: 'warning',
                  duration:2000
                });
              }
            }).catch(err =>{
              console.log(err)
              this.loading = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped lang="scss" >
  @import '../../style/mixin';
  .login{
    @include wh(100% ,100%);
    background:#6d3a4b;
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    .login-form{
      width:300px;
      @include center;
    }
    .title{
      font-size: 26px;
      color: #eee;
      margin: 0 auto 40px;
      text-align: center;
      font-weight: 700;
    }
  }
</style>
