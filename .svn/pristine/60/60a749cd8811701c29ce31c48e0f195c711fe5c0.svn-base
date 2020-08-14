<template>
  <div class="shopDetail">
    <el-card shadow="never">
      <p class="main_header">信息修改</p>
      <el-form @submit.native.prevent :model="modelForm" :rules="dataRule" ref="mallForm" style="border: solid 1px #E5E5E5" >
        <el-form-item label="商铺名称" :label-width="formLabelWidth">
          <el-input v-model="modelForm.name" autocomplete="off" placeholder="请输入店铺名称" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" class="phone"  :label-width="formLabelWidth">
          <div class="inline">
            <el-select v-model="phoneType" placeholder="请选择" @change="shopPhoneNum ='' ; shopPhoneNum_ = ''; shopPhoneNum_2='' ; modelForm.shopPhoneNum ='';">
              <el-option label="手机号" value="1"></el-option>
              <el-option label="固定电话" value="2"></el-option>
              <el-option label="400电话" value="3"></el-option>
            </el-select>
          </div>
          <div class="inline" v-show="phoneType === '1'">
            <el-row>
              <el-col :span="24">
                <el-input type="text" v-model="modelForm.shopPhoneNum" autocomplete="off" maxlength="11"/>
              </el-col>
            </el-row>
          </div>
          <div class="inline phone" v-show="phoneType === '2'">
            <el-row>
              <el-col :span="7">
                <el-input type="text" v-model="shopPhoneNum" autocomplete="off" maxlength="4"/>
              </el-col>
              <el-col :span="2">--</el-col>
              <el-col :span="15">
                <el-input type="text" v-model="shopPhoneNum_" autocomplete="off" maxlength="8"/>
              </el-col>
            </el-row>
          </div>
          <div class="inline phone400" v-show="phoneType === '3'">
            <el-row>
              <el-col :span="4">
                <el-input v-model="shopPhoneNum" autocomplete="off" maxlength="3"/>
              </el-col>
              <el-col :span="2">--</el-col>
              <el-col :span="4">
                <el-input v-model="shopPhoneNum_" autocomplete="off" maxlength="3"/>
              </el-col>
              <el-col :span="2">--</el-col>
              <el-col :span="6">
                <el-input v-model="shopPhoneNum_2" autocomplete="off" maxlength="4"/>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="营业时间" :label-width="formLabelWidth">
          <el-input v-model="modelForm.businessTime" autocomplete="off" placeholder="请输入营业时间"></el-input>
        </el-form-item>
        <el-form-item label="店铺LOGO"  :label-width="formLabelWidth">
          <div class="logoContainer">
            <upload @fileChange="fileChange" class="avatar-uploader" :width="width" :height="height">
            <img v-if="modelForm.logoUrl" :src="modelForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus"></i>
            </upload>
            <span >推荐尺寸250*250</span>
          </div>
        </el-form-item>
        <el-form-item label="店铺地址"  :label-width="formLabelWidth">
          <el-input v-model="modelForm.address" autocomplete="off" placeholder="请输入店铺地址"></el-input>
          <!-- <el-select
            v-model="modelForm.address"
            filterable
            remote
            reserve-keyword
            ref="addSelect"
            placeholder="请输入店铺地址"
            @change="chooseAddress"
            :remote-method="remoteMethod">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.title"
              :value="item.title">
              <span>{{ item.title }}</span>&nbsp;&nbsp;&nbsp;
              <span>{{ item.address }}</span>
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="详细地址"  :label-width="formLabelWidth">
          <el-input v-model="modelForm.doorAdd" autocomplete="off" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="店铺坐标"  :label-width="formLabelWidth">
          <el-input v-model="modelForm.point" autocomplete="off" placeholder="请选择店铺坐标" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label=""  :label-width="formLabelWidth">
          <div style="margin-left: -16px;">
            <map-box :lat="modelForm.lat" :lng="modelForm.lng" :address="modelForm.address" @chooseAddressPoint="chooseAddressPoint" ref="myMap" @getDataList="getAddList"></map-box>
          </div>
        </el-form-item>
        <el-form-item label="选择标签" v-if="isGetTags&&isAuth('/moduleShop/mod')" :label-width="formLabelWidth">
          <el-checkbox-group 
            v-model="modelForm.tagIds"
            :max="2">
            <el-checkbox v-for="item in Tags" :label="item.id.toString()" :key="item.id" :checked="tagIds.indexOf(item.id.toString()) !== -1">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上架" v-if="isAuth('/moduleShop/mod')" :label-width="formLabelWidth">
          <el-switch v-model="modelForm.show"></el-switch>
        </el-form-item>
        <el-form-item label="归属于商场" v-if="isAuth('/moduleShop/mod')" :label-width="formLabelWidth">
          <el-switch v-model="modelForm.showMall" @change="changeMarketType"></el-switch>
        </el-form-item>
        <el-form-item label="所属商场"  v-if="modelForm.showMall&&isAuth('/moduleShop/mod')" :label-width="formLabelWidth">
          <el-radio-group v-model="modelForm.mallModuleId">
            <el-radio v-for="item in mallList" :key="item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属分组" v-if="isGetGroup&&isAuth('/moduleShop/mod')" :label-width="formLabelWidth">
          <el-checkbox-group 
            v-model="checkgroupIds"
            @change="changegroup"
          >
            <el-checkbox v-for="item in moduleType" :label="item.id.toString()" :key="item.id"  @change="checkgroup(item.id)">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="展示风格"  :label-width="formLabelWidth">
          <el-radio-group v-model="modelForm.defaultTheme">
            <el-radio :label="0">默认风格</el-radio>
            <el-radio v-for="item in groupIds" :key="item.id" :label="item.id">{{ item.label }}风格</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 店铺抽成 -->
        <el-form-item label="店铺抽成(百分比)" v-if="isAuth('/moduleShop/mod')" :label-width="formLabelWidth" >
          <el-input v-model="modelForm.moduleChou" autocomplete="off" placeholder="请输入0-100之间的数字"></el-input>
        </el-form-item>
        <!-- 店铺公告 -->
        <el-form-item label="店铺公告"  :label-width="formLabelWidth">
          <el-input v-model="modelForm.shopNotice" autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入店铺公告"></el-input>
        </el-form-item>
        <!-- 店铺详情富文本插件 -->
        <el-form-item label="店铺详情"  :label-width="formLabelWidth">
          <quill-editor ref="shopDetailInfo" :pro_content="content"  @contentChange="contentChange" style="margin-left: -15px;"/>
        </el-form-item>
      </el-form>
      <!-- <el-button @click="preview" v-if="!isAuth('/moduleShop/mod')" style="border-color: #E51D27;color: #E51D27;margin-top:25px;">实时预览</el-button> -->
      <el-button type="primary" @click.native="submitFormAdd" v-if="isAuth('/moduleShop/modSelf') || isAuth('/moduleShop/mod')" style="border-color: #E51D27;background-color: #E51D27;margin-top:25px;">确认修改</el-button>
      <el-button @click.native="close" style="border-color: #E51D27;color: #E51D27;margin-top:25px;">取消</el-button>
    </el-card>
    <!-- 预览弹出层 -->
    <el-dialog :title="'店铺预览'" :visible.sync="dialogTableVisible" width="482px" class="editor_index">
      <!-- <shop-iframe ref="shopIfram"></shop-iframe> -->
    </el-dialog>
