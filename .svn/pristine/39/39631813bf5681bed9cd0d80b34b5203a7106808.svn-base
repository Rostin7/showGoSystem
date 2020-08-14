<template>
<div class="groupBuyForm">
  <el-form @submit.native.prevent :model="groupBuyForm" :rules="dataRule" :inline="false"  ref="groupBuyForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="groupBuyForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="名称"  prop="name">
      <el-input v-model="groupBuyForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="主图">
      <!-- <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :http-request="chooseImg">
        <img v-if="groupBuyForm.imgUrl" :src="groupBuyForm.imgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
      <upload @fileChange="chooseImg" class="avatar-uploader" :width="686" :height="408">
        <img v-if="groupBuyForm.imgUrl" :src="groupBuyForm.imgUrl" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
    </el-form-item>
    <el-form-item label="封面">
      <upload @fileChange="chooseImg_imgUrlSquare" class="avatar-uploader" :width="290" :height="290">
        <img v-if="groupBuyForm.imgUrlSquare" :src="groupBuyForm.imgUrlSquare" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
    </el-form-item>
    <!--  -->
    <el-form-item label="上架" >
      <el-switch
        v-model="groupBuyForm.showToC">
      </el-switch>
    </el-form-item>
    <el-form-item label="活动时间" prop="time">
      <el-date-picker
        v-model="groupBuyForm.time"
        type="datetimerange"
        align="right"
        :editable="false"
        :time-arrow-control = "true"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['00:00:00', '00:00:00']">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="凭证使用时间" prop="useTime">
      <el-date-picker
        v-model="groupBuyForm.useTime"
        type="datetimerange"
        align="right"
        :editable="false"
        :time-arrow-control = "true"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['00:00:00', '00:00:00']">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="详情">
      <quill-editor ref="shopDetailInfo" :pro_content="groupBuyForm.fullText"  @contentChange="contentChange"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import Upload from '../../utils/upload.vue'
import { timestamp } from '../../../utils/timeChange.js'
import quillEditor from '../../utils/editor'
export default {
  props: {
    form_type: {}
  },
  components: {
    Upload,
    quillEditor
  },
  data() {
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
      width: 316,
      height: 208,
      groupBuyForm: {
        id: '',
        imgUrl: '',
        imgUrlSquare: '',
        name: '',
        time: [],
        useTime: [],
        showToC: false,
        fullText: ''
      },
      dataRule: {
        name: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        endUseTime: [
          { required: true, message: '结束时间为必填项', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择活动时间', trigger: 'blur' }
        ],
        useTime: [
          { required: true, message: '请选择凭证使用时间', trigger: 'blur' }
        ],
        showPrice: [
          { required: true, message: '划线金额为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        price: [
          { required: true, message: '促销价格为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        totalNum: [
          { required: true, message: '总数量为必填项', trigger: 'blur' },
          { validator: int, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    contentChange(data) {
      this.groupBuyForm.fullText = data
    },
    init({ data }) {
      this.groupBuyForm.id = data.activityId
      this.groupBuyForm.imgUrl = data.imgUrl
      this.groupBuyForm.imgUrlSquare = data.imgUrlSquare
      // this.groupBuyForm.showPrice = data.showPrice / 100
      // this.groupBuyForm.price = data.price / 100
      // this.groupBuyForm.totalNum = data.totalNum
      this.groupBuyForm.name = data.name
      this.groupBuyForm.showToC = data.showToC
      this.groupBuyForm.time = []
      this.groupBuyForm.time[0] = data.startTime
      this.groupBuyForm.time[1] = data.endTime
      this.groupBuyForm.useTime = []
      this.groupBuyForm.useTime[0] = data.startUseTime
      this.groupBuyForm.useTime[1] = data.endUseTime
      this.groupBuyForm.fullText = data.fullText
    },
    // 提交表单
    submitForm() {
      this.$refs['groupBuyForm'].validate((valid) => {
        let url = this.apiList.shop.groupBuy.add
        if (this.form_type === 'edit') {
          url = this.apiList.shop.groupBuy.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.groupBuyForm))
          submitData.startTime = typeof(this.groupBuyForm.time[0]) === 'number' ? this.groupBuyForm.time[0] : timestamp(this.groupBuyForm.time[0])
          submitData.endTime = typeof(this.groupBuyForm.time[1]) === 'number' ? this.groupBuyForm.time[1] : timestamp(this.groupBuyForm.time[1])
          submitData.startUseTime = typeof(this.groupBuyForm.useTime[0]) === 'number' ? this.groupBuyForm.useTime[0] : timestamp(this.groupBuyForm.useTime[0])
          submitData.endUseTime = typeof(this.groupBuyForm.useTime[1]) === 'number' ? this.groupBuyForm.useTime[1] : timestamp(this.groupBuyForm.useTime[1])
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
    // 选择图片
    chooseImg(data) {
      this.groupBuyForm.imgUrl = data
    },
    chooseImg_imgUrlSquare(data) {
      this.groupBuyForm.imgUrlSquare = data
    },
    close() {
      this.$emit('close')
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
.groupBuyForm{
  .update {
    width: 158px;
    height: 104px;
    line-height: 104px;
    overflow: hidden;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 158px;
    height: 104px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
