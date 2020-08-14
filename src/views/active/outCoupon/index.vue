<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">兑换商品管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native = "addModel" v-if="isAuth('/outCoupon/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="id" label="Id" width="60"/>
            <el-table-column header-align="center" align="center" prop="name" label="名称" />
            <el-table-column prop="imgUrl" label="主图" align="center" header-align="center" width="200">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" alt="" style="max-width: 100%; max-height: 100px;">
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="showToC" label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.showToC" type="success" @click.stop="changeState(scope.$index, scope.row)">已上架</el-tag>
                <el-tag v-else type="info" @click.stop="changeState(scope.$index, scope.row)">未上架</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="200" header-align="center" align="center">
              <template slot-scope="scope">
                <router-link v-if="isAuth('/outCouponCode/list')" :to="'/outCouponCodeInfo/'+scope.row.id">
                  <el-button
                    size="mini"
                    type="text"
                  >兑换码管理</el-button>
                </router-link>
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/outCoupon/mod')"
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/outCoupon/del')"
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="550px">
      <outcoupon-form ref="duihuanForm" v-if="true" :formType="formType" @success="success" @close="dialogFormVisible = !dialogFormVisible"></outcoupon-form>
    </el-dialog>
    <el-dialog :visible.sync="DialogImgVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import OutcouponForm from './outCouponDataForm.vue'
export default {
  props: {
    type: {
      type: 'string'
    }
  },
  data() {
    return {
      pass:'',
      isadmin: false,
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      DialogImgVisible: false,
      imgUrl: '',
      dialogTitle: '添加兑换商品',
      dialogFormVisible: false,
      formType: 'add'
    }
  },
  components: {
    OutcouponForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.outCoupon.list
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
    /**
     * 切换上架状态
     * @param {num} index 序号
     * @param {obj} data 列表数据
     */
    changeState(index, data) {
      const state = !data.showToC
      const url = this.apiList.outCoupon.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ showToC: state, id: data.id }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          // this.tableList[index].showToC = state
          this.getDataList()
        }
      })
    },
    // 点击删除
    submitDelete(index, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.outCoupon.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列
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
      this.dialogTitle = '添加兑换商品'
      this.dialogFormVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑兑换商品'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.duihuanForm.init({ data })
      })
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
  created() {
    this.getDataList()
  }
}
</script>
<style>

</style>
