<template>
<div>
  <el-form @submit.native.prevent :model="appForm"  :inline="false"  ref="appForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="版本名称"  prop="versionName">
      <el-select v-model="appForm.clientType" placeholder="请选择">
        <el-option
          :label="'C端'"
          :value="3">
        </el-option>
        <el-option
          :label="'B端'"
          :value="2">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="下载路径"  prop="url">
      <el-input v-model="appForm.url" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="上传zip文件">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        accept="application/zip,application/x-zip,application/x-zip-compressed"
        :http-request="chooseFile"
        v-loading="fileLoading">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
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
export default {
  data() {
    return {
      appForm: {
        clientType: 3,
        url: '',
      },
      fileLoading: false,
    }
  },
  methods: {
    contentChange(data) {
      this.appForm.updatedes = data
    },
    // 提交表单
    submitForm() {
      this.$refs['appForm'].validate((valid) => {
        let url = this.apiList.config.app.vueUpdate.add
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
    // 选择文件
    chooseFile(option) {
      this.fileLoading = true
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
        this.fileLoading = false
        if (data.result) {
          this.appForm.url = data.data
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