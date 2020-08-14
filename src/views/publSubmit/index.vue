<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">加盟申请列表</p></el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="phoneName" label="名称" align="center" header-align="center"/>
            <el-table-column prop="phoneNum" label="联系电话" align="center" header-align="center" />
            <el-table-column prop="shopName" label="店铺名称" align="center" header-align="center" />
            <el-table-column prop="address" label="地址" align="center" header-align="center" />
            <el-table-column prop="industry" label="行业" align="center" header-align="center" />
            <el-table-column prop="createdAt" label="提交时间" align="center" header-align="center" />
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="isAuth('/publSubmit/del')"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      isadmin: false,
      pass: '',
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      DialogImgVisible: false,
      imgUrl: '',
      dialogTitle: '添加公告',
      dialogFormVisible: false,
      formType: 'add'
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.publSubmit.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, url, true)
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
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    // 点击删除
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.publSubmit.del
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
  },
  created() {
    this.getDataList()
  }
}
</script>
<style>

</style>
