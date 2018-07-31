<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>《{{class_data && class_data.class_name}}》学生成绩表</span>
    </div>
    <el-row class="action-wrapper">
      <el-col :md="{span:6}">
        <el-button size='small' type="primary" icon="el-icon-back" @click="handleBack">返回</el-button>
        <el-button size='small' type='primary' @click="()=>handleShowModal('stu_modal_visible')">
          <i class='el-icon-download'></i>成绩批量导出</el-button>
      </el-col>
    </el-row>
    <standard-table 
      :layout="'total, ->, prev, pager, next, jumper'" 
      :data="students_data.list" 
      :columns="stu_columns" 
      :pagination="students_data.pagination" 
      @handle-edit="handleEdit" 
      @current-change="handlePageChange" 
    />
    <el-dialog
      title="录入成绩"
      :visible.sync="modal_visible"
      width="30%"
    >
      <el-form :model="result_form" :rules="stu_rules" ref="result_form">
        <el-form-item label="实训成绩" prop="practise_result" :label-width="'120px'">
          <el-input v-model="result_form.practise_result" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item :label-width="'120px'">
          <el-button size='small' @click="modal_visible = false">取 消</el-button>
          <el-button size='small' :disabled="!result_form.practise_result" type="primary" @click="submitForm">确 定</el-button>
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
    prop: "id",
    label: "id",
    width: 75
  },
  {
    prop: "student_name",
    label: "考生姓名",
  },
  {
    prop: "id_card_num",
    label: "身份证号"
  },
  {
    prop: "theory_result",
    label: "理论成绩"
  },
  {
    prop: "practise_result",
    label: "实训成绩",
    actions:[
      {
        text: "点击此处录入成绩",
        method: "handle-edit"
      }
    ]
  },
];
export default {
  name: "ResultDetail",
  components: { StandardTable },
  data() {
    return {
      stu_columns,
      modal_visible: false,
      result_form: {
        id: '',
        practise_result: ''
      },
      stu_rules: {
        stu_name: [
          { required: true, message: "请输入考生姓名", trigger: "blur" }
        ]
      }
    };
  },
  computed: mapGetters({
    students_data: "students",
    class_data: "class"
  }),
  created() {
    this.$store.dispatch({
      type: "get_students",
      payload: {
        class_id: this.$route.params.id,
        current_page: 1,
        page_size: 10
      }
    });
    this.$store.dispatch({
      type: "get_class_by_id",
      payload: {
        id: this.$route.params.id,
      }
    });
  },
  methods: {
    handlePageChange(current) {
      this.$store.dispatch({
        type: "get_students",
        payload: {
          class_id: this.$route.params.id,
          current_page: current,
          page_size: 10
        }
      });
    },
    handleBack(){
      this.$router.go(-1)
    },
    handleEdit({ row, column, index }){
      this.result_form.id = row.id
      this.result_form.practise_result = row.practise_result
      this.handleShowModal()
    },
    handleShowModal() {
      this.modal_visible = true
    },
    handleCloseModal(key) {
      this.modal_visible = false
    },
    submitForm() {
      this.$refs['result_form'].validate(valid => {
        this.$store.dispatch({
            type:'modify_student',
            payload: {
              data: this.result_form,
              cb: res => {
                this.handleCloseModal()
                if (res.data && res.data.code === 200) {
                  this.$refs['result_form'].resetFields();
                  this['result_form'] = { practise_result: '' }
                  this.$message({
                    message: '录入成功！',
                    type: "success"
                  });
                  this.$store.dispatch({
                    type: 'get_students',
                    payload: {
                      class_id: this.$route.params.id,
                      current_page: 1,
                      page_size: 10
                    }
                  });
                } else {
                  this.$message({
                    message: error_message,
                    type: "warn"
                  });
                }
              }
            }
          });
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
