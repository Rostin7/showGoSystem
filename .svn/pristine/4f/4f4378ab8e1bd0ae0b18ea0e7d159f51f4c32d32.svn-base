<template>
<div class="difftradesForm">
  <el-form @submit.native.prevent :model="difftradesForm" :rules="dataRule" :inline="false"  ref="difftradesForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="difftradesForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="合作方式">
      <el-select v-model="difftradesForm.tradesWay" placeholder="请选择">
        <el-option 
          v-for="item in optionList" 
          :key="item.value"
          :label="item.label"
          :value="item.value" 
        />
      </el-select>
    </el-form-item>
    <el-form-item label="需求数量"  prop="totalNum">
      <el-input v-model.number="difftradesForm.needNum" autocomplete="off" prop="needNum"/>
    </el-form-item>
    <el-form-item label="可见分组" v-if="formType === 'add'">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="item in groupIds" :key="item.id" :label="item.label">
           <el-checkbox-group v-model="difftradesForm.showGroupIds">
            <el-checkbox v-for="child_item in item.children" :key="child_item.id" :label="child_item.id">
              {{ child_item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
    </el-form-item>
    <el-form-item label="详情"  prop="totalNum">
      <quill-editor ref="shopDetailInfo" :pro_content="difftradesForm.fullText"  @contentChange="contentChange"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import quillEditor from '../../utils/editor'
import moduleList from '../../../utils/module.js'
export default {
  props: {
    formType: {},
    targetType: {},
    targetId: {}
  },
  components: {
    quillEditor
  },
  data() {
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
      optionList: [
        {
          value: 101,
          label: '现金'
        },
        {
          value: 201,
          label: '面谈'
        },
        {
          value: 301,
          label: '礼品'
        },
        {
          value: 401,
          label: '资源'
        }
      ],
      difftradesForm: {
        tradesId: '',
        needNum: '',
        tradesWay: '',
        fullText: '',
        showGroupIds: [],
      },
      activeName: '',
      groupIds: [],
      dataRule: {
        needNum: [
          { required: true, message: '合作数量为必填项', trigger: 'blur' },
          { validator: int, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 初始化修改数据
    init(data) {
      this.difftradesForm.tradesId = data.diffId
      this.difftradesForm.tradesWay = data.tradesWay
      this.difftradesForm.needNum = data.needNum
      this.difftradesForm.fullText = data.fullText
      // this
    },
    submitForm() {
      this.$refs['difftradesForm'].validate((valid) => {
        let url = this.apiList.shop.diffTrades.add
        if (this.formType === 'edit') {
          url = this.apiList.shop.diffTrades.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.difftradesForm))
          submitData.showGroupIds = submitData.showGroupIds.join(",")
          submitData.targetType = this.targetType
          submitData.targetId = this.targetId
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
    },
    contentChange(data) {
      this.difftradesForm.fullText = data
    },
  },
  mounted() {
    let groupArray = []
    this.groupIds = moduleList.data.filter(item => item.children.length > 0)
    console.log(this.groupIds)
  }
}
</script>