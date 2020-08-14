<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <p class="main_header">提现申请列表</p>
          <!--列表-->
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="id" label="Id" width="60"/>
            <el-table-column header-align="center" align="center" prop="name" label="店铺名称" />
            <el-table-column header-align="center" align="center" prop="num" label="店铺logo">
              <template slot-scope="scope" width="60">
                <img :src="scope.row.logoImgUrl" style="width: 45px; height: 45px; border-radius: 100%">
              </template>
            </el-table-column>
            <!-- <el-table-column header-align="center" align="center" prop="logDesc" label="简述" /> -->
            <el-table-column header-align="center" align="center" prop="bankCardPersonName" label="提现人">
              <template slot-scope="scope">
                {{ scope.row.moneyOutType === 1 ? scope.row.bankCardPersonName : scope.row.moneyOutType === 101 ? scope.row.wxRealName : scope.row.moneyOutType === 201 ? scope.row.aliRealName : ''}}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="num" label="提现类型">
              <template slot-scope="scope">
                {{ scope.row.moneyOutType === 1 ? '银行卡提现' : scope.row.moneyOutType === 101 ? '微信提现' : scope.row.moneyOutType === 201 ? '支付宝提现' : ''}}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="num" label="提现金额">
              <template slot-scope="scope">
                {{ scope.row.num/100 }}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="num" label="实到金额">
              <template slot-scope="scope">
                {{ scope.row.realOutNum / 100  }}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="bankCardNum" label="提现账户" >
              <template slot-scope="scope">
                {{ scope.row.moneyOutType === 1 ? scope.row.bankCardNum : scope.row.moneyOutType === 101 ? '' : scope.row.moneyOutType === 201 ? scope.row.aliAccount : ''}}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="createdAt" label="申请时间" />
            <el-table-column header-align="center" align="center" prop="num" label="打款状态">
              <template slot-scope="scope">
                <span v-if="scope.row.moneyOutState === 1">未打款</span>
                <span v-if="scope.row.moneyOutState === 101">打款中</span>
                <span v-if="scope.row.moneyOutState === 201">已打款</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" header-align="center">
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
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.state === 201"
                >
                  已拒绝
                </el-button>
                <!-- 人工打款 -->
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.state === 101 && scope.row.moneyOutState === 101"
                  @click="getmoneyout(scope.row, true)">确认打款
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.state === 101 && scope.row.moneyOutState === 101"
                  @click="getmoneyout(scope.row, false)">拒绝打款
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.state === 101 && scope.row.moneyOutState === 201"
                >
                  已打款
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
    <el-dialog title="上传打款凭证" :modal="true" :visible.sync="voucherVisiter">
      <el-form @submit.native.prevent>
        <el-form-item label="打款凭证">
          <upload @fileChange="chooseImg" class="avatar-uploader" style="width: 172px;">
            <img v-if="voucherimgUrl" :src="voucherimgUrl" class="avatar" style="max-width: 172px;">
            <i v-else class="el-icon-plus"></i>
          </upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="this.voucherVisiter = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import upload from "../../utils/proupload.vue"
export default {
  data() {
    return {
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      voucherVisiter: false,
      voucherimgUrl: '',
      chooseId: ''
    }
  },
  components: {
    upload
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.moneyOut.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, url, true)
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
        if (data.moneyOutType === 1) {
          this.sendCheckAjax(data.id, true, true)
        } else {
          this.sendCheckAjax(data.id, true, false)
        }
      } else {
        this.$prompt('请输入拒绝提现理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '请输入拒绝提现理由'
      }).then(({ value }) => {
        this.sendCheckAjax(data.id, false, false, value)
      })
      }
    },
    // 发送审批请求
    sendCheckAjax(approvalId, agree, personOut, refuseRemark) {
      const url = this.apiList.moneyOut.edit
      const formdata = {
        approvalId: approvalId,
        agree: agree,
        personOut: personOut,
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
    },
    // 打款
    getmoneyout(data, checked) {
      this.chooseId = data.id
      if (checked) {
        this.$confirm('请确认您的转账操作已完成, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
        ).then(() => {
          this.voucherVisiter = true
        })
      } else {
        this.$confirm('此操作将拒绝为商户打款, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
        ).then(() => {
          const url = this.apiList.moneyOut.moneyOutFail
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData({ approvalId: this.chooseId  }, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({
                message: '数据提交成功',
                type: 'success'
              })
              this.getDataList()
            }
          })
        })
      }
    },
    chooseImg(data) {
      this.voucherimgUrl = data
    },
    onSubmit() {
      const url = this.apiList.moneyOut.check
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ approvalId: this.chooseId, bankMoneyOutProof: this.voucherimgUrl }, url, true)
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