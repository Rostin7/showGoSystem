<template>
  <div class="pmSaleDataName">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">{{ activeName }}兑换码管理</p></el-form-item>
        <el-form-item>
          <el-button @click.native="addmodule" v-if="isAuth('/thirdCode/adds')"><i class="el-icon-plus"></i></el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="delate" v-if="isAuth('/thirdCode/dels')">批量删除</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="download" type='text' v-if="isAuth('/enterName/excelOut')">
            导出<i class="el-icon-download"/>
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableList" 
        v-loading="listLoading" 
        @selection-change="handleSelectionChange"
        element-loading-text="拼命加载中"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="序号" width="60" align="center" header-align="center" />
        <el-table-column prop="codeKey" label="商家码" align="center" header-align="center" />
        <el-table-column prop="createdAt" label="创建时间" align="center" header-align="center" />
        <el-table-column prop="useState" label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.useState == 1 ? '待使用' : '已使用'}}
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        layout="total, prev, pager, next"
        background
        :page-size="pageSize"
        :total="total"
        style="text-align:center;"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
import UploadExcel from '../../utils/uploadExcel'
export default {
  data() {
    return {
      dataList: [],
      activityId: '',
      listLoading: false,
      tableList: [],
      activeName: '',
      pageSize: 10,
      total: 0,
      page: 1,
      filterState: '筛选',
    }
  },
  components: {
    UploadExcel
  },
  methods: {
    init (val) {
      this.activityId = val
      // this.getOrderInfo()
      this.getDataList()
    },
    
    goBack() {
      window.history.go(-1)
    },
    // 获得列表信息
    getDataList() {
      this.listLoading = true
      const url = this.apiList.outCoupon.code.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ outCouponId: this.activityId, page: this.page, size: this.pageSize }, url, true)
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
      })
    },
    // 分页
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    handleSelectionChange(val) {
      let str = []
      val.forEach(element => {
        str.push(element.id)
      })
      this.str = str.join(',')
    },
    // 文件下载
    download() {
      const url = this.apiList.outCoupon.code.downLoad
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({  outCouponId: this.activityId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.url = data.data
          window.open(this.url)
        }
      })
    },
    addmodule() {
      this.$prompt('请输入添加的数量', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|([0-9]*))$/,
        inputErrorMessage: '添加的数量输入错误'
      }).then(({ value }) => {
        if(Number(value) > 100) {
          return this.$message({
            type: 'info',
            message: '一次添加的数量最大值为100'
          })
        }
        this.submitAdd(value)
      }).catch(() => {
          
      })
    },
    // 添加
    submitAdd(val) {
      const url = this.apiList.outCoupon.code.add
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ num: val, outCouponId: this.activityId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getDataList()
        }
      })
    },
    // 数组删除重复
    del(arr) {
      let length = arr.length
      console.log(length)
      for( let i=0;i<arr.length;i++) {
        for(let j=i+1;j<arr.length;j++) {
          if (arr[i]==arr[j]) {
            arr.splice(j,1)
            i--
          }
        }
      }
      if(arr.length != length) {
        this.$notify({
          title: '筛选成功',
          message: `成功过滤掉${length - arr.length}条重复数据`,
          position: 'bottom-right'
        });
      }
      return arr.join(',')
    },
    // 删除
    delate() {
      if(!this.str) {
        return this.$message({
          message: '请选择您要删除的数据',
          type: 'warning'
        })
      }
      this.$confirm('此操作将删除商户码数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.outCoupon.code.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ ids: this.str, outCouponId: this.activityId }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getDataList()
          }
        })
      })
    },
    // 获得订单名称
    getOrderInfo() {
      const url = this.apiList.shop.pmSale.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: this.activityId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.activeName = data.data.name
        }
      })
    },
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
<style lang="scss">
.pmSaleDataName{
  .el-dialog{
    border-radius: 10px;
    .el-dialog__header{
      border-radius: 10px 10px 0 0;
      background: #E8F1FF;
      .dialogTitle{
        color: #5F8FD9;
        font-size: 18px;
      }
    }
    .el-dialog__body{
      padding: 60px 80px;
    }
    .dialogBody{
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      border-bottom: solid 1px #D7D7D7;
      p{
        width: 100%;
        margin: 0;
        // height: 58px;
        font-size: 18px;
        line-height: 58px;
        border-top: solid 1px #D7D7D7;
        span{
          width: 200px;
          padding-left: 15px;
          font-weight: 600;
          display: inline-block;
          vertical-align: top;
          height: 100%;
        }
        span:nth-child(2){
          width: auto;
          max-width: 150px;
          font-weight: 400;
          vertical-align: bottom;
        }
      }
    }
    .dialogFooter{
      width: 108px;
      height: 38px;
      line-height: 38px;
      margin: auto;
      text-align: center;
      background: #4F93FE;
      color: #fff;
      border-radius: 38px;
      cursor: pointer;
    }
  }
}
</style>