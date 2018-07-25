<template>
  <div>
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column 
        align="center" 
        v-for="value in columns" 
        :key="value.id_card_num" 
        :label="value.label" 
        :width="value.width"
      >
        <template slot-scope="scope">
          <span
            v-if="value.actions"
            v-for="(v,index) in value.actions" 
            class="actions"
            :key="index" 
            @click="$emit(v.method,{row:scope.row,column:scope.column,index:scope.$index})" 
          >
            <el-button type="text"  size="small"> {{v.text}} </el-button>
          </span>
          <span v-if="!value.actions">{{scope.row[value.prop]}}</span>
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
