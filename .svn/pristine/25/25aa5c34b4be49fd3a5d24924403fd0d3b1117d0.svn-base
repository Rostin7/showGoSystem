<template>
  <div class="shopList">
    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
      <el-form-item style="float: right">
        <el-button type="text" @click="search"><svg-icon icon-class="search"/></el-button>
      </el-form-item>
      <el-form-item style="float: right" label="请输入店铺名称">
        <el-input
          placeholder="请输入店铺名称"
          v-model="searchName"
          @keydown.enter.prevent.native="search"
          @clear="search"
          clearable>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
      <el-table-column  prop="id" label="#ID" header-align="center" align="center"></el-table-column>
      <el-table-column  prop="name" label="店铺名称" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作"  header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="chooseShop(scope.row)">
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next"
      background
      :page-size="pageSize"
      :total="total"
      style="text-align:center;"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableList: [],
      listLoading: false,
      pageSize: 10,
      page: 1,
      total: 0,
      searchName: ''
    }
  },
  methods: {
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    // 点击搜索
    search() {
      this.page = 1
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.moduleShop.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, name: this.searchName }, this.apiList.module.moduleShop.list, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      }).catch(() => {
        // this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    chooseShop(val) {
      this.$emit('chooseShop', val)
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
