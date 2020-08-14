<template>
  <div class="app-container">
    <el-card shadow="hover">
      <!-- <el-button type="primary" @click="handleAddRole">添加新角色</el-button> -->
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item style="margin-bottom: 0"><p class="main_header">角色管理</p></el-form-item>
        <el-form-item>
          <el-button @click.native="handleAddRole" v-if="isAuth('/role/add')"><i class="el-icon-plus"></i></el-button>
        </el-form-item>
      </el-form>
      <el-table :data="rolesList">
        <el-table-column align="center" label="角色ID" width="80">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色名" width="220">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="描述">
          <template slot-scope="scope">
            {{ scope.row.roleDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="signEdit(scope)" v-if="isAuth('/api/listRoleApi')">权限管理</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="text" class="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色 -->
      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改':'添加'" width="600px" :close-on-click-modal="false">
        <el-form @submit.native.prevent :model="dataFrom" label-width="80px" label-position="left">
          <el-form-item label="名称">
            <el-input v-model="dataFrom.name" placeholder="角色名称" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="dataFrom.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="角色描述"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirmRole">确定</el-button>
        </div>
      </el-dialog>
      <!-- 角色对应权限 -->
      <el-dialog :visible.sync="apiVisible" title="权限管理" width="700px" :close-on-click-modal="false">
        <api-list v-if="apiVisible" :roleId="achiveId" @close="apiVisible= false" />
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import path from 'path'
// import ApiList from "./apiList"
import ApiList from "./apiNodeCheck"
import { deepClone } from '@/utils'
export default {
  data() {
    return {
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      page: 1,
      pages: 0,
      size: 1000,
      achiveId: null,
      apiVisible: false,
      dataFrom: {
        name: '',
        description: ''
      }
    }
  },
  components: {
    ApiList
  },
  mounted() {
    console.log('请求数据')
    this.getDataList()
  },
  methods: {
    getDataList() {
      const url = this.apiList.role.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.size }, url, true)
      }).then(({ data }) => {
        console.log('数据请求成功')
        console.log(data)
        if (data.result) {
          this.rolesList = data.data.records
        }
      })
    },
    // 设置权限
    signEdit(scope) {
      this.achiveId = scope.row.id
      this.apiVisible = true
    },
    handleAddRole() {
      this.dialogType = 'add'
      this.dataFrom.name = ''
      this.dataFrom.description = ''
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.achiveId = scope.row.id
      this.dataFrom.name = scope.row.roleName
      this.dataFrom.description = scope.row.roleDesc
    },
    handleDelete(scope) {
      this.achiveId = scope.row.id
      this.$confirm('确认删除?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(async() => {
        const url = this.apiList.role.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ id: this.achiveId }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.rolesList.splice(scope.$index, 1)
          }
        })
      }).catch(err => { console.error(err) })
    },
    // 点击提交
    confirmRole() {
      if(!this.dataFrom.name) {
        return this.$message({
         type: 'warning',
          message: '请输入您要创建的角色'
        })
      }
      const isEdit = this.dialogType === 'edit'
      let url = this.apiList.role.add
      let formdata = {
        roleName: this.dataFrom.name,
        describe: this.dataFrom.description
      }
      if (isEdit) {
        url = this.apiList.role.edit
        formdata.id = this.achiveId
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(formdata, url, true)
      }).then(({ data }) => {
        this.dialogVisible = false
        if (data.result) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.getDataList()
        }
      })
    }
  },
 
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
