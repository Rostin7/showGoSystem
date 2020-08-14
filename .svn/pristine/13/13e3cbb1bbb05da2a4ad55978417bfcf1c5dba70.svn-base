<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true">
            <el-form-item>
              <p class="main_header">分销商审批列表</p>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="text" @click="getDataList"><svg-icon icon-class="search"/></el-button>
            </el-form-item>
            <el-form-item style="float: right" label="请输入分销商id或名称">
              <el-input
                placeholder="请输入分销商id或名称"
                v-model="searchName"
                @keydown.enter.prevent.native="getDataList"
                @clear="getDataList"
                clearable>
              </el-input>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <!-- <el-table-column header-align="center" align="center" prop="id" label="Id" width="60"/> -->
            <el-table-column header-align="center" align="center" prop="name" label="分销商" />
            <el-table-column header-align="center" align="center" prop="phoneNum" label="电话号" />
            <!-- <el-table-column header-align="center" align="center" prop="fatherResellerId" label="上级分销商"/> -->
            <el-table-column header-align="center" align="center" prop="bankCardNum" label="上级分销商" >
              <template slot-scope="scope">
                <router-link :to="'/setListSecond/'+scope.row.fatherId" style="color: #1890ff">
                {{ `${scope.row.fatherRealName}(${scope.row.fatherId})`}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="fatherNickName" label="上级昵称" />
            <el-table-column header-align="center" align="center" prop="createdAt" label="申请时间" />
            <el-table-column header-align="center" align="center" prop="bankCardNum" label="当前状态" >
              <template slot-scope="scope">
                {{ scope.row.state === 1 ? '待审核' : scope.row.state === 101 ? '已通过' : '已拒绝'}}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" header-align="center" v-if="isAuth('/resellerApproval/dealResellerJoin')">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.state === 1"
                  @click="getcheck(scope.row, true)">同意
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.state === 1"
                  @click="getcheck(scope.row, false)">拒绝
                </el-button>
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
export default {
  data() {
    return {
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      chooseId: '',
      searchName: ''
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.reseller.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, searchName: this.searchName }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        } else {
          
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
    },
    // 审批
    getcheck(data, state) {
      if (state) {
        this.sendCheckAjax(data.id, true, '')
      } else {
        this.$prompt('请输入拒绝审批理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '请输入拒绝审批理由'
        }).then(({ value }) => {
          this.sendCheckAjax(data.id, false, value)
        })
      }
    },
    // 发送审批请求
    sendCheckAjax(approvalId, agree, refuseRemark) {
      const url = this.apiList.reseller.check
      const formdata = {
        approvalId: approvalId,
        agree: agree,
        refuseRemark: refuseRemark
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(formdata, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '数据提交成功',
            type: 'success'
          })
          this.getDataList()
        }
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
<style>

</style>