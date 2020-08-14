<template>
<div>
  <el-form @submit.native.prevent :model="itemForm" :rules="dataRule" :inline="false"  ref="itemForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="itemForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="名称"  prop="name">
      <el-input v-model="itemForm.name" autocomplete="off"></el-input>
    </el-form-item> -->
    <el-form-item label="团购价格"  prop="price">
      <el-input v-model="itemForm.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="展示价格"  prop="showPrice">
      <el-input v-model="itemForm.showPrice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="团人数"  prop="personNum">
      <el-input v-model="itemForm.personNum" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="团购数"  prop="totalNum">
      <el-input v-model="itemForm.totalNum" autocomplete="off"></el-input>
    </el-form-item>
    <!-- showPrice -->
    <!-- <el-form-item label="活动时间" prop="time">
      <el-date-picker
        v-model="itemForm.time"
        type="datetimerange"
        align="right"
        :editable="false"
        :time-arrow-control = "true"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['00:00:00', '00:00:00']">
      </el-date-picker>
    </el-form-item> -->
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
      itemForm: {
        id: '',
        // name: '',
        time: [],
        price: null,
        totalNum: '',
        groupBuyId: null,
        personNum: '',
        showPrice: ''
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
          { validator: number, trigger: 'blur'}
        ],
        showPrice: [
          { required: true, message: '展示价格不能为空'},
          { validator: number, trigger: 'blur'}
        ],
        personNum: [
          { required: true, message: '团人数不能为空'},
          { validator: int, trigger: 'blur'}
        ]
        // time: [
        //   { required: true, message: '请选择凭证使用时间', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    init({ data }) {
      this.itemForm.id = data.id
      // this.itemForm.name = data.name
      this.itemForm.totalNum = data.totalNum
      this.itemForm.price = data.price / 100
      this.itemForm.showPrice = data.showPrice / 100
      this.itemForm.personNum = data.personNum
      // this.itemForm.time = []
      // this.itemForm.time[0] = data.beginTime
      // this.itemForm.time[1] = data.endTime
    },
    // 提交表单
    submitForm() {
      this.$refs['itemForm'].validate((valid) => {
        let url = this.apiList.shop.groupBuy.child.add
        if (this.form_type === 'edit') {
          url = this.apiList.shop.groupBuy.child.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.itemForm))
          submitData.price = Math.round((this.itemForm.price) * 100)
          submitData.showPrice = Math.round((this.itemForm.showPrice) * 100)
          submitData.groupBuyId = this.groupBuyId
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
  created() {
    const url = window.location.href
    let id = []
    if (url.indexOf('/') > -1) {
      id = url.split('/')
    }
    if (id && id.length) {
      this.groupBuyId = id[id.length -1 ]
    } else {
      this.$message({
        message: '非法路径',
        type: 'waring'
      })
      setTimeout(() => {
        this.goBack()
      }, 1000)
    }
  }
}
</script>
