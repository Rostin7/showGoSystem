<template>
  <div class="channelList">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 0"><p class="main_header">订单列表</p></el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="createdAt" label="时间"  align="center" header-align="center" />
            <el-table-column prop="orderTitle" label="商品信息"  align="center" header-align="center" />
            <el-table-column prop="price" label="单价*数量" align="center" header-align="center">
              <template slot-scope="scope">
                {{ `${Math.round(scope.row.price / 100)}*${scope.row.num}` }}
              </template>
            </el-table-column>
            <el-table-column prop="price" label="实付金额" align="center" header-align="center">
              <template slot-scope="scope">
                {{ Math.round(scope.row.price / 100)*scope.row.num }}
              </template>
            </el-table-column>
            
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      channelId: '',
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    getDataList() {
      const url = this.apiList.saleChannel.detail
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, channelId: this.channelId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
  },
  created() {
    // 获得id
    const url = window.location.href
    let id = []
    if (url.indexOf('/') > -1) {
      id = url.split('/')
    }
    if (id && id.length) {
      this.channelId = id[id.length -1 ]
      this.getDataList()
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