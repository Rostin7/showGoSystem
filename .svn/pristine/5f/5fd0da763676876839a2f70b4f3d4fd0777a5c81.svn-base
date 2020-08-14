<template>
<div class="couponForm">
  <el-form @submit.native.prevent :model="couponForm" :rules="dataRule" :inline="false"  ref="couponForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="couponForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="名称"  prop="name">
      <el-input v-model="couponForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="总数量"  prop="totalNum">
      <el-input v-model.number="couponForm.totalNum" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="优惠券金额"  prop="worthPrice">
      <el-input v-model="couponForm.worthPrice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="销售价格"  prop="price">
      <el-input v-model="couponForm.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="上架" >
      <el-switch
        v-model="couponForm.showToC">
      </el-switch>
    </el-form-item>
    <el-form-item label="主图">
      <!-- <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :http-request="chooseImg">
        <img v-if="couponForm.imgUrl" :src="couponForm.imgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
      <upload @fileChange="chooseImg" class="avatar-uploader" :width="width" :height="height">
        <img v-if="couponForm.imgUrl" :src="couponForm.imgUrl" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
    </el-form-item>
    <el-form-item label="凭证使用时间">
      <el-date-picker
        v-model="couponForm.toUseTime"
        type="datetimerange"
        align="right"
        :editable="false"
        :time-arrow-control = "true"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-date-picker
        v-model="couponForm.useTime"
        type="datetimerange"
        align="right"
        :editable="false"
        :time-arrow-control = "true"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['00:00:00', '00:00:00']">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import { timestamp } from '../../../utils/timeChange.js'
import Upload from '../../utils/upload.vue'
export default {
  props: {
    formType: {}
  },
  components: {
    Upload
  },
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
      width: 180,
      height: 180,
      couponForm: {
        id: '',
        name: '',
        totalNum: '',
        useTime: [],
        toUseTime: [],
        showToC: false,
        worthPrice: null,
        price: '',
        imgUrl: ''
      },
      dataRule: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        totalNum: [
          { required: true, message: '总数量为必填项', trigger: 'blur' },
          { validator: int, trigger: 'blur'}
        ],
        worthPrice: [
          { required: true, message: '优惠券金额为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        price: [
          { required: true, message: '优惠券价格为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init({ data }) {
      // this.couponForm = data
      this.couponForm.id = data.activityId
      this.couponForm.name = data.name
      this.couponForm.totalNum = data.totalNum
      this.couponForm.imgUrl = data.imgUrl
      this.couponForm.showToC = data.showToC
      this.couponForm.worthPrice = data.showPrice / 100
      this.couponForm.price = data.price / 100
      this.couponForm.useTime = []
      this.couponForm.useTime[0] = data.startTime
      this.couponForm.useTime[1] = data.endTime
      this.couponForm.toUseTime = []
      this.couponForm.toUseTime[0] = data.startUseTime
      this.couponForm.toUseTime[1] = data.endUseTime
    },
    // 提交表单
    submitForm() {
      this.$refs['couponForm'].validate((valid) => {
        let url = this.apiList.shop.coupon.add
        if (this.formType === 'edit') {
          url = this.apiList.shop.coupon.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.couponForm))
          submitData.startTime = typeof(this.couponForm.useTime[0]) === 'number' ? this.couponForm.useTime[0] : timestamp(this.couponForm.useTime[0])
          submitData.endTime = typeof(this.couponForm.useTime[1]) === 'number' ? this.couponForm.useTime[1] : timestamp(this.couponForm.useTime[1])
          submitData.startUseTime = typeof(this.couponForm.toUseTime[0]) === 'number' ? this.couponForm.toUseTime[0] : timestamp(this.couponForm.toUseTime[0])
          submitData.endUseTime = typeof(this.couponForm.toUseTime[1]) === 'number' ? this.couponForm.toUseTime[1] : timestamp(this.couponForm.toUseTime[1])
          // submitData.endUseTime = submitData.endUseTime ? timestamp(submitData.endUseTime) : timestamp(this.couponForm.endUseTime)
          submitData.worthPrice = Math.round(this.couponForm.worthPrice * 100)
          submitData.price = Math.round(this.couponForm.price * 100)
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '提交成功' })
              this.$emit('success')
            } else {
              // this.$message({ message: data.msg, type: 'warning' })
              this.$emit('close')
            }
          })
        }
      })
    },
    // 选择图片
    chooseImg(data) {
      this.couponForm.imgUrl = data
    },
    close() {
      this.$emit('close')
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
.couponForm{
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
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>