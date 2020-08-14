<template>
  <div class="pmSale">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">常见问题管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native="addModel" v-if="isAuth('/query/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="id" label="Id" width="60" align="center" header-align="center" />
            <el-table-column prop="question" label="常见问题" align="center" header-align="center"/>
            <el-table-column prop="answer" label="问题答案" align="center" header-align="center"/>
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/query/update')"
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/query/delete')"
                  size="mini"
                  type="text"
                  class="danger"
                  @click="submitDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--工具条-->
          <el-pagination
            layout="total, prev, pager, next"
            background
            :page-size="pageSize"
            :total="total"
            style="text-align:center;"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="true"  width="600px">
      <query-form ref="queryForm" v-if="dialogFormVisible" :queryType="type" :formType="formType" @success="success" @close="dialogFormVisible = !dialogFormVisible"/>
    </el-dialog>
  </div>
</template>
<script>
import QueryForm from './form'
export default {
  props: {
    type: {}
  },
  data() {
    return{
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      dialogFormVisible: false,
      dialogTitle: '添加新问题',
      formType: 'add',
    }
  },
  components: {
    QueryForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.query.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, type: this.type }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        } else {
          // 请求失败
          // this.$message.error(data.msg)
        }
        this.listLoading = false
      }).catch(() => {
        // this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    // 点击删除
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.query.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ id: data.queryId }, url, true)
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
      this.dialogTitle = '添加新问题'
      this.dialogFormVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '修改问题'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.queryForm.init({ data })
      })
    },
    success() {
      this.dialogFormVisible = false
      this.getDataList()
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
  },
  created() {
    this.getDataList()
  }
}
</script>