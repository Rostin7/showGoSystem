<template>
<div>
  <el-form @submit.native.prevent :model="itemForm" :rules="dataRule" ref="itemForm" label-width="110px">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="itemForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="名称"  prop="name">
      <el-input v-model="itemForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="报名价格"  prop="price">
      <el-input v-model="itemForm.price" autocomplete="off"  @input="itemForm.moduleGetPrice = Math.round(itemForm.price * Number($cookie.get('moduleGetPrice')) * 100) / 100"></el-input>
    </el-form-item>
    <el-form-item label="商户结算价">
      <el-input v-model="itemForm.moduleGetPrice" autocomplete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="报名数量"  prop="totalNum">
      <el-input v-model="itemForm.totalNum" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动时间" prop="time">
      <el-date-picker
        v-model="itemForm.time"
        type="datetimerange"
        popper-class="zindextop"
        align="right"
        :editable="false"
        :time-arrow-control = "true"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['00:00:00', '00:00:00']">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import { timestamp } from '../../../utils/timeChange.js'
export default {
  props: {
    form_type: {}
  },
  data() {
    var phone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('电话号码格式错误'))
      } else {
        callback()
      }
    }
    var trim = (rule, value, callback) => {
      // if (/\s/.test(value)) {
      //   callback(new Error('输入内容不能含有空格'))
      // } else {
      //   callback()
      // }
      callback()
    }
    var number = (rule, value, callback) => {
      if (!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|([0-9]*))$/.test(value)) {
        callback(new Error('请输入正确的数值'))
      } else {
        callback()
      }
    }
    var int = (rule, value, callback) => {
      if (!/^\+?[1-9][0-9]*$/.test(value)) {
        callback(new Error('请输入正确的整数数值'))
      } else {
        callback()
      }
    }
    return {
      index: -1,
      itemForm: {
        id: '',
        name: '',
        time: [],
        price: null,
        totalNum: '',
        enterNameId: null
      },
      dataRule: {
        name: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '价格不能为空'},
          { validator: number, trigger: 'blur'}
        ],
        totalNum: [
          { required: true, message: '数量不能为空'},
          { validator: int, trigger: 'blur'}
        ],
        time: [
          { required: true, message: '请选择凭证使用时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init({ data }) {
      this.itemForm.id = data.id
      this.itemForm.name = data.name
      this.itemForm.totalNum = data.totalNum
      this.itemForm.price = data.price / 100
      this.itemForm.time = []
      this.itemForm.time[0] = data.beginTime
      this.itemForm.time[1] = data.endTime
      this.itemForm.moduleGetPrice = data.moduleGetPrice > 0 ? data.moduleGetPrice / 100 : data.moduleGetPrice
    },
    // 提交表单
    submitForm() {
      this.$refs['itemForm'].validate((valid) => {
        if (valid) {
          const submitData = {}
          submitData.id = this.itemForm.id ?  this.itemForm.id : null
          submitData.name = this.itemForm.name
          submitData.moduleGetPrice = this.itemForm.moduleGetPrice >= 0 ? this.itemForm.moduleGetPrice * 100 : -1
          submitData.price = this.itemForm.price * 100
          submitData.totalNum = Number(this.itemForm.totalNum)
          submitData.beginTime = typeof(this.itemForm.time[0]) === 'number' ? this.itemForm.time[0] : timestamp(this.itemForm.time[0])
          submitData.endTime = typeof(this.itemForm.time[1]) === 'number' ? this.itemForm.time[1] : timestamp(this.itemForm.time[1])
          if (this.index !== -1) {
            this.$emit('success', { data: submitData, index: this.index, type: 'edit' })
          } else {
            this.$emit('success', { data: submitData, index: -1 , type: 'add' })
          }
        }
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scope>
  .zindextop{
    z-index: 99999!important;
  }
</style>
