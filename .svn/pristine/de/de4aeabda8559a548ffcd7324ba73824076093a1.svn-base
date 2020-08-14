<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true">
            <el-form-item>
              <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">{{ distributorName }}</p></el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="id" label="Id" width="60"/>
            <el-table-column header-align="center" align="center" prop="realName" label="姓名" />
            <el-table-column header-align="center" align="center" prop="nickName" label="微信昵称" />
            <el-table-column header-align="center" align="center" prop="phoneNum" label="电话" />
            <el-table-column header-align="center" align="center" prop="fatherId" label="分销上级">
              <template slot-scope="scope" width="60">
                {{ scope.row.fatherId !== 0 ? `${scope.row.fatherRealName}(${scope.row.fatherId})` : '平台' }}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="fatherNickName" label="上级昵称" />
            <el-table-column header-align="center" align="center" prop="fatherCount" label="上级抽成">

            </el-table-column>
            <!-- <el-table-column header-align="center" align="center" prop="firstCount" label="分销商抽成"></el-table-column> -->
            <el-table-column header-align="center" align="center" prop="num" label="分销商头像">
              <template slot-scope="scope" width="60">
                <img :src="scope.row.avatar" style="width: 45px; height: 45px; border-radius: 100%">
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="createdAt" label="申请时间" />
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
export default {
  data() {
    return {
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      id: 0,
      pageSize: 10,
      chooseId: '',
      searchName: '',
      distributorName: ''
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    init(val) {
      this.id = val
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.reseller.listNext
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, searchName: this.searchName,  fatherId: this.id }, url, true)
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
    // 分页组件切换
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
<style>

</style>