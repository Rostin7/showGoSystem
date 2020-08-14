<template>
  <div class="sysNotice app-container">
    <el-card shadow="hover">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form @submit.native.prevent :inline="true">
          <!-- <el-form-item>
            <city-list @chooseCity="changeData"></city-list>
          </el-form-item> -->
          <el-form-item>
            <el-button @click.native = "addModel" v-if="isAuth('/sysNotice/add')">添加公告</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 数据表格 -->
      
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column  prop="id" label="#ID"></el-table-column>
        <el-table-column  prop="title" label="公告标题"></el-table-column>
        <el-table-column  prop="createdAt" label="添加时间"></el-table-column>
        <el-table-column  prop="toType" label="类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.toType === 0">全体</el-tag>
            <el-tag v-if="scope.row.toType === 1">城市端</el-tag>
            <el-tag v-if="scope.row.toType === 2">商户端</el-tag>
            <el-tag v-if="scope.row.toType === 3">用户端</el-tag>
          </template>
        </el-table-column>
        <el-table-column  prop="content" label="详细内容">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p v-text="scope.row.content"/>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">公告详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              v-if="isAuth('/sysNotice/mod')"
              size="mini"
              type="primary"
              @click="submitEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              v-if="isAuth('/sysNotice/del')"
              size="mini"
              type="danger"
              @click="submitDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 表格分页 -->
      <el-pagination
        layout="total, prev, pager, next"
        background
        :page-size="pageSize"
        :total="total"
        style="text-align:center;"
        @current-change="handleCurrentChange"
      />
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="600px">
        <sysnotice-form ref="sysNoticeForm" v-if="true" :formType="formType" @success="success" @close="dialogFormVisible = !dialogFormVisible"></sysNotice-form>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import SysnoticeForm from './sysNoticeForm.vue'
export default {
  data() {
    return{
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      dialogTitle: '添加促销活动',
      dialogFormVisible: false,
      formType: 'add'
    }
  },
  components: {
    SysnoticeForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.sysNotice.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, this.apiList.sysNotice.list, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        } else {
          // 请求失败
          // this.$message.error(data.msg)
        }
        this.listLoading = false
      }).catch(() => {
        // this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    // 点击删除
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.sysNotice.del),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, this.apiList.sysNotice.del, true)
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
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加公告'
      this.dialogFormVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑公告'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.sysNoticeForm.init({ data })
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
  mounted() {
    this.getDataList()
  }
}
</script>
<style lang="scss">
  
</style>