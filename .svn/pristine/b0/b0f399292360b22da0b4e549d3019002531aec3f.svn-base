<template>
  <div>
    <el-card shadow="hover">
      <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 0"><p class="main_header">余额明细</p></el-form-item>
      </el-form>
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column  prop="id" label="#ID" header-align="center" align="center"></el-table-column>
        <el-table-column  prop="logDesc" label="详情" header-align="center" align="center"></el-table-column>
        <el-table-column  prop="createdAt" label="添加时间" header-align="center" align="center"></el-table-column>
        <el-table-column  prop="num" label="变动金额" header-align="center" align="center">
          <template slot-scope="scope">
            {{ scope.row.num ? scope.row.num / 100 : ''}}
          </template>
        </el-table-column>
        <el-table-column  prop="nowMoneyNum" label="余额" header-align="center" align="center">
          <template slot-scope="scope">
            {{ scope.row.nowMoneyNum ? scope.row.nowMoneyNum / 100 : '' }}
          </template>
        </el-table-column>
        <el-table-column  prop="type" label="类型" header-align="center" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">充值收入</span>
              <span v-if="scope.row.type == 101">提现支出</span>
              <span v-if="scope.row.type == 111">提现支出失败回款</span>
              <span v-if="scope.row.type == 201">转账</span>
              <span v-if="scope.row.type == 301">活动购买</span>
              <span v-if="scope.row.type == 401">活动退款</span>
              <span v-if="scope.row.type == 501">vip充值</span>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageSize: 10,
      page: 1,
      total: 0,
      searchName: '', // 搜索名称
      formLabelWidth: '120px',
      tableList: [],
      listLoading: false
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
  
    getDataList() {
      this.listLoading = true
      const url = this.apiList.money.logModule
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({page: this.page, size: this.pageSize} , url, true)
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
    }
  },
  mounted() {
    this.getDataList()
  }
}
</script>
<style></style>