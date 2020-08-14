<template>
  <div class="">
    <el-form @submit.native.prevent ref="kvForm" :model="form" :rules="dataRule" label-width="110px">
      <el-form-item label="注意事项" prop="noteKey">
        <el-input v-model="form.noteKey"></el-input>
      </el-form-item>
      <el-form-item label="详情" prop="noteValue">
        <el-input type="textarea" :rows="8" v-model="form.noteValue"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即提交</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    formType: {}
  },
  data() {
    return{
      form: {
        id: '',
        noteKey: '',
        noteValue: ''
      },
      dataRule: {
        noteKey: [
          { required: true, message: '注意事项不能为空', trigger: 'blur' }
        ],
        noteValue: [
          { required: true, message: '详情不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submitForm() {
      this.$refs['kvForm'].validate((valid) => {
        if(valid) {
          this.$emit('success', this.form)
        }
      })
    },

  }
}
</script>