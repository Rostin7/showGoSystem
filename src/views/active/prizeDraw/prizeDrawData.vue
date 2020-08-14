<template>
  <div class="prizeDrawDataName">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">{{ activeName }}</p></el-form-item>
        <el-form-item style="float: right">
          <el-button @click="download" type='text' v-if="isAuth('/lotteryBy/excelOut')">
            导出<i class="el-icon-download"/>
          </el-button>
        </el-form-item>
        <!-- 搜索 -->
        <el-form-item style="float: right">
          <el-button type="text" @click="search"><svg-icon icon-class="search"/></el-button>
        </el-form-item>
        <el-form-item style="float: right" label="">
          <el-select v-model="onlyHit" placeholder="请选择中奖状态" @change="search">
            <el-option :value="true" label="中奖"></el-option>
            <el-option :value="false" label="全部"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table 
        :data="tableList" 
        v-loading="listLoading" 
        element-loading-text="拼命加载中"
      >
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
        <el-table-column prop="outTradeNo" label="订单号" align="center" header-align="center" width="200"/>
        <el-table-column prop="price" label="价格" header-align="center" align="center"> 
          <template slot-scope="scope">
            {{scope.row.price / 100}}
          </template>
        </el-table-column>
        <!-- 中奖状态 -->
        <el-table-column prop="price" label="中奖" header-align="center" align="center"> 
          <template slot-scope="scope">
            <p v-if="scope.row.hitState == 1">未开奖</p>
            <p v-if="scope.row.hitState == 101">一等奖</p>
            <p v-if="scope.row.hitState == 201">二等奖</p>
            <p v-if="scope.row.hitState == 301">三等奖</p>
            <p v-if="scope.row.hitState == 401">未中奖</p>
          </template>
        </el-table-column>
        <!-- 兑换状态 -->
        <el-table-column prop="price" label="状态" header-align="center" align="center"> 
          <template slot-scope="scope">
            <p v-if="scope.row.hitState == 1 && scope.row.useState == 1">未开奖</p>
            <p v-if="scope.row.hitState != 1 && scope.row.useState == 1">待使用</p>
            <p v-if="scope.row.useState == 101">已使用</p>
            <p v-if="scope.row.useState == 201">已退款</p>
            <p v-if="scope.row.useState == 301">已退款</p>
            <p v-if="scope.row.useState == 401">未中奖</p>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="下单时间" header-align="center" align="center" width="180">
          <template slot-scope="scope">
            {{scope.row.createdAt}}
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
      dialogFormVisible: false,
      dataList: [],
      activityId: '',
      listLoading: false,
      tableList: [],
      activeName: '',
      multipleSelection: [],
      pageSize: 10,
      total: 0,
      page: 1,
      onlyHit: false,
      useState: '',
      defultUserAvatar: require('../../../assets/default.png'),
      defultUserName: '众享乐用户'
    }
  },
  methods: {
    search() {
      this.page = 1
      this.getDataList()
    },
    /**
     * 抽奖信息导出
     */
    download() {
      const url = this.apiList.shop.prizeDraw.excelOut
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({  lotteryId: this.activityId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          window.open(data.data)
        }
      })
    },
    goBack() {
      window.history.go(-1)
    },
    init (val) {
      this.activityId = val
      this.getOrderInfo()
      this.getDataList()
    },
    getOrderInfo() {
      const url = this.apiList.shop.prizeDraw.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ activityId: this.activityId, activityType: 701}, url, true)
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
      const url = this.apiList.shop.prizeDraw.orderInfo
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ activityId: this.activityId, page: this.page, size: this.pageSize, onlyHit: this.onlyHit }, url, true)
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
    },
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
.prizeDrawDataName{
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
        // height: 58px;
        font-size: 18px;
        line-height: 58px;
        border-top: solid 1px #D7D7D7;
        span{
          width: 200px;
          padding-left: 15px;
          font-weight: 600;
          display: inline-block;
          vertical-align: top;
          height: 100%;
        }
        span:nth-child(2){
          width: auto;
          max-width: 150px;
          font-weight: 400;
          vertical-align: bottom;
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