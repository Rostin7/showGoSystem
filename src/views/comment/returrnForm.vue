<template>
  <el-form @submit.native.prevent>
    <el-form-item>
      <el-input type="textarea" :rows="4" v-model="content" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" v-if="isAuth('/smallComment/add')">发布</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    commentId: {}, // 帖子的id
    superSmallCommentId: {} // 父级回复id
  },
  data() {
    return{
      content: ''
    }
  },
  methods: {
    onSubmit() {
      const url = this.apiList.comment.return.add
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ commentId: this.commentId, superSmallCommentId: this.superSmallCommentId ? this.superSmallCommentId : 0, content: this.content }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$emit('success')
        }
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  },
}
</script>