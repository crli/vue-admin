<template>
  <div class="store">
    <section>
      <h3 class="title">为避免创建重复商家，请尝试搜索您需要的商家</h3>
      <section style="text-align:center;margin-top:30px">
        <el-cascader style="width:300px;"
          :options="options"
          @active-item-change="handleItemChange"
          :props="props"
        ></el-cascader>
      </section>
      <el-form :inline="true" :model="formInline" class="find-form">
        <el-form-item >
          <el-input v-model="formInline.user" placeholder="商家ID/名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section style="text-align:center;margin-top:30px" v-show="start">
      <el-button type="info" @click="storecreate2">无您需要的商家，可以创建</el-button>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
import {GetArea,GetAllArea} from '@/service/getData'
import {mapMutations} from 'vuex'
import {setStore,getStore} from '@/config/mUtils'
export default {
  name: 'store',
  data () {
    return {
      start:false,
      formInline: {
        user: '',
        region: ''
      },
      options: [],
      props: {
        label:'Name',
        value: 'Id',
        children: 'cities'
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
  methods: {
    ...mapMutations([
      'NONE_GO'
    ]),
    onSubmit() {
      this.start = true;
    },
    storecreate2(){
      this.NONE_GO(true);
      this.$router.push("/storecreate/second")
    },
    handleItemChange(val) {
      console.log('active item:', val);
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../style/mixin';
  .find-form{
    text-align: center;
    margin-top: 30px;
  }
  h3.title{
    font-weight: 500;
    text-align: center;
    margin-top: 30px
  }
</style>
