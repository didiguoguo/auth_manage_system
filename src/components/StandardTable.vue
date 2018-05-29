<template>
  <div>
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column align="center" v-for="stu in columns" :key="stu.id_card_num" :prop="stu.prop" :label="stu.label" :width="stu.width"></el-table-column>
      <el-table-column align="center"  prop="action" label="操作">
        <template slot-scope="scope">
          <span @click="$emit('handle-click',{row:scope.row,column:scope.column,index:scope.$index})">编辑</span>
          <span @click="$emit('handle-remove',{row:scope.row,column:scope.column,index:scope.$index})">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination  background :total="pagination.total" :page-size="pagination.page_size" :current-page="pagination.current_page" @current-change="(current)=>$emit('current-change',current)" >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StandardTable",
    props:{
      data :{
        type: Array,
        default:()=>[]
      },
      pagination:{
        type: Object,
        default: ()=>{}
      },
      columns:{
        type: Array,
        default:()=>[]
      },
      layout: {
        type: String,
        default:()=>''
      }
    },
    data() {
      return {
      };
    },
    methods: {
    },
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
