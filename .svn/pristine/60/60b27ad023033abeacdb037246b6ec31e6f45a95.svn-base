<template>
  <div class="activityPlan">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">提现账单管理</p></el-form-item>
            <el-form-item label="进账类型">
              <el-select v-model="type" placeholder="请选择提现类型">
                <el-option label="全部" value="0"></el-option>
                <el-option label="银行卡" value="1"></el-option>
                <el-option label="微信支付" value="101"></el-option>
                <el-option label="支付宝支付" value="201"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="startTime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="endTime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"><i class="el-icon-search"/>搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中" :summary-method="getSummaries" show-summary>
            <el-table-column prop="logDesc" label="备注" align="center" header-align="center" />
            <el-table-column prop="createdAt" label="时间" align="center" header-align="center"/>
            <el-table-column prop="payType" label="支付类型" align="center" header-align="center"> 
              <template slot-scope="scope">
                {{scope.row.payType == '201' ? '支付宝' : scope.row.payType == '101' ? '微信' : '其他'}}
              </template>
            </el-table-column>
            <el-table-column prop="num" label="提现金额" align="center" header-align="center"> 
              <template slot-scope="scope">
                {{scope.row.num / 100}}
              </template>
            </el-table-column>
            <el-table-column prop="realOutNum" label="实际到账金额" align="center" header-align="center"> 
              <template slot-scope="scope">
                {{scope.row.realOutNum / 100}}
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
import { getFirstDay } from '../../utils/timeChange'
export default {
  data() {
    return{
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      type: '0',
      startTime: '',
      endTime: '',
      totalMoney: 0,
      diffMoney: 0
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.finance.moneyOutRecord
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, startTime: this.startTime, endTime: this.endTime, moneyOutType : this.type }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.record.records
          this.total = data.data.record.total
          this.totalMoney = data.data.totalMoney ? data.data.totalMoney / 100 : 0
          this.diffMoney = data.data.diffMoney ? data.data.diffMoney / 100 : 0
        }
        this.listLoading = false
        this.listLoading = false
      }).catch(() => {
        // this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index < columns.length) {
          sums[index] = ''
        }
      })
      sums[0] = `合计${this.totalMoney + this.diffMoney}元`
      sums[columns.length - 1] = `总价${this.totalMoney}元`
      sums[columns.length - 2] = `人工补差${this.diffMoney}元`
      return sums;
    },
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    onSubmit() {
      this.getDataList()
    }
  },
  created() {
    const date = new Date()
    this.endTime = date.getTime()
    this.startTime = getFirstDay('month')
    this.getDataList()
  }
}
</script>