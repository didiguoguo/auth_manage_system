<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>《{{class_data.class_name}}》学生成绩表</span>
    </div>
    <el-row class="action-wrapper">
      <el-col :md="{span:6}">
        <el-button size='small' type='primary' @click="()=>handleShowModal('stu_modal_visible')">
          <i class='el-icon-download'></i>成绩批量导出</el-button>
      </el-col>
    </el-row>
    <standard-table 
      :layout="'total, ->, prev, pager, next, jumper'" 
      :data="stu_data.list" 
      :columns="stu_columns" 
      :actions="actions"
      :pagination="stu_data.pagination" 
      @handle-edit="handleEdit" 
      @handle-remove="handleRemove" 
      @current-change="handlePageChange" 
      @handle-show-more="handleShowDetail"
    />
    <el-dialog
      title="添加考生"
      :visible.sync="stu_modal_visible"
      width="30%"
    >
      <el-form :model="stu_form" :rules="stu_rules" ref="stu_form">
        <el-form-item label="考生姓名" prop="stu_name" :label-width="'120px'">
          <el-input v-model="stu_form.stu_name" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="'120px'">
          <el-radio-group v-model="stu_form.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="'120px'">
          <el-input v-model="stu_form.id_card_num" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item :label-width="'120px'">
          <el-button size='small' @click="stu_modal_visible = false">取 消</el-button>
          <el-button size='small' type="primary" @click="()=>submitForm('stu_form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StandardTable from "../components/StandardTable.vue";
const stu_columns = [
  {
    prop: "index",
    label: "序号",
    width: 75
  },
  {
    prop: "stu_name",
    label: "考生姓名",
  },
  {
    prop: "id_card_num",
    label: "身份证号"
  },
  {
    prop: "result",
    label: "理论成绩"
  }
];
const actions = [
  {
    text: "双击此处录入成绩",
    method: "handle-edit"
  }
];
export default {
  name: "ResultDetail",
  components: { StandardTable },
  data() {
    return {
      stu_columns,
      actions,
      stu_modal_visible: false,
      stu_form: {
        stu_name: "",
        gender: 1,
        id_card_num: "",
        phone: "",
        unit: "",
        job_title: ""
      },
      class_data: {
        class_name: "机械一班"
      },
      stu_rules: {
        stu_name: [
          { required: true, message: "请输入考生姓名", trigger: "blur" }
        ]
      }
    };
  },
  computed: mapGetters({
    stu_data: "students"
  }),
  created() {
    console.log(this.$route)
    this.$store.dispatch({
      type: "get_students",
      payload: {
        current_page: 1,
        page_size: 10
      }
    });
  },
  methods: {
    handlePageChange(current) {
      this.$store.dispatch({
        type: "get_students",
        payload: {
          current_page: current,
          page_size: 10
        }
      });
    },
    handleEdit({ row, column, index }) {
      console.log("edit", row, index);
    },
    handleRemove({ row, column, index }) {
      console.log("remove", row, index);
    },
    handleShowDetail({ row, column, index }) {
      console.log("showdetail", row, index);
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

.action-wrapper {
  margin-bottom: 1em;
}
.search {
  width: 240px;
}
</style>
