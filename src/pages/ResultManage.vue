<template>
  <el-card>
    <div class="actions">
      <div class="action-wrapper">
        <el-input class="search" size='small' v-model="condition" placeholder="输入姓名或证件号">
          <el-button slot="append" @click="handleSearch">搜索</el-button>
        </el-input>
      </div>
    </div>
    <standard-table 
      :layout="'total, ->, prev, pager, next, jumper'" 
      :data="classes_data.list" 
      :columns="result_columns" 
      :pagination="classes_data.pagination" 
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
    prop: "id",
    label: "id",
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
  },
  {
    prop: "action",
    label: "操作",
    actions:[{
      text: "查看成绩详情",
      method: "handle-show-more"
    }]
  },
];
export default {
  name: "ResultManage",
  components: { StandardTable },
  data() {
    return {
      result_columns,
      class_modal_visible: false,
      class_form: {
        class_name: "",
        gender: 1,
        id_card_num: "",
        phone: "",
        unit: "",
        job_title: ""
      },
      condition:'',
      class_rules: {
        class_name: [
          { required: true, message: "请输入考生姓名", trigger: "blur" }
        ]
      }
    };
  },
  computed: mapGetters({
    classes_data: "classes"
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
    handleSearch(){
      this.$store.dispatch({
        type:'get_classes',
        payload:{
          class_name: this.condition,
          current_page: 1,
          page_size: 10
        }
      })
    },
    handleRemove({ row, column, index }) {
      console.log("remove", row, index);
    },
    handleShowDetail({ row, column, index }) {
      this.$router.push({
        path:`result_detail/${row.id}`,
      })
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
  flex: 9;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.actions{
  display: flex;
}

.back{
  flex: 1;
}

.search{
  max-width:240px;
}
</style>
