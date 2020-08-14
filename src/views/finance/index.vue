<template>
  <div class="activityPlan">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">进账管理</p></el-form-item>
            <el-form-item label="进账类型">
              <el-select v-model="type" placeholder="请选择支付类型">
                <el-option label="全部" value="0"></el-option>
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
            <el-form-item>
              <el-button type="primary" @click="diff" v-if="isAuth('/moneyDiff/list')">补差管理</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中" :summary-method="getSummaries" show-summary>
            <el-table-column prop="outTradeNo" label="订单号" align="center" header-align="center" />
            <el-table-column prop="orderTitle" label="订单名称" align="center" header-align="center"/>
            <el-table-column prop="payType" label="支付类型" align="center" header-align="center"> 
              <template slot-scope="scope">
                {{scope.row.payType == '201' ? '支付宝' : scope.row.payType == '101' ? '微信' : '其他'}}
              </template>
            </el-table-column>
            <el-table-column prop="price" label="金额" align="center" header-align="center"> 
              <template slot-scope="scope">
                {{scope.row.price / 100}}
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
    <el-dialog title="补差管理" :visible.sync="dialogTableVisible" :modal="true" width="800px">
      <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 15px; margin-top: -15px;" v-if="isAuth('/moneyDiff/add')">补差</el-button>
      <diff-table ref="diffTable" v-if="dialogTableVisible" :startTime="startTime" :endTime="endTime" :type="type" :diffType="'1'"/>
    </el-dialog>
    <el-dialog title="提交补差" :visible.sync="dialogFormVisible" :modal="true" width="600px">
      <diff-form :type="1" v-if="dialogFormVisible" @cancel="cancel" />
    </el-dialog>
  </div>
</template>
<script>
import DiffForm from './diffForm'
import DiffTable from './diffTable'
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
      diffMoney: 0,
      dialogFormVisible: false,
      dialogTableVisible: false
    }
  },
  components: {
    DiffForm,
    DiffTable
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false
      this.$refs.diffTable.getDataList()
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.finance.moneyInRecord
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, startTime: this.startTime, endTime: this.endTime, payType : this.type }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.record.records
          this.total = data.data.record.total
          this.totalMoney = data.data.totalMoney ? data.data.totalMoney / 100 : 0
          this.diffMoney = data.data.diffMoney ? data.data.diffMoney / 100 : 0
        }
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
    },
    diff() {
      this.dialogTableVisible = true
    }
  },
  created() {
    const date = new Date()
    this.endTime = date.getTime()
    // this.startTime = this.endTime - (date.getHours()*3600 + date.getMinutes() * 60 + date.getSeconds())*1000
    this.startTime = getFirstDay('month')
    this.getDataList()
  }
}
</script>