<template>
  <div class="pmSale">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">职工管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native="addModel" v-if="isAuth('/moduleUser/linkUser')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="id" label="Id" width="60" align="center" header-align="center" />
            <el-table-column prop="nickName" label="名称" align="center" header-align="center"/>
            <el-table-column prop="phoneNum" label="电话号码" align="center" header-align="center"/>
            <el-table-column prop="roleName" label="职位" align="center" header-align="center"/>
            <el-table-column prop="roleDesc" label="职位描述" align="center" header-align="center"/>
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  v-if="!scope.row.roleName && isAuth('/userRole/link')"
                  @click="setRole(scope.row)">设置职位
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  v-if="scope.row.roleName && isAuth('/userRole/breakLink')"
                  @click="deletRole(scope.row)">解绑职位
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  class="danger"
                  @click="submitDelete(scope.row)">删除职工
                </el-button>
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
    <!-- 弹出层，表单 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="500px" :close-on-click-modal="false">
      <el-form @submit.native.prevent :model="memberForm" :rules="dataRule" :inline="false"  ref="memberForm" label-width="110px">
        <!-- <el-form-item label="员工名称">
          <el-input v-model="memberForm.nickName" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="memberForm.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="memberForm.code" autocomplete="off" style="width: 65%;"></el-input>
          <el-button type="text" @click="getVscode" style="float: right" :disabled="isgetcode">{{ isgetcode ? `重新获取验证码(${timeLimit}s)` : '获得验证码' }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button @click="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="选择角色" :visible.sync="roleListVisible" :modal="true"  width="500px" :close-on-click-modal="false">
      <el-form @submit.native.prevent ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择角色">
          <el-radio-group v-model="roleId">
            <el-radio v-for="item in rolesList" :key="item.id" :label="item.id">{{ item.roleName }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="linktoRole">确认</el-button>
          <el-button @click="roleListVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { setInterval } from 'timers';
export default {
  data() {
    var number = (rule, value, callback) => {
      if (!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|([0-9]*))$/.test(value)) {
        callback(new Error('请输入正确的数值'))
      } else {
        callback()
      }
    }
    return {
      roleId: '',
      rolesList: [], // 角色列表
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      // 是否获得验证码
      isgetcode: false,
      dialogTitle: '添加员工',
      dialogFormVisible: false,
      formType: 'add',
      phoneNum: '',
      timeLimit: 60,
      // 显示角色选择列表
      roleListVisible: false,
      achiveId: '',
      memberForm: {
        phoneNum: '',
        code: '',
        nickName: ''
      },
      dataRule: {
        phoneNum: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    // 获得数据
    getDataList() {
      this.listLoading = true
      const url = this.apiList.role.moduleUser.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, url, true)
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
    setRole(data) {
      this.achiveId = data.id
      this.roleListVisible = true
    },
    // 获得角色列表
    getRoleList() {
      const url = this.apiList.role.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: 1, size: 500 }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.rolesList = data.data.records
        } else {

        }
      }).catch(() => {
      })
    },
    // 解绑用户角色
    deletRole(data) {
      const url = this.apiList.role.user.breakLink
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ usrId: data.id, userRoleId: data.roleId }, url, true)
      }).then(({ data }) => {
        this.getDataList()
        if (data.result) {
          this.$message({
            message: '解绑成功',
            type: 'success'
          })
        } else {

        }
      }).catch(() => {
      })
    },
    // 绑定角色
    linktoRole() {
      const url = this.apiList.role.user.link
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ usrId: this.achiveId, roleId: this.roleId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        this.roleListVisible = false
        this.getDataList()
      }).catch(() => {
      })
    },
    // 点击删除
    submitDelete(data) {
      const url = this.apiList.role.moduleUser.del
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ usrId: data.id }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({ type: 'success', message: '删除成功' })
            this.getDataList()
          }
        })
      })
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加新员工'
      this.dialogFormVisible = true
    },
    // 点击修改昵称
    // submitEdit(index, data) {
    //   this.formType = 'edit'
    //   this.dialogTitle = ''
    //   this.dialogFormVisible = true
    // },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    // 发送短信验证码
    getVscode() {
      if(!this.memberForm.phoneNum) {
        return this.$message({
         type: 'warning',
          message: '请输入手机号码'
        })
      }
      if (!(/^1[3456789]\d{9}$/.test(this.memberForm.phoneNum))) {
        return this.$message({
          type: 'warning',
          message: '手机号输入错误'
        })
      }
      const url = this.apiList.role.moduleUser.getCode
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ phoneNum: this.memberForm.phoneNum }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({ type: 'success', message: '短信验证码已发送，请注意查收' })
        }
      })
    },
    // 点击提交表单
    onSubmit() {
      // 判断填写的手机号码
      if(!this.memberForm.phoneNum) {
        return this.$message({
         type: 'warning',
          message: '请输入手机号码'
        })
      }
      if (!(/^1[3456789]\d{9}$/.test(this.memberForm.phoneNum))) {
        return this.$message({
          type: 'warning',
          message: '手机号输入错误'
        })
      }
      if(!this.memberForm.code) {
        return this.$message({
          type: 'warning',
          message: '请输入验证码'
        })
      }
      const url = this.apiList.role.moduleUser.add
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ phoneNum: this.memberForm.phoneNum, code: this.memberForm.code }, url, true)
      }).then(({ data }) => {
        this.dialogFormVisible = false
        if (data.result) {
          this.getDataList()
          // 设置昵称
          // this.$message({ type: 'success', message: '添加成功' })
        }
      })
    },
    // 验证码倒计时
    timeLimitStrat() {
      this.isgetcode = true
      const timeLimit = setInterval(() => {
        this.timeLimit --
        if (this.timeLimit === 0) {
          this.isgetcode = false
          this.timeLimit = 60
          clearInterval(timeLimit)
        }
      }, 1000)
    }
  },
  mounted() {
    this.getDataList()
    if (this.isAuth('/userRole/link')) {
      this.getRoleList()
    } else {

    }
  }
}
</script>
