<template>
<div class="enterNameFrom">
  <el-form @submit.native.prevent :model="enterNameForm" :rules="dataRule" :inline="false"  ref="enterNameForm" label-width="110px" class="demo-ruleForm">
    <el-form-item label="ID" v-show="false">
      <el-input v-model="enterNameForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="名称"  prop="name">
      <el-input v-model="enterNameForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分组" v-if="!isMarket">
      <el-radio-group v-model="checkGroupId">
        <el-radio-button :key="item.id" v-for="item in groupsThird" :label="item.id">{{ item.label }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="联系电话" class="phone">
      <div class="inline">
        <el-select v-model="phoneType" placeholder="请选择" @change="enterPhoneNum ='' ; enterPhoneNum_ = ''; enterPhoneNum_2='' ; enterNameForm.phoneNum ='';">
          <el-option label="手机号" value="1"></el-option>
          <el-option label="固定电话" value="2"></el-option>
          <el-option label="400电话" value="3"></el-option>
        </el-select>
      </div>
      <div class="inline" v-show="phoneType === '1'">
        <el-row>
          <el-col :span="24">
            <el-input type="text" v-model="enterNameForm.phoneNum" autocomplete="off" maxlength="11"/>
          </el-col>
        </el-row>
      </div>
      <div class="inline phone" v-show="phoneType === '2'">
        <el-row>
          <el-col :span="7">
            <el-input type="text" v-model="enterPhoneNum" autocomplete="off" maxlength="4"/>
          </el-col>
          <el-col :span="2">--</el-col>
          <el-col :span="15">
            <el-input type="text" v-model="enterPhoneNum_" autocomplete="off" maxlength="8"/>
          </el-col>
        </el-row>
      </div>
      <div class="inline phone400" v-show="phoneType === '3'">
        <el-row>
          <el-col :span="4">
            <el-input v-model="enterPhoneNum" autocomplete="off" maxlength="3"/>
          </el-col>
          <el-col :span="2">--</el-col>
          <el-col :span="4">
            <el-input v-model="enterPhoneNum_" autocomplete="off" maxlength="3"/>
          </el-col>
          <el-col :span="2">--</el-col>
          <el-col :span="6">
            <el-input v-model="enterPhoneNum_2" autocomplete="off" maxlength="4"/>
          </el-col>
        </el-row>
      </div>
    </el-form-item>
    <el-form-item label="报名地址"  prop="address">
      <el-input v-model="enterNameForm.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input v-model="enterNameForm.doorAdd" autocomplete="off" placeholder="请输入详细地址"></el-input>
    </el-form-item>
    <el-form-item label="地址坐标" >
      <el-input v-model="enterNameForm.point" autocomplete="off" placeholder="请选择坐标" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item>
      <div>
        <map-box :lat="enterNameForm.lat" :lng="enterNameForm.lng" :address="enterNameForm.address" @chooseAddressPoint="chooseAddressPoint" ref="myMap"></map-box>
      </div>
    </el-form-item>
    <el-form-item label="报名价格"  prop="showPrice">
      <el-input v-model="enterNameForm.showPrice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="主图">
      <upload @fileChange="chooseImg" class="avatar-uploader" :width="343" :height="204" style="width: 172px;height: 80px; line-height: 80px">
        <img v-if="enterNameForm.mainImgUrl" :src="enterNameForm.mainImgUrl" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </upload>
      <div class="test_container">
        <span>示例：</span>
        <img src="../../../assets/test_1.png" alt="">  
      </div>
      <div class="img_size_text">推荐尺寸: {{ 686 }} * {{ 408 }}</div>
    </el-form-item>
    <!-- 封面 -->
    <el-form-item label="封面">
      <upload @fileChange="chooseImg_imgUrlSquare" :width="244" :height="254" style="width: 122px;height: 127px; line-height: 127px">
        <img v-if="enterNameForm.imgUrlSquare" :src="enterNameForm.imgUrlSquare" class="avatar" style="width: 122px;height: 127px">
        <i v-else class="el-icon-plus"></i>
      </upload>
      <div class="test_container">
        <span>示例：</span>
        <img class="" src="../../../assets/test_2.png" alt="">  
      </div>
      <div class="img_size_text">推荐尺寸: {{ 244 }} * {{ 254 }}</div>
    </el-form-item>
    <el-form-item label="上架" >
      <el-switch
        v-model="enterNameForm.showToC">
      </el-switch>
    </el-form-item>
    <el-form-item label="报名时间" prop="time">
      <el-date-picker
        v-model="enterNameForm.time"
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
        v-model="enterNameForm.useTime"
        type="datetimerange"
        align="right"
        :editable="false"
        :time-arrow-control = "true"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['00:00:00', '00:00:00']">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="风采展示">
      <photo-show :data="enterNameForm.photos" @changeData="getPhotoShowData"/>
    </el-form-item>
    <el-form-item label="注意事项">
      <kv-edit :data="enterNameForm.attention" @changeData="getKvData"/>
    </el-form-item>
    <el-form-item label="报名信息">
      <kv-mess :data="enterNameForm.enterMess" @changeData="getKvMess"/>
    </el-form-item>
    <el-form-item label="报名分组">
      <item-list :data="enterNameForm.enterItemList"  @changeData="getEnterItemList"/>
    </el-form-item>
    <el-form-item label="活动介绍">
      <quill-editor ref="shopDetailInfo" :pro_content="enterNameForm.fullText"  @contentChange="fullText_contentChange"/>
    </el-form-item>
    <el-form-item label="活动奖品">
      <quill-editor ref="shopDetailInfo1" :pro_content="enterNameForm.prizeFullText"  @contentChange="prizeFullText_contentChange"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import { timestamp } from '../../../utils/timeChange.js'
import MapBox from '../../utils/map.vue'
import Upload from '../../utils/upload.vue'
import quillEditor from '../../utils/editor'
import { getGroup, getGroupChild } from '../utils/getGroup.js'
import PhotoShow from '../enterName/PhotoShow.vue'
import kvEdit from '../utils/kv'
import KvMess from '../enterName/kvMess'
import ItemList from '../enterName/itemList'
export default {
  props: {
    formType: {}
  },
  data() {
    var phone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('电话号码格式错误'))
      } else {
        callback()
      }
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
    var trim = (rule, value, callback) => {
      // if (/\s/.test(value)) {
      //   callback(new Error('输入内容不能含有空格'))
      // } else {
      //   callback()
      // }
      callback()
    }
    return {
      active: 0,
      width: 444,
      height: 278,
      options: [],
      isMarket: false,
      groups: [],
      phoneType: '1',
      groupsThird: [],
      checkGroupId: '',
      enterPhoneNum: '',
      enterPhoneNum_: '',
      enterPhoneNum_2: '',
      enterNameForm: {
        id: '',
        mainImgUrl: '',
        imgUrlSquare: '',
        name: '',
        time: [],
        useTime: [],
        phoneNum: '',
        showPrice: '',
        address: '',
        lng: '',
        lat: '',
        doorAdd: '',
        showToC: false,
        point: '',
        photos: '',
        attention: '',
        enterItemList: '',
        fullText: '',
        enterMess: '',
        prizeFullText: ''
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
        phoneNum: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' }
          // { validator: phone, trigger: 'blur' }
        ],
        showPrice: [
          { required: true, message: '价格不能为空'},
          { validator: number, trigger: 'blur'}
        ],
        useTime: [
          { required: true, message: '请选择凭证使用时间', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写活动报名地址', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Upload,
    MapBox,
    quillEditor,
    PhotoShow,
    kvEdit,
    ItemList,
    KvMess
  },
  methods: {
    init({ data }) {
      const url = this.apiList.shop.template.detail
      this.enterNameForm.id = data.id
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: data.id }, url, true)
      }).then(({ data }) => {
        if (this.$cookie.get('moduleType') == '301') {
          this.isMarket = true
        }
        this.enterNameForm.mainImgUrl = data.data.mainImgUrl
        this.enterNameForm.imgUrlSquare = data.data.imgUrlSquare
        this.enterNameForm.name = data.data.name
        this.enterNameForm.showToC = data.data.showToC
        this.enterNameForm.phoneNum = data.data.phoneNum ? data.data.phoneNum : ''
        if (data.data.phoneNum) {
          if (data.data.phoneNum.indexOf('-') === -1 || data.data.phoneNum === '') {
            this.phoneType = '1'
          } else if (data.data.phoneNum.indexOf('-') === 3) {
            this.phoneType = '3'
            this.enterPhoneNum = data.data.phoneNum.split('-')[0]
            this.enterPhoneNum_ = data.data.phoneNum.split('-')[1]
            this.enterPhoneNum_2 = data.data.phoneNum.split('-')[2]
          } else if (data.data.phoneNum.indexOf('-') === 4) {
            this.phoneType = '2'
            this.enterPhoneNum = data.data.phoneNum.split('-')[0]
            this.enterPhoneNum_ = data.data.phoneNum.split('-')[1]
          }
        }
        this.enterNameForm.address = data.data.address
        this.enterNameForm.showPrice = data.data.showPrice / 100
        this.enterNameForm.time = []
        this.enterNameForm.time[0] = data.data.startTime
        this.enterNameForm.time[1] = data.data.endTime
        this.enterNameForm.useTime = []
        this.enterNameForm.useTime[0] = data.data.startUseTime
        this.enterNameForm.useTime[1] = data.data.endUseTime
        this.enterNameForm.lng = data.data.lng
        this.enterNameForm.lat = data.data.lat
        this.enterNameForm.point = data.data.lat + ',' + data.data.lng
        this.enterNameForm.doorAdd = data.data.doorAdd
        this.getGroup().then(() =>{
          if (data.data.activityGroupIds) {
            let arr = data.data.activityGroupIds.split(',')
            arr = arr.filter(item => item !== '')
            arr.forEach(item => {
              this.groupsThird.findIndex(v => v.id === Number(item)) !== -1 ? this.checkGroupId = Number(item) : ''
            })
          }
        })
        this.enterNameForm.enterItemList = data.data.enterItemList
        this.enterNameForm.photos = data.data.photos
        this.enterNameForm.attention = data.data.attention
        this.enterNameForm.fullText = data.data.fullText
        this.enterNameForm.prizeFullText = data.data.prizeFullText
        this.enterNameForm.enterMess = data.data.enterMess
      })
    },
    getPhotoShowData(data) {
      const arr = JSON.parse(data)
      const arrPro = []
      arr.forEach(item => {
        arrPro.push(item.url)
      })
      this.enterNameForm.photos = JSON.stringify(arrPro)
    },
    getKvData(data) {
      this.enterNameForm.attention = data
    },
    getEnterItemList(data) {
      this.enterNameForm.enterItemList = data
    },
    fullText_contentChange(data) {
      this.enterNameForm.fullText = data
    },
    prizeFullText_contentChange(data) {
      this.enterNameForm.prizeFullText = data
    },
    getKvMess(data) {
      this.enterNameForm.enterMess = data
    },
    // 获得分组
    getGroup() {
      if (this.$cookie.get('moduleType') == '301') {
        this.isMarket = true
        return
      }
      return new Promise(resolve => {
        const url = this.apiList.module.moduleShop.getDetail
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData('', url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.groups = getGroup(data.data.groupIds, 2)
            this.groupsThird = getGroup(data.data.groupIds, 3)
          }
          resolve(true)
        })
      })
    },
    chooseAddressPoint(point) {
      this.enterNameForm.point = point.lat + ',' + point.lng
      this.enterNameForm.address = point.address
    },
    // 提交表单
    submitForm() {
      this.$refs['enterNameForm'].validate((valid) => {
        let url = this.apiList.shop.template.add
        if (this.formType === 'edit') {
          url = this.apiList.shop.template.edit
        }
        if (this.enterNameForm.phoneNum === '' && this.enterPhoneNum === '' && this.enterPhoneNum_ === '' && this.enterPhoneNum_2 === '') {
          return this.$message.error('联系电话不能为空，请确认您填写的联系电话')
        } else {
          switch (this.phoneType) {
            case '1':
              if (!/^1(3|4|7|5|8|9|6)([0-9]{9})/.test(this.enterNameForm.phoneNum)) {
                return this.$message.error('您填写的手机号码格式有误，请确认您填写的联系电话')
              }
              break
            case '2':
              this.enterNameForm.phoneNum = this.enterPhoneNum + '-' + this.enterPhoneNum_
              if (!/^0[0-9]{2,3}-[0-9]{8}/.test(this.enterNameForm.phoneNum)) {
                return this.$message.error('您填写的固定电话格式有误，请确认您填写的联系电话')
              }
              break
            case '3':
              this.enterNameForm.phoneNum = this.enterPhoneNum + '-' + this.enterPhoneNum_ + '-' + this.enterPhoneNum_2
              if (!/^400-[0-9]{3}-[0-9]{4}/.test(this.enterNameForm.phoneNum)) {
                return this.$message.error('您填写的400号码格式有误，请确认您填写的联系电话')
              }
              break
          }
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.enterNameForm))
          submitData.type = 101
          submitData.startTime = typeof(this.enterNameForm.time[0]) === 'number' ? this.enterNameForm.time[0] : timestamp(this.enterNameForm.time[0])
          submitData.endTime = typeof(this.enterNameForm.time[1]) === 'number' ? this.enterNameForm.time[1] : timestamp(this.enterNameForm.time[1])
          submitData.startUseTime = typeof(this.enterNameForm.useTime[0]) === 'number' ? this.enterNameForm.useTime[0] : timestamp(this.enterNameForm.useTime[0])
          submitData.endUseTime = typeof(this.enterNameForm.useTime[1]) === 'number' ? this.enterNameForm.useTime[1] : timestamp(this.enterNameForm.useTime[1])
          submitData.showPrice =  Math.round(submitData.showPrice * 100)
          submitData.activityGroupIds = []
          this.groups.forEach((v, i ,a) => {
            submitData.activityGroupIds.push(v.id)
          })
          submitData.activityGroupIds.push(this.checkGroupId)
          submitData.activityGroupIds = submitData.activityGroupIds.join(',')
          submitData.lat = submitData.point ? submitData.point.split(',')[0] : ''
          submitData.lng = submitData.point ? submitData.point.split(',')[1] : ''
          if (this.$cookie.get('moduleType') == '301') {
            submitData.activityGroupIds = "8"
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
        }
      })
    },
    // 选择图片
    chooseImg(data) {
      this.enterNameForm.mainImgUrl = data
    },
    chooseImg_imgUrlSquare(data) {
      this.enterNameForm.imgUrlSquare = data
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
.enterNameFrom{
  .inline{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    line-height: 48px;
  }
  .update {
    width: 222px;
    height: 136px;
    line-height: 136px;
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
