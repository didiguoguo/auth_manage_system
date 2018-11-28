<template>
  <div>
    <el-tabs v-model="activeKey" type="border-card" @tab-click="handleToggleTab">
      <el-tab-pane label="考生列表" name="1">
        <el-row class="action-wrapper">
          <el-col :md="{span:6}">
            <el-button size="small" type="success" @click="handleAddStudent">
              <i class="el-icon-plus"></i>添加学生
            </el-button>
            <el-button size="small" type="primary">
              <i class="el-icon-download"></i>批量导入学生
            </el-button>
          </el-col>
          <el-col :md="{span:4,offset:14}">
            <el-input
              size="small"
              v-model="student_condition"
              @blur="()=>handleSearch('student')"
              placeholder="输入学生姓名进行搜索"
            >
              <el-button slot="append" @click="()=>handleSearch('student')">搜索</el-button>
            </el-input>
          </el-col>
        </el-row>
        <standard-table
          :layout="'total, ->, prev, pager, next, jumper'"
          :data="students_data.list"
          :columns="student_columns"
          :pagination="students_data.pagination"
          @handle-click="(d)=>handleEdit(d,'student')"
          @handle-remove="handleRemove"
          @current-change="handlePageChange"
        ></standard-table>
      </el-tab-pane>
      <el-tab-pane label="班级列表" name="2">
        <el-row class="action-wrapper">
          <el-col :md="{span:6}">
            <el-button size="small" type="success" @click="handleAddClass">
              <i class="el-icon-plus"></i>添加班级
            </el-button>
          </el-col>
          <el-col :md="{span:4,offset:14}">
            <el-input size="small" placeholder="输入班级名称进行搜索" v-model="class_condition">
              <el-button slot="append" @click="()=>handleSearch('class')">搜索</el-button>
            </el-input>
          </el-col>
        </el-row>
        <standard-table
          :layout="'total, ->, prev, pager, next, jumper'"
          :data="classes_data.list"
          :columns="class_columns"
          :pagination="classes_data.pagination"
          @handle-show-member="handleShowMembers"
          @handle-click="(d)=>handleEdit(d,'class')"
          @handle-remove="handleRemove"
          @current-change="handlePageChange"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="!student_form.id?'添加考生':'编辑考生'"
      :visible.sync="student_modal_visible"
      width="30%"
    >
      <el-form :model="student_form" :rules="student_rules" ref="student_form">
        <el-form-item label="考生姓名" prop="student_name" :label-width="'120px'">
          <el-input v-model="student_form.student_name" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="'120px'" prop="gender">
          <el-radio-group v-model="student_form.gender">
            <el-radio :label="'男'">男</el-radio>
            <el-radio :label="'女'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="'120px'" prop="id_card_num">
          <el-input v-model="student_form.id_card_num" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="'120px'" prop="phone_num">
          <el-input v-model="student_form.phone_num" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="职称" :label-width="'120px'" prop="job_title">
          <el-input v-model="student_form.job_title" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item :label-width="'120px'">
          <el-button size="small" @click="()=>handleCloseModal('student_modal_visible')">取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="()=>submitForm('student_form',!student_form.id? 'add':'modify')"
          >确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="!class_form.id?'添加班级':'编辑班级'"
      :visible.sync="class_modal_visible"
      width="30%"
    >
      <el-form :model="class_form" :rules="class_rules" ref="class_form">
        <el-form-item label="班级名称" :label-width="'120px'" placeholder="输入班级名称">
          <el-input v-model="class_form.class_name" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="开班时间" :label-width="'120px'">
          <el-date-picker
            v-model="class_form.begin_time"
            type="date"
            placeholder="选择开班时间"
            value-format="yyyyMMdd"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结业时间" :label-width="'120px'">
          <el-date-picker
            v-model="class_form.end_time"
            type="date"
            placeholder="选择结业时间"
            value-format="yyyyMMdd"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="开班地点" :label-width="'120px'">
          <el-input
            v-model="class_form.begin_address"
            auto-complete="off"
            size="small"
            placeholder="输入开班地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="授课安排" :label-width="'120px'">
          <el-input
            v-model="class_form.course_plan"
            auto-complete="off"
            size="small"
            placeholder="输入授课安排"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="'120px'">
          <el-button size="small" @click="class_modal_visible = false">取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="()=>submitForm('class_form',!class_form.id? 'add':'modify')"
          >确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import StandardTable from "../components/StandardTable.vue";
  const student_columns = [
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
    },
    {
      prop: "action",
      label: "操作",
      actions: [
        {
          text: "编辑",
          method: "handle-click"
        },
        {
          text: "删除",
          method: "handle-remove"
        }
      ]
    }
  ];
  const class_columns = [
    {
      prop: "id",
      label: "id",
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
      prop: "begin_address",
      label: "开班地点"
    },
    {
      prop: "course_plan",
      label: "授课安排"
    },
    {
      prop: "create_time",
      label: "录入时间"
    },
    {
      prop: "action",
      label: "操作",
      actions: [
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
      ]
    }
  ];
  const student_form_values = {
    student_name: "",
    gender: "男",
    id_card_num: "",
    phone_num: "",
    job_title: ""
  };
  const class_form_values = {
    class_name: "",
    begin_time: "",
    end_time: "",
    begin_address: "",
    course_plan: ""
  };
  export default {
    name: "InfoManage",
    components: { StandardTable },
    data() {
      return {
        student_columns,
        class_columns,
        activeKey: "1",
        student_modal_visible: false,
        class_modal_visible: false,
        student_form: student_form_values,
        class_form: class_form_values,
        student_condition: "",
        class_condition: "",
        student_rules: {
          student_name: [
            { required: true, message: "请输入考生姓名", trigger: "blur" }
          ]
        },
        class_rules: {
          name: [{ required: true, message: "请输入考生姓名", trigger: "blur" }]
        }
      };
    },
    computed: mapGetters({
      students_data: "students",
      classes_data: "classes"
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
      handleEdit({ row, column, index }, type) {
        if (type === "student") {
          this.student_form = { ...row };
          this.handleShowModal("student_modal_visible");
        } else if (type === "class") {
          this.class_form = {
            ...row,
            begin_time: `${row.begin_time}`,
            end_time: `${row.end_time}`
          };
          this.handleShowModal("class_modal_visible");
        }
      },
      handleSearch(type) {
        if ((type = "student")) {
          this.$store.dispatch({
            type: "get_students",
            payload: {
              student_name: this.student_condition
            }
          });
        } else if ((type = "class")) {
          this.$store.dispatch({
            type: "get_classes",
            payload: {
              class_name: this.class_condition
            }
          });
        }
      },
      handleRemove({ row, column, index }) {
        this.$confirm("确定删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store.dispatch({
              type: this.activeKey === "1" ? "delete_students" : "delete_classes",
              payload: {
                data: { ids: [row.id] },
                cb: res => {
                  if (res.data && res.data.code === 200) {
                    this.$message({
                      message: "删除成功!",
                      type: "success"
                    });
                    this.$store.dispatch({
                      type:
                        this.activeKey === "1" ? "get_students" : "get_classes",
                      payload: {
                        current_page: 1,
                        page_size: 10
                      }
                    });
                  } else {
                    this.$message({
                      message: "删除失败!",
                      type: "warn"
                    });
                  }
                }
              }
            });
          })
          .catch(() => {});
      },
      handleShowMembers({ row, column, index }) {
        this.$router.push({
          name: `班级详情`,
          params: {
            id: row.id,
            activeKey: this.activeKey
          }
        });
      },
      handleAddStudent() {
        this.student_form = student_form_values;
        this.handleShowModal("student_modal_visible");
      },
      handleAddClass() {
        this.class_form = class_form_values;
        this.handleShowModal("class_modal_visible");
      },
      handleShowModal(key) {
        this[key] = true;
      },
      handleCloseModal(key) {
        this[key] = false;
      },
      submitForm(formName, method) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let type = "";
            let cb_type = "";
            let succ_message = "";
            let error_message = "";
            let visible = "";
            let data = this.$refs[formName].model;
            let initData = {};
            if (method === "add") {
              succ_message = "添加成功！";
              error_message = "添加失败！";
            } else if (method === "modify") {
              succ_message = "修改成功！";
              error_message = "修改失败！";
            }
            if (formName === "student_form") {
              visible = "student_modal_visible";
              initData = student_form_values;
              cb_type = "get_students";
              if (method === "add") {
                type = "add_student";
              } else if (method === "modify") {
                type = "modify_student";
              }
            } else if (formName === "class_form") {
              initData = class_form_values;
              visible = "class_modal_visible";
              cb_type = "get_classes";
              if (method === "add") {
                type = "add_class";
              } else if (method === "modify") {
                type = "modify_class";
              }
            }
            this.$store.dispatch({
              type,
              payload: {
                data,
                cb: res => {
                  if (res.data && res.data.code === 200) {
                    this.$refs[formName].resetFields();
                    this[formName] = initData;
                    this.$message({
                      message: succ_message,
                      type: "success"
                    });
                    this.$store.dispatch({
                      type: cb_type,
                      payload: {
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
                  this.handleCloseModal(visible);
                }
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    created() {
      this.activeKey = this.$route.params.activeKey || "1";
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
