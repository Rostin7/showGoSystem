<template>
<div>
  <el-form @submit.native.prevent :model="appForm" :rules="dataRule" :inline="false"  ref="appForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="appForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="版本名称"  prop="versionName">
      <el-input v-model="appForm.versionName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="版本号"  prop="versionCode">
      <el-input v-model="appForm.versionCode" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="强制更新">
      <el-switch
        v-model="appForm.updateFlag">
      </el-switch>
    </el-form-item>
    <el-form-item label="下载路径"  prop="appUrl">
      <el-input v-model="appForm.appUrl" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="上传apk文件">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :http-request="chooseFile"
        v-loading="fileLoading">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="版本详情">
      <quill-editor ref="" :pro_content="appForm.updatedes"  @contentChange="contentChange"/>
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
        id: '',
        versionName: '',
        versionCode: '',
        updateFlag: false,
        updatedes: '',
        appUrl: ''
      },
      fileLoading: false,
      dataRule: {
        versionCode: [
          { required: true, message: '版本号不能为空', trigger: 'blur' }
        ],
        versionName: [
          { required: true, message: '版本名称不能为空', trigger: 'blur' }
        ],
        appUrl: [
          { required: true, message: '下载路径不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    init({ data }) {
      this.appForm.id = data.id
      this.appForm.versionName = data.versionName
      this.appForm.versionCode = data.versionCode
      this.appForm.updateFlag = data.updateFlag
      this.appForm.updatedes = data.updatedes
      this.appForm.appUrl = data.appUrl
    },
    contentChange(data) {
      this.appForm.updatedes = data
    },
    // 提交表单
    submitForm() {
      this.$refs['appForm'].validate((valid) => {
        let url = this.apiList.config.app.add
        if (this.formType === 'edit') {
          url = this.apiList.config.app.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.appForm))
          submitData.appType = this.appType
          submitData.platform = this.platform
          submitData.updatedes = this.appForm.updatedes
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
          this.appForm.appUrl = data.data
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