<template>
  <div class="activityPlan">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <p class="main_header">补差管理</p>
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item label="第三方支付类型">
              <el-select v-model="type" placeholder="请选择支付类型">
                <el-option label="全部" value="0"></el-option>
                <el-option label="微信支付" value="101"></el-option>
                <el-option label="支付宝支付" value="201"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补差类型">
              <el-select v-model="diffType" placeholder="请选择补差类型">
                <el-option label="入账" value="1"></el-option>
                <el-option label="出账" value="101"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="startTime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="endTime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"><i class="el-icon-search"/>搜索</el-button>
            </el-form-item>
            <el-form-item v-if="isAuth('/moneyDiff/add')">
              <el-button @click.native = "addModel"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <diff-table ref="difftable" :type="type" :startTime="startTime" :endTime="endTime" :diffType="diffType" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true" width="600px">
      <diff-form v-if="dialogFormVisible" @cancel="dialogFormVisible=false"/>
    </el-dialog>
  </div>
</template>
<script>
import DiffForm from './diffForm'
import DiffTable from './diffTable'
import { getFirstDay } from '../../utils/timeChange'
export default {
  data() {
    return{
      type: '0',
      startTime: '',
      endTime: '',
      diffType: '1',
      dialogTitle: '添加补差操作',
      dialogFormVisible: false
    }
  },
  components: {
    DiffForm,
    DiffTable
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false
      this.onSubmit()
    },
    onSubmit() {
      this.$refs.difftable.getDataList()
    },
    addModel() {
      this.dialogFormVisible = true
    }
  },
  created() {
    const date = new Date()
    this.endTime = date.getTime()
    this.startTime = getFirstDay('month')
  }
}
</script>