<template>
 <div class="activityPlan">
     <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0">
              <p class="main_header">订单列表</p>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button @click="downLoadDetail=true" type='text' v-if="isAuth('/statistics/totalDataExcelOut')">
                导出<i class="el-icon-download"/>
              </el-button>
            </el-form-item>
            <!-- 搜索 -->
            <el-form-item style="float: right">
              <el-button type="text" @click="search"><svg-icon icon-class="search"/></el-button>
            </el-form-item>
            <el-form-item style="float: right" label="请输入订单号">
              <el-input
                placeholder="请输入订单号"
                v-model="searchName"
                @keydown.enter.prevent.native="search"
                @clear="search"
                clearable>
              </el-input>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中" @filter-change="filterType">
            <el-table-column prop="id" label="Id" width="60" align="center" header-align="center" />
            <el-table-column prop="orderTitle" label="活动名称" align="center" header-align="center"/>
            <el-table-column prop="createdAt" label="购买时间" align="center" header-align="center"/>
            <!-- <el-table-column prop="outTradeNo" label="订单号" align="center" header-align="center"/> -->
            <el-table-column prop="outTradeNo" label="订单号" align="center" header-align="center" >
              <template slot-scope="scope">
                {{ scope.row.outTradeNo ? scope.row.outTradeNo : '暂无订单号数据' }}
              </template>
            </el-table-column>
            <el-table-column prop="userNickName" label="昵称" align="center" header-align="center" >
              <template slot-scope="scope">
                {{ scope.row.userNickName ? scope.row.userNickName : defultUserName }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="用户头像" align="center" header-align="center">
              <template slot-scope="scope">
                <img class="userAvatar" :src="scope.row.userAvatar ? scope.row.userAvatar : defultUserAvatar" alt="">
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
            <el-table-column label="操作" :width="100" align="center" header-align="center">
              <template slot-scope="scope">
                <router-link v-if="isAuth('/activityPlan/listOrderData')" :to="'/activityPlanOrderInfo/'+scope.row.activityId">
                  <el-button
                    size="mini"
                    type="text"
                  >
                    确认收货
                  </el-button>
                </router-link>
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/order/superGetProduct')&&scope.row.useState=== 1"
                  @click="refund(scope.$index, scope.row)">强制兑换</el-button>
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
    <!-- 数据导出 -->
    <el-dialog title="查看详情" :visible.sync="downLoadDetail" :modal="true"  width="500px">
      <el-form>
        <el-form-item label="导出时间段" label-width="110px">
          <el-date-picker
            v-model="dataTime"
            type="daterange"
            align="right"
            :editable="false"
            :time-arrow-control = "true"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="" label-width="110px">
          <el-button type="primary" @click="download">确 定</el-button>
          <el-button  @click="downLoadDetail = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { timestamp } from '../../utils/timeChange.js'
export default {
  data() {
    return{
      dataTime: [],
      downLoadDetail: false,
      tableList: [],
      listLoading: true,
      total: 0,
      searchName: '',
      page: 1,
      pageSize: 10,
      idLike: '', // 点单号筛选
      useState: '', // 状态筛选
      filterState: '筛选',
      defultUserAvatar: require('../../assets/default.png'),
      defultUserName: '众享乐用户'
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getDataList()
    },
    download() {
      const url = this.apiList.refund.downLoad
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ startTime:timestamp(this.dataTime[0]), endTime:timestamp(this.dataTime[1]) }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.url = data.data
          window.open(this.url)
        }
      })
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.refund.orderAll
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, useState: this.useState, idLike: this.idLike }, url , true)
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
        }
        this.listLoading = false
      }).catch(() => {
        // this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    filterType(val, row) {
      this.useState = val.useState[0]
      this.page = 1
      this.getDataList()
    },
    search() {
      this.idLike = this.searchName
      this.page = 1
      this.getDataList()
    },
    // 强制确认收货操作
    refund(index, data) {
      this.$confirm('此操作将强制将用户订单变为已兑换状态，是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.refund.Product
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ activityGetId: data.id }, url , true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '兑换成功',
              type: 'success'
            })
            this.getDataList()
          }
        })
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>