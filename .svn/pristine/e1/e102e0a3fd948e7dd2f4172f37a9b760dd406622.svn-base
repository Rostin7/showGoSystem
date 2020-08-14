<template>
  <div class="app-container">
    <!--列表-->
    <el-form inline @submit.native.prevent>
      <el-form-item>
        <el-select v-model="platform" placeholder="请选择" @change="changeType">
          <el-option label="头条小程序" value="100"></el-option>
          <el-option label="微信小程序" value="106"></el-option>
          <el-option label="appC端 android" value="101"></el-option>
          <el-option label="appC端 ios" value="102"></el-option>
          <el-option label="appB端 android" value="103"></el-option>
          <el-option label="appB端 iod" value="104"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click.native="addModel" >添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
      <el-table-column prop="id" label="#id" width="85" sortable>
      </el-table-column>
      <el-table-column prop="versionName" label="版本名称">
      </el-table-column>
      <el-table-column prop="versionCode" label="版本号">
      </el-table-column>
      <el-table-column prop="hold" label="当前状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.hold" @click="check(scope.row.id, true, scope.$index)">开启</el-tag>
          <el-tag v-else @click="check(scope.row.id, false)">关闭</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination layout="total, prev, pager, next"
      background
      :page-size="pageSize"
      :total="total"
      style="text-align:center;"
      @current-change="handleCurrentChange"
      >
    </el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="700px">
      <app-form ref="appForm" v-if="dialogFormVisible" :formType="formType" @success="success" @close="dialogFormVisible = !dialogFormVisible" ></app-form>
    </el-dialog>
  </div>
</template>
<script>
import AppForm from './appForm.vue'
export default {
  data() {
    return {
      platform: '100',
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
    AppForm
  },
  methods: {
    changeType() {
      this.page = 1
      this.getDataList()
    },
    check(id, type, index) {
      const url = this.apiList.config.app.version.check
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ hold: type, id: id }, url, true)
      }).then(({ data }) => {
        if(data.result) {
          console.log(index)
          this.tableList[index].hold = !type
        }
      })
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.config.app.version.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, platform: this.platform }, url, true)
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
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '上线新版本'
      this.dialogFormVisible = true
    },
    success() {
      this.dialogFormVisible = false
      this.getDataList()
    },
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