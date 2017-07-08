<template>
  <div class="pub">
    <section class="section"style="margin:20px auto;width:1220px">
      <el-table
          :data="tableData"
          border stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="商家ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商家名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="province"
            label="联系人"
            width="200">
          </el-table-column>
          <el-table-column
            prop="city"
            label="类别"
            width="135">
          </el-table-column>
          <el-table-column
            prop="address"
            label="归属"
            width="195">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="商家状态"
            width="100">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="最近拜访"
            width="130">
          </el-table-column>
          <el-table-column
            label="操作"
            width="160">
            <template scope="scope">
              <el-button @click="handleClick" type="text" size="small">认领</el-button>
              <el-button @click="handleClick" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
      </el-table>
    </section>
    <div class="block" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="400"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {GetMerchantList} from '@/service/getData'
import {setStore,getStore,getCookie} from '@/config/mUtils'
export default {
  name: 'pub',
  data () {
    return {
      currentPage3: 5,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  created(){
    GetMerchantList(getCookie("ATOKEN"),0,1,10)
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      GetMerchantList(getCookie("ATOKEN"),0,val,10)
    },
    handleClick() {
      console.log(1);
    }
  },
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
