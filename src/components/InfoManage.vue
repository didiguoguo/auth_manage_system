<template>
  <div>
    <el-tabs v-model="activeKey" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="考生列表" name="1">
        <el-row class="action-wrapper">
          <el-col :md="{span:6}">
            <el-button size='small' type='success'>
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
        <standard-table :data="stu_data.list" :columns="stu_columns" :pagination="stu_data.pagination" @handle-click="handleEdit" @handle-remove="handleRemove" @current-change="handlePageChange"></standard-table>
      </el-tab-pane>
      <el-tab-pane label="班级列表" name="2">
        <el-row class="action-wrapper">
          <el-col :md="{span:6}">
            <el-button size='small' type='success'>
              <i class='el-icon-plus'></i>添加班级</el-button>
          </el-col>
          <el-col :md="{span:4,offset:14}">
            <el-input size='small' placeholder="输入班级名称">
              <el-button slot="append">搜索</el-button>
            </el-input>
          </el-col>
        </el-row>
        <standard-table :data="class_data.list" :columns="class_columns" :pagination="class_data.pagination" @handle-click="handleEdit" @handle-remove="handleRemove" @current-change="handlePageChange"></standard-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import StandardTable from './StandardTable.vue'
  const stu_columns = [{
      prop: "index",
      label: "序号",
      width: 50,
    },
    {
      prop: "stu_name",
      label: "考生姓名",
      width: 150,
    },
    {
      prop: "gender",
      label: "性别",
      width: 150,
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
      prop: "enter_time",
      label: "录入时间"
    },
  ];
  const class_columns = [{
      prop: "index",
      label: "序号",
      width: 50,
    },
    {
      prop: "class_name",
      label: "班级名称",
      width: 150,
    },
    {
      prop: "begin_time",
      label: "开班时间",
      width: 200,
    },
    {
      prop: "end_time",
      label: "结业时间",
      width: 200,
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
    },
  ];
  export default {
    name: "InfoManage",
    components:{ StandardTable },
    data() {
      return {
        stu_columns,
        class_columns,
        activeKey: "1"
      };
    },
    computed: mapGetters({
      stu_data: "students",
      class_data: "classes"
    }),
    methods: {
      handleClick(t, e) {
        this.activeKey = t.name;
        if (t.name === '1') {
          this.$store.dispatch({
            type: "get_students",
            payload: {
              current_page: 1,
              page_size: 10
            }
          })
        } else if (t.name === '2') {
          this.$store.dispatch({
            type: "get_classes",
            payload: {
              current_page: 1,
              page_size: 10
            }
          })
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
      // handleSizeChange(size){
      //   if (this.activeKey === "1") {
      //     this.$store.dispatch({
      //       type: "get_students",
      //       payload: {
      //         current_page: 1,
      //         page_size: 10
      //       }
      //     });
      //   } else if (this.activeKey === "2") {
      //     this.$store.dispatch({
      //       type: "get_classes",
      //       payload: {
      //         current_page: 1,
      //         page_size: 10
      //       }
      //     });
      //   }
      // },
      handleEdit({row,column,index}) {
        console.log('edit',row.id,index);
      },
      handleRemove({row,column,index}) {
        console.log('remove',row.id,index);
      },
      test() {
        console.log("test");
      },
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
