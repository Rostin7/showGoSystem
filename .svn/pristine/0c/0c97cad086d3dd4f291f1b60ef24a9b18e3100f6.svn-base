<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <p class="main_header">关注会员列表</p>
          <!--列表-->
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="activityId" label="Id" width="60"/>
            <el-table-column header-align="center" align="center" prop="userNickName" label="用户昵称" />
            <el-table-column prop="userAvatar" label="头像" header-align="center" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.userAvatar" alt="" style="width: 40px; height: 40px;border-radius: 100%;">
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="updatedAt" label="关注时间" />
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
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.vip.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        } else {
          
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
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
<style>

</style>