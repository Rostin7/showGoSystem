<template>
<div>
  <el-form @submit.native.prevent :model="groupBuyForm" :rules="dataRule" :inline="false"  ref="groupBuyForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="总数量"  prop="totalNum">
      <el-input v-model="groupBuyForm.totalNum" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="真实价格"  prop="price">
      <el-input v-model="groupBuyForm.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="划线价格"  prop="showPrice">
      <el-input v-model="groupBuyForm.showPrice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import sha256 from 'sha256'
import { timestamp } from '../../../utils/timeChange.js'
export default {
  data() {
    var trim = (rule, value, callback) => {
      // if (/\s/.test(value)) {
      //   callback(new Error('输入内容不能含有空格'))
      // } else {
      //   callback()
      // }
      callback()
    }
    var number = (rule, value, callback) => {
      if (!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|([0-9]*))$/.test(value)) {
        callback(new Error('请输入正确的数值'))
      } else {
        callback()
      }
    }
    var int = (rule, value, callback) => {
      if (!/^\+?[1-9][0-9]*$/.test(value)) {
        callback(new Error('请输入正确的整数数值'))
      } else {
        callback()
      }
    }
    return {
      groupBuyForm: {
        id: '',
        showPrice: 0,
        price: 0,
        totalNum: 0
      },
      dataRule: {
        showPrice: [
          { required: true, message: '划线金额为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        price: [
          { required: true, message: '促销价格为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        totalNum: [
          { required: true, message: '总数量为必填项', trigger: 'blur' },
          { validator: int, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(groupbuyid) {
      const url = this.apiList.shop.groupBuy.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: groupbuyid }, url, true)
      }).then(({ data }) => {
        this.groupBuyForm.id = groupbuyid
        this.groupBuyForm.showPrice = data.showPrice ? data.showPrice / 100 : 0
        this.groupBuyForm.price = data.price ? data.price / 100 : 0
        this.groupBuyForm.totalNum = data.totalNum ? data.totalNum / 100 : 0
      })
    },
    // 提交表单
    submitForm() {
      this.$refs['groupBuyForm'].validate((valid) => {
        let url = this.apiList.shop.groupBuy.edit
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.groupBuyForm))
          // submitData.price = Number(this.groupBuyForm.price) * 100
          // submitData.showPrice = Number(this.groupBuyForm.showPrice) * 100
          submitData.showPrice = Math.round(this.groupBuyForm.showPrice * 100)
          submitData.price = Math.round(this.groupBuyForm.price * 100)
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '提交成功' })
              this.$emit('close')
            } else {
              // this.$message({ message: data.msg, type: 'warning' })
              this.$emit('close')
            }
          })
        }
      })
    },
    // 选择图片
    chooseImg(option) {
      const formdata = new FormData()
      formdata.append('userId', this.$cookie.get('uid'))
      formdata.append('sign', sha256(this.apiList.upload + this.$cookie.get('token')))
      formdata.append('file', option.file)
      this.$http({
        url: this.$http.adornUrl(this.apiList.upload),
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formdata
      }).then(({ data }) => {
        if (data.result) {
          this.groupBuyForm.imgUrl = data.data
        } else {
          // this.$message({
          //   type: 'danger',
          //   message: data.msg
          // })
        }
      }).catch(() => {
      })
    },
    close() {
      this.$emit('close')
    }
  },
  mounted() {
  }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    /* width: 178px; */
    height: 178px;
    display: block;
  }
</style>
