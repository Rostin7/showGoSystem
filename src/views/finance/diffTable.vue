<template>
  <div>
    <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中" >
      <el-table-column prop="timeAt" label="补差时间" align="center" header-align="center">
        <template slot-scope="scope">
          {{ timeChange('Y-m-d H:i:s', scope.row.timeAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="diffType" label="类型" align="center" header-align="center"> 
        <template slot-scope="scope">
          {{scope.row.diffType == '1' ? '入账' : scope.row.diffType == '101' ? '出账' : '其他'}}
        </template>
      </el-table-column>
      <el-table-column prop="diff" label="是否补差" align="center" header-align="center"> 
        <template slot-scope="scope">
          {{scope.row.diff ? '补差' : '常规出入账'}}
        </template>
      </el-table-column>
      <el-table-column prop="payType" label="支付类型" align="center" header-align="center"> 
        <template slot-scope="scope">
          {{scope.row.payType == '201' ? '支付宝' : scope.row.payType == '101' ? '微信' : '其他'}}
        </template>
      </el-table-column>
      <el-table-column prop="moneyNum" label="金额" align="center" header-align="center"> 
        <template slot-scope="scope">
          {{scope.row.moneyNum / 100}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" header-align="center" />
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
  </div>
</template>
<script>
export default {
  props: {
    type: {},
    startTime: {},
    endTime: {},
    diffType: {}
  },
  data() {
    return{
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      totalMoney: 0,
      diffMoney: 0,
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.finance.moneyDiff
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, startTime: this.startTime, endTime: this.endTime, payType : this.type, diffType: this.diffType }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
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
    }
  },
  mounted() {
    this.getDataList()
  }
}
</script>