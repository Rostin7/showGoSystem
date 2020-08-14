<template>
<div class="checkForm">
  <el-form @submit.native.prevent :model="setForm" :inline="false"  ref="setForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="setForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分销商抽成">
      <el-slider v-model="setForm.firstCount" :format-tooltip="formatTooltip" show-input :min="1" :max="99"></el-slider>
    </el-form-item>
    <el-form-item label="上级抽成">
      <el-slider v-model="setForm.fatherCount" :format-tooltip="formatTooltip" show-input :min="1" :max="99"></el-slider>
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
  data() {
    return{
      setForm: {
        id: '',
        fatherCount: 1,
        firstCount: 1
      }
    }
  },
  methods: {
    formatTooltip(val) {
      return val + '%';
    },
    submitForm() {
      const url = this.apiList.reseller.set
      const formData = {
        resellerId: this.setForm.id,
        firstCount: this.setForm.firstCount,
        fatherCount: this.setForm.fatherCount
      }
       this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(formData, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({ type: 'success', message: '提交成功' })
          this.$emit('success')
        }
      })
    },
    close() {
      this.$emit('cancel')
    },
    // 初始化
    init(data) {
      this.setForm.id = data.id
      const url = this.apiList.reseller.setData
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ resellerId: data.id }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.setForm.fatherCount = data.data.fatherCount
          this.setForm.firstCount = data.data.firstCount
        }
      })
    }
  }
}
</script>
<style lang="scss">
  
</style>