<template>
  <div class="activityPlanData">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">{{ activeName }}</p></el-form-item>
        <el-form-item style="float: right">
          <refund v-if="isAuth('/order/moduleRefundOrder')" :only="false" :listData="multipleSelection" @changeData="getDataList"/>
        </el-form-item>
      </el-form>
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" @filter-change="filterTag">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="序号" width="60" align="center" header-align="center" />
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
        <el-table-column prop="createdAt" label="时间" align="center" header-align="center">
          <template slot-scope="scope">
            {{scope.row.createdAt.split(' ')[0]}}
          </template>
        </el-table-column>
        <el-table-column prop="outTradeNo" label="订单号" align="center" header-align="center" width="200"/>
        <el-table-column prop="cantUseRemark" label="组别" align="center" header-align="center" />
        <el-table-column prop="price" label="金额" header-align="center" align="center"> 
          <template slot-scope="scope">
            {{scope.row.price / 100}}
          </template>
        </el-table-column>
        <el-table-column 
          prop="cantUseRemark" 
          :label="filterState" 
          header-align="center" 
          align="center"
          :filter-multiple="false"
          column-key="useState"
          :filters="[
            { text: '待使用', value: 1 },
            { text: '已使用', value: 101 },
            { text: '已退款', value: 201 }
            ]"
        />
        <el-table-column prop="price" label="退款" header-align="center" align="center"> 
          <template slot-scope="scope">
            <refund :rowData="scope.row" @changeData="getDataList" v-if="isAuth('/order/moduleRefundOrder')"/>
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
import refund from '../utils/refund'
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
      dataList: [],
      useState: '',
      filterState: '筛选',
      dialogFormVisible: false,
      multipleSelection: [],
      defultUserAvatar: require('../../../assets/default.png'),
      defultUserName: '众享乐用户'
    }
  },
  components: {
    refund
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    // 选中列表
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    init (val) {
      this.activityId = val
      this.getOrderInfo()
      this.getDataList()
    },
    // 筛选
    filterTag(data) {
      this.useState = data.useState[0]
      this.page = 1
      this.getDataList()
    },
    getOrderInfo() {
      const url = this.apiList.shop.activityPlan.detail
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
      const url = this.apiList.shop.activityPlan.orderInfo
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ activityId: this.activityId, page: this.page, size: this.pageSize, useState: this.useState }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
          switch (this.useState) {
            case 1:
              this.filterState = `待使用(${ this.total })`
              break
            case 101:
              this.filterState = `已使用(${ this.total })`
              break
            case 201:
              this.filterState = `已退款(${ this.total })`
              break
            default:
              this.filterState = '筛选'
              break
          }
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
<style lang="scss" scope>
.activityPlanData{
  .el-dialog{
    border-radius: 10px;
    .el-dialog__header{
      border-radius: 10px 10px 0 0;
      background: #E8F1FF;
      .dialogTitle{
        color: #5F8FD9;
        font-size: 18px;
      }
    }
    .el-dialog__body{
      padding: 60px 80px;
    }
    .dialogBody{
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      border-bottom: solid 1px #D7D7D7;
      p{
        width: 100%;
        margin: 0;
        height: 58px;
        font-size: 18px;
        line-height: 58px;
        border-top: solid 1px #D7D7D7;
        span{
          width: 200px;
          padding-left: 15px;
          font-weight: 600;
          display: inline-block;
          height: 100%;
        }
        span:nth-child(2){
          width: auto;
          font-weight: 400;
        }
      }
    }
    .dialogFooter{
      width: 108px;
      height: 38px;
      line-height: 38px;
      margin: auto;
      text-align: center;
      background: #4F93FE;
      color: #fff;
      border-radius: 38px;
      cursor: pointer;
    }
  }
}

</style>