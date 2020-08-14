<template>
  <div class="rightItem" >
    <h3 class="title">忘记密码</h3>
    <el-form
      @submit.native.prevent
      ref="changePass"
      :model="changePassForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <el-form-item :class="{'achive': achive === 5}">
        <i class="input_icon"><img src="../../assets/loginImg/phone.png"></i>
        <el-input v-model="changePassForm.phone" type="text" name="phone" placeholder="电话" @focus="achive=5" />
      </el-form-item>
      <el-form-item :class="{'achive': achive === 6}">
        <i class="input_icon"><img style="width: 17px;" src="../../assets/loginImg/yanzhengma.png"></i>
        <el-input v-model="changePassForm.vsCode" type="text" name="vscode" placeholder="验证码"  @focus="achive=6"/>
        <el-button type="text" @click.native.prevent="getVsCode" style="position: absolute;right: 15px;top: 10px;#4F93FE">获取验证码</el-button>
      </el-form-item>
      <el-form-item prop="password" :class="{'achive': achive === 7}">
        <i class="input_icon"><img src="../../assets/loginImg/mima.png"></i>
        <!-- 隐藏自动填充属性 -->
        <input type="text" v-show="false">
        <el-input v-model="changePassForm.password" autocomplete="off" :type="pwdType" name="新密码" placeholder="新密码" @keyup.enter.native="handleLogin"  @focus="achive=7"/>
        <i class="input_icon right" v-if="pwdType === 'password'" @click.stop="pwdType='txt'"><svg-icon icon-class="eye" /></i>
        <i class="input_icon right" v-if="pwdType === 'txt'" @click.stop="pwdType='password'"><svg-icon icon-class="eye-open" /></i>
      </el-form-item>
      <el-form-item prop="repassword" :class="{'achive': achive === 8}">
        <i class="input_icon"><img src="../../assets/loginImg/mima.png"></i>
        <el-input v-model="changePassForm.repassword" autocomplete="off" :type="repwdType" name="确认密码" placeholder="确认密码" @keyup.enter.native="handleLogin"  @focus="achive=8"/>
        <i class="input_icon right" v-if="repwdType === 'password'" @click.stop="repwdType='txt'"><svg-icon icon-class="eye" /></i>
        <i class="input_icon right" v-if="repwdType === 'txt'" @click.stop="repwdType='password'"><svg-icon icon-class="eye-open" /></i>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;height: 60px;border-radius: 30px;background: #4F93FE" :loading="loading" @click.native.prevent="submit">
          确认
        </el-button>
      </el-form-item>
      <p class="main_nav"><span @click="goback">账号登录</span></p>
    </el-form>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
import RSA from '../../utils/rsa.js'
import { Base64 } from 'js-base64'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const phone = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('电话号码格式错误'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    const validateRePass = (rule, value, callback) => {
      if (value !== this.changePassForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return{
      changePassForm: {
        password: '',
        rePassword: '',
        phone: '',
        vsCode: '',
        userType: '',
        ty: ''
      },
      loading: false,
      pwdType: 'password',
      repwdType: 'password',
      achive: 5,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: phone }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        repassword: [{ required: true, trigger: 'blur', validator: validateRePass }]
      },
    }
  },
  methods: {
    goback() {
      this.$emit('goBack')
    },
    getVsCode() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.login.getVsCode),
        method: 'post',
        data: this.$http.adornData({ phoneNum: this.changePassForm.phone }, false)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            type: 'success',
            message: '验证码已发送'
          })
        }
      })
    },
    // 获得公钥并对密码加密
    passChange(pass) {
      return new Promise ((resolve, reject) => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.login.getKey),
          method: 'post',
          data: this.$http.adornData('', '', false)
        }).then(({ data }) => {
          if (!data.result) {
            this.$message('获取公钥失败')
            this.loading = false
            return
          }
          RSA.setMaxDigits(131)
          const key = new RSA.RSAKeyPair(data.data.exponent, '', data.data.modulus)
          const loginPassword = Base64.encode(RSA.encryptedString(key, pass))
          resolve(loginPassword)
        })
      })
    },
    submit() {
      this.$refs.changePass.validate(valid => {
        if (valid) {
          const url = this.apiList.login.reset
          this.passChange(this.changePassForm.password).then((data) => {
            const fromData = {
              phoneNum: this.changePassForm.phone,
              userType: this.changePassForm.userType,
              pwd: data,
              code: this.changePassForm.vsCode,
              ty: this.changePassForm.ty
            }
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'post',
              data: this.$http.adornData(fromData,'', false)
            }).then(({ data }) => {
              if (data.result) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$emit("success")
                }, 1000)
              }
            }) 
          })
        }
      })
    }
  },
  created() {
    this.changePassForm.userType = this.$cookie.get('userType')
    this.changePassForm.ty = this.$cookie.get('loginType')
  }
}
</script>