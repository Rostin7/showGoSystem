<template>
  <div v-if="show" class="moduleMall app-container">
    <el-card shadow="hover">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form @submit.native.prevent :inline="true">
          <el-form-item>
            <el-button @click.native="addModel" v-if="isAuth('/happyDay/add')">添加活动</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 数据表格 -->

      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column  prop="bigTitle" label="活动大标题" align="center" header-align="center" />
        <el-table-column  prop="smallTitle" label="活动小标题" align="center" header-align="center" />
        <el-table-column  prop="endTime" label="活动结束时间" align="center" header-align="center">
          <template slot-scope="scope">
            {{ dateFormat(scope.row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="changerole(scope.$index, scope.row)"
            > 更多管理
            </el-button>
            <el-button
              v-if="isAuth('/happyDay/mod')"
              size="mini"
              type="primary"
              @click="edit(scope.$index, scope.row)">修改</el-button>
            <el-button
              v-if="isAuth('/happyDay/del')"
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

      <!-- 增加、修改对话框 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="30%">
        <el-form :model="modelForm" :rules="dataRule" ref="modelForm">
          <el-form-item label="狂欢节大标题:" :label-width="formLabelWidth" prop="bigTitle">
            <el-input v-model="modelForm.bigTitle" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="狂欢节小标题:" :label-width="formLabelWidth" prop="smallTitle">
            <el-input v-model="modelForm.smallTitle" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动开始时间:" required :label-width="formLabelWidth" prop="startTime">
             <el-date-picker
                  v-model="modelForm.startTime"
                  type="datetime"
                  placeholder="选择活动开始时间">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="活动结束时间:" required :label-width="formLabelWidth" prop="endTime">
             <el-date-picker
                  v-model="modelForm.endTime"
                  type="datetime"
                  placeholder="选择活动结束时间">
                </el-date-picker>
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
  <div v-else>
    <contentActivity :id="id"></contentActivity>
  </div>
</template>
<script>
// import CityList from '../../module/cityList.vue'
import contentActivity from './contentActivity.vue'
import { eventBus } from '@/eventBus'
// import MarketDetail from './marketDetail.vue'
export default {
  data() {
    return {
      id: '',
      show: true,
      formType: '',
      dialogTitle: '添加新商场',
      dialogFormVisible: false,
      cityId: this.$cookie.get('moduleId'),
      tableList: [],
      pageSize: 10,
      page: 1,
      total: 0,
      listLoading: true,
      dialogDetailVisible: false,
      formLabelWidth: '150px',
      modelForm: {
        bigTitle: '',
        smallTitle: '',
        startTime:'',
        endTime: '',
        moduleId: ''
      },
      dataRule: {
        bigTitle: [
          { required: true, message: '狂欢节大标题不能为空', trigger: 'blur' }
        ],
        smallTitle: [
          { required: true, message: '狂欢节小标题不能为空', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '活动开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '活动结束时间不能为空', trigger: 'blur' }
        ],

      }
    }
  },
  components: {
    contentActivity
    // CityList,
    // MarketDetail
  },
  methods: {
   dateFormat(time){
      var date=new Date(time);
      var year=date.getFullYear();
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
   	},
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    changerole(idx, data) {
      this.show = !(this.show)
      this.id = data.id
      // this.$router.push({ path: 'contentActivity',query: {id: data.id}})
      // this.$cookie.set('moduleId', data.id)
      // this.$cookie.set('moduleType', '301')
      // this.$store.dispatch('user/getInfo').then((data) => {
      //   console.log(data)
      //   // 重新获得头部和路由
      //   this.$store.dispatch('permission/generateRoutes', data).then((accessRoutes) => {
      //     this.$router.addRoutes(accessRoutes)
      //     this.$router.push({ path: '/' })
      //     // 切换头部显示
      //     eventBus.$emit('chooseModule', 'market/marketList')
      //   })
      // })
    },
    // 点击添加
    addModel(index, data) {
      this.dialogTitle = '添加狂欢活动'
      this.formType = 'add'
      this.modelForm = {
        bigTitle: '',
        smallTitle: '',
        startTime: '',
        endTime: '',
        moduleId: this.cityId
        },
       this.dialogFormVisible = true
      },
      // 编辑
    edit (index,row) {
      this.formType = 'edit'
      this.dialogTitle = '编辑狂欢活动'
      this.modelForm = {
        bigTitle: row.bigTitle,
        smallTitle: row.smallTitle,
        startTime: row.startTime,
        endTime: row.endTime,
        moduleId: row.id
      }
      this.dialogFormVisible = true
    },
    // 点击提交
    submitFormAdd() {
      let url
      // 修改
      if (this.formType == 'edit' ) {
        url = this.apiList.module.happyDay.mod
      }
      else if (this.formType == 'add'){
        url = this.apiList.module.happyDay.add  //添加
      }
      this.$refs['modelForm'].validate((valid) => {
        if (valid) {
        // 添加
        if(this.formType == 'add'){
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData({
              bigTitle : this.modelForm.bigTitle,
              smallTitle : this.modelForm.smallTitle,
              startTime : this.modelForm.startTime.getTime(),
              endTime : this.modelForm.endTime.getTime(),
              moduleId : this.cityId
            }, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '新增活动成功' })
              this.getDataList()
            } else {
              this.$message({ message: data.msg, type: 'warning' })
              this.$store.dispatch('LogOut')
            }
            // 关闭弹出层
            this.dialogFormVisible = false
          })
         }
         // 修改
         else if(this.formType == 'edit'){
           const startTime = new Date(this.modelForm.startTime).getTime()
           const endTime = new Date(this.modelForm.endTime).getTime()
           this.$http({
             url: this.$http.adornUrl(url),
             method: 'post',
             data: this.$http.adornData({
               bigTitle : this.modelForm.bigTitle,
               smallTitle : this.modelForm.smallTitle,
               startTime : startTime,
               endTime : endTime,
               id : this.modelForm.moduleId
             }, url, true)
           }).then(({ data }) => {
             if (data.result) {
               this.$message({ type: 'success', message: '活动修改成功' })
               this.getDataList()
             } else {
               this.$message({ message: data.msg, type: 'warning' })
               this.$store.dispatch('LogOut')
             }
             // 关闭弹出层
             this.dialogFormVisible = false
           })
         }
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
        url: this.$http.adornUrl(this.apiList.module.happyDay.list),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.cityId, page: this.page, size: this.pageSize}, this.apiList.module.happyDay.list, true)
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
          url: this.$http.adornUrl(this.apiList.module.happyDay.del),
          method: 'post',
          data: this.$http.adornData({ id : data.id }, this.apiList.module.happyDay.del, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.tableList.splice(index, 1)
          } else {
            this.$message({ message: data.msg, type: 'warning' })
            this.$store.dispatch('LogOut')
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
