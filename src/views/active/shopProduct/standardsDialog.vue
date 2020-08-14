<template>
<div class="standardsForm">
  <el-form @submit.native.prevent :model="standardsForm" :rules="dataRule" ref="standardsForm" >
    <el-form-item style="font-weight: bold;margin-left: 55px;">
      <el-radio-group v-model="skus_type" size="medium">
      		<el-radio-button :label="0" @click.native="clearValue">不为最终</el-radio-button>
      		<el-radio-button :label="1">设为最终</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="商品id" v-show="false">
      <el-input v-model="standardsForm.productId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="superskuId" v-show="false">
      <el-input v-model="standardsForm.superskuId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="规格名" prop="skuName" label-width="100px">
      <el-input v-model="standardsForm.skuName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="规格" prop="name" label-width="100px">
      <el-input v-model="standardsForm.name" autocomplete="off"></el-input>
    </el-form-item>
     <template v-if="skus_type === 1">
       <el-form-item label="价格" prop="price" label-width="100px">
         <el-input v-model="standardsForm.price" type="number"><template slot="append">元</template></el-input>
       </el-form-item>
       <el-form-item label="库存" prop="stock" label-width="100px">
         <el-input v-model="standardsForm.stock" type="number"><template slot="append">件</template></el-input>
       </el-form-item>
       <el-form-item label="分销结算价" prop="resellerPrice" label-width="100px">
         <el-input v-model="standardsForm.resellerPrice" type="number"><template slot="append">元</template></el-input>
       </el-form-item>
       <el-form-item label="商户结算价" prop="moduleGetPrice" label-width="100px">
         <el-input v-model="standardsForm.moduleGetPrice" type="number"><template slot="append">元</template></el-input>
       </el-form-item>
       <el-form-item label="用户首单价" prop="firstUserPrice" label-width="100px">
         <el-input v-model="standardsForm.firstUserPrice" type="number"><template slot="append">元</template></el-input>
       </el-form-item>
     </template>

    <template v-if="imageShow">
      <el-form-item label="主图" label-width="100px">
        <upload @fileChange="chooseImg" class="avatar-uploader" :width="width" :height="height">
          <img v-if="standardsForm.imgUrl" :src="standardsForm.imgUrl" class="avatar">
          <i v-else class="el-icon-plus"></i>
        </upload>
      </el-form-item>
    </template>


    <el-form-item label-width="100px" label="">
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
    formType: {},
    productId:'',
    superskuId:'',
    imageShow: Boolean
  },
  components: {
    Upload
  },
  data() {
    var trim = (rule, value, callback) => {
      callback()
    }
    var number = (rule, value, callback) => {
        if (value <= 0) {
          callback(new Error("数值要>0"))
        } else {
          callback()
        }
    }
    return {
      skus_type: 0,
      width: 180,
      height: 180,
      standardsForm: {
        productId: this.productId,   //详情:  商品id
        price: 0,   //详情:  价格单位分，最后一级价格生效
        name:'',   //详情:  名称
        stock: 0,   //详情:  库存只有最后一级的库存生效
        resellerPrice:0,  //分销结算价
        moduleGetPrice:0,  //商户结算价
        firstUserPrice: 0,   //用户首单价
        skuName:'',   //详情:  规格名
        imgUrl:'',   //详情:  图片可以为空，只有一级规格才有图片
        superskuId: this.superskuId?this.superskuId:'0',   //详情:  父规格id
      },
      dataRule: {
        name: [
          { required: true, message: '规格不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { validator: number, trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '库存不能为空', trigger: 'blur' },
          { validator: number, trigger: 'blur' }
        ],
        resellerPrice: [
          { required: true, message: '分销结算价不能为空', trigger: 'blur' },
          { validator: number, trigger: 'blur' }
        ],
        moduleGetPrice: [
          { required: true, message: '商户结算价不能为空', trigger: 'blur' },
          { validator: number, trigger: 'blur' }
        ],
        firstUserPrice: [
          { required: true, message: '用户首单价不能为空', trigger: 'blur' },
          { validator: number, trigger: 'blur' }
        ],
        skuName: [
          { required: true, message: '规格名不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    clearValue(){
      this.standardsForm.price = 0,
      this.standardsForm.stock = 0
    },
    init({ data },type) {
      console.log(111111,data)
      if(type == 'add'){
        this.standardsForm = {
          productId: this.productId,   //详情:  商品id
          price: 0,   //详情:  价格单位分，最后一级价格生效
          name:'',   //详情:  名称
          stock: 0,   //详情:  库存只有最后一级的库存生效
          resellerPrice:0,  //分销结算价
          moduleGetPrice:0,  //商户结算价
          firstUserPrice:0,   //用户首单价
          skuName:'',   //详情:  规格名
          imgUrl:'',   //详情:  图片可以为空，只有一级规格才有图片
          superskuId: this.superskuId ? this.superskuId : '0',   //详情:  父规格id
        }
      }else{
        //  this.standardsForm = Object.assign({},data)
        this.standardsForm = {
          id: data.id,
          productId: data.productId,   //详情:  商品id
          price: data.price,   //详情:  价格单位分，最后一级价格生效
          name:data.name,   //详情:  名称
          stock: data.stock,   //详情:  库存只有最后一级的库存生效
          resellerPrice:data.resellerPrice,  //分销结算价
          moduleGetPrice:data.moduleGetPrice,  //商户结算价
          firstUserPrice:data.firstUserPrice,   //用户首单价
          skuName:data.skuName,   //详情:  规格名
          imgUrl:data.imgUrl,   //详情:  图片可以为空，只有一级规格才有图片
          superskuId: data.superskuId,   //详情:  父规格id
        }
      }
    },
    // 提交表单
    submitForm() {
      this.$refs['standardsForm'].validate((valid) => {
        let url = this.apiList.shopProductsku.add
        if (this.formType === 'edit') {
          url = this.apiList.shopProductsku.edit
        }
        if (valid) {
          this.standardsForm.price = this.standardsForm.price*100 
          this.standardsForm.resellerPrice = this.standardsForm.resellerPrice*100 
          this.standardsForm.moduleGetPrice = this.standardsForm.moduleGetPrice*100 
          this.standardsForm.firstUserPrice = this.standardsForm.firstUserPrice*100 
          const submitData = JSON.parse(JSON.stringify(this.standardsForm))
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: '提交成功' })
              this.standardsForm = {
                productId: this.productId,   //详情:  商品id
                price: 0,   //详情:  价格单位分，最后一级价格生效
                name:'',   //详情:  名称
                stock:0,   //详情:  库存只有最后一级的库存生效
                resellerPrice:0,  //分销结算价
                moduleGetPrice:0,  //商户结算价
                firstUserPrice:0,   //用户首单价
                skuName:'',   //详情:  规格名
                imgUrl:'',   //详情:  图片可以为空，只有一级规格才有图片
                superskuId: '0',   //详情:  父规格id
              },
              this.$emit('success')
            } else {
              this.$emit('close')
            }
          })
        }
      })
    },
    // 选择图片
    chooseImg(data) {
      this.standardsForm.imgUrl = data
    },
    close() {
      this.$emit('close')
    }
  },
  created() {

  }
}
</script>
<style lang="scss">
  .el-dialog__body{
    padding: 5px 20px
  }
.standardsForm{
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
