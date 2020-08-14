<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">电商商品管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native = "addModel" v-if="isAuth('/shopProduct/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="id" label="Id"/>
            <el-table-column header-align="center" align="center" prop="name" label="名称" />
            <el-table-column header-align="center" align="center" prop="sendPrice" label="运费" />
            <el-table-column header-align="center" align="center" prop="explainStr" label="说明" />
            <el-table-column header-align="center" align="center" prop="pddPrice" label="拼多多价" />
            <el-table-column header-align="center" align="center" prop="tbPrice" label="淘宝价" />
            <el-table-column header-align="center" align="center" prop="outAddr" label="发货地址" />
            <el-table-column header-align="center" align="center" prop="resellerText" label="分销文字" />
           <el-table-column prop="poster" label="海报地址" align="center" header-align="center" min-width="">
             <template slot-scope="scope">
               <img :src="scope.row.poster" alt="" style="max-width: 100%; max-height: 100px;">
             </template>
           </el-table-column>
            <el-table-column header-align="center" align="center" prop="resellerPoster" label="分销海报" /> -->
            <el-table-column prop="resellerPoster" label="分销海报" align="center" header-align="center" min-width="">
              <template slot-scope="scope">
                <img :src="scope.row.resellerPoster" alt="" style="max-width: 100%; max-height: 100px;">
              </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="主图" align="center" header-align="center" min-width="">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" alt="" style="max-width: 100%; max-height: 100px;">
              </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center" min-width="80%" style="display: flex;flex-direction: column">
              <template slot-scope="scope">
                <router-link v-if="isAuth('/shopProduct/listByOwnerId')" :to="'/standardsTab/'+scope.row.id">
                  <el-button
                    size="mini"
                    type="text"
                    class="block block-center"
                  >规格</el-button>
                </router-link>
                <router-link v-if="isAuth('/shopProductOrder/orderList')" :to="'/orderManage/'+scope.row.id">
                  <el-button
                    size="mini"
                    type="text"
                  >订单</el-button>
                </router-link>
                <el-button
                  size="mini"
                  type="text"
                  class="block block-center"
                  v-if="isAuth('/shopProduct/mod')"
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/shopProduct/del')"
                  size="mini"
                  type="text"
                  class="block block-center"
                  style="color: red"
                  @click="submitDelete(scope.$index, scope.row)"
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="50%" top="8vh">
      <shopProductForm ref="duihuanForm" v-if="true" :formType="formType" @success="success" @close="dialogFormVisible = !dialogFormVisible"></shopProductForm>
    </el-dialog>
    <el-dialog :visible.sync="DialogImgVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import shopProductForm from './shopProductForm.vue'
export default {
  props: {
    type: {
      type: 'string'
    }
  },
  data() {
    return {
      show: true,
      pass:'',
      isadmin: false,
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      DialogImgVisible: false,
      imgUrl: '',
      dialogTitle: '添加电商商品',
      dialogFormVisible: false,
      formType: 'add'
    }
  },
  components: {
    shopProductForm,
  },
  methods: {
    showChange(e){
      this.show = !e
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shopProduct.list
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
    // 点击删除
    submitDelete(index, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.shopProduct.del
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
      this.dialogTitle = '添加电商商品'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.duihuanForm.init({ data })
      })
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑电商商品'
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
