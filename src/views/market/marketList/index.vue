<template>
  <div class="moduleMall app-container">
    <el-card shadow="hover">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form @submit.native.prevent :inline="true">
          <el-form-item>
            <el-button @click.native="addModel" v-if="isAuth('/moduleMall/add')">添加商场</el-button>
          </el-form-item>
          <!-- 搜索 -->
          <el-form-item style="float: right">
            <el-button type="text" @click="search"><svg-icon icon-class="search"/></el-button>
          </el-form-item>
          <el-form-item style="float: right" label="请输入商场名">
            <el-input
              placeholder="请输入商场名"
              v-model="searchName"
              @keydown.enter.prevent.native="search"
              @clear="search"
              clearable>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 数据表格 -->
      
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column  prop="id" label="#ID" align="center" header-align="center" />
        <el-table-column  prop="name" label="商场名称" align="center" header-align="center" />
        <el-table-column  prop="createdAt" label="添加时间" align="center" header-align="center" />
        <el-table-column  prop="moduleType" label="类型" align="center" header-align="center" />
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="changerole(scope.$index, scope.row)"
            > 更多管理
            </el-button>
            <el-button
              v-if="isAuth('/moduleMall/mod')"
              size="mini"
              type="primary"
              @click="edit(scope.$index, scope.row)">修改</el-button>
            <el-button
              v-if="isAuth('/moduleMall/del')"
              size="mini"
              type="danger"
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

      <!-- 修改和增加 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="30%">
        <el-form :model="modelForm" :rules="dataRule" ref="mallForm">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="modelForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" v-if="!isEdit" :label-width="formLabelWidth"  prop="phoneNum">
            <el-input v-model="modelForm.phoneNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="经纬度" v-if="isEdit" :label-width="formLabelWidth">
            <el-row>
              <el-col :span="11">
                <el-input v-model="modelForm.lat" placeholder="经度"></el-input>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">--</el-col>
              <el-col :span="11">
                <el-input v-model="modelForm.lng" placeholder="维度"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="是否展示" v-if="isEdit" :label-width="formLabelWidth">
            <el-switch v-model="modelForm.show"></el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFormAdd">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="dialogTitle" :visible.sync="dialogDetailVisible"  width="65%">
        <market-detail ref="marketDetail" v-if="dialogDetailVisible" @success="SubChangeSuccess" @cancel="dialogDetailVisible=!dialogDetailVisible"></market-detail>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// import CityList from '../../module/cityList.vue'
import { eventBus } from '@/eventBus'
import MarketDetail from './marketDetail.vue'
export default {
  data() {
    var phone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('电话号码格式错误'))
      } else {
        callback()
      }
    }
    return {
      dialogTitle: '添加新商场',
      dialogFormVisible: false,
      cityId: this.$cookie.get('moduleId'),
      tableList: [],
      pageSize: 10,
      page: 1,
      total: 0,
      searchName: '', // 搜索名称
      listLoading: true,
      dialogDetailVisible: false,
      isEdit: false,
      formLabelWidth: '100px',
      modelForm: {
        name: '',
        lat: '',
        lng: '',
        phoneNum: '',
        show: false
      },
      dataRule: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
          { validator: phone, message: '电话号码错误', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    // CityList,
    MarketDetail
  },
  methods: {
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    // 点击搜索
    search() {
      this.page = 1
      this.getDataList()
    },
    changerole(idx, data) {
      this.$cookie.set('moduleId', data.id)
      this.$cookie.set('moduleType', '301')
      this.$store.dispatch('user/getInfo').then((data) => {
        console.log(data)
        // 重新获得头部和路由
        this.$store.dispatch('permission/generateRoutes', data).then((accessRoutes) => {
          this.$router.addRoutes(accessRoutes)
          this.$router.push({ path: '/' })
          // 切换头部显示
          eventBus.$emit('chooseModule', 'market/marketList')
        })
      })
    },
    addModel(index, data) {
      this.isEdit = false// 添加状态
      this.modelForm = {
        name: '',
        lat: '',
        lng: '',
        show: false,
        moduleId: this.cityId
      }
      if (data) {
        this.modelForm = {
          name: data.name,
          targetModuleId: data.id,
          lat: '',
          lng: '',
          show: false,
          moduleId: this.cityId
        }
        this.isEdit = true// 修改状态
      }
      this.dialogFormVisible = true
    },
    edit(index, data) {
      this.dialogDetailVisible = true
      // console.log(data)
      this.dialogTitle = '修改商场'
      this.$nextTick(() => {
        this.$refs.marketDetail.init(data)
      })
    },
    // 点击提交
    submitFormAdd() {
      let url
      if (this.isEdit) {
        url = this.apiList.module.moduleMall.edit
      } else {
        url = this.apiList.module.moduleMall.add
      }
      this.$refs['mallForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(this.modelForm, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '提交成功' })
              this.getDataList()
            } else {
              // this.$message({ message: data.msg, type: 'warning' })
              // this.$store.dispatch('LogOut')
            }
            // 关闭弹出层
            this.dialogFormVisible = false
          })
        }
      })
    },
    changeData(cityId) {
      this.cityId = cityId[cityId.length - 1]
      // 刷新数据
      this.getDataList()
    },
    // 请求数据
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.moduleMall.list),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.cityId, page: this.page, size: this.pageSize, name: this.searchName }, this.apiList.module.moduleMall.list, true)
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
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.module.moduleMall.del),
          method: 'post',
          data: this.$http.adornData({ targetModuleId: data.id }, this.apiList.module.moduleMall.del, true)
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
    SubChangeSuccess() {
      this.dialogDetailVisible = false
      this.getDataList()
    }
  },
  mounted() {
    const vm = this
    eventBus.$on('chooseCity', (val) => {
      vm.changeData(val)
    })
    this.getDataList()
  }
}
</script>