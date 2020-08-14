<template>
<div class="outCouponForm">
  <el-form @submit.native.prevent :model="outCouponForm" :rules="dataRule" ref="outCouponForm" >
    <el-form-item label="ID" v-show="false">
      <el-input v-model="outCouponForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="名称"  prop="name" label-width="110px">
      <el-input v-model="outCouponForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="上架" label-width="110px">
      <el-switch
        v-model="outCouponForm.showToC">
      </el-switch>
    </el-form-item>
    <el-form-item label="主图" label-width="110px">
      <upload @fileChange="chooseImg" class="avatar-uploader" :width="width" :height="height">
        <img v-if="outCouponForm.imgUrl" :src="outCouponForm.imgUrl" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
    </el-form-item>
    <el-form-item label-width="110px" label="">
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
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
      outCouponForm: {
        id: '',
        name: '',
        showToC: false,
        imgUrl: ''
      },
      dataRule: {
        name: [
          { required: true, message: '活动名不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init({ data }) {
      this.outCouponForm.id = data.id
      this.outCouponForm.name = data.name
      this.outCouponForm.imgUrl = data.imgUrl
      this.outCouponForm.showToC = data.showToC
    },
    // 提交表单
    submitForm() {
      this.$refs['outCouponForm'].validate((valid) => {
        let url = this.apiList.outCoupon.add
        if (this.formType === 'edit') {
          url = this.apiList.outCoupon.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.outCouponForm))
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '提交成功' })
              this.$emit('success')
            } else {
              this.$emit('close')
            }
          })
        }
      })
    },
    // 选择图片
    chooseImg(data) {
      this.outCouponForm.imgUrl = data
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
.outCouponForm{
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