</div>
</template>
<script>
// 图片上传组件
import Upload from '../../utils/upload.vue'
// 使用地图组件
import MapBox from '../../utils/map.vue'
import moduleList from '../../../utils/module.js'
import quillEditor from '../../utils/editor'
import ShopIframe from '../../utils/ifram'
import { Base64 } from 'js-base64'
export default {
  props: {
    shopId: {}
  },
  data() {
    var phone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('电话号码格式错误'))
      } else {
        callback()
      }
    }
    return {
      // 图片裁剪宽高
      phoneType: '1',
      options: [],
      width: moduleList.photoSize[1].width,
      height: moduleList.photoSize[1].height,
      // 树形图结构
      dialogTableVisible: false, // 预览弹出层
      moduleType : moduleList.data,
      content: '',
      showMap: false, // 显示地图
      tagIds: [],
      shopNotice: '',
      shopPhoneNum: '',
      shopPhoneNum_: '',
      shopPhoneNum_2: '',
      groupIds: [],
      checkgroupIds: [], // 选中的分组
      loading: false,
      isGetTags: false, // 是否获得tag数据
      mallModuleId: 0,
      isGetGroup: false,
      formLabelWidth: '120px',
      mallList: [], // 广场列表
      Tags: [], // tag列表
      modelForm: {
        name: '',
        targetModuleId: 0,
        moduleChou: 0,
        lat: '',
        lng: '',
        defaultTheme: '',
        businessTime: '',
        logoUrl: '',
        show: false,
        showMall: false,
        moduleId: 0,
        address: '',
        shopPhoneNum: '',
        tagIds: [],
        doorAdd: '',
        mallModuleId: 0, // 商场ID
        groupIds: [],
        point: '',
        shopNotice: ''
      },
      dataRule: {
        phoneNum: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
          { validator: phone, message: '电话号码错误', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    quillEditor,
    MapBox,
    ShopIframe,
    Upload
  },
  methods: {
    // 动态获得地址
    remoteMethod(data) {
      this.$refs.myMap.getAddList(data)
    },
    getAddList(val) {
      this.options = []
      const data = val.map((v, i, a) => {
        let arr = v.split(',')
        const obj = {
          title: '',
          address: '',
          lat: '',
          lng: ''
        }
        obj.id = i
        obj.title = arr[0]
        obj.address = arr[1] ? arr[1] : ''
        obj.lat = arr[2] ? arr[2] : ''
        obj.lng = arr[3] ? arr[3] : ''
        this.options.push(obj)
      })
    },
    // 选择地址
    chooseAddress(data){
      const _idx = this.options.findIndex(item => item.title === data)
      this.modelForm.lat = this.options[_idx].lat
      this.modelForm.lng = this.options[_idx].lng
    },
    // 预览
    preview() {
      this.dialogTableVisible = true
      const submitData = this.modelForm
      submitData.shopDesc = this.content
      submitData.moduleId = this.$cookie.get('moduleId')
      this.$nextTick(() => {
        this.$refs.shopIfram.sendMessage(submitData)
      })
    },
    // 富文本插件传值
    contentChange(val) {
      this.content = val
    },
    // 请求店铺详情
    getDetail() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.moduleShop.getDetail),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.shopId ? this.shopId : false}, this.apiList.module.moduleShop.getDetail, true)
      }).then(({ data }) => {
        if (data.result) {
          this.modelForm.moduleChou = data.data.moduleChou ? data.data.moduleChou / 100 : 0
          this.modelForm.name = data.data.name
          this.modelForm.logoUrl = data.data.logoImgUrl
          this.modelForm.show = data.data.showed
          this.modelForm.showMall = data.data.mallModuleId ? true : false
          this.modelForm.mallModuleId = data.data.mallModuleId ? data.data.mallModuleId : 0
          this.modelForm.groupIds = data.data.groupIds ? data.data.groupIds.split(',').filter(item => item !== '') : []
          // 店铺公告
          this.modelForm.shopNotice = data.data.shopNotice
          // 获得分组
          this.checkgroupIds = this.modelForm.groupIds.filter((v, i, a) => this.moduleType.findIndex(item => item.id === Number(v) ) !== -1)
          // 放出所有分组
          this.groupIds = this.moduleType
          this.isGetGroup = true
          this.modelForm.lat = data.data.lat
          this.modelForm.lng = data.data.lng
          this.modelForm.point = data.data.lat + ',' + data.data.lng
          this.modelForm.defaultTheme = data.data.defaultTheme
          // 初始化树形图选择
          this.modelForm.shopPhoneNum = data.data.shopPhoneNum ? data.data.shopPhoneNum : ''
          // 根据电话号码判断格式
          if (data.data.shopPhoneNum) {
            if (data.data.shopPhoneNum.indexOf('-') === -1 || data.data.shopPhoneNum === '') {
              this.phoneType = '1'
            } else if (data.data.shopPhoneNum.indexOf('-') === 3) {
              this.phoneType = '3'
              this.shopPhoneNum = data.data.shopPhoneNum.split('-')[0]
              this.shopPhoneNum_ = data.data.shopPhoneNum.split('-')[1]
              this.shopPhoneNum_2 = data.data.shopPhoneNum.split('-')[2]
            } else if (data.data.shopPhoneNum.indexOf('-') === 4) {
              this.phoneType = '2'
              this.shopPhoneNum = data.data.shopPhoneNum.split('-')[0]
              this.shopPhoneNum_ = data.data.shopPhoneNum.split('-')[1]
            }
          }
          this.modelForm.businessTime = data.data.businessTime ? data.data.businessTime : ''
          this.modelForm.address = data.data.address ? data.data.address : ''
          this.modelForm.doorAdd = data.data.doorAdd ? data.data.doorAdd : ''
          this.tagIds = data.data.tagIds ? data.data.tagIds.split(',') : []
          this.getTags()
          // 展示数据
          this.content = data.data.shopDesc
          this.getMall(data.data.superModuleId)
          // 显示地图
          // this.remoteMethod(this.modelForm.address)
        } else {
         
        }
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    // 请求广场
    getMall(superModuleId) {
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.moduleShop.listMall),
        method: 'post',
        data: this.$http.adornData({ moduleId: superModuleId }, this.apiList.module.moduleShop.listMall, true)
      }).then(({ data }) => {
        if (data.result) {
          this.mallList = data.data
        } else {
          // this.$message.error(data.msg)
        }
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    // 请求标签
    getTags() {
      // 暂时请求一百个
      this.isGetTags = false
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.moduleShop.tags),
        method: 'post',
        data: this.$http.adornData({ page: 1, size: 100 }, this.apiList.module.moduleShop.tags, true)
      }).then(({ data }) => {
        if (data.result) {
          this.Tags = data.data.records
        } else {
          this.$message({ message: data.msg, type: 'warning' })
          // this.$store.dispatch('LogOut')
        }
        this.isGetTags = true
      })
    },
    submitFormAdd() {
      const url = this.isAuth('/moduleShop/mod') ? this.apiList.module.moduleShop.edit : this.apiList.module.moduleShop.editSelf
      this.$refs['mallForm'].validate((valid) => {
        if (!this.modelForm.lat) {
          return this.$message.error('请选择店铺坐标')
        }
        // 正则验证
        if (this.modelForm.name === '') {
          return this.$message.error('商铺名称不能为空，请确认您填写的商铺名称')
        }
        if (this.modelForm.shopPhoneNum === '' && this.shopPhoneNum === '' && this.shopPhoneNum_ === '' && this.shopPhoneNum_2 === '') {
          return this.$message.error('联系电话不能为空，请确认您填写的联系电话')
        } else {
          switch (this.phoneType) {
            case '1':
              if (!/^1(3|4|7|5|8|9|6)([0-9]{9})/.test(this.modelForm.shopPhoneNum)) {
                return this.$message.error('您填写的手机号码格式有误，请确认您填写的联系电话')
              }
              break
            case '2':
              this.modelForm.shopPhoneNum = this.shopPhoneNum + '-' + this.shopPhoneNum_
              if (!/^0[0-9]{2,3}-[0-9]{8}/.test(this.modelForm.shopPhoneNum)) {
                return this.$message.error('您填写的固定电话格式有误，请确认您填写的联系电话')
              }
              break
            case '3':
              this.modelForm.shopPhoneNum = this.shopPhoneNum + '-' + this.shopPhoneNum_ + '-' + this.shopPhoneNum_2
              if (!/^400-[0-9]{3}-[0-9]{4}/.test(this.modelForm.shopPhoneNum)) {
                return this.$message.error('您填写的400号码格式有误，请确认您填写的联系电话')
              }
              break
          }
        }
        if(!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|([0-9]*))$/.test(this.modelForm.moduleChou)) {
          return this.$message.error('请输入正确的抽成')
        } else {
          if (this.modelForm.moduleChou < 0 || this.modelForm.moduleChou > 100) {
            return this.$message.error('抽成数值范围必须在0-100之间')
          }
        }
        
        // 验证其他数据
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.modelForm))
          // 根据分组添加groupids
          submitData.groupIds = []
          this.checkgroupIds.forEach( item => {
            const index = moduleList.data.findIndex( moduleListItem => moduleListItem.id === Number(item))
            if (index !== -1) {
              submitData.groupIds.push(moduleList.data[index].id)
              moduleList.data[index].children.forEach( childItem => {
                submitData.groupIds.push(childItem.id)
              })
            }
          })
          if (submitData.groupIds.length !== 0) {
            submitData.groupIds = submitData.groupIds.filter(item => item !== '')
            submitData.groupIds = submitData.groupIds.join(',')
          } else {
            submitData.groupIds = ''
          }
          if (submitData.tagIds.length !== 0) {
            submitData.tagIds = submitData.tagIds.join(',')
          }
          submitData.targetModuleId =  this.shopId ? this.shopId : false
          submitData.shopDesc = this.content
          // let str = ``
          // submitData.shopDesc = Base64.encode(str)
          submitData.lat = submitData.point ? submitData.point.split(',')[0] : ''
          submitData.lng = submitData.point ? submitData.point.split(',')[1] : ''
          submitData.moduleChou = Math.round(submitData.moduleChou * 100)
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ message: '提交成功', type: 'success'})
              this.getDetail()
              this.$emit('close')
            }
          })
        }
      })
    },
    close() {
      this.getDetail()
      this.$emit('close')
    },
    fileChange(data) {
      this.modelForm.logoUrl = data
    },
    check(a, b, c, d) {},
    // 选中地图事件
    chooseAddressPoint(point) {
      this.modelForm.point = point.lat + ',' + point.lng
      this.modelForm.address = point.address
      this.modelForm.lng = point.lng
      this.modelForm.lat = point.lat
      // this.modelForm.address = ''
      // this.remoteMethod(point.address)
    },
    changeMarketType(val) {
      if (!val) {
        this.modelForm.mallModuleId = 0
      }
    },
    changegroup(val) {
      console.log(val)
    },
    checkgroup(val) {
      if (Number(val) === moduleList.data[0].id) {
        // 属于商场则判断所属商场的id
        if (!this.modelForm.mallModuleId) {
          this.$message({
            message: '请先选择所属商场',
            type: 'info'
          })
          // 取消选择
          const _idx = this.checkgroupIds.findIndex(item => item === val.toString())
          if (_idx !== -1) {
            this.checkgroupIds.splice(_idx, 1)
          }
        } else {

        }
      }
    }
  },
  mounted() {
    this.getDetail()
    
  }
}
</script>
<style lang="scss">
.shopDetail{
  // 地图样式
  .el-dialog{
    margin-top: 10vh;
  }
  .el-dialog__body{
    padding: 10px 0;
  }
  .el-dialog__header{
    padding-bottom: 0px;
  }
  // .el-radio-group{
  //   // height: 48px;
  //   line-height: 48px;
  //   padding-top: 5px;
  //   border-left: solid 1px #eee;
  //   box-sizing: border-box;
  //   padding-left: 15px;
  //   vertical-align: middle;
  // }
  .el-checkbox-group{
    // height: 48px;
    line-height: 48px;
  }
  .el-textarea__inner{
    border: none;
    &:focus{
      border: none;
    }
  }
  .el-form-item--medium .el-form-item__content{
    border-left: solid 1px #eee;
    line-height: 48px;
    padding-left: 15px;
  }
  .el-form-item{
    border-bottom: solid 1px #E5E5E5;
    margin-bottom: 0;
    min-height: 48px;
  }
  .el-select .el-input.is-focus .el-input__inner{
    border-color: #eee;
  }
  .shopDetail .el-input--medium .el-input__inner{
    border-radius: 0;
  }
  .inline{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    line-height: 48px;
  }
  .el-col{
    border-bottom: solid 1px #E51D27;
    text-align: center;
    .el-input--medium{
      .el-input__inner {
        border-left: none;
        text-align: center;
      }
    }
  }
  .el-col-2{
    border-bottom: none;
  }
  .el-select{
    // width: 100%;
    // min-width: 180px;
  }
  .mapbox .el-card{
    border-top: none;
    border-right: none;
    border-bottom: none;
  }
  // 富文本样式
  .ql-container.ql-snow{
    border-bottom: none;
    border-right: none;
  }
  .ql-toolbar.ql-snow{
    border-top: none;
    border-right: none;
  }
  .el-input__inner{
    border: none;
  }
  .ql-editor{
    min-height: 120px;
  }
  .main_header{
    font-size: 24px;
    color: #666;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 30px;
  }
  .no_border{
    border: none;
  }
  // .el-input--medium .el-input__inner{
  //   height: 48px;
  //   line-height: 100%;
  //   border-left: solid 1px #E5E5E5;
  // }
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
    border-color: #E5E5E5;
  }
  .el-form-item__label{
    display: inline-block;
    height: 48px;
    line-height: 48px;
    vertical-align: middle;
  }
  .el-form-item__conten{
    height: 100%;
  }
  .logoContainer{
    // border-left: solid 1px #E5E5E5;
    position: relative;
    span{
      position: absolute;
      font-size: 12px;
      color: #e51D27;
      bottom: -15px;
      left: 36px;
    }
  }
  .update {
    width: 70px;
    height: 70px;
    margin-left: 36px;
    margin-top: 21px;
    margin-bottom: 21px;
    line-height: 80px;
    .avatar {
      width: 70px;
      height: 70px;
      display: block;
    }
    .el-icon-plus{
      font-size: 32px;
      font-weight: 600;
      color: #E51D27;
    }
  }
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>