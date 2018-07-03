<template>
  <div>
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column 
        align="center" 
        v-for="value in columns" 
        :key="value.id_card_num" 
        :prop="value.prop" 
        :label="value.label" 
        :width="value.width"
      >
      </el-table-column>
      <el-table-column align="center"  prop="action" label="操作">
        <template slot-scope="scope">
          <el-button  
            v-for="(value,index) in actions" 
            :key="index" 
            @click="$emit(value.method,{row:scope.row,column:scope.column,index:scope.$index})" 
            type="text" 
            size="small"
          >
            {{value.text}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination 
        :layout="layout" 
        background 
        :total="pagination.total" 
        :page-size="pagination.page_size" 
        :current-page="pagination.current_page" 
        @current-change="(current)=>$emit('current-change',current)" 
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "StandardTable",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    layout: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {};
  },
  methods: {}
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
