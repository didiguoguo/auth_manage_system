<template>
  <div class="header-container">
    <!-- <div class="logo">鉴定站管理系统</div> -->
    <div class="info">欢迎登录，xxx 退出</div>
  </div>
</template>

<script>
  export default {
    name: "BasicHeader",
    data() {
      return {};
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-container {
    height: 60px;
    line-height: 60px;
    background: rgb(119, 119, 240);
  }
  
  .logo {
    float: left;
    width: 300px;
    height: 100%;
    font-size: 30px;
    text-align: center;
    color: #fff;
  }
  
  .info {
    float: right;
    height: 100%;
    margin-right: 10px;
    color: #fff;
  }
</style>
