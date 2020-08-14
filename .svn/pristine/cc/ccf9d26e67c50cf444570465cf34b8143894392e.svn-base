<template>
 <div>
   <el-form @submit.native.prevent :model="form" :rules="dataRule" :inline="false"  ref="form" label-width="110px">
    <el-form-item label="补差金额（元）">
      <el-input v-model="form.moneyNum" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="补差时间">
      <el-date-picker
        v-model="form.timeAt"
        type="datetime"
        value-format="timestamp"
        placeholder="选择补差时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="第三方支付类型">
      <el-select v-model="form.payType" placeholder="请选择支付类型">
        <el-option label="微信支付" value="101"></el-option>
        <el-option label="支付宝支付" value="201"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="补差类型" v-if="type !== 1">
      <el-select v-model="form.diffType" placeholder="请选择支付类型">
        <el-option label="入账" value="1"></el-option>
        <el-option label="出账" value="101"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否补差" v-if="form.diffType == '101'">
      <el-select v-model="form.diff" placeholder="请选择是否补差">
        <el-option label="补差" :value="true"></el-option>
        <el-option label="常规出入账" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" :rows="2" v-model="form.remark " autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
 </div>
</template>
<script>
export default {
  props: {
    type: {}
  },
  data() {
    return{
      form: {
        moneyNum: '',
        diffType: '1',
        payType: '101',
        timeAt: '',
        remark: '',
        diff: true
      },
      dataRule: {}
    }
  },
  methods: {
    // 点击提交
    onSubmit() {
      const url = this.apiList.finance.add
      const formData = JSON.parse(JSON.stringify(this.form))
      formData.moneyNum = Math.round(formData.moneyNum * 100)
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(formData, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
        this.$emit('cancel')
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  },
  created() {
    if (this.type === 1) {
      this.form.diffType = '1'
    }
  }
}
</script>