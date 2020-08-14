<template>
  <div>
    <el-form @submit.native.prevent ref="mallForm">
      <el-form-item label="渠道名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="渠道内容" :label-width="formLabelWidth"  prop="phoneNum">
        <el-button @click="choose">选取</el-button>
        <div>可以是商品或专题，默认为店铺主页</div>
      </el-form-item>
      <el-form-item label="推广方式" :label-width="formLabelWidth">
        <el-radio v-model="radio" label="1">小程序</el-radio>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button type="primary" @click="submitForm">立即提交</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 点击选取推广内容 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="true" :append-to-body="true" width="800px">
      <choose-form v-if="dialogFormVisible" @close="dialogFormVisible=false" @success="success"/>
    </el-dialog>
  </div>
</template>
<script>
import chooseForm from './chooseForm'
export default {
  data() {
    return{
      name: '',
      moduleName: '',
      targetModuleId: '',
      activityId: '',
      activityName: '',
      activityType: '',
      channelType: 1,
      radio: "1",
      formLabelWidth: '100px',
      dialogTitle: '选择渠道地址',
      dialogFormVisible: false,
    }
  },
  components: {
    chooseForm
  },
  methods: {
    // 点击选取
    choose(data) {
      this.dialogFormVisible = true
    },
    success(data) {
      if(data.channelType == 1) {
        this.moduleName = data.moduleName
        this.targetModuleId = data.targetModuleId
      } else if(data.channelType == 101){
        this.channelType = 101
        this.activityType = data.activityType
        this.activityId = data.activityId
        this.activityName = data.activityName
        this.moduleName = data.moduleName
        this.targetModuleId = data.targetModuleId
      } else if(data.channelType == 0){
        this.channelType = 0
        this.moduleName = data.moduleName
        this.targetModuleId = data.targetModuleId
      }
      this.dialogFormVisible = false
    },
    // 点击提交
    submitForm() {
      const url = this.apiList.saleChannel.add
      const vm = this
      const submitData = {
        name: vm.name,
        moduleName: vm.moduleName,
        targetModuleId: vm.targetModuleId,
        activityId: vm.activityId,
        activityName: vm.activityName,
        activityType: vm.activityType,
        channelType: vm.channelType,
      }
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
    },
    close() {
      this.$emit('cancel')
    }
  },
}
</script>