<template>
  <div>
    <el-card>
      <el-row class="action-wrapper">
        <el-col :md="{span:6}">
          <el-button size='small' type='success' @click="handleAddTest">
            <i class='el-icon-plus'></i>添加考试</el-button>
        </el-col>
        <el-col :md="{span:6,offset:12}">
          <el-input size='small' v-model="condition.name" placeholder="输入考试名称进行搜索">
            <el-select clearable v-model="condition.work_type" slot="prepend" width="200px" placeholder="请选择工种">
              <el-option label="操作工" value="操作工"></el-option>
              <el-option label="装调工" value="装调工"></el-option>
              <el-option label="电焊工" value="电焊工"></el-option>
            </el-select>
            <el-button slot="append" @click="handleSearch">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
      <standard-table 
        :layout="'total, ->, prev, pager, next, jumper'" 
        :data="tests_data.list" 
        :columns="test_columns" 
        :pagination="tests_data.pagination" 
        @handle-remove="handleRemove" 
        @handle-edit="handleEdit"
        @current-change="handlePageChange" 
        @handle-show-more="handleShowDetail"
      />
    </el-card>
    <el-dialog
      :title="!test_form.id?'添加考试':'编辑考试'"
      :visible.sync="test_modal_visible"
      width="30%"
    >
      <el-form :model="test_form" :rules="test_rules" ref="test_form">
        <el-form-item label="考试名称" prop="name" :label-width="'120px'" placeholder="输入考试名称">
          <el-input v-model="test_form.name" auto-complete="off" size='small'></el-input>
        </el-form-item>
        <el-form-item label="考试类型" prop="type" :label-width="'120px'">
          <el-select v-model="test_form.type" placeholder="请选择考试类型">
            <el-option label="模拟考试" value="模拟考试"></el-option>
            <el-option label="结业考试" value="结业考试"></el-option>
            <el-option label="月考" value="月考"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试工种" prop="work_type" :label-width="'120px'">
          <el-select v-model="test_form.work_type" placeholder="请选择工种">
            <el-option label="操作工" value="操作工"></el-option>
            <el-option label="装调工" value="装调工"></el-option>
            <el-option label="电焊工" value="电焊工"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试人员" prop="target_id" :label-width="'120px'">
          <el-select v-model="test_form.target_id" placeholder="请选择考试班级">
            <el-option v-for="(value,i) in classes_data.list" :key="i" :label="value.class_name" :value="value.class_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试时长" prop="duration" :label-width="'120px'">
          <el-input-number v-model="test_form.duration" controls-position="right" :min="1"> </el-input-number>
          <span>分钟</span>
        </el-form-item>
        <el-form-item label="考试时间" prop="cycle" :label-width="'120px'">
          <el-date-picker
            value-format="yyyyMMdd"
            format="yyyy-MM-dd"
            v-model="test_form.cycle"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考试次数" prop="times" :label-width="'120px'">
          <el-input-number v-model="test_form.times" controls-position="right" :min="1"> </el-input-number>
        </el-form-item>
        <el-form-item :label-width="'120px'">
          <el-button size='small' @click="test_modal_visible = false">取 消</el-button>
          <el-button size='small' type="primary" @click="()=>submitForm('test_form',!test_form.id? 'add':'modify')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StandardTable from "../components/StandardTable.vue";
const test_columns = [
  {
    prop: "id",
    label: "id",
    width: 75
  },
  {
    prop: "name",
    label: "考试名称"
  },
  {
    prop: "type",
    label: "考试类型"
  },
  {
    prop: "work_type",
    label: "考试工种"
  },
  {
    prop: "target_id",
    label: "考试人员"
  },
  {
    prop: "duration",
    label: "考试时长",
  },
  {
    prop: "cycle",
    label: "考试时间",
    width: 240,
  },
  {
    prop: "times",
    label: "考试次数"
  },
  {
    prop: "status",
    label: "考试状态"
  },
  {
    prop: "action",
    label: "操作",
    width: 300,
    renderable:(row, column)=>{
      if(column.text === '删除' && (row.status === '待审批' || row.status === '已结束' || row.status === '未开始' || row.status === '审批未通过')){
        return true
      }else if(column.text === '编辑' && (row.status === '审批未通过' || row.status === '待审批')){
        return true
      }else if(column.text === '查看考试结果' && row.status === '已结束'){
        return true
      }else if(column.text === '查看审批结果' && row.status === '审批未通过'){
        return true
      }
    },
    actions:[
      {
        text: "查看考试结果",
        method: "handle-show-detail"
      },
      {
        text: "查看审批结果",
        method: "handle-show-check"
      },
      {
        text: "编辑",
        method: "handle-edit"
      },
      {
        text: "删除",
        method: "handle-remove"
      },
    ]
  },
];
const test_form_values = {
  name: "",
  type: "",
  work_type: "",
  target_id: "",
  duration: "",
  cycle: [],
  times: "",
}
export default {
  name: "TestManage",
  components: { StandardTable },
  computed: mapGetters({
    tests_data: "tests",
    classes_data: "classes",
  }),
  created() {
    this.$store.dispatch({
      type: "get_tests",
      payload: {
        current_page: 1,
        page_size: 10
      }
    });
    this.$store.dispatch({
      type: "get_classes",
    });
  },
  data() {
    return {
      test_columns,
      test_modal_visible: false,
      test_form: test_form_values,
      condition: {
        work_type: '',
        name: ''
      },
      test_rules: {
        name: [{ required: true, message: "请输入考试姓名", trigger: "blur" }],
        type: [{ required: true, message: "请选择考试类型", trigger: "blur" }],
        duration: [{ required: true, message: "请输入考试时长", trigger: "blur" }],
        work_type: [{ required: true, message: "请选择工种", trigger: "blur" }],
        cycle: [{ required: true, message: "请选择考试时间", trigger: "blur" }],
        target_id: [{ required: true, message: "请选择考试人员", trigger: "blur" }],
        times: [{ required: true, message: "请输入考试次数", trigger: "blur" }],
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
    handleSearch(){
      this.$store.dispatch({
      type: "get_tests",
      payload: {
          current_page: 1,
          page_size: 10,
          ...this.condition,
        }
      });
    },
    handleAddTest() {
      this.test_form = test_form_values;
      this.handleShowModal("test_modal_visible");
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
    handleEdit({ row, column, index }){
      this.test_form = { ...row }
      this.handleShowModal('test_modal_visible')
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
          let cb_type = "get_tests";
          let succ_message = "";
          let error_message = "";
          let data =  this.$refs[formName].model
          if (method === "add") {
            succ_message = "添加成功！";
            error_message = "添加失败！";
            type = "add_test";
          } else if (method === "modify") {
            type = "modify_test";
            succ_message = "修改成功！";
            error_message = "修改失败！";
          }
          this.$store.dispatch({
            type,
            payload: {
              data,
              cb: res => {
                if (res.data && res.data.code === 200) {
                  this.$refs[formName].resetFields();
                  this[formName] = test_form_values
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
                this.handleCloseModal('test_modal_visible');
              }
            }
          });
        } else {
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

.action-wrapper .el-select{
  width: 120px;
}

.el-select-dropdown__item{
  display: block;
  width: 120px;
}
</style>
