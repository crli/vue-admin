<template>
  <div class="admin">
    <section class="section"style="margin:20px auto;width:1200px">
      <el-select v-model="VisitProgress" placeholder="拜访进度"@change="getlist">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <el-select v-model="Effect" placeholder="拜访类型"@change="getlist">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <el-button type="primary" style="float:right" @click="handleClick">创建拜访</el-button>
    </section>

    <section class="section"style="margin:20px auto;width:1201px">
      <el-table
          :data="tableData"
          border stripe style="width: 100%"max-height="750">
          <el-table-column
            prop="Merchant"
            label="拜访对象"
            width="210">
          </el-table-column>
          <el-table-column
            prop="Way"
            label="拜访方式"
            width="100">
          </el-table-column>
          <el-table-column
            prop="VisitProgress"
            label="拜访进度"
            width="100">
          </el-table-column>
          <el-table-column
            prop="Cont"
            label="拜访情况"
            width="210"class="contddddddddddd">
          </el-table-column>
          <el-table-column
            prop="Uid"
            label="拜访者"
            width="120">
          </el-table-column>
          <el-table-column
            prop="VisitTime"
            label="拜访时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Time"
            label="创建时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Effect"
            label="有效拜访"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template scope="scope">
              <el-button @click="handlechange(scope.$index, tableData)" type="text" size="small" v-if="tableData[scope.$index].Today=='Y'">修改信息</el-button>
              <el-button class="isdisabled" type="text" size="small" v-else>修改信息</el-button>
            </template>
          </el-table-column>
      </el-table>
    </section>
    <div class="block" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {GetMerchantVisitList,GetSysVisitProgress} from '@/service/getData'
import {setStore,getStore,getCookie} from '@/config/mUtils'
export default {
  name: 'admin',
  data () {
    return {
      total:0,
      tableData: [],
      options: [],
      options1: [{
        value: '0',
        label: '全部'
      }, {
        value: 'Y',
        label: '有效'
      }, {
        value: 'N',
        label: '无效'
      }],
      VisitProgress: '',
      Effect:''
    }
  },
  async created(){
    let response = await GetSysVisitProgress();
    if(response.data.Code == 0){
      let options = response.data.Msg.slice(0);
      options.splice(0,0, {label:"全部",value:"0"});
      this.options = options
    }
    response = await GetMerchantVisitList(getCookie("ATOKEN"),0,1,10,this.VisitProgress,this.Effect)
    if(response.data.Code == 0){
      this.initshow(response.data.Msg)

    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      GetMerchantList(getCookie("ATOKEN"),0,val,10)
    },
    async getlist(){
      let response = await GetMerchantVisitList(getCookie("ATOKEN"),0,1,10,this.VisitProgress,this.Effect)
      if(response.data.Code == 0){
        this.initshow(response.data.Msg)
      }
    },
    initshow(varr){
      let arr = varr.List;
      arr.forEach((ele)=>{
        ele.Way = ele.Way==1?"电话":"上门"
        switch (ele.VisitProgress) {
          case '1':
            ele.VisitProgress = "发掘需求"
            break;
          case '2':
            ele.VisitProgress = "谈方案"
            break;
          case '3':
            ele.VisitProgress = "签约"
            break;
          case '4':
            ele.VisitProgress = "回访"
            break;
        }
      })
      this.tableData = arr
      this.total = Number(varr.Total)
    },
    handleClick(){
      let href = window.location.href.split("/#/")[0];
      window.open(href+"/#/visitcreate?id=0")
    },
    handlechange(index, rows){
      let href = window.location.href.split("/#/")[0];
      window.open(href+"/#/visitcreate?id="+rows[index].id)
    }
  }
}
</script>
<style scoped lang="scss">
.block{
    text-align: center;
    width:100%;
    position: absolute;
  }
  .isdisabled{
    color: #bfcbd9;
    cursor: not-allowed;
  }
</style>
