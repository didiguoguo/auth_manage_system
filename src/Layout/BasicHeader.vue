<template>
  <div class="header-container">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
      <span>鉴定站管理系统</span>
    </div>
    <div class="info">
      <span>欢迎登录,</span>
      <span>{{user_data && user_data.name}}</span>
      <el-button type="text" @click="logout">
        <span :style="{color:'#fff',fontSize:'16px',borderLeft:'1px solid #ddd',paddingLeft:'10px'}">退出</span>
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BasicHeader",
    props: { 
      user_data: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {};
    },
    methods:{
      logout(){
        this.$store.dispatch({
          type:'logout',
          payload:{}
        })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-container {
    height: 6vh;
  }
  
  .logo {
    float: left;
    width: 300px;
    font-size: 20px;
    color: #fff;
    margin-left: 10px;
  }
  .logo>img{
    height: 40px;
    vertical-align: middle;
  }
  
  .info {
    float: right;
    height: 100%;
    margin-right: 10px;
    color: #fff;
  }

  .info>span{
    margin-right: 10px;
  }
</style>
