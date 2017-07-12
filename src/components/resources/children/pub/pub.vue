<template>
  <div class="pub">
    <section class="section"style="margin:20px auto;width:1221px">
      <el-table
          :data="tableData"
          border stripe
          style="width: 100%">
          <el-table-column
            prop="Id"
            label="商家ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="Title"
            label="商家名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="Contact"
            label="联系人"
            width="200">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话"
            width="195">
          </el-table-column>
          <el-table-column
            prop="Group"
            label="类别"
            width="135">
          </el-table-column>
          <el-table-column
            prop="Cooperation"
            label="商家状态"
            width="100">
          </el-table-column>
          <el-table-column
            prop="VisitNum"
            label="最近拜访"
            width="130">
          </el-table-column>
          <el-table-column
            label="操作"
            width="160">
            <template scope="scope">
              <el-button @click="handleClick(scope.$index, tableData)" type="text" size="small">修改信息</el-button>
              <el-button @click="delClick(scope.$index, tableData)" type="text" size="small">删除</el-button>
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
import {GetMerchantList,MerchantDel} from '@/service/getData'
import {setStore,getStore,getCookie} from '@/config/mUtils'
export default {
  name: 'pub',
  data () {
    return {
      total:0,
      tableData: []
    }
  },
  created(){
    GetMerchantList(getCookie("ATOKEN"),-1,1,10).then((response)=>{
      if(response.data.Code == 0){
        this.total = Number(response.data.Msg.total);
        this.tableData = response.data.Msg.List;
        this.tableData.forEach((ele)=>{
          ele.Contact = ele.Contacts[0].name;
          ele.tel = ele.Contacts[0].tel;
        })

      }
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      GetMerchantList(getCookie("ATOKEN"),0,val,10)
    },
    handleClick(index, rows){
      window.open("http://localhost:1111/#/biz?id="+rows[index].Id)
    },
    delClick(index, rows) {
      this.$confirm('删除该商家, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        MerchantDel(getCookie("ATOKEN"),rows[index].Id).then((response)=>{
          if(response.data.Code==0){
            rows.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .block{
    text-align: center;
    width:100%;
    position: absolute;
    bottom: 60px;
  }
</style>
