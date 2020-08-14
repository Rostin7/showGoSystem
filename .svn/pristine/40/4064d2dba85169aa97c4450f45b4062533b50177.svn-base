<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">进账管理</p></el-form-item>
            <el-form-item label="订单类型">
              <el-select v-model="getUp" placeholder="请选择订单类型">
                <el-option label="全部" :value="null"></el-option>
                <el-option label="盈利" :value="true"></el-option>
                <el-option label="不盈利" :value="false"></el-option>
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
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="outTradeNo" label="订单号" align="center" header-align="center" />
            </el-table-column>
            <el-table-column prop="moduleName" label="店铺" align="center" header-align="center"> 
              <template slot-scope="scope">
                <p style="text-align: left;"><img :src="scope.row.logoImgUrl" class="logoImgUrl"><span>{{ scope.row.moduleName }}</span></p>
              </template>
            </el-table-column>
            <el-table-column prop="orderTitle" label="订单名称" align="center" header-align="center"/>
            <el-table-column prop="targetType" label="活动类型" align="center" header-align="center"> 
              <template slot-scope="scope">
                {{scope.row.targetType == '101' ? '报名' : scope.row.targetType == '201' ? '团购' :  scope.row.targetType == '301' ? '促销' :  scope.row.targetType == '401' ? '优惠券' :  scope.row.targetType == '501' ? '活动' :  scope.row.targetType == '601' ? '商品' : scope.row.targetType == '701' ? '抽奖' : '其他'}}
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
      startTime: '',
      endTime: '',
      getUp: null,
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.finance.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, startTime: this.startTime, endTime: this.endTime, getUp : this.getUp }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.record
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
    const date = new Date()
    this.endTime = date.getTime()
    // this.startTime = this.endTime - (date.getHours()*3600 + date.getMinutes() * 60 + date.getSeconds())*1000
    this.startTime = getFirstDay('month')
    this.getDataList()
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.logoImgUrl{
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>