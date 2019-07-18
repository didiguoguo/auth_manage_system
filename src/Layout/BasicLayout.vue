<template>
  <div class="container">
    <div class="header">
      <BasicHeader :user_data="user_data" />
    </div>
    <div class="main">
      <div class="sider">
        <el-menu router :default-active="this.$route.path" @open="handleOpen" @close="handleClose">
          <el-menu-item index="/info_manage" route="/info_manage">
            <i class="el-icon-menu"></i>
            <span slot="title">考生信息管理</span>
          </el-menu-item>
          <el-menu-item index="/results_manage" route="/results_manage">
            <i class="el-icon-document"></i>
            <span slot="title">考生成绩管理</span>
          </el-menu-item>
          <el-menu-item index="/test_manage" route="/test_manage">
            <i class="el-icon-setting"></i>
            <span slot="title">考试管理</span>
          </el-menu-item>
          <el-menu-item index="/manager_info" route="/manager_info">
            <i class="el-icon-info"></i>
            <span slot="title">管理员信息</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-content">
        <div class="title">{{this.$route.name}}</div>
        <div class="content">
          <router-view></router-view>
        </div>
        <div class="footer">
          <div class="copyright">copyright</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import BasicHeader from "./BasicHeader";
export default {
  name: "BasicLayout",
  components: {
    BasicHeader
  },
  mounted(){
    this.$store.dispatch({
      type: 'get_current_user',
    })
  },
  data() {
    return {};
  },
  computed: mapGetters({
    user_data: "user",
  }),
  methods: {
    handleOpen: () => {},
    handleClose: () => {}
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-menu-item.is-active a {
  color: #409eff;
}

a {
  color: #303133;
  text-decoration: none;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  flex: 0;
  min-height: 64px;
  background: #002140;
  line-height: 64px;
  color: #fff;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.sider {
  width: 300px;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #eee;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  padding: 1em;
  max-width: 100%;
  overflow: hidden;
}

.main-content .title {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: 600;
  padding: 0 10px;
  background: #ddd;
  box-shadow: 1px 1px 1px #888;
}

.footer {
  height: 40px;
  line-height: 40px;
}

.copyright {
  width: 100%;
  text-align: center;
}
</style>
