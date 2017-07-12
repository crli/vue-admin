<template>
  <div class="biz">
    <h3 class="title">{{title}}</h3>
    <section class="section"style="margin:20px auto;">
      <el-cascader  class="dis" style="width:300px;"placeholder="选择商家/联系人"
        :options="Merchantlist"
        :props="props"
        @change="handleItemChange"
        v-model="selectedOptions"
      ></el-cascader>
      <el-select  class="dis" v-model="Way" placeholder="拜访方式">
        <el-option
          v-for="item in Ways"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <el-date-picker class="dis"
        v-model="VisitTime"
        type="datetime"
        placeholder="选择拜访日期时间"
        >
      </el-date-picker>
      <el-select  class="dis" v-model="VisitProgress" placeholder="拜访进度">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <el-select  class="dis" v-model="Effect" placeholder="拜访类型">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <el-input class="dis"
        type="textarea"
        :autosize="{ minRows: 10}"
        placeholder="请输入拜访内容"
        v-model="Cont">
      </el-input>
    </section>
    <div class="box" style="text-align:center">
      <el-button type="primary" @click="submitto">确认提交</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      :modal-append-to-body="false">
      <span>{{tipsc}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tovisit">返回我的拜访</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {GetMerchantList,AddMerchantVisit,GetSysVisitProgress,GetMerchantVisit} from '@/service/getData'
import {setStore,getStore,getCookie} from '@/config/mUtils'
export default {
  name: 'biz',
  data () {
    return {
      title:"",
      tipsc:'',
      dialogVisible:false,
      MerchantId:'',
      Merchantlist:[],
      Contacts:'',
      Way:'',
      Ways:[
        {
          value:1,
          label:"电话"
        },
        {
          value:2,
          label:"上门"
        }
      ],
      props: {
        label:'Title',
        value: 'Id',
        children: 'Contacts'
      },
      VisitTime:'',
      options:[],
      VisitProgress: '',
      Effect:'',
      options1: [{
        value: 'Y',
        label: '有效'
      }, {
        value: 'N',
        label: '无效'
      }],
      Cont:'',
      selectedOptions:[],
      nid:''
    }
  },
  async created(){
    this.nid = this.$route.query.id;
    let response =  await GetMerchantList(getCookie("ATOKEN"),0,1,1000);
    if(response.data.Code == 0){
      let arr = response.data.Msg.List;
      if(arr.length){
        arr.forEach((ele)=>{
          ele.Contacts.forEach((nele)=>{
            nele.Title = nele.name;
            nele.Id = nele.id;
          })
        })
      }
      this.Merchantlist = arr
    }
    response = await GetSysVisitProgress();
    if(response.data.Code == 0){
      this.options = response.data.Msg
    }
    this.title="新建拜访";
    if(this.nid>0){
      this.title = "修改拜访信息"
      response = await GetMerchantVisit(getCookie("ATOKEN"),this.nid);
      if(response.data.Code==0){
        this.Cont = response.data.Msg.Cont;
        this.Effect = response.data.Msg.Effect;
        this.MerchantId = response.data.Msg.MerchantId;
        this.selectedOptions.push(this.MerchantId);
        this.Contacts = response.data.Msg.Contacts;
        this.selectedOptions.push(this.Contacts);
        this.VisitProgress = response.data.Msg.VisitProgress;
        this.Way = response.data.Msg.Way==1?"电话":"上门";
        let datas = response.data.Msg.VisitTime;
        this.VisitTime = new Date(datas[0],datas[1],datas[2],datas[3],datas[4]);
      }else{
        alert(response.data.Msg)
      }
    }
  },
  methods:{
    handleItemChange(value){
      [this.MerchantId,this.Contacts]=[...value]
    },
    submitto(){
      if(!this.MerchantId){
        this.$notify.error({
          title: '错误',
          message: '请选择商家联系人'
        });
      }else if(!this.Way){
        this.$notify.error({
          title: '错误',
          message: '请选择拜访方式'
        });
      }else if(!this.VisitTime){
        this.$notify.error({
          title: '错误',
          message: '选择拜访日期时间'
        });
      }else if(!this.VisitProgress){
        this.$notify.error({
          title: '错误',
          message: '选择拜访进度'
        });
      }else if(!this.Effect){
        this.$notify.error({
          title: '错误',
          message: '选择拜访类型'
        });
      }else if(!this.Cont){
        this.$notify.error({
          title: '错误',
          message: '选择拜访内容'
        });
      }else{
        AddMerchantVisit(getCookie("ATOKEN"),this.nid,this.MerchantId,this.Way,this.Contacts,this.VisitTime,this.VisitProgress,this.Effect,this.Cont)
        .then((response)=>{
          if(response.data.Code==0){
            if(this.nid>0){
              this.tipsc = "拜访修改成功";
            }else{
              this.tipsc = "拜访创建成功";
            }
            this.dialogVisible = true;
          }
        })
      }
    },
    tovisit(){
      this.$router.push("/resources/visit");
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../style/mixin';
  .title{
    text-align: left;
    margin:10px 0 10px 10px;
  }
  .dis{
    margin: 20px 0;
  }
</style>
