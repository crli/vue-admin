<template>
  <div class="create">
    <section v-if="nonego">
      <el-form :model="storeForm" :rules="rules" ref="storeForm" label-width="110px" class="storeForm">
        <h3 class="title">商家基本信息</h3>

        <el-row>
          <el-col :span="12">
            <el-form-item label="商家名称" prop="Title">
              <el-input v-model="storeForm.Title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称">
              <el-input v-model="storeForm.EnTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="地址(州市区)" prop="address">
          <el-cascader style="width:300px;"
            :options="options"
            @active-item-change="handleItemChange"
            :props="props"
          ></el-cascader>
          <span style="color:red">{{tip}}</span>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="邮编" prop="ZipCode">
              <el-input v-model="storeForm.ZipCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属商圈">
              <el-input v-model="storeForm.BizcircleId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>



        <el-form-item label="地址(路、号)"  prop="Addr">
          <el-input v-model="storeForm.Addr"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="所属类型" prop="GroupId">
              <el-select v-model="storeForm.GroupId" placeholder="请选择所属类型">
                <el-option label="美食折扣" value="210"></el-option>
                <el-option label="嗨玩美国" value="209"></el-option>
                <el-option label="没法护肤" value="211"></el-option>
                <el-option label="生活家政" value="212"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="Tel">
              <el-input v-model="storeForm.Tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="经度"prop="position">
              <el-input v-model="storeForm.Lng" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度"prop="position">
              <el-input v-model="storeForm.Lat" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <h3 class="title">联系人<el-button type="primary"size="small" style="margin-left:20px" @click="adduser">添加联系人</el-button></h3>
        <template v-for="(item,index) in storeForm.lists">
          <div class="box">
            <div class="item">
              <span class="name must">姓名</span><input type="text" class="input-item" v-model="item.name"/>
            </div>
            <div class="item"><span class="name">姓别</span>
              <input type="radio" id="one" value="M" v-model="item.gender"><label for="one">男</label>
              <input type="radio" id="two" value="F" v-model="item.gender"><label for="two">女</label>
            </div>
            <div class="item">
              <span class="name">职位</span><input type="text"  class="input-item" v-model="item.position"/>
            </div>
            <div class="item">
              <span class="name must">电话</span><input type="text"  class="input-item" v-model="item.tel"/>
            </div>
            <div class="item">
              <span class="name">微信</span><input type="text"  class="input-item" v-model="item.wx" />
            </div>
          </div>
        </template>
        <h3 class="title">其他网站相关项目<el-button type="primary"size="small" style="margin-left:20px" @click="addwww">添加其他网站相关项目</el-button></h3>
        <template v-for="(item,index) in storeForm.www">
          <div class="box">
            <div class="item">
              <span class="name">网址</span><input type="text" class="input-item" v-model="item.url"/>
            </div>
          </div>
        </template>

        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm('storeForm')">立即创建</el-button>
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
import {GetAllArea,AddMerchantResources} from '@/service/getData'
import {setStore,getStore,getCookie} from '@/config/mUtils'
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
    var validateaddress = (rule, value, callback) => {
      if(!this.storeForm.CountyId){
        this.tip = "请选择地址"
      }else{
        this.tip = ""
        callback();
      }
    };
    return {
      options: [],
      storeForm: {
        Title:'',
        EnTitle:'',
        ZipCode:'',
        Id:'0',
        CountyId:'',
        AreaId:'',
        BizcircleId:'',
        GroupId:'',
        Lng:'',
        Lat:'',
        Tel:'',
        Addr:'',
        www:'',
        lists:[
          {
            id:0,
            name:'',
            gender:'',
            tel:'',
            position:'',
            wx:''
          }
        ],
        www:[
          {
            id:0,
            url:''
          },
        ]
      },
      tip:'',
      props: {
        label:'Name',
        value: 'Id',
        children: 'cities'
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
        address:[
          { required: true, validator: validateaddress, trigger: 'change' }
        ],
        Addr:[
          { required: true, message: '请填写多少路多少号', trigger: 'change' }
        ]
      }
    }
  },
  created(){
    let getData = getStore("CITYDATA");
    try {
      let arr = JSON.parse(getData);
      if(Array.isArray(arr)){
        this.options = arr;
      }else{
        GetAllArea().then((response)=>{
          this.options = response.data;
          setStore("CITYDATA",response.data)
        })
      }
    }catch(e){
      GetAllArea().then((response)=>{
        this.options = response.data;
        setStore("CITYDATA",response.data)
      })
    }
  },
  mounted(){
  },
  methods: {
    submitForm(formName) {
      if(!this.storeForm.CountyId){
        this.tip = "请选择地址"
      }else{
        this.tip = ""
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let nameflag = this.storeForm.lists.every((ele)=>{
            return ele.name.length>0
          })
          let telflag = this.storeForm.lists.every((ele)=>{
            return ele.tel.length>0
          })

          let telnumflag = this.storeForm.lists.every((ele)=>{
            return !isNaN(ele.tel)
          })
          if(!nameflag){
            this.$notify.error({
              title: '错误',
              message: '联系人姓名不能为空'
            });
          }else if(!telflag){
            this.$notify.error({
              title: '错误',
              message: '联系人电话不能为空'
            });
          }else if(!telnumflag){
            this.$notify.error({
              title: '错误',
              message: '请输入正确手机号'
            });
          }
          else{
            AddMerchantResources(getCookie("ATOKEN"),0,this.storeForm.Title,this.storeForm.EnTitle,this.storeForm.ZipCode,this.storeForm.Id,this.storeForm.CountyId,this.storeForm.AreaId,this.storeForm.BizcircleId,this.storeForm.GroupId,this.storeForm.Lat,this.storeForm.Lng,this.storeForm.Tel,this.storeForm.Addr,this.storeForm.lists,this.storeForm.www)
              .then((response)=>{
                if(response.data.Code ==0){
                  this.$message({
                    message: '创建成功，该商家已成功加入公海',
                    type: 'success'
                  });
                }
              })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleItemChange(val) {
      [this.storeForm.CountyId,this.storeForm.AreaId]=[...val]
    },
    adduser(){
      this.storeForm.lists.push({id:0,name:'',gender:'',tel:'',position:'',wx:''})
    },
    addwww(){
      this.storeForm.www.push({id:0,url:''})
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
@import '../../../../style/mixin';
  h3.tip{
    @include center
  }
  .title{
    text-align: center;
    margin:10px 0;
  }
  .storeForm{
    margin: 0 auto;
    width:100%;
    text-align: left;
  }
  .box{
    margin-top: 20px;
    font-size: 0;
    .item{
      margin-bottom: 22px;
      display: inline-block;
      font-size: 14px;
      .name{display:inline-block;width:110px;text-align: right;padding-right: 10px;
       color: #48576a;
       position:relative;
       &.must:before{
        position:absolute;
        content: "*";
        color:red;
        right:42px;
       }
      }
      .input-item{
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 36px;
        width:240px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        &:focus{
          outline: 0;
          border-color: #20a0ff;
        }
        &:hover{
          border-color: #8391a5;
        }
      }
    }
  }
</style>
