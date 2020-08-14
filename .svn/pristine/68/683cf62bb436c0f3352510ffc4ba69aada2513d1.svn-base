<template>
<div class="sysNotice">
  <el-form :model="sysNotice" @submit.native.prevent :rules="dataRule" :inline="false"  ref="sysNotice" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="sysNotice.id" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="名称"  prop="title">
      <el-input v-model="sysNotice.title" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="公告对象">
      <el-radio-group v-model="sysNotice.toType">
        <el-radio-button label="0">全体</el-radio-button>
        <el-radio-button label="1">城市端</el-radio-button>
        <el-radio-button label="2">商户端</el-radio-button>
        <el-radio-button label="3">用户端</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="详情" prop="content">
      <el-input v-model="sysNotice.content" autocomplete="off" type="textarea" :rows="3"/>
    </el-form-item>
    <el-form-item>
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
    form_type: {}
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
    return {
      width: 316,
      height: 208,
      sysNotice: {
        id: '',
        title: '',
        content: '',
        toType: 0
      },
      dataRule: {
        title: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        content: [
          { required: true, message: '公告详情不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init({ data }) {
      this.sysNotice.id = data.id
      this.sysNotice.title = data.title
      this.sysNotice.content = data.content
    },
    // 提交表单
    submitForm() {
      this.$refs['sysNotice'].validate((valid) => {
        let url = this.apiList.sysNotice.add
        if (this.form_type === 'edit') {
          url = this.apiList.sysNotice.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.sysNotice))
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
    close() {
      this.$emit('close')
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
.sysNotice{
  .update {
    width: 158px;
    height: 104px;
    line-height: 104px;
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
    width: 158px;
    height: 104px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
