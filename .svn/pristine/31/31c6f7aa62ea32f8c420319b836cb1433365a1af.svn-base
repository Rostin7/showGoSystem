<template>
<div class="commentForm">
  <el-form @submit.native.prevent :model="commentForm" :rules="dataRule" :inline="false"  ref="commentForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="commentForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="commentForm.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input type="textarea" :rows="4" v-model="commentForm.content" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 插入图片的组件 -->
    <el-form-item label="上传图片">
      <photo-show @changeData="changeData" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import photoShow from './photoShow'
export default {
  props: {
    targetActivityType: {},
    targetActivityId: {}
  },
  data() {
    return{
      commentForm: {
        content: '',
        title: '',
        id: '',
        imgUrls: '',
        targetActivityType: '',
        targetActivityId: ''
      },
      dataRule: {
        title: [
          { required: true, message: '帖子标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '帖子内容不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  components: {
    photoShow
  },
  methods: {
    submitForm() {
      this.$refs['commentForm'].validate((valid) => {
        let url = this.apiList.comment.add
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(this.commentForm, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$emit('success')
            }
          })
        }
      })
    },
    changeData(data) {
      this.commentForm.imgUrls = data
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>