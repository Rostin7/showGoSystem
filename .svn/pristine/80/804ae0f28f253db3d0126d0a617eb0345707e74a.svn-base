<template>
<div class="integraForm">
  <el-form :model="integraForm" @submit.native.prevent :rules="dataRule" :inline="false"  ref="integraForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="integraForm.integraId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品名(封面)"  prop="title">
      <el-input v-model="integraForm.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品名(完整)"  prop="particulars">
      <el-input v-model.number="integraForm.particulars" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="封面">
      <upload @fileChange="chooseImg_imgUrlSquare" :width="244" :height="254" style="width: 122px;height: 127px; line-height: 127px">
        <img v-if="integraForm.img" :src="integraForm.img" class="avatar" style="width: 122px;height: 127px">
        <i v-else class="el-icon-plus"></i>
      </upload>
      <div class="test_container">
        <span>示例：</span>
        <img class="" src="../../assets/test_2.png" alt="">  
      </div>
      <div class="img_size_text">推荐尺寸: {{ 244 }} * {{ 254 }}</div>
    </el-form-item>
    <el-form-item label="主图">
      <upload @fileChange="chooseImg" class="avatar-uploader" :width="294" :height="133" style="width: 294px;height: 133px; line-height: 133px">
        <img v-if="integraForm.particularsImg" :src="integraForm.particularsImg" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
      <div class="test_container">
        <span>示例：</span>
        <img src="../../assets/test_1.png" alt="">  
      </div>
      <div class="img_size_text">推荐尺寸: {{ 588 }} * {{ 266 }}</div>
    </el-form-item>
    <el-form-item label="库存"  prop="inventory">
      <el-input v-model="integraForm.inventory" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="原价"  prop="price">
      <el-input v-model="integraForm.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="兑换所需积分"  prop="integral">
      <el-input v-model="integraForm.integral" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品参数">
      <kv-edit :data="integraForm.parameterJson" @changeData="getKvData"/>
    </el-form-item>
    <el-form-item label="详情" >
      <quill-editor :pro_content="integraForm.commodityImg"  @contentChange="changeCommodityImg"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import Upload from '../utils/upload.vue'
import kvEdit from './kv'
import quillEditor from '../utils/editor'
export default {
  props: {
    formType: {},
    integraId: {}
  },
  components: {
    Upload,
    kvEdit,
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
      width: 180,
      height: 180,
      integraForm: {
        integraId: '',
        title: '',
        particulars: '',
        img: '',
        particularsImg: '',
        inventory: 0,
        price: 0,
        integral: 0,
        commodityImg: '',
        parameterJson: '[]'
      },
      dataRule: {
        title: [
          { required: true, message: '封面商品名不能为空', trigger: 'blur' }
        ],
        particulars: [
          { required: true, message: '完整商品名不能为空', trigger: 'blur' }
        ],
        inventory: [
          { validator: number, trigger: 'blur'}
        ],
        price: [
          { required: true, message: '原价为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        integral: [
          { validator: number, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init({ data }) {
      // this.integraForm = data
      this.integraForm.integraId = data.id
      this.integraForm.title = data.title
      this.integraForm.particulars = data.particulars
      this.integraForm.img = data.img
      this.integraForm.particularsImg = data.particularsImg
      this.integraForm.inventory = data.inventory
      this.integraForm.price = data.price
      this.integraForm.integral = data.integral
      this.integraForm.commodityImg = data.commodityImg
      this.integraForm.parameterJson = data.integraParameter.length !== 0 ? JSON.stringify(data.integraParameter) : '[]'
    },
    // 选择图片
    chooseImg(data) {
      this.integraForm.particularsImg = data
    },
    // 选择封面
    chooseImg_imgUrlSquare(data) {
      this.integraForm.img = data
    },
    // 修改富文本内容
    changeCommodityImg(data) {
      this.integraForm.commodityImg = data
    },
    // 提交表单
    submitForm() {
      this.$refs['integraForm'].validate((valid) => {
        let url = this.apiList.integra.add
        if (this.formType === 'edit') {
          url = this.apiList.integra.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.integraForm))
          submitData.price = Math.round(this.integraForm.price * 100)
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
    // 获得商品参数数据
    getKvData(data) {
      this.integraForm.parameterJson = data
    },
    getDataList() {
      const url = this.apiList.integra.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ integraId: this.integraId }, url, true)
      }).then(({ data }) => {
        this.init(data)
      })
    },
    close() {
      this.$emit('close')
    }
  },
  mounted() {
    if (this.formType === 'edit') {
      this.getDataList()
    }
  }
}
</script>
<style lang="scss">
.integraForm{
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>