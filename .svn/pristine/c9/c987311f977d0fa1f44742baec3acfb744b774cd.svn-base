<!-- 注册管理员组件 -->
<template>
  <div class="admin_reg">
    <!-- 创建最高管理员 -->
    <el-form-item>
      <el-button @click.native = "addRouter">{{addAdmin}}</el-button>
    </el-form-item>
    <!-- 弹出层按钮 -->
    <el-dialog title="创建最高管理员" :visible.sync="dialogRooterVisible" :modal="true">
      <el-form @submit.native.prevent :model="rooterForm" :rules="dataRule" :inline="false"  ref="rooterForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名"  prop="name">
          <el-input v-model="rooterForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="pass">
          <el-input v-model="rooterForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"  prop="rePass">
          <el-input v-model="rooterForm.rePass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码"  prop="phone">
          <el-input v-model="rooterForm.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAdd()" :loading="loading">注册管理员</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import RSA from 'js-rsa'
export default {
  // 获取父组件传值，调用时先将对应的名称传过来
  props: {
    addAdmin: {
      type: String,
      required: true
    }
  },
  data() {
    var phone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('电话号码格式错误'))
      } else {
        callback()
      }
    }
    var repassword = (rule, value, callback) => {
      if (value !== this.rooterForm.pass) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    var trim = (rule, value, callback) => {
      // if (/\s/.test(value)) {
      //   callback(new Error('输入内容不能含有空格'))
      // } else {
      //   callback()
      // }
      callback()
    }
    var userName = (rule, value, callback) => {
      if (value.length <= 6) {
        callback(new Error('用户名必须六位以上'))
      } else {
        callback()
      }
    }
    return {
      dialogRooterVisible: false,
      rooterForm: {
        name: '',
        pass: '',
        rePass: '',
        phone: ''
      },
      loading: false,
      // 表单验证
      dataRule: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: userName, trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        rePass: [
          { required: true, message: '验证密码不能为空', trigger: 'blur' },
          { validator: repassword, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
          { validator: phone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addRouter() {
      this.dialogRooterVisible = true
    },
    submitFormAdd() {
      // 加密密码
      // 获取公钥
      this.$refs['rooterForm'].validate((valid) => {
        if (valid) {
          let url = this.apiList.rooter.creat
          if (this.addAdmin === '创建管理员') {
            url = this.apiList.admin.creat
          }
          this.loading = true
          var regData = {
            pwd: this.rooterForm.pass,
            userName: this.rooterForm.name,
            phoneNum: this.rooterForm.phone
          }
          this.$http({
            url: this.$http.adornUrl(this.apiList.login.getKey),
            method: 'post',
            data: this.$http.adornData('', '', false)
          }).then(({ data }) => {
            if (!data.result) {
              this.$message({ message: data.msg, type: 'warning' })
              this.loading = false
              // this.$store.dispatch('LogOut')
              return
            } else {
              RSA.setMaxDigits(131)
              console.log(this.rooterForm.pass)
              const key = new RSA.RSAKeyPair(data.data.exponent, '', data.data.modulus)
              const password = RSA.base64encode(RSA.encryptedString(key, this.rooterForm.pass))
              // 调用接口发送请求
              console.log(password)
              regData.pwd = password
              this.$http({
                url: this.$http.adornUrl(url),
                method: 'post',
                data: this.$http.adornData(regData, url, true)
              }).then(({ data }) => {
                if (data.result) {
                  this.$message({ message: '添加成功', type: 'success' })
                  this.rooterForm = {
                    name: '',
                    pass: '',
                    rePass: '',
                    phone: ''
                  }
                } else {
                  // this.$message({ message: data.msg, type: 'warning' })
                  // this.$store.dispatch('LogOut')
                  this.loading = false
                }
              })
            }
          })
          // 执行完毕后隐藏
          this.dialogRooterVisible = false
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .demo-ruleForm{
    .el-form-item{
      display: inline-block;
      margin-bottom: 20px
    }
  }
</style>
