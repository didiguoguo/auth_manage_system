<template>
  <div class="container">
    <div class="login-container">
      <h1 class='login-header'>
        <img src="../assets/logo.png" alt="">
        <span>鉴定站管理系统</span>
      </h1>
      <el-form :model="login_form" :rules="login_rules" ref="login_form">
        <el-form-item label="账号：" :label-width="'15%'">
          <el-input v-model="login_form.name" auto-complete="off" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="'15%'">
          <el-input v-model="login_form.password" type="password" :label-width="'120px'" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item :label-width="'15%'">
          <el-button type="primary" @click="()=>submitLogin('login_form')">登 录</el-button>
          <el-button type="primary" @click="()=>resetForm('login_form')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "../Layout/Footer";
const login_form_values = {
  name: "",
  password: ""
};
export default {
  name: "Login",
  components:{ Footer },
  data() {
    return {
      login_form: { ...login_form_values },
      login_rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.login_form = login_form_values;
      this.$refs[formName].resetFields();
    },
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: "login",
            payload: this.$refs[formName].model
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  display: flex;
  flex-direction: column;
}

.login-container {
  padding: 112px 0 24px 0;
  width: 500px;
  margin: 0 auto;
  flex: 7;
}

.login-header {
  width: 100%;
  height: 44px;
  line-height: 44px;
  margin-bottom: 40px;
  text-align: center;
}

.login-header > img {
  height: 40px;
  vertical-align: middle;
}

.login-header > span {
  color: #333;
}

.footer {
  flex: 1;
  max-height: 50px;
  line-height: 50px;
}
</style>
