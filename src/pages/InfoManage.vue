<template>
  <div>
    <el-tabs v-model="activeKey" type="border-card" @tab-click="handleToggleTab">
      <el-tab-pane label="考生列表" name="1">
        <el-row class="action-wrapper">
          <el-col :md="{span:6}">
            <el-button size='small' type='success' @click="()=>handleShowModal('stu_modal_visible')">
              <i class='el-icon-plus'></i>添加学生</el-button>
            <el-button size='small' type='primary'>
              <i class='el-icon-download'></i>批量导入学生</el-button>
          </el-col>
          <el-col :md="{span:4,offset:14}">
            <el-input size='small' placeholder="输入姓名或证件号">
              <el-button slot="append">搜索</el-button>
            </el-input>
          </el-col>
        </el-row>
        <standard-table 
          :layout="'total, ->, prev, pager, next, jumper'" 
          :data="stu_data.list" :columns="stu_columns" 
          :actions="stu_actions"
          :pagination="stu_data.pagination" 
          @handle-click="handleEdit" 
          @handle-remove="handleRemove" 
          @current-change="handlePageChange"
        >
        </standard-table>
      </el-tab-pane>
      <el-tab-pane label="班级列表" name="2">
        <el-row class="action-wrapper">
          <el-col :md="{span:6}">
            <el-button size='small' type='success' @click="()=>handleShowModal('cla_modal_visible')">
              <i class='el-icon-plus'></i>添加班级</el-button>
          </el-col>
          <el-col :md="{span:4,offset:14}">
            <el-input size='small' placeholder="输入班级名称">
              <el-button slot="append">搜索</el-button>
            </el-input>
          </el-col>
        </el-row>
        <standard-table 
          :layout="'total, ->, prev, pager, next, jumper'" 
          :data="class_data.list" 
          :actions="class_actions"
          :columns="class_columns" 
          :pagination="class_data.pagination" 
          @handle-show-member="handleShowMembers"
          @handle-click="handleEdit" 
          @handle-remove="handleRemove" 
          @current-change="handlePageChange" 
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="!stu_form.id?'添加考生':'编辑考生'"
      :visible.sync="stu_modal_visible"
      width="30%"
    >
      <el-form :model="stu_form" :rules="stu_rules" ref="stu_form">
        <el-form-item label="考生姓名" prop="student_name" :label-width="'120px'">
          <el-input v-model="stu_form.student_name" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="'120px'" prop="gender">
          <el-radio-group v-model="stu_form.gender">
            <el-radio :label="'男'">男</el-radio>
            <el-radio :label="'女'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="'120px'" prop="id_card_num">
          <el-input v-model="stu_form.id_card_num" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="'120px'" prop="phone_num">
          <el-input v-model="stu_form.phone_num" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item label="职称" :label-width="'120px'" prop="job_title">
          <el-input v-model="stu_form.job_title" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item :label-width="'120px'">
          <el-button size='small' @click="stu_modal_visible = false">取 消</el-button>
          <el-button size='small' type="primary" @click="()=>submitForm('stu_form',!stu_form.id? 'add':'modify')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加班级"
      :visible.sync="cla_modal_visible"
      width="30%"
    >
      <el-form :model="cla_form" :rules="cla_rules" ref="cla_form">
        <el-form-item label="班级名称" :label-width="'120px'">
          <el-input v-model="cla_form.class_name" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item :label-width="'120px'">
          <el-button size='small' @click="cla_modal_visible = false">取 消</el-button>
          <el-button size='small' type="primary" @click="()=>submitForm('cla_form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StandardTable from "../components/StandardTable.vue";
