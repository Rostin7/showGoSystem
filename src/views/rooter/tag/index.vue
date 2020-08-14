<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button @click="showInput" v-if="isAuth('/shopTag/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <!--列表-->
          <el-table :data="dataList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="id" label="Id" width="60"/>
            <el-table-column header-align="center" align="center" prop="name" label="名称" />
            
            <el-table-column prop="color" label="颜色" header-align="center" align="center">
              <template slot-scope="scope">
                <span :style="getcolor(scope.row.color)">{{ scope.row.color }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" header-align="center" align="center"> 
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/shopTag/mod')"
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/shopTag/del')"
                  size="mini"
                  type="text"
                  @click="handleClose(scope.row.id)"
                  class="danger">删除</el-button>
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
    <el-dialog :visible.sync="inputVisible" width="500px">
      <el-form v-if="inputVisible" @submit.native.prevent :inline="false"  label-width="110px" class="demo-ruleForm">
        <el-form-item label="名称" >
          <el-input v-model="name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="color"></el-color-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即提交</el-button>
          <el-button @click="inputVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
      inputVisible: false,
      type: 'add',
      name: '',
      color: '',
      more: true,
      listLoading: false,
      page: 1,
      pageSize: 10,
      total: 0,
      tagId: 0
    }
  },
  methods: {
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    getcolor(color) {
      if(!color) {
        return {}
      }
      return { 'color': color }
    },
    // 删除
    handleClose(tagId) {
      // 删除标签
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.tag.del),
          method: 'post',
          data: this.$http.adornData({ id: tagId }, this.apiList.tag.del, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.dataList.splice(this.dataList.findIndex(v => v.id === tagId), 1)
          } else {
            // this.$message({ message: data.msg, type: 'warning' })
            // this.$store.dispatch('LogOut')
          }
        })
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    // 展示文本框
    showInput() {
      this.type = "add"
      this.inputVisible = true
    },
    submitForm() {
      if (this.type == 'edit') {
        this.changeTag()
        return
      }
      const url = this.apiList.tag.add
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ name: this.name, color: this.color }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getDataList()
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getDataList() {
      // 获得当前标签
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.tag.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, this.apiList.tag.list, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
    },
    submitEdit(index, data) {
      this.tagId = data.id
      this.inputVisible = true
      this.type = "edit"
    },
    // 点击修改
    changeTag(data) {
      const url = this.apiList.tag.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: this.tagId, name: this.name, color: this.color }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getDataList()
          this.inputVisible = false
        }
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
