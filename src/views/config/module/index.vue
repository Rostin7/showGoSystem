<template>
  <div class="configModule app-container">
  <!-- 栅格 -->
    <el-row :gutter="20">
      <el-col :span="24" style="margin-bottom:15px">
        <el-button @click.native = "addModel">添加模块</el-button>
      </el-col>
      <el-col :span="8">
        <el-card class="modelList">
          <li v-for="(item, index) in dataList" :class = "isactive == index ? 'chooseIt' : ''" :key="item">
            <el-button size="medium" type="text" @click.native="getDetail(item, index)">{{item}}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </li>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
            <div slot="header" v-if="isDetail">
              <span>模块名称：{{detail.name}}</span>
              <el-button style="float: right; padding-top: 3px;margin-left: 15px;color: #f56c6c; dispaly:inline-block" size="mini" type="text" @click.native="delModel(detail.name)">删除</el-button>
              <el-button style="float: right; padding: 3px 0" type="text" @click.native="addIps">添加白名单</el-button>
            </div>
            <li class="item text">token: {{detail.token}}</li>
            <li class="item text">lastToken: {{detail.lastToken}}</li>
            <li class="item text">lastTokenTime: {{detail.lastTokenTime}}</li>
            <li class="item text">moduleKey: {{detail.moduleKey}}</li>
            <li class="item text">moduleSe: {{detail.moduleSe}}</li>
            <!-- 表格 -->
            <el-table :data="detail.ips" border>
              <el-table-column prop="ip" label="ip" sortable>
              </el-table-column>
               <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 弹出层 -->
    <el-dialog title="管理模块白名单" :visible.sync="dialogFormAddVisible" :modal="true">
      <el-form @submit.native.prevent :model="modelForm">
        <el-form-item label="模块名称" :label-width="formLabelWidth">
          <el-input v-model="modelForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块ip" :label-width="formLabelWidth">
          <el-input v-model="modelForm.ip" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
      isactive: -1,
      listLoading: true,
      modelName: '',
      isDetail: false,
      detail: {
        name: '',
        token: '',
        moduleSe: '',
        moduleKey: '',
        lastToken: '',
        lastTokenTime: '',
        ips: []
      },
      formLabelWidth: '120px',
      dialogFormAddVisible: false,
      modelForm: {
        name: '',
        ip: ''
      }
    }
  },
  methods: {
    getdataList() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.config.listKey),
        method: 'post',
        data: this.$http.adornData('', this.apiList.config.listKey, true)
      }).then(({ data }) => {
        if (data.result) {
          // 数据获取成功
          this.dataList = data.data
        }
      })
    },
    getDetail(item, index) {
      this.isactive = index
      this.modelName = item
      // 获得详情并填充
      this.$http({
        url: this.$http.adornUrl(this.apiList.config.detailKey),
        method: 'post',
        data: this.$http.adornData({ key: this.modelName }, this.apiList.config.detailKey, true)
      }).then(({ data }) => {
        if (data.result) {
          // 数据获取成功
          // 修改表格数据
          const ips = data.data.ips
          ips.forEach((item, index, arr) => {
            arr[index] = { ip: item }
          })
          console.log(ips)
          this.detail = data.data
          this.isDetail = true
        }
      })
    },
    // 点击添加模块
    addModel() {
      this.modelForm = {
        name: '',
        ip: ''
      }
      this.dialogFormAddVisible = true
    },
    // 确认添加
    confirmAdd() {
      if (!(this.modelForm.name && this.modelForm.ip)) { return this.$message('模块名和ip为必填项') }
      // 修改接口数据
      let Formdata = {
        moduleName: this.modelForm.name,
        ip: this.modelForm.ip
      }
      this.$http({
        url: this.$http.adornUrl(this.apiList.config.addKey),
        method: 'post',
        data: this.$http.adornData(Formdata, this.apiList.config.addKey, true)
      }).then(({ data }) => {
        // 移除内存空间
        Formdata = null
        if (data.result) {
          // 添加成功
          this.$message({ type: 'success', message: '添加成功' })
          this.dialogFormAddVisible = false
          // 数据列表填充新的项
          this.dataList.push(this.modelForm.name)
        } else {
          // this.$message(data.desc)
        }
      })
    },
    // 删除模块
    delModel(item) {
      this.isactive = -1
      // condirm 提示
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.config.delKey),
          method: 'post',
          data: this.$http.adornData({ key: item }, this.apiList.config.delKey, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 重置当前详情
            this.detail = {
              name: '',
              token: '',
              moduleSe: '',
              moduleKey: '',
              lastToken: '',
              lastTokenTime: '',
              ips: []
            }
            // 删除当前列表
            this.dataList.splice(this.dataList.findIndex(dataItem => dataItem === item), 1)
            // 不显示添加和删除按钮
            this.isDetail = false
          } else {
            // 删除失败
            // this.$message.error(data.desc)
          }
        })
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    // 添加白名单
    addIps() {
      this.addModel()
      this.modelForm.name = this.detail.name
      this.detail.ips.push({ ip: this.modelForm.ip })
    }
  },
  created() {
    this.getdataList()
  }
}
</script>
<style lang="scss">
.configModule{
  li{
    margin: 15px 0;
  }
  .modelList{
    
  }
  .chooseIt{
    background: #E4E7ED;
  }
}
</style>