const stu_columns = [
  {
    prop: "id",
    label: "id",
    width: 50
  },
  {
    prop: "student_name",
    label: "考生姓名",
    width: 150
  },
  {
    prop: "gender",
    label: "性别",
    width: 150
  },
  {
    prop: "id_card_num",
    label: "身份证号"
  },
  {
    prop: "phone_num",
    label: "联系电话"
  },
  {
    prop: "job_title",
    label: "职称"
  },
  {
    prop: "class_name",
    label: "班级"
  },
  {
    prop: "enter_time",
    label: "录入时间"
  }
];
const class_columns = [
  {
    prop: "index",
    label: "序号",
    width: 50
  },
  {
    prop: "class_name",
    label: "班级名称",
    width: 150
  },
  {
    prop: "begin_time",
    label: "开班时间",
    width: 200
  },
  {
    prop: "end_time",
    label: "结业时间",
    width: 200
  },
  {
    prop: "begin_addr",
    label: "开班地点"
  },
  {
    prop: "course_plan",
    label: "授课安排"
  },
  {
    prop: "create_time",
    label: "录入时间"
  }
];
const stu_actions = [
  {
    text: "编辑",
    method: "handle-click"
  },
  {
    text: "删除",
    method: "handle-remove"
  }
];
const class_actions = [
  {
    text: "班级成员",
    method: "handle-show-member"
  },
  {
    text: "编辑",
    method: "handle-click"
  },
  {
    text: "删除",
    method: "handle-remove"
  }
];
export default {
  name: "InfoManage",
  components: { StandardTable },
  data() {
    return {
      stu_columns,
      class_columns,
      stu_actions,
      class_actions,
      activeKey: "1",
      stu_modal_visible: false,
      cla_modal_visible: false,
      stu_form: {
        student_name: "",
        gender: '男',
        id_card_num: "",
        phone_num: "",
        job_title: ""
      },
      cla_form: {
        class_name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      stu_rules: {
        student_name: [
          { required: true, message: "请输入考生姓名", trigger: "blur" }
        ]
      },
      cla_rules: {
        name: [{ required: true, message: "请输入考生姓名", trigger: "blur" }]
      }
    };
  },
  computed: mapGetters({
    stu_data: "students",
    class_data: "classes"
  }),
  methods: {
    handleToggleTab(t, e) {
      this.activeKey = t.name;
      if (t.name === "1") {
        this.$store.dispatch({
          type: "get_students",
          payload: {
            current_page: 1,
            page_size: 10
          }
        });
      } else if (t.name === "2") {
        this.$store.dispatch({
          type: "get_classes",
          payload: {
            current_page: 1,
            page_size: 10
          }
        });
      }
    },
    handlePageChange(current) {
      if (this.activeKey === "1") {
        this.$store.dispatch({
          type: "get_students",
          payload: {
            current_page: current,
            page_size: 10
          }
        });
      } else if (this.activeKey === "2") {
        this.$store.dispatch({
          type: "get_classes",
          payload: {
            current_page: current,
            page_size: 10
          }
        });
      }
    },
    handleEdit({ row, column, index }) {
      this.stu_form = { ...row }
      this.handleShowModal("stu_modal_visible");
    },
    handleRemove({ row, column, index }) {
      this.$store.dispatch({
        type:'delete_students',
        payload: {
          data: { ids: [row.id] },
          cb:(res)=>{
            if(res.data && res.data.code === 200){
              this.$message({
                message: "删除成功!",
                type: "success"
              });
              this.$store.dispatch({
                type:'get_students',
                payload: {
                  current_page: 1,
                  page_size: 10
                }
              })
            }else{
              this.$message({
                message: "删除失败!",
                type: "warn"
              });
            }
          }
        },
      })
    },
    handleShowMembers({ row, column, index }) {
      this.$router.push({
        path:`class_detail/${row.id}`,
      })
    },
    handleShowModal(key) {
      this[key] = true;
    },
    handleCloseModal(key) {
      this[key] = false;
    },
    submitForm(formName,method) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let type = ''
          let succ_message = ''
          let error_message = ''
          if (formName === "stu_form") {
            if(method==='add'){
              succ_message = '添加成功！'
              type = 'add_student'
            }else if(method==='modify'){
              succ_message = '修改成功！'
              type = 'modify_student'
            }
            this.$store.dispatch({
              type,
              payload: {
                data: this.$refs[formName].model,
                cb:(res)=>{
                  if(res.data && res.data.code === 200){
                    this.$refs[formName].resetFields()
                    this.$message({
                      message: succ_message,
                      type: "success"
                    });
                    this.$store.dispatch({
                      type:'get_students',
                      payload: {
                        current_page: 1,
                        page_size: 10
                      }
                    })
                  }else{
                    this.$message({
                      message: error_message,
                      type: "warn"
                    });
                  }
                  this.handleCloseModal("stu_modal_visible");
                }
              },
            })
          } else if (formName === "cla_form") {
            this.handleCloseModal("cla_modal_visible");
          }
        } else {
          return false;
        }
      });
    },
    test() {
      console.log("test");
    }
  },
  created() {
    if (this.activeKey === "1") {
      this.$store.dispatch({
        type: "get_students",
        payload: {
          current_page: 1,
          page_size: 10
        }
      });
    } else if (this.activeKey === "2") {
      this.$store.dispatch({
        type: "get_classes",
        payload: {
          current_page: 1,
          page_size: 10
        }
      });
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

.pagination {
  margin-top: 1em;
}

.action-wrapper {
  margin-bottom: 1em;
}
</style>
