<template>
  <div class="hello">
    <el-tabs v-model="activeKey" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="考生列表" name="stuList">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="class_name"
            label="班级名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="begin_time"
            label="开班时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="end_time"
            label="结业时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="begin_addr"
            label="开班地点"
            width="150">
          </el-table-column>
          <el-table-column
            prop="class_action"
            label="授课安排"
            width="150">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="action"
            label="安排"
            width="150">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="班级列表" name="classList">班级列表</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "InfoManage",
  data() {
    return {
      activeKey: "stuList",
      tableData: [
        {
          begin_time: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          begin_time: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          begin_time: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          begin_time: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleClick(t, e) {
      this.activeKey = t.name;
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
