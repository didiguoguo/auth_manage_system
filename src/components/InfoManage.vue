<template>
  <div>
    <el-tabs v-model="activeKey" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="考生列表" name="1">
        <el-table
          :data="stuData.list"
          border
          stripe
          style="width: 100%">
          <el-table-column v-for="stu in stu_columns" :key="stu.id_card_num" :prop="stu.prop" :label="stu.label" :width="stu.width" >
            {{stu.prop==='action'?'123':'234'}}
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            layout="total, -> , prev, pager, next, jumper"
            background
            :total="stuData.pagination.total"
            :page-size="stuData.pagination.page_size"
            :current-page="stuData.pagination.current_page"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="班级列表" name="2">
        <el-table
          :data="classData.list"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column v-for="cla in class_columns" :key="cla.id_card_num" :prop="cla.prop" :label="cla.label" :width="cla.width" >
            <div v-if="true">
              <span>编辑</span>
              <span>删除</span>
            </div>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const stu_columns = [
  {
    prop: "index",
    label: "序号"
  },
  {
    prop: "stu_name",
    label: "考生姓名"
  },
  {
    prop: "gender",
    label: "性别"
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
  {
    prop: "action",
    label: "操作"
  }
];
const class_columns = [
  {
    prop: "index",
    label: "序号"
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
  {
    prop: "action",
    label: "操作"
  }
];
export default {
  name: "InfoManage",
  data() {
    return {
      stu_columns,
      class_columns,
      activeKey: "1"
    };
  },
  computed: mapGetters({
    stuData: "students",
    classData: "classes"
  }),
  methods: {
    handleClick(t, e) {
      this.activeKey = t.name;
      console.log(t.name);
      if(t.name==='1'){
        this.$store.dispatch({
          type: "get_students",
          payload: {
            current_page: 1,
            page_size: 10
          }
        })
      }else if(t.name==='2'){
        this.$store.dispatch({
          type: "get_classes",
          payload: {
            current_page: 1,
            page_size: 10
          }
        })

      }
    },
    handlePageChange(current){
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
</style>
