<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 0"><p class="main_header">异业合作管理</p></el-form-item>
          </el-form>
          <!--列表-->
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="id" label="#ID" width="55" header-align="center" align="center"/>
            <el-table-column header-align="center" align="center" prop="name" label="名称"/>
            <el-table-column header-align="center" align="center" prop="name" label="结束时间">
              <template slot-scope="scope">
                {{ timeChange('Y-m-d H:i:s', scope.row.endTime)}}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="tradesType" label="分类">
              <template slot-scope="scope">
                <span v-if="scope.row.tradesType === 101" type="success">报名</span>
                <span v-else type="info">活动</span>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="tradesType" label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.tradesType === 101" type="success">报名</span>
                <span v-else type="info">活动</span>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="needNum" label="需求">
              <template slot-scope="scope">
                {{ scope.row.needNum }} 家
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="name" label="方式">
              <template slot-scope="scope">
                <span v-if="scope.row.tradesWay === 101" type="success">现金</span>
                <span v-if="scope.row.tradesWay === 201" type="success">面谈</span>
                <span v-if="scope.row.tradesWay === 301" type="success">礼品</span>
                <span v-if="scope.row.tradesWay === 401" type="success">资源</span>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" label="详情">
              <template slot-scope="scope">
                <el-button @click="getDetail(scope.row.fullText)" type='text'>查看详情</el-button>
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
    <!-- 合作详情 -->
    <el-dialog title="合作详情" :visible.sync="dialogTableVisible" width="415px" append-to-body>
      <div v-html="diffDetail"></div>
    </el-dialog>
  </div>
</template>
<script>
import { Base64 } from 'js-base64'
export default {
  props: {
    type: {
      type: 'string'
    }
  },
  data() {
    return {
      tableList: [],
      dialogTableVisible: false,
      listLoading: true,
      isShowEditVisible: false,
      reloadShopList: false,
      total: 0,
      page: 1,
      pageSize: 10,
      diffDetail: ''
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shop.diffTrades.listAll
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, url, true)
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
    },
    success() {
      this.dialogFormVisible = false
      this.getDataList()
    },
    // 点击查看详情
    getDetail(data) {
      this.diffDetail = Base64.decode(data)
      this.dialogTableVisible = true
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    }
  },
  mounted() {
  },
  created() {
    this.getDataList()
  }
}
</script>
<style>

</style>