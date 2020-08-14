<template>
  <div class="bestChoose">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">限时秒杀管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native="addModel" v-if="isAuth('/activityTop/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="id" label="Id" width="60" align="center" header-align="center" />
            <el-table-column prop="sortCode" label="排序值" width="80" align="center" header-align="center" />
            <el-table-column prop="name" label="活动名称" align="center" header-align="center" />
            <el-table-column prop="showToC" label="当前状态" align="center" header-align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.showStartTime > nowTime" >待展示</el-tag>
                <el-tag v-if="scope.row.showStartTime <= nowTime && scope.row.showEndTime > nowTime" type="success" >展示中</el-tag>
                <el-tag v-if="scope.row.showEndTime <= nowTime" type="info" >已结束</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="beginTime" label="展示时间" align="center" header-align="center" width="300">
              <template slot-scope="scope">
                <p style="margin: 0">开始时间：{{ timeChange('Y-m-d H:i:s', scope.row.showStartTime) }}</p>
                <p style="margin: 0">结束时间：{{ timeChange('Y-m-d H:i:s', scope.row.showEndTime) }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="主图" align="center" header-align="center" width="200">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" alt="" style="max-width: 100%;">
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  class="block block-center"
                  v-if="isAuth('/activityTop/mod')"
                  @click="submitEdit(scope.$index, scope.row)">信息修改</el-button>
                <el-button
                  v-if="isAuth('/activityTop/del')"
                  size="mini"
                  type="text"
                  class="danger block block-center"
                  @click="submitDelete(scope.$index, scope.row)">删除</el-button>
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
     <!-- 点击添加修改的弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="true"  width="550px">
      <choose-form ref="chooseForm" v-if="dialogFormVisible" :formType="formType" @success="success" @close="dialogFormVisible = !dialogFormVisible" />
    </el-dialog>
  </div>
</template>
<script>
import ChooseForm from './bestChoiceForm.vue'
export default {
  data() {
    return{
      tableList: [],
      nowTime: 0,
      dialogFormVisible: false,
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      dialogTitle: '添加限时秒杀',
      formType: 'add',
    }
  },
  components: {
    ChooseForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.activityTop.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, this.apiList.activityTop.list, true)
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
        this.$http({
          url: this.$http.adornUrl(this.apiList.activityTop.del),
          method: 'post',
          data: this.$http.adornData({ topId: data.id }, this.apiList.activityTop.del, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.tableList.splice(index, 1)
            this.total --
          }
        })
      })
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加限时秒杀'
      this.dialogFormVisible = true
    },
    // 提交成功
    success() {
      this.dialogFormVisible = false
      this.getDataList()
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '修改限时秒杀'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.chooseForm.init({ data })
      })
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
  },
  created() {
    this.nowTime = (new Date()).getTime()
    this.getDataList()
  }
}
</script>