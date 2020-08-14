<template>
  <div class="groupBuy">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="addModel" v-if="isAuth('/groupBuyItem/add')" ><i class="el-icon-plus"></i></el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column prop="id" label="Id" width="60" align="center" header-align="center" />
        <!-- <el-table-column prop="name" label="名称" /> -->
        <el-table-column prop="checkToShow" label="默认信息" align="center" header-align="center"> 
          <template slot-scope="scope">
            <!-- {{scope.row.checkToShow}} -->
            <el-tag v-if="scope.row.checkToShow">默认信息</el-tag>
            <el-tag v-else>子项信息</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalNum" label="总数" align="center" header-align="center"/>
        <el-table-column prop="price" label="价格" align="center" header-align="center"> 
          <template slot-scope="scope">
            {{scope.row.price / 100}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="isAuth('/groupBuyItem/checkToShow')"
              @click="submitCheck(scope.$index, scope.row)">
              {{ scope.row.checkToShow ? '取消' : '展示' }}
            </el-button>
            <el-button
              size="mini"
              type="text"
              v-if="isAuth('/groupBuyItem/mod')"
              @click="submitEdit(scope.$index, scope.row)">
              修改
            </el-button>
            <el-button
              v-if="isAuth('/groupBuyItem/del')"
              size="mini"
              type="text"
              class="danger"
              @click="submitDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="40%">
      <item-form
        v-if="true"
        ref="itemForm"
        :form_type="formType"
        @success="success"
        @close="dialogFormVisible = !dialogFormVisible"
      />
    </el-dialog>
  </div>
</template>
<script>
import ItemForm from './itemForm.vue'
export default {
  data() {
    return {
      groupBuyId: '',
      listLoading: false,
      formType: 'add',
      dialogTitle: '新增分组',
      dialogFormVisible: false,
      tableList: []
    }
  },
  components: {
    ItemForm
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    init (val) {
      this.groupBuyId = val
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shop.groupBuy.child.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ groupBuyId: this.groupBuyId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data
          this.total = data.data.total
        } else {
          // 请求失败
          // this.$message.error(data.msg)
        }
        this.listLoading = false
      }).catch(() => {
        this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加活动分组'
      this.dialogFormVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑活动分组'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.itemForm.init({ data })
      })
    },
    // 点击设为默认
    submitCheck(_idx, data) {
      const index = this.tableList.findIndex(item => item.checkToShow === true )
      console.log(index)
      console.log(_idx)
      console.log(index === _idx)
      if (index === _idx && index !== -1) {
        return this.$message({ type: 'success', message: '提交成功' })
      } else {
        const url = this.apiList.shop.groupBuy.checked
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ groupBuyId: this.groupBuyId, groupBuyItemId: data.id }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({ type: 'success', message: '提交成功' })
            this.tableList[_idx].checkToShow = true
            if (index !== -1) {
              this.tableList[index].checkToShow = false
            }
          } else {
            // this.$message({ message: data.msg, type: 'warning' })
            // this.$store.dispatch('LogOut')
          }
        })
      }
    },
    // 点击删除
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.shop.groupBuy.child.del),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, this.apiList.shop.groupBuy.child.del, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.tableList.splice(index, 1)
            this.total --
          }
        })
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    success() {
      this.dialogFormVisible = false
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
<style lang="scss">
  
</style>