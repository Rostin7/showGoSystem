<template>
  <div class="mallDetail">
    <el-card shadow="never">
      <p class="main_header">信息修改</p>
      <el-form @submit.native.prevent :model="modelForm" :rules="dataRule" ref="mallForm" style="border: solid 1px #E5E5E5">
        <el-form-item label="商场名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="modelForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商场电话"  :label-width="formLabelWidth"  prop="mallPhoneNum">
          <el-input v-model="modelForm.mallPhoneNum" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="联系电话" class="phone"  :label-width="formLabelWidth">
          <div class="inline">
            <el-select v-model="phoneType" placeholder="请选择" @change="mallPhoneNum ='' ; mallPhoneNum_ = ''; mallPhoneNum_2='' ; modelForm.mallPhoneNum ='';">
              <el-option label="手机号" value="1"></el-option>
              <el-option label="固定电话" value="2"></el-option>
              <el-option label="400电话" value="3"></el-option>
            </el-select>
          </div>
          <div class="inline" v-show="phoneType === '1'">
            <el-row>
              <el-col :span="24">
                <el-input type="text" v-model="modelForm.mallPhoneNum" autocomplete="off" maxlength="11"/>
              </el-col>
            </el-row>
          </div>
          <div class="inline phone" v-show="phoneType === '2'">
            <el-row>
              <el-col :span="7">
                <el-input type="text" v-model="mallPhoneNum" autocomplete="off" maxlength="4"/>
              </el-col>
              <el-col :span="2">--</el-col>
              <el-col :span="15">
                <el-input type="text" v-model="mallPhoneNum_" autocomplete="off" maxlength="8"/>
              </el-col>
            </el-row>
          </div>
          <div class="inline phone400" v-show="phoneType === '3'">
            <el-row>
              <el-col :span="4">
                <el-input v-model="mallPhoneNum" autocomplete="off" maxlength="3"/>
              </el-col>
              <el-col :span="2">--</el-col>
              <el-col :span="4">
                <el-input v-model="mallPhoneNum_" autocomplete="off" maxlength="3"/>
              </el-col>
              <el-col :span="2">--</el-col>
              <el-col :span="6">
                <el-input v-model="mallPhoneNum_2" autocomplete="off" maxlength="4"/>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="商场LOGO"  :label-width="formLabelWidth">
          <div class="logoContainer">
            <upload @fileChange="chooseImg" class="avatar-uploader" :width="width" :height="height">
            <img v-if="modelForm.imgUrl" :src="modelForm.imgUrl" class="avatar">
            <i v-else class="el-icon-plus"></i>
            </upload>
            <span >推荐尺寸250*250</span>
          </div>
        </el-form-item>
        <el-form-item label="首页背景"  :label-width="formLabelWidth">
          <div class="logoContainer">
            <upload @fileChange="chooseBgImgUrl" class="avatar-uploader" :width="375" :height="142">
            <img v-if="modelForm.bgImgUrl" :src="modelForm.bgImgUrl" class="avatar" style="height: 70px; width: auto;">
            <i v-else class="el-icon-plus"></i>
            </upload>
            <span >推荐尺寸375*142</span>
          </div>
        </el-form-item>
        <el-form-item label="营业时间"  :label-width="formLabelWidth">
          <el-input v-model="modelForm.businessTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="isAuth('/moduleMall/mod')" label="展示"  :label-width="formLabelWidth">
          <el-switch v-model="modelForm.show"></el-switch>
        </el-form-item>
        <!-- 商场地址修改 -->
        <el-form-item label="商场地址"  :label-width="formLabelWidth">
          <el-input v-model="modelForm.address" autocomplete="off" placeholder="请输入地址"></el-input>
          <!-- <el-select
            v-model="modelForm.address"
            filterable
            remote
            reserve-keyword
            ref="addSelect"
            placeholder="请输入地址"
            @change="chooseAddress"
            @click.native="remoteMethod(modelForm.address)"
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
        <el-form-item label="位置信息"  :label-width="formLabelWidth">
          <div>
            <map-box :lat="modelForm.lat" :lng="modelForm.lng" :address="modelForm.address" @chooseAddressPoint="chooseAddressPoint" ref="myMap" @getDataList="getAddList"></map-box>
          </div>
        </el-form-item>
        <!-- 商场公告 -->
        <el-form-item label="商场公告"  :label-width="formLabelWidth">
          <el-input v-model="modelForm.mallNotice" autocomplete="off" placeholder="请输入商场公告" />
        </el-form-item>
        <!-- 店铺详情富文本插件 -->
        <el-form-item label="详情"  :label-width="formLabelWidth">
          <quill-editor ref="shopDetailInfo" :pro_content="content"  @contentChange="contentChange"/>
        </el-form-item>
      </el-form>
      <!-- <el-button @click="preview" v-if="!isAuth('/moduleShop/mod')" style="border-color: #E51D27;color: #E51D27;margin-top:25px;">实时预览</el-button> -->
      <el-button type="primary" @click.native="submitFormAdd" v-if="isAuth('/moduleMall/modSelf') || isAuth('/moduleMall/mod')" style="border-color: #E51D27;background-color: #E51D27;margin-top:25px;">确认修改</el-button>
      <el-button @click.native="cancel" style="border-color: #E51D27;color: #E51D27;margin-top:25px;">取消</el-button>
    </el-card>
