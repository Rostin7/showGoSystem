<template>
  <div class="app-container">
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="clientType" placeholder="请选择" @change="changeappType">
          <el-option
            :label="'C端'"
            :value="3">
          </el-option>
          <el-option
            :label="'B端'"
            :value="2">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click.native="addModel" >添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table :data="tableList" v-loading="listLoading" border element-loading-text="拼命加载中">
      <el-table-column prop="id" label="#id" width="85" sortable>
      </el-table-column>
      <el-table-column prop="verName" label="版本名称">
      </el-table-column>
      <el-table-column prop="createdAt" label="更新时间">
      </el-table-column>
      <el-table-column prop="url" label="下载路径">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="submitDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination layout="total, prev, pager, next"
      background
      :page-size="pageSize"
      :total="total"
      style="text-align:center;"
      @current-change="handleCurrentChange"
      >
    </el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="700px">
      <app-form ref="appForm" v-if="dialogFormVisible" @success="success" @close="dialogFormVisible = !dialogFormVisible"></app-form>
    </el-dialog>
    <el-dialog :visible.sync="DialogImgVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import AppForm from './form.vue'
export default {
  data() {
    return {
      clientType: 3,
      tableList: [],
      listLoading: true,
      isShowEditVisible: false,
      reloadShopList: false,
      total: 0,
      page: 1,
      pageSize: 10,
      DialogImgVisible: false,
      imgUrl: '',
      dialogTitle: '添加',
      dialogFormVisible: false,
      formType: 'add'
    }
  },
  components: {
    AppForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.config.app.vueUpdate.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize,clientType: this.clientType }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    changeappType() {
      this.page = 1
      this.getDataList()
    },
    // 点击删除
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.cofig.app.vueUpdate.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.tableList.splice(index, 1)
            this.total --
          }
        })
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '上线新版本'
      this.dialogFormVisible = true
    },
    success() {
      this.dialogFormVisible = false
      this.getDataList()
    },
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
<style>

</style>