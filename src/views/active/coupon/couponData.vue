<template>
  <div class="enterName">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">{{ activeName }}</p></el-form-item>
      </el-form>
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column prop="id" label="序号" width="60" align="center" header-align="center" />
        <el-table-column prop="userNickName" label="昵称" align="center" header-align="center" />
        <el-table-column prop="name" label="头像" align="center" header-align="center">
          <template slot-scope="scope">
            <img class="userAvatar" :src="scope.row.userAvatar" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" header-align="center" align="center"> 
          <template slot-scope="scope">
            {{scope.row.price / 100}}
          </template>
        </el-table-column>
        <el-table-column prop="cantUseRemark" label="状态" align="center" header-align="center" />
        <el-table-column prop="startUseTime" label="兑换开始时间" header-align="center" align="center">
          <template slot-scope="scope">
            {{timeChange('Y-m-d', scope.row.startUseTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="txt"
              v-if="isAuth('/order/moduleRefundOrder') && (scope.row.useState == 1 || scope.row.useState == 101)"
              @click="submitEdit(scope.row)">
              退款
            </el-button>
            <el-button
              size="mini"
              type="text"
              v-if="isAuth('/order/moduleRefundOrder') && (scope.row.useState == 201 || scope.row.useState == 301)">
              已退款
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
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activityId: '',
      listLoading: false,
      tableList: [],
      activeName: '',
      pageSize: 10,
      total: 0,
      page: 1,
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    init (val) {
      this.activityId = val
      this.getOrderInfo()
      this.getDataList()
    },
    getOrderInfo() {
      const url = this.apiList.shop.coupon.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: this.activityId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.activeName = data.data.name
        } else {
          
        }
        this.listLoading = false
      }).catch(() => {
        // this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shop.coupon.orderInfo
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ activityId: this.activityId, page: this.page, size: this.pageSize }, url, true)
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
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    }
  },
  created() {
    const url = window.location.href
    let id = []
    if (url.indexOf('/') > -1) {
      id = url.split('/')
    }
    if (id && id.length) {
      this.init(id[id.length -1 ])
    } else {
      this.$message({
        message: '非法路径',
        type: 'waring'
      })
      setTimeout(() => {
        this.goBack()
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
  
</style>