<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">积分商城管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native = "addModel" v-if="isAuth('/integra/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="title" label="名称"/>
            <el-table-column prop="img" label="主图" header-align="center" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <img :src="scope.row.img" alt="" style="max-width: 400px;">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ '查看详情' }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" header-align="center" align="center"> 
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/integra/update')"
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/integra/delete')"
                  size="mini"
                  type="text"
                  @click="submitDelete(scope.$index, scope.row)"
                  class="danger"
                  >删除</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="700px">
      <integra-form ref="integraForm" v-if="dialogFormVisible" :integraId="chooseId" :formType="formType" @success="success" @close="dialogFormVisible = !dialogFormVisible" />       
    </el-dialog>
    <el-dialog :visible.sync="DialogImgVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import integraForm from './form.vue'
export default {
  data() {
    return {
      chooseId: '',
      tableList: [],
      listLoading: true,
      isShowEditVisible: false,
      reloadShopList: false,
      total: 0,
      page: 1,
      pageSize: 10,
      DialogImgVisible: false,
      imgUrl: '',
      dialogTitle: '添加',
      dialogFormVisible: false,
      formType: 'add'
    }
  },
  components: {
    integraForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.integra.list
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
        this.listLoading = false
      })
    },
    // 点击删除
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.integra.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ integraId: data.id }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({ type: 'success', message: '删除成功' })
            this.tableList.splice(index, 1)
            this.total --
          } else {
          }
        })
      })
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加'
      this.dialogFormVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑'
      this.chooseId = data.id
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs.couponForm.init({ data })
      // })
    },
    success() {
      this.dialogFormVisible = false
      this.getDataList()
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    }
  },
  mounted() {
    // this.$
  },
  created() {
    this.getDataList()
  }
}
</script>
<style>

</style>