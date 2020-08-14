<template>
<div class="shopProductForm">
  <el-form @submit.native.prevent :model="shopProductForm" :rules="dataRule" ref="shopProductForm" >
    <el-form-item label="ID" v-show="false">
      <el-input v-model="shopProductForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="名称"  prop="name" label-width="120px">
      <el-input v-model="shopProductForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="运费"  prop="sendPrice" label-width="120px">
      <el-input v-model="shopProductForm.sendPrice" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="说明"  prop="explainStr" label-width="120px">
      <el-input v-model="shopProductForm.explainStr" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="拼多多价" inline prop="pddPrice" label-width="120px">
      <el-input v-model="shopProductForm.pddPrice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="淘宝价"  prop="tbPrice" label-width="120px">
      <el-input v-model="shopProductForm.tbPrice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="发货地址"  prop="outAddr" label-width="120px">
      <el-input v-model="shopProductForm.outAddr" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分销文字"  prop="resellerText" label-width="120px">
      <el-input v-model="shopProductForm.resellerText" autocomplete="off"></el-input>
    </el-form-item>
   <div style="display: flex;justify-content: center;">
    <el-form-item label="海报地址" label-width="110px">
      <upload @fileChange="chooseImg1" class="avatar-uploader" :width="width" :height="height">
        <img v-if="shopProductForm.poster" :src="shopProductForm.poster" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
    </el-form-item>
    <el-form-item label="分销海报" label-width="110px">
      <upload @fileChange="chooseImg2" class="avatar-uploader" :width="width" :height="height">
        <img v-if="shopProductForm.resellerPoster" :src="shopProductForm.resellerPoster" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
    </el-form-item>
    <el-form-item label="主图" label-width="110px">
      <upload @fileChange="chooseImg3" class="avatar-uploader" :width="width" :height="height">
        <img v-if="shopProductForm.imgUrl" :src="shopProductForm.imgUrl" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
    </el-form-item>
    </div>

    <el-form-item label-width="110px" label="">
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import Upload from '../../utils/upload.vue'
export default {
  props: {
    formType: {}
  },
  components: {
    Upload
  },
  data() {
    var trim = (rule, value, callback) => {
      callback()
    }
    return {
      width: 180,
      height: 180,
      shopProductForm: {
        id: '',
        name: '',
        sendPrice: 0,
        showToC: false,
        explainStr:'',
        pddPrice:'',
        tbPrice:'',
        outAddr:'',
        resellerText:'',
        poster:'',
        resellerPoster:'',
        imgUrl: ''
      },
      dataRule: {
        name: [
          { required: true, message: '活动名不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        sendPrice: [
          { required: true, message: '运费不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],

        explainStr: [
          { required: true, message: '说明不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        pddPrice: [
          { required: true, message: '拼多多价字符型不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        tbPrice: [
          { required: true, message: '淘宝价字符型不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        outAddr: [
          { required: true, message: '发货地址字符型不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        resellerText: [
          { required: true, message: '分销文字不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init({ data }) {
      if(!data){
        this.shopProductForm = { ...data }
      }else{
        const url = this.apiList.shopProduct.getData
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ productId : data.id }, url, true)
        }).then(({ data }) => {
          const form = data.data
          console.log(222222,data.data)
          // this.shopProductForm = { ...form }
          this.shopProductForm={
            id: form.productId,
            name: form.name,
            sendPrice: form.sendPrice,
            showToC: form.showToC,
            imgUrl: form.imgUrl,
            explainStr:form.explainStr,
            pddPrice:form.pddPrice,
            tbPrice:form.tbPrice,
            outAddr:form.outAddr,
            poster:form.poster,
            resellerText:form.resellerText,
            resellerPoster:form.resellerPoster,
          }
          console.log(3333333,this.shopProductForm)
        }).catch(() => {
          this.$message.error('未知错误！')
        })

      }
    },
    // 提交表单
    submitForm() {
      this.$refs['shopProductForm'].validate((valid) => {
        let url = this.apiList.shopProduct.add
        if (this.formType === 'edit') {
          url = this.apiList.shopProduct.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.shopProductForm))
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '提交成功' })
              this.shopProductForm={
                id: '',
                name: '',
                sendPrice: 0,
                showToC: false,
                imgUrl: '',
                explainStr:'',
                pddPrice:'',
                tbPrice:'',
                outAddr:'',
                poster:'',
                resellerText:'',
                resellerPoster:'',
              },
              this.$emit('success')
            } else {
              this.$emit('close')
            }
          })
        }
      })
    },
    chooseImg1(data) {
      this.shopProductForm.poster = data
    },
    chooseImg2(data) {
      this.shopProductForm.resellerPoster = data
    },
    // 选择图片
    chooseImg3(data) {
      this.shopProductForm.imgUrl = data
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
.shopProductForm{
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
