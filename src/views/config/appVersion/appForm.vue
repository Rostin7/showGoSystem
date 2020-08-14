<template>
<div>
  <el-form @submit.native.prevent :model="appForm" :inline="false"  ref="appForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="版本号">
      <el-input v-model="appForm.versionCode" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="平台">
      <!-- <el-input v-model="appForm.versionName" autocomplete="off"></el-input> -->
      <el-select v-model="appForm.platform" placeholder="请选择">
        <el-option label="头条小程序" value="100"></el-option>
        <el-option label="微信小程序" value="106"></el-option>
        <el-option label="appC端 android" value="101"></el-option>
        <el-option label="appC端 ios" value="102"></el-option>
        <el-option label="appB端 android" value="103"></el-option>
        <el-option label="appB端 iod" value="104"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="开关">
      <el-switch
        v-model="appForm.hold">
      </el-switch>
    </el-form-item>
    <el-form-item label="版本名称">
      <el-input v-model="appForm.versionName" autocomplete="off"></el-input>
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
import quillEditor from '../../utils/editor'
export default {
  props: {
    moduleId: {},
    formType: {},
    appType: {},
    platform: {}
  },
  data() {
    return {
      appForm: {
        platform: '',
        versionCode: '',
        hold: true,
        versionName: ''
      },
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs['appForm'].validate((valid) => {
        let url = this.apiList.config.app.version.add
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.appForm))
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
    close() {
      this.$emit('close')
    }
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