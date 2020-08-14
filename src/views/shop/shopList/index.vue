<template>
  <div>
    <el-card shadow="hover">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-button @click.native = "addModel" v-if="isAuth('/moduleShop/add')">添加店铺</el-button>
          </el-form-item>
          <!-- 搜索 -->
          <el-form-item style="float: right">
            <el-button type="text" @click="search"><svg-icon icon-class="search"/></el-button>
          </el-form-item>
          <el-form-item style="float: right" label="请输入店铺名">
            <el-input
              placeholder="请输入店铺名"
              v-model="searchName"
              @keydown.enter.prevent.native="search"
              @clear="search"
              clearable>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column  prop="id" label="#ID" header-align="center" align="center"></el-table-column>
        <el-table-column  prop="name" label="店铺名称" header-align="center" align="center"></el-table-column>
        <el-table-column  prop="createdAt" label="添加时间" header-align="center" align="center"></el-table-column>
        <el-table-column  prop="moduleType" label="类型" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" width="360" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="changerole(scope.$index, scope.row)"
            >
              更多管理
            </el-button>
            <el-button
              size="mini"
              v-if="isAuth('/moduleShop/mod')"
              type="primary"
              @click="submitEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              v-if="isAuth('/moduleShop/del')"
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
      <!-- 添加的弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="40%">
        <el-form :model="modelForm" :rules="dataRule" ref="mallForm">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="modelForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth"  prop="phoneNum">
            <el-input v-model="modelForm.phoneNum" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFormAdd">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 店铺详情 -->
      <el-dialog :visible.sync="dialogDetailVisible" :modal="true"  width="65%">
        <shop-detail :shopId="shopId" v-if="dialogDetailVisible" @success="SubChangeSuccess" @close="dialogDetailVisible=false"></shop-detail>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// import CityList from '../../module/cityList.vue'
import { eventBus } from '@/eventBus'
import ShopDetail from '../shopPhotoShow/shopDetail.vue'
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
      cityId: this.$cookie.get('moduleId'),
      shopId: '',
      pageSize: 10,
      page: 1,
      total: 0,
      searchName: '', // 搜索名称
      formLabelWidth: '120px',
      shopName: '',
      dialogTitle: '修改店铺信息',
      tableList: [],
      listLoading: false,
      reloadShopList: false,
      reloadShopDetail: true,
      dialogFormVisible: false,
      dialogDetailVisible: false,
      modelForm: {
        name: '',
        phoneNum: ''
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
    ShopDetail
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
      this.$cookie.set('moduleType', '201')
      this.$store.dispatch('user/getInfo').then((data) => {
        console.log(data)
        // 修改店铺抽成
        this.$store.dispatch('user/resetModuleGetPrice')
        this.$store.dispatch('permission/generateRoutes', data).then((accessRoutes) => {
          this.$router.addRoutes(accessRoutes)
          this.$router.push({ path: '/' })
          eventBus.$emit('chooseModule', 'shopList')
        })
      })
    },
    changeData(cityId) {
      this.cityId = cityId[cityId.length - 1]
      // 重载店铺列表
      this.getDataList()
    },
    addModel() {
      this.modelForm = {
        moduleId: this.cityId,
        name: '',
        phoneNum: ''
      }
      this.dialogFormVisible = true
    },
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.moduleShop.list),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.cityId, page: this.page, size: this.pageSize, name: this.searchName }, this.apiList.module.moduleShop.list, true)
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
    submitFormAdd() {
      const url = this.apiList.module.moduleShop.add
      this.$refs['mallForm'].validate((valid) => {
        if (valid) {
          const submitData = this.modelForm
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '提交成功' })
              this.getDataList()
            }
            this.dialogFormVisible = false
          })
        }
      })
      // 提交成功刷新数据
      this.getDataList()
    },
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.module.moduleShop.del),
          method: 'post',
          data: this.$http.adornData({ targetModuleId: data.id }, this.apiList.module.moduleShop.del, true)
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
    submitEdit(index, data) {
      this.shopId = data.id
      this.dialogDetailVisible = true
    },
    // 修改成功
    SubChangeSuccess() {
      this.dialogDetailVisible = false
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
<style></style>