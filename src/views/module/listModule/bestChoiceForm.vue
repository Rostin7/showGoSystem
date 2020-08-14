<template>
<div>
  <el-form @submit.native.prevent :model="bestChoiceForm" :inline="false"  ref="bestChoiceForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="bestChoiceForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-model.number="bestChoiceForm.sortCode" autocomplete="off" style="width: 220px;"></el-input>
    </el-form-item>
    <el-form-item label="秒杀开始时间">
      <el-date-picker
        v-model="startTime"
        value-format="timestamp"
        type="datetime"
        :picker-options="startTimeOption"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="秒杀结束时间">
      <el-date-picker
        v-model="endTime"
        value-format="timestamp"
        :picker-options="endTimeOption"
        type="datetime"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <!-- <el-form-item label="秒杀开始时间">
      <el-time-select
        placeholder="起始时间"
        v-model="startTime"
        :picker-options="{
          start: '00:00',
          step: '00:01',
          end: '23:59'
        }">
      </el-time-select>
    </el-form-item>
    <el-form-item label="秒杀结束时间">
      <el-time-select
        placeholder="结束时间"
        v-model="endTime"
        :picker-options="{
          start: '00:00',
          step: '00:01',
          end: '23:59',
          minTime: startTime
        }">
      </el-time-select>
    </el-form-item> -->
    
    <el-form-item label="选择活动"  prop="name">
      <span style="margin: 0 15px;">{{ name }}</span>
      <el-button @click="dialogFormVisible=true">选取</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
  
  <!-- 点击选取内容 -->
  <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="true" :append-to-body="true" width="800px">
    <active-list :activeId="bestChoiceForm.activityId"  @chooseActive="chooseActive"/>
  </el-dialog>
</div>
</template>
<script>
import { timestamp } from '../../../utils/timeChange.js'
import ActiveList from '../../utils/activeList.vue'
export default {
  props: {
    formType: {}
  },
  data() {
    return {
      targetId: 0,
      name: '未选取',
      dialogFormVisible: false,
      nowdate: '',
      startTime: '',
      endTime: '',
      bestChoiceForm: {
        topId: '',
        sortCode: 0,
        activityId: '',
        activityType: ''
      },
      // 禁用时间
      startTimeOption:{
        disabledDate(time) {
          return false
        }
      },
      endTimeOption:{
        disabledDate(time) {
          return false
        }
      }
    }
  },
  components: {
    ActiveList
  },
  methods: {
    init({ data }) {
      this.name = data.name
      this.bestChoiceForm.topId = data.id
      this.bestChoiceForm.sortCode = data.sortCode ? data.sortCode : 0
      this.bestChoiceForm.activityId = data.activityId
      this.bestChoiceForm.activityType = data.activityType
      // this.startTime = this.timeChange('H:i:s', data.showStartTime)
      // this.endTime = this.timeChange('H:i:s', data.showEndTime)
      this.startTime = data.showStartTime
      this.endTime = data.showEndTime
      this.nowdate = data.showStartTime ? this.getDate(data.showStartTime) : ''
    },
    // 选择活动id
    chooseActive(data) {
      this.bestChoiceForm.activityId = data.activityId
      this.bestChoiceForm.activityType = data.type
      this.name = data.name
      this.dialogFormVisible = false
    },
    // 获得日期的值
    getDate (date) {
      let d = new Date(date)
      console.log(d)
      d.setHours(0)
      d.setMinutes(0)
      d.setSeconds(0)
      console.log(d.getTime())
      return d
    },
    // 将时间选择转为时间戳
    timeChangeTime(data) {
      if (data) {
        if (data.indexOf(':') !== -1) {
          return (Number(data.split(':')[0])*3600 + Number(data.split(':')[1])*60) * 1000
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    // 提交表单
    submitForm() {
      this.$refs['bestChoiceForm'].validate((valid) => {
        let url = this.apiList.activityTop.add
        if (this.formType === 'edit') {
          url = this.apiList.activityTop.edit
        }
        if (valid) {
          // const startTime = this.nowdate.getTime() + this.timeChangeTime(this.startTime)
          // const endTime = this.nowdate.getTime() + this.timeChangeTime(this.endTime)
          const startTime = this.startTime
          const endTime = this.endTime
          const submitData = JSON.parse(JSON.stringify(this.bestChoiceForm))
          submitData.showStartTime = startTime
          submitData.showEndTime = endTime
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '提交成功' })
              this.$emit('success')
            } else {
              this.$emit('close')
            }
          })
        }
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>