<template>
<div class="sellForm">
  <el-form @submit.native.prevent :model="sellForm" :rules="dataRule" :inline="false"  ref="sellForm" label-width="110px">
    <el-form-item label="分销金额">
      <el-row>
        <el-col :span="11">
          <el-input v-model="sellForm.resellPrice" autocomplete="off" placeholder="分销商获得金额"></el-input>
        </el-col>
        <el-col :span="11">
          <span style="padding-left: 20px;">{{ `分销总费用${ Math.round(this.sellForm.resellPrice / 0.81 * 100) / 100 }元` }}</span>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="分销文本">
      <el-input v-model="sellForm.resellerText" autocomplete="off" type="textarea" :rows="3"></el-input>
    </el-form-item>
    <el-form-item label="分销海报">
      <upload @fileChange="chooseImg" class="avatar-uploader" :width="width" :height="height" :style="imgStyle">
        <img v-if="sellForm.resellerPoster" :src="sellForm.resellerPoster" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
      <i v-if="sellForm.resellerPoster" class="el-icon-circle-close-outline" style="position: absolute; left: 180px; top: 6px; color: #fff;" @click="clearImgUrl"></i>
      <div class="img_size_text">推荐尺寸: {{ 750 }} * {{ 1334 }}</div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form >
</div>
</template>
<script>
import Upload from '../../utils/upload.vue'
export default {
  data() {
    var number = (rule, value, callback) => {
      if (!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|([0-9]*))$/.test(value)) {
        callback(new Error('请输入正确的分销金额'))
      }
      else {
        callback()
      }
    }
    var maxvalue = (rule, value, callback) => {
      if (value.length > 90) {
        callback(new Error('分销文本不能超过90个字'))
      } else {
        callback()
      }
    }
    return{
      width: 750,
      height: 1334,
      imgStyle: {
        height: '360px',
        width: '200px',
        lineHeight: '360px'
      },
      sellForm: {
        resellPrice: 0,
        resellerText: '',
        resellerPoster: ''
      },
      dataRule: {
        resellPrice: [
          { required: true, message: '分销价格为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        resellerText: [
          { required: true, message: '分销文本为必填项', trigger: 'blur' },
          { validator: maxvalue, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Upload
  },
  methods: {
    chooseImg(data) {
      this.sellForm.resellerPoster = data
    },
    close() {
      this.$emit('cancel')
    },
    clearImgUrl() {
      this.sellForm.resellerPoster = ''
    },
    submitForm() {
      // 表单验证
      this.$refs['sellForm'].validate((valid) => {
        if (valid) {
          // if (!this.sellForm.resellerPoster) {
          //   return this.$message('请上传分销海报')
          // }
          const formData = {
            // resellPrice: this.sellForm.resellPrice,
            resellPrice: Math.round(this.sellForm.resellPrice / 0.81 *100) / 100,
            resellerText: this.sellForm.resellerText,
            resellerPoster: this.sellForm.resellerPoster
          }
          this.$emit('success', formData)
        }
      })
    },
    // 初始化
    init(data) {
      // this.sellForm.resellPrice = data.resellPrice ? data.resellPrice : 0
      this.sellForm.resellPrice = data.resellPrice ? Math.round(data.resellPrice * 0.81 * 100) / 100 : 0
      this.sellForm.resellerText = data.resellerText ? data.resellerText : ''
      this.sellForm.resellerPoster = data.resellerPoster ? data.resellerPoster : ''
    }
  },
}
</script>
<style lang="scss">
  .sellForm{
    .update {
      width: 158px;
      height: 104px;
      line-height: 104px;
      overflow: hidden;
    }
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
      width: 200px;
      height: 200px;
      line-height: 200px;
      text-align: center;
    }
    .avatar {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
</style>