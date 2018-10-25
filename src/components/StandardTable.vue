<template>
  <div>
    <el-table :data="data" border stripe style="width: 100%" max-height="600">
      <el-table-column 
        v-for="column in columns" 
        :key="column.id" 
        :label="column.label" 
        :width="column.width"
      >
        <template slot-scope="scope">
          <span
            v-for="(v,index) in column.actions" 
            v-if="column.actions && (!column.renderable || (column.renderable && column.renderable(scope.row,v)))"
            class="actions"
            :key="index" 
            @click="$emit(v.method,{row:scope.row,column:scope.column,index:scope.$index})" 
          >
            <el-button type="text"  size="small"> {{v.text}} </el-button>
          </span>
          <span v-if="scope.row[column.prop]">{{scope.row[column.prop]}}</span>
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

.actions{
  margin-right: .5em;
}

a {
  color: #42b983;
}

.pagination {
  margin-top: 1em;
}
</style>
