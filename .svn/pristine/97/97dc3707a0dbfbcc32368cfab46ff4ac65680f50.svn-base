<template>
<div class="couponForm">
  <el-form @submit.native.prevent :model="newsform" :rules="dataRule" :inline="false"  ref="newsform" label-width="110px">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="newsform.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="标题"  prop="title">
      <el-input v-model="newsform.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="主图">
      <upload @fileChange="chooseImg" class="avatar-uploader" :width="234" :height="144" style="width: 117px;height: 72px; line-height: 72px">
        <img v-if="newsform.imgUrl" :src="newsform.imgUrl" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
      <div class="test_container">
        <span>示例：</span>
        <img src="../../../assets/test_2.png" alt="">  
      </div>
      <div class="img_size_text">推荐尺寸: {{ 468 }} * {{ 288 }}</div>
    </el-form-item>
    <el-form-item label="新闻来源"  prop="newsFrom">
      <el-input v-model="newsform.newsFrom" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="热门新闻">
      <el-switch v-model="newsform.newsHot"></el-switch>
    </el-form-item>
    <el-form-item label="发布">
      <el-switch v-model="newsform.showed"></el-switch>
    </el-form-item>
    <el-form-item label="详情">
      <quill-editor ref="newsDetailInfo" :pro_content="newsform.fullText"  @contentChange="contentChange"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import quillEditor from '../../utils/editor'
import Upload from '../../utils/upload.vue'
export default {
  props: {
    formType: {}
  },
  components: {
    quillEditor,
    Upload
  },
  data() {
    return {
      newsform: {
        id: '',
        title: '',
        showed: false,
        fullText: '',
        newsFrom: '',
        newsHot: false,
        imgUrl: '',
        showed: false
      },
      dataRule: {
        title: [
          { required: true, message: '新闻标题不能为空', trigger: 'blur' }
        ],
        newsFrom: [
          { required: true, message: '新闻来源不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    contentChange(data) {
      this.newsform.fullText = data
    },
    init({ data }) {
      this.newsform.id = data.id
      this.newsform.showed = data.showed
      this.newsform.title = data.title
      this.newsform.fullText = data.fullText
      this.newsform.newsFrom = data.newsFrom
      this.newsform.newsHot = data.newsHot
      this.newsform.imgUrl = data.imgUrl
      this.newsform.showed = data.showed
    },
    // 提交表单
    submitForm() {
      this.$refs['newsform'].validate((valid) => {
        let url = this.apiList.module.moduleMall.news.add
        if (this.formType === 'edit') {
          url = this.apiList.module.moduleMall.news.edit
        }
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(this.newsform, url, true)
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
    chooseImg(data) {
      this.newsform.imgUrl = data
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