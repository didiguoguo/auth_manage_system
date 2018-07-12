<template>
   <el-card>
    <div class="action-wrapper">
      <el-input class="search" size='small' placeholder="输入姓名或证件号">
        <el-button slot="append">搜索</el-button>
      </el-input>
    </div>
    <standard-table 
      :layout="'total, ->, prev, pager, next, jumper'" 
      :data="tests_data.list" 
      :columns="test_columns" 
      :actions="actions"
      :pagination="tests_data.pagination" 
      @handle-remove="handleRemove" 
      @current-change="handlePageChange" 
      @handle-show-more="handleShowDetail"
    />
  </el-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StandardTable from "../components/StandardTable.vue";
const test_columns = [
  {
    prop: "index",
    label: "序号",
    width: 100
  },
  {
    prop: "test_name",
    label: "考试名称"
  },
  {
    prop: "type",
    label: "考试类型"
  },
  {
    prop: "test_work_type",
    label: "考试工种"
  },
  {
    prop: "test_target",
    label: "考试人员"
  },
  {
    prop: "test_duration",
    label: "考试时长"
  },
  {
    prop: "test_cycle",
    label: "考试时间"
  },
  {
    prop: "test_times",
    label: "考试次数"
  },
  {
    prop: "status",
    label: "考试状态"
  },
];
const actions = [
  {
    text: "编辑",
    method: "handle-edit"
  },
  {
    text: "删除",
    method: "handle-delete"
  },
  {
    text: "查看考试结果",
    method: "handle-show-detail"
  },
  {
    text: "查看审批结果",
    method: "handle-show-check"
  },
];
export default {
  name: "TestManage",
  components: { StandardTable },
  computed: mapGetters({
    tests_data: "tests"
  }),
  created() {
    this.$store.dispatch({
      type: "get_tests",
      payload: {
        current_page: 1,
        page_size: 10
      }
    });
  },
  data() {
    return {
      test_columns,
      actions,
      test_modal_visible: false,
      test_form: {
        test_name: "",
        gender: 1,
        id_card_num: "",
        phone: "",
        unit: "",
        job_title: ""
      },
      test_rules: {
        test_name: [
          { required: true, message: "请输入考生姓名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handlePageChange(current) {
      this.$store.dispatch({
        type: "get_tests",
        payload: {
          current_page: current,
          page_size: 10
        }
      });
    },
    handleRemove({ row, column, index }) {
      console.log("remove", row, index);
    },
    handleShowDetail({ row, column, index }) {
      console.log("showdetail", row, index);
      this.$router.push({
        path: `test_detail/${row.id}`
      });
    },
    handleShowModal(key) {
      this[key] = true;
    },
    handleCloseModal(key) {
      this[key] = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid, formName);
          this.handleCloseModal("test_modal_visible");
          this.$message({
            message: "添加成功!",
            type: "success"
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    test() {
      console.log("test");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
