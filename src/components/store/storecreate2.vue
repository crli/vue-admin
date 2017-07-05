<template>
  <div class="create">
    <section v-if="nonego">
      <el-form :model="storeForm" :rules="rules" ref="storeForm" label-width="100px" class="storeForm">
        <h3 class="title">商家基本信息</h3>
        <el-form-item label="商家名称" prop="Title">
          <el-input v-model="storeForm.Title"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="storeForm.EnTitle"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="ZipCode">
          <el-input v-model="storeForm.ZipCode"></el-input>
        </el-form-item>
        <el-form-item label="所属商圈">
          <el-input v-model="storeForm.BizcircleId"></el-input>
        </el-form-item>
        <el-form-item label="所属类型" prop="GroupId">
          <el-select v-model="storeForm.GroupId" placeholder="请选择所属类型">
            <el-option label="美食折扣" value="shanghai"></el-option>
            <el-option label="嗨玩美国" value="beijing"></el-option>
            <el-option label="没法护肤" value="beijing"></el-option>
            <el-option label="生活家政" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="坐标经度">
          <el-input v-model="storeForm.Lng"></el-input>
        </el-form-item>
        <el-form-item label="坐标纬度">
          <el-input v-model="storeForm.Lat"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="Tel">
          <el-input v-model="storeForm.Tel"></el-input>
        </el-form-item>
        <h3 class="title">联系人</h3>
        <el-form-item label="性名" prop="name">
          <el-input v-model="storeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="storeForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="storeForm.position"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="storeForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wx">
          <el-input v-model="storeForm.wx"></el-input>
        </el-form-item>
        <h3 class="title">其他网站相关项目</h3>
        <el-form-item label="网址" placeholder="单行输入" prop="www">
          <el-input v-model="storeForm.www"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('storeForm')">立即创建</el-button>
        </el-form-item>

      </el-form>
    </section>
    <section v-else>
      <h3 class="tip">不要跨页访问</h3>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {GetArea} from '@/service/getData'
export default {
  name: 'storecreate2',
  data () {
    var validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写商家名'));
      } else {
        callback();
      }
    };
    var validateZipCode = (rule, value, callback) => {
      if (!/^\d+$/.test(value)||value.length!=5) {
        callback(new Error('请填写正确邮编'));
      } else {
        callback();
      }
    };
    var validateTel = (rule, value, callback) => {
      if (!/^\d+$/.test(value)) {
        callback(new Error('请填写正确商家电话'));
      } else {
        callback();
      }
    };
    return {
      storeForm: {
        Title:'',
        EnTitle:'',
        ZipCode:'',
        BizcircleId:'',
        GroupId:'',
        Lng:'',
        Lat:'',
        Tel:'',
        name:'',
        gender:'',
        position:'',
        tel:'',
        wx:'',
        www:''
      },
      rules: {
        Title: [
          { required: true, validator: validateTitle, trigger: 'change' }
        ],
        ZipCode: [
          { required: true, validator: validateZipCode, trigger: 'change' }
        ],
        GroupId: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        Tel: [
          { required: true, validator: validateTel, trigger: 'change' }
        ],
        name:[
          { required: true, message: '请填写姓名', trigger: 'change' }
        ],
        tel:[
          { required: true, validator: validateTel, trigger: 'change' }
        ]
      }
    }
  },
  created(){

  },
  mounted(){
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  computed:{
    ...mapState([
      'nonego'
    ]),

  }
}
</script>
<style scoped lang="scss">
@import '../../style/mixin';
  h3.tip{
    @include center
  }
  .title{
    text-align: center;
    margin:10px 0;
  }
  .storeForm{
    margin: 0 auto;
    width:700px;
    text-align: left;
  }
</style>
