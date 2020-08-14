<template>
  <div class="module_moduleType">
    <el-row :gutter="20">
      <el-form @submit.native.prevent :inline="true" v-if="!cannotChange">
        <el-form-item >
          <el-input placeholder="关键词" v-model="searchData.name"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click.native="search"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click.native = "addModel()">添加模块类型</el-button>
        </el-form-item>
        <el-form-item>
          <add-admin :addAdmin="addAdmin"></add-admin>
        </el-form-item>
      </el-form>
      <el-col :span="24">
        <el-card>
          <!-- 表格 -->
          <el-table :data="dataList" v-loading="listLoading" border element-loading-text="拼命加载中">
            <el-table-column  prop="moduleName" label="名称"></el-table-column>
            <el-table-column  prop="moduleDesc" label="描述"></el-table-column>
            <el-table-column  prop="moduleType" label="类型">
            </el-table-column>
            <el-table-column label="操作" width="260">
              <template slot-scope="scope">
                  <el-button
                    v-if="!cannotChange"
                    size="mini"
                    type="primary"
                    @click="addModel(scope.$index, scope.row)">修改</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="moduleTypeApi(scope.$index, scope.row)">权限</el-button>
                  <el-button
                    v-if="!cannotChange"
                    size="mini"
                    type="danger"
                    @click="submitDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 点击添加修改的弹出 -->
    <el-dialog title="编辑模块类型" :visible.sync="dialogFormVisible" :modal="true">
      <el-form :model="modelForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="modelForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="modelForm.desc" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="类型" v-if="isEdit" :label-width="formLabelWidth">
          <el-radio-group v-model="modelForm.bigType">
            <el-radio :label="201">其他管理员类型</el-radio>
            <el-radio :label="1">系统管理员类型</el-radio>
            <el-radio :label="101">城市管理员类型</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 权限管理 -->
    <el-dialog title="权限管理" :visible.sync="dialogmoduleTypeListVisible" :modal="true" @close="removeModule">
      <module-type :moduleTypeId="moduleTypeId" v-if="isDialogmoduleTypeList"></module-type>
    </el-dialog>
  </div>
</template>
<script>
// 引入组件并调用
import AddAdmin from '../rooter/index'
import ModuleType from './moduleTypeApi'
export default {
  data() {
    return {
      addAdmin: '创建最高管理员',
      formLabelWidth: '120px',
      dataList: [],
      modelForm: {
        name: '',
        desc: ''
      },
      cannotChange: false,
      listLoading: true,
      dialogFormVisible: false,
      dialogmoduleTypeListVisible: false,
      moduleTypeId: -1, // 当前点击的模块id
      isDialogmoduleTypeList: false,
      isEdit: false,
      searchData: {
        name: ''
      },
      deleteVisible: false,
      page: 1,
      size: 10,
      total: 0
    }
  },
  // 注册组件
  components: {
    AddAdmin,
    ModuleType
  },
  methods: {
    // 初始化表格
    getDataList() {
      this.listLoading = true
      const listData = {
        page: this.page,
        size: this.size,
        searchJson: this.searchData.name
      }
      this.$http({
        url: this.$http.adornUrl(this.apiList.moduleType.list),
        method: 'post',
        data: this.$http.adornData(listData, this.apiList.moduleType.list, true)
      }).then(({ data }) => {
        if (data.result) {
          // 数据获取成功
          this.dataList = data.data
          this.total = Number(data.data.total)
        } else {
          // 弹出错误提示
          // this.$message({ message: data.msg, type: 'warning' })
          // this.$store.dispatch('LogOut')
        }
        this.listLoading = false
      }).catch(({ data }) => {
        console.log(data)
      })
      // 重置搜索值
      this.searchData.name = ''
    },
    // 修改每一页条数
    changeSize(val) {
      this.size = val
      this.page = 1
      this.getDataList()
    },
    // 修改页码
    changeCurrent(val) {
      this.page = val
      this.getDataList()
    },
    // 点击添加
    addModel(index, data) {
      this.isEdit = false
      // 判断点击的是修改还是添加
      console.log(data)
      if (data) {
        this.isEdit = true
        this.modelForm = {
          id: data.id,
          name: data.moduleName,
          desc: data.moduleDesc,
          bigType: data.bigType
        }
      } else {
        this.modelForm = {
          name: '',
          desc: '',
          bigType: 201
        }
      }
      this.dialogFormVisible = true
    },
    // 点击提交
    submitFormAdd() {
      let url
      if (this.modelForm.id) {
        url = this.apiList.moduleType.edit
      } else {
        url = this.apiList.moduleType.add
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(this.modelForm, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({ type: 'success', message: '添加成功' })
          this.getDataList()
        } else {
          // this.$message({ message: data.msg, type: 'warning' })
          // this.$store.dispatch('LogOut')
        }
        // 关闭弹出层
        this.dialogFormVisible = false
      })
    },
    // 点击搜索
    search() {
      this.page = 1
      this.getDataList()
    },
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.moduleType.del),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, this.apiList.moduleType.del, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.dataList.splice(index, 1)
          } else {
            // this.$message({ message: data.msg, type: 'warning' })
            // this.$store.dispatch('LogOut')
          }
        })
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    addRouter() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.rooter.get),
        method: 'post',
        data: this.$http.adornData('', this.apiList.rooter.get, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({ type: 'success', message: '添加成功' })
        }
      })
    },
    removeModule() {
      this.isDialogmoduleTypeList = false
    },
    // 点击权限管理注销组件修改父组件传值，然后重新加载组件
    moduleTypeApi(index, data) {
      this.moduleTypeId = data.moduleType
      this.isDialogmoduleTypeList = true
      this.$nextTick(() => {
        this.dialogmoduleTypeListVisible = true
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
<style lang="">
  
</style>