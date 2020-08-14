<template>
  <div>
    <el-form @submit.native.prevent :model="dataFrom" label-width="80px" label-position="left">
      <el-form-item label="问题">
        <el-input v-model="dataFrom.name" placeholder="常见问题" />
      </el-form-item>
      <el-form-item label="问题答案">
        <el-input
          v-model="dataFrom.description"
          :autosize="{ minRows: 2, maxRows: 6}"
          type="textarea"
          placeholder="问题答案"
        />
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirmRole">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    queryType: {},
    formType: {}
  },
  data() {
    return{
      id: '',
      dataFrom:{
        name: '',
        description: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('close')
    },
    // 初始化数据
    init({ data }) {
      console.log(data)
      this.id = data.queryId
      this.dataFrom.name = data.question
      this.dataFrom.description = data.answer
    },
    confirmRole() {
      // 提交数据
      let url = this.apiList.query.add
      const obj = [{
        question: this.dataFrom.name,
        answer: this.dataFrom.description,
      }]
      let formData = {
        type: this.queryType,
        questionJson: JSON.stringify(obj)
      }
      if (this.formType === 'edit') {
        url = this.apiList.query.edit
        formData.id = this.id
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(formData, url, true)
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
  }
}
</script>
<style lang="scss">
  
</style>