</div>
</template>
<script>
// 使用地图组件
import MapBox from '../../utils/map.vue'
import quillEditor from '../../utils/editor'
import sha256 from 'sha256'
import Upload from '../../utils/upload.vue'
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
      width: 250,
      height: 250,
      content: '',
      options: [],
      phoneType: '1',
      mallPhoneNum: '',
      mallPhoneNum_: '',
      mallPhoneNum_2: '',
      modelForm: {
        show: false,
        address: '',
        mallPhoneNum: '',
        name: '',
        imgUrl: '',
        lng: '',
        lat: '',
        moduleId: '',
        businessTime: '',
        doorAdd: '',
        mallNotice: ''
      },
      formLabelWidth: '120px',
      dataRule: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        businessTime: [
          { required: true, message: '营业时间不能为空', trigger: 'blur' }
        ],
        mallPhoneNum: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
          { validator: phone, message: '电话号码错误', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    quillEditor,
    MapBox,
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
      // this.modelForm.address = ' '
      // this.$refs.addSelect.blur()
      this.$nextTick(() => {
        this.$refs.addSelect.focus()
      })
    },
    // 选择地址
    chooseAddress(data){
      const _idx = this.options.findIndex(item => item.title === data)
      console.log(this.options[_idx])
      this.modelForm.lat = this.options[_idx].lat
      this.modelForm.lng = this.options[_idx].lng
    },
    // 富文本插件传值
    contentChange(val) {
      this.content = val
    },
    init(_data) {
      const url = this.apiList.module.moduleMall.detail
      let formData
      if (_data) {
        formData = {moduleId: _data.id}
      } else {
        formData = ''
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData( formData, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.modelForm = {
            show: data.data.showed,
            address: data.data.address,
            mallPhoneNum: data.data.mallPhoneNum,
            businessTime: data.data.businessTime,
            name: data.data.name,
            lng: data.data.lng,
            lat: data.data.lat,
            point: data.data.lat + ',' + data.data.lng,
            imgUrl: data.data.logoImgUrl,
            bgImgUrl: data.data.bgImgUrl,
            doorAdd: data.data.doorAdd,
            targetModuleId: formData ? _data.id : null,
            mallNotice: data.data.mallNotice
          }
          if (data.data.mallPhoneNum) {
            if (data.data.mallPhoneNum.indexOf('-') === -1 || data.data.mallPhoneNum === '') {
              this.phoneType = '1'
            } else if (data.data.mallPhoneNum.indexOf('-') === 3) {
              this.phoneType = '3'
              this.mallPhoneNum = data.data.mallPhoneNum.split('-')[0]
              this.mallPhoneNum_ = data.data.mallPhoneNum.split('-')[1]
              this.mallPhoneNum_2 = data.data.mallPhoneNum.split('-')[2]
            } else if (data.data.mallPhoneNum.indexOf('-') === 4) {
              this.phoneType = '2'
              this.mallPhoneNum = data.data.mallPhoneNum.split('-')[0]
              this.mallPhoneNum_ = data.data.mallPhoneNum.split('-')[1]
            }
          }
          this.content = data.data.mallDesc ? data.data.mallDesc : ''
        }
      })
    },
    // 点击提交
    submitFormAdd() {
      const url = this.isAuth('/moduleMall/mod') ? this.apiList.module.moduleMall.edit : this.apiList.module.moduleMall.editSelf
      this.$refs['mallForm'].validate((valid) => {
        if (valid) {
          if (this.modelForm.name === '') {
            return this.$message.error('商铺名称不能为空，请确认您填写的商铺名称')
          }
          if (this.modelForm.mallPhoneNum === '' && this.mallPhoneNum === '' && this.mallPhoneNum_ === '' && this.mallPhoneNum_2 === '') {
            return this.$message.error('联系电话不能为空，请确认您填写的联系电话')
          } else {
            switch (this.phoneType) {
              case '1':
                if (!/^1(3|4|7|5|8|9|6)([0-9]{9})/.test(this.modelForm.mallPhoneNum)) {
                  return this.$message.error('您填写的手机号码格式有误，请确认您填写的联系电话')
                }
                break
              case '2':
                this.modelForm.mallPhoneNum = this.mallPhoneNum + '-' + this.mallPhoneNum_
                if (!/^0[0-9]{2,3}-[0-9]{8}/.test(this.modelForm.mallPhoneNum)) {
                  return this.$message.error('您填写的固定电话格式有误，请确认您填写的联系电话')
                }
                break
              case '3':
                this.modelForm.mallPhoneNum = this.mallPhoneNum + '-' + this.mallPhoneNum_ + '-' + this.mallPhoneNum_2
                if (!/^400-[0-9]{3}-[0-9]{4}/.test(this.modelForm.mallPhoneNum)) {
                  return this.$message.error('您填写的400号码格式有误，请确认您填写的联系电话')
                }
                break
            }
          }
          const submitData = this.modelForm
          submitData.lat = submitData.point ? submitData.point.split(',')[0] : ''
          submitData.lng = submitData.point ? submitData.point.split(',')[1] : ''
          submitData.mallDesc = this.content
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(submitData, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ message: '提交成功', type: 'success'})
              this.init()
              this.$emit('success')
            } else {
            }
          })
        }
      })
    },
    // 点击取消
    cancel() {
      this.$emit('cancel')
    },
    // 选择文件
    chooseImg(data) {
      this.modelForm.imgUrl = data
    },
    chooseBgImgUrl(data) {
      this.modelForm.bgImgUrl = data
    },
    chooseAddressPoint(point) {
      this.modelForm.point = point.lat + ',' + point.lng
      this.modelForm.address = point.address
      // console.log(point)
      // this.modelForm.lng = point.lng
      // this.modelForm.lat = point.lat
      // // this.modelForm.address = ''
      // this.remoteMethod(point.address)
      // this.$refs.addSelect.focus()
    }
  },
  mounted() {
    if (this.$cookie.get('moduleType')  === '301') {
      this.init()
    }
  }
}
</script>
<style lang="scss">
.mallDetail{
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
  .el-radio-group{
    height: 48px;
    line-height: 48px;
    padding-top: 5px;
    border-left: solid 1px #eee;
    box-sizing: border-box;
    padding-left: 15px;
    vertical-align: middle;
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
  .el-select .el-input.is-focus .el-input__inner{
    border-color: #eee;
  }
  .shopDetail .el-input--medium .el-input__inner{
    border-radius: 0;
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
  .el-form-item{
    border-bottom: solid 1px #E5E5E5;
    margin-bottom: 0;
    min-height: 48px;
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
  .el-input--medium .el-input__inner{
    height: 48px;
    line-height: 100%;
    border-left: solid 1px #E5E5E5;
  }
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
    border-left: solid 1px #E5E5E5;
    position: relative;
    span{
      position: absolute;
      font-size: 12px;
      color: #e51D27;
      bottom: -8px;
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