<template>
   <el-card>
    <div class="action-wrapper">
      <el-input class="search" size='small' placeholder="输入姓名或证件号">
        <el-button slot="append">搜索</el-button>
      </el-input>
    </div>
    <standard-table 
      :layout="'total, ->, prev, pager, next, jumper'" 
      :data="class_data.list" 
      :columns="result_columns" 
      :actions="actions"
      :pagination="class_data.pagination" 
      @handle-remove="handleRemove" 
      @current-change="handlePageChange" 
      @handle-show-more="handleShowDetail"
    />
  </el-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StandardTable from "../components/StandardTable.vue";
const result_columns = [
  {
    prop: "index",
    label: "序号",
    width: 100
  },
  {
    prop: "class_name",
    label: "班级名称"
  },
  {
    prop: "begin_time",
    label: "开班时间"
  },
  {
    prop: "end_time",
    label: "结业时间"
  },
  {
    prop: "class_number",
    label: "班级人数"
  }
];
const actions = [
  {
    text: "查看成绩详情",
    method: "handle-show-more"
  }
];
export default {
  name: "TestManage",
  components: { StandardTable },
  computed: mapGetters({
    class_data: "classes"
  }),
  created() {
    this.$store.dispatch({
      type: "get_classes",
      payload: {
        current_page: 1,
        page_size: 10
      }
    });
  },
  data() {
    return {
      result_columns,
      actions,
      class_modal_visible: false,
      class_form: {
        class_name: "",
        gender: 1,
        id_card_num: "",
        phone: "",
        unit: "",
        job_title: ""
      },
      class_rules: {
        class_name: [
          { required: true, message: "请输入考生姓名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handlePageChange(current) {
      this.$store.dispatch({
        type: "get_classes",
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
        path: `result_detail/${row.id}`
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
          this.handleCloseModal("cla_modal_visible");
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
