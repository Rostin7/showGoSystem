<template>
  <div class="pmSaleDataName">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">{{ activeName }}商家码管理</p></el-form-item>
        <el-form-item>
          <el-button @click.native="addmodule" v-if="isAuth('/thirdCode/adds')"><i class="el-icon-plus"></i></el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <upload-excel :on-success="handleSuccess" v-if="isAuth('/thirdCode/adds')">批量上传</upload-excel>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="text">
            <a href="https://zxlmain.oss-cn-hangzhou.aliyuncs.com/main/b94b109ae1e447fbbd25b682544f16f4提交模板.xlsx">批量上传模板</a>
          </el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="delate" v-if="isAuth('/thirdCode/dels')">批量删除</el-button>
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
        <el-table-column prop="thirdCode" label="商家码" align="center" header-align="center" />
        <el-table-column prop="selled" label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.selled == 0 ? '未使用' : '已兑换'}}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="添加时间" header-align="center" align="center" width="180"/>
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
      activityType: '',
      filterState: '筛选',
    }
  },
  components: {
    UploadExcel
  },
  methods: {
    init (val) {
      this.activityId = val
      this.getOrderInfo()
      this.getDataList()
    },
    handleSelectionChange(val) {
      let str = []
      val.forEach(element => {
        str.push(element.id)
      })
      this.str = str.join(',')
    },
    // 点击添加
    addmodule() {
      this.$prompt('请输入商家码，多个商家码请用,分隔', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        const arr = value.split(',')
        this.submitAdd(this.del(arr))
      }).catch(() => {
          console.log('1111')
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
    // 上传文件成功
    handleSuccess({header, results}) {
      let str = []
      results.forEach(element => {
        str.push(element.value)
      })
      this.submitAdd(this.del(str))
    },
    goBack() {
      window.history.go(-1)
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
        const url = this.apiList.thirdCode.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ ids: this.str }, url, true)
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
    // 添加
    submitAdd(val, state = true) {
      console.log(val)
      const url = this.apiList.thirdCode.add
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ codes: val, checkRe: state, activityId: this.activityId, activityType: this.activityType }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          if (data.code != '222') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getDataList()
          } else {
            this.$confirm('是否略过重复继续添加?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
            ).then(() => {
              this.submitAdd(val, false)
            })
          }
        }
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
    // 获得列表信息
    getDataList() {
      this.listLoading = true
      const url = this.apiList.thirdCode.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ activityId: this.activityId, page: this.page, size: this.pageSize, activityType: this.activityType }, url, true)
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
    }
  },
  created() {
    const url = window.location.href
    let id = []
    if (url.indexOf('/') > -1) {
      id = url.split('/')
    }
    if (id && id.length) {
      this.activityType = id[id.length -1 ]
      this.init(id[id.length -2 ])
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