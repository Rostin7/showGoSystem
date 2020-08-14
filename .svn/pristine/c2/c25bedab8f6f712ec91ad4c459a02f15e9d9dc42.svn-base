<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">退款列表</p></el-form-item>
            <el-form-item style="float: right">
              <el-button @click="delate" type='text'>批量退款</el-button>
            </el-form-item>
          </el-form>
          <!--列表-->
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中"  @selection-change="handleSelectionChange" @filter-change="filterTag">
            <el-table-column type="selection" width="55" />
            <el-table-column header-align="center" align="center" prop="id" label="Id" width="60"/>
            <el-table-column header-align="center" align="center" prop="logDesc" label="简述" />
            <el-table-column header-align="center" align="center" prop="outTradeNo" label="订单号" />
            <el-table-column prop="userNickName" label="昵称" align="center" header-align="center" >
              <template slot-scope="scope">
                {{ scope.row.userNickName ? scope.row.userNickName : defultUserName }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="头像" align="center" header-align="center">
              <template slot-scope="scope">
                <img class="userAvatar" :src="scope.row.userAvatar ? scope.row.userAvatar : defultUserAvatar" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="userAvatar" label="退款金额" header-align="center" align="center">
              <template slot-scope="scope">
                {{ scope.row.num / 100 }}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="updatedAt" label="退款申请时间" />
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/moneyApproval/dealOrderRefund') && scope.row.state === 1"
                  @click="getAgree(scope.row)">同意
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/moneyApproval/dealOrderRefund') && scope.row.state === 1"
                  @click="getRefuse(scope.row)">拒绝
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.state === 101"
                  >
                  已退款
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.state === 201"
                  >
                  已拒绝
                </el-button>
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
import { promises } from 'fs'
export default {
  data() {
    return {
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      multipleSelection: [],
      defultUserAvatar: require('../../../assets/default.png'),
      defultUserName: '众享乐用户'
    }
  },
  methods: {
    filterTag() {
      this.page = 1
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.refund.list
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
    // 批量
    delate() {
      this.$confirm('此操作将从您的账户余额退款给该用户, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(async() => {
        const arr = this.multipleSelection.filter( item => item.state === 1)
        if (arr.length > 0) {
          // 将异步请求变成同步请求
          // arr.forEach( (item, index) => {
          for (let i = 0; i < arr.length ; i ++) {
            const index = i
            const item = arr[i]
            await this.sendData(item, index)
            // 数据请求完成
            if (index === arr.length-1 ) {
              this.$message('数据请求完成')
              this.getDataList()
            }
          }
          // })
        } else {
          this.$message({
            type: 'warning',
            message: '所有內容都已退款'
          })
        }
      })
    },
    sendData(item, index) {
      return new Promise((resolve, reject) => {
        const url = this.apiList.refund.edit
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ agree: true, approvalId: item.id, getId: item.getId  }, url, true)
        }).then(({ data }) => {
          resolve()
        })
      })
    },
    // 选中列表
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 同意
    getAgree(data) {
      this.$confirm('此操作将从您的账户退款给该用户, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.refund.edit
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ agree: true, approvalId: data.id, getId: data.getId }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '退款成功',
              type: 'success'
            })
            this.getDataList()
          }
        })
      })
    },
    // 拒绝
    getRefuse(data) {
      const url = this.apiList.refund.edit
      this.$prompt('请输入拒绝退款理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '请输入拒绝退款理由'
      }).then(({ value }) => {
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ agree: false, approvalId: data.id, refuseRemark: value }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '拒绝退款成功',
              type: 'success'
            })
          }
        })
        this.getDataList()
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