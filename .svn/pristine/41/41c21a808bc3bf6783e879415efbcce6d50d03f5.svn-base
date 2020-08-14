<template>
<div class="templateForm">
  <el-form @submit.native.prevent :model="templateForm" :rules="dataRule" :inline="false"  ref="templateForm" label-width="110px" class="demo-ruleForm">
    <el-steps :active="active" finish-status="success" simple STYLE="margin-bottom: 15PX">
      <el-step title="基础信息" @click.native="active=0" />
      <el-step title="详细信息" @click.native="active=1" />
      <el-step title="注意事项" @click.native="active=2" />
      <el-step title="风采展示" @click.native="active=3" />
      <el-step title="信息填写" @click.native="active=4" v-if="activeType===301" />
    </el-steps>
    <div v-show="active === 0" >
      <el-form-item label="ID" v-show="false">
        <el-input v-model="templateForm.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称"  prop="name">
        <el-input v-model="templateForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 联系电话start -->
      <el-form-item label="联系电话" class="phone" v-if="activeType===301">
        <div class="inline">
          <el-select v-model="phoneType" placeholder="请选择" @change="enterPhoneNum ='' ; enterPhoneNum_ = ''; enterPhoneNum_2='' ; templateForm.phoneNum ='';">
            <el-option label="手机号" value="1"></el-option>
            <el-option label="固定电话" value="2"></el-option>
            <el-option label="400电话" value="3"></el-option>
          </el-select>
        </div>
        <div class="inline" v-show="phoneType === '1'">
          <el-row>
            <el-col :span="24">
              <el-input type="text" v-model="templateForm.phoneNum" autocomplete="off" maxlength="11"/>
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
      <!-- 联系电话end -->
      <!-- 数量 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="总数量"  prop="totalNum">
            <el-input v-model="templateForm.totalNum" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大购买次数"  prop="totalCanBuy">
            <el-input v-model="templateForm.totalCanBuy" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 价格 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="促销价格"  prop="price">
            <el-input v-model="templateForm.price" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原始价格"  prop="showPrice">
            <el-input v-model="templateForm.showPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 回收价格 -->
      <el-row :gutter="20" v-if="activeType === 301">
        <el-col :span="12">
          <el-form-item label="系统回收价格"  prop="sysPrice">
            <el-input v-model="templateForm.sysPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 销售渠道 -->
      <el-form-item label="销售渠道">
        <!-- <el-input v-model="templateForm.sellType" autocomplete="off"></el-input> -->
        <el-radio-group v-model="templateForm.sellType">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="101">仅APP</el-radio>
          <el-radio :label="201">仅小程序</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分销 -->
      <el-row :gutter="20">
        <el-col :span="12">
           <el-form-item label="分销信息">
            <el-button @click="sellFromChange"> 分销信息管理 </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 新用户促销价格 -->
      <el-row :gutter="20" v-if="activeType === 301">
        <el-col :span="12">
          <el-form-item label="开启新用户优惠">
            <!-- <el-input v-model="templateForm.sellType" autocomplete="off"></el-input> -->
            <el-radio-group v-model="templateForm.isFirstOrderPrice">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="templateForm.isFirstOrderPrice">
          <el-form-item label="新用户购买价格"  prop="firstOrderPrice">
            <el-input v-model="templateForm.firstOrderPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="主图">
        <upload @fileChange="chooseImg" class="avatar-uploader" :width="343" :height="160" style="width: 172px;height: 80px; line-height: 80px">
          <img v-if="templateForm.mainImgUrl" :src="templateForm.mainImgUrl" class="avatar">
          <i v-else class="el-icon-plus"></i>
        </upload>
        <div class="test_container">
          <span>示例：</span>
          <img src="../../../assets/test_1.png" alt="">  
        </div>
        <div class="img_size_text">推荐尺寸: {{ 686 }} * {{ 320 }}</div>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="封面">
        <upload @fileChange="chooseImg_imgUrlSquare" :width="244" :height="254" style="width: 122px;height: 127px; line-height: 127px">
          <img v-if="templateForm.imgUrlSquare" :src="templateForm.imgUrlSquare" class="avatar" style="width: 122px;height: 127px">
          <i v-else class="el-icon-plus"></i>
        </upload>
        <div class="test_container">
          <span>示例：</span>
          <img class="" src="../../../assets/test_2.png" alt="">  
        </div>
        <div class="img_size_text">推荐尺寸: {{ 244 }} * {{ 254 }}</div>
      </el-form-item>
      <!-- 海报 -->
      <el-form-item label="海报">
        <upload @fileChange="chooseImg_poster" :width="375" :height="667" style="width: 122px;height: 127px; line-height: 127px">
          <img v-if="templateForm.poster" :src="templateForm.poster" class="avatar" style="width: 122px;height: 127px">
          <i v-else class="el-icon-plus"></i>
        </upload>
        <div class="img_size_text">推荐尺寸: {{ 750 }} * {{ 1334 }}</div>
      </el-form-item>
      <!-- <el-form-item label="上架" >
        <el-switch
          v-model="templateForm.showToC">
        </el-switch>
      </el-form-item> -->
      <el-form-item label="活动地址"  prop="address" v-if="activeType === 301">
        <el-input v-model="templateForm.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" v-if="activeType === 301" >
        <el-input v-model="templateForm.doorAdd" autocomplete="off" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="地址坐标" v-if="activeType === 301">
        <el-input v-model="templateForm.point" autocomplete="off" placeholder="请选择坐标" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item v-if="activeType === 301">
        <div>
          <map-box :lat="templateForm.lat" :lng="templateForm.lng" :address="templateForm.address" @chooseAddressPoint="chooseAddressPoint" ref="myMap" @getDataList="getAddList"></map-box>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active++">下一步</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
    <div v-show="active === 1">
      <el-form-item label="分组" v-if="!isMarket&&activeType===301">
        <el-radio-group v-model="checkGroupId">
          <el-radio-button :key="item.id" v-for="item in groupsThird" :label="item.id">{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动时间" prop="time" v-if="activeType===301">
        <el-date-picker
          v-model="templateForm.time"
          type="datetimerange"
          align="right"
          :editable="false"
          :time-arrow-control = "true"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="['00:00:00', '00:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="凭证使用时间" prop="useTime" v-if="activeType===301">
        <el-date-picker
          v-model="templateForm.useTime"
          type="datetimerange"
          align="right"
          :editable="false"
          :time-arrow-control = "true"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="['00:00:00', '00:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="说明" v-if="activeType===301">
        <el-input v-model="templateForm.expla" autocomplete="off" placeholder="请输入促销活动说明"></el-input>
      </el-form-item>
      <el-form-item label="详情" >
        <quill-editor ref="shopDetailInfo" :pro_content="templateForm.fullText"  @contentChange="contentChange"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active--">上一步</el-button>
        <el-button type="primary" @click="active++">下一步</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
    <div v-show="active === 2">
      <el-form-item label="注意事项" >
        <kv-edit :data="templateForm.attention" @changeData="getKvData"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active--">上一步</el-button>
        <el-button type="primary" @click="active++">下一步</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
    <div v-show="active === 3">
      <el-form-item label="风采展示" >
        <photo-show :data="templateForm.photoShow" @changeData="getPhotoShowData"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active--">上一步</el-button>
        <el-button type="primary" @click="active++">下一步</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
    <div v-show="active === 4" v-if="activeType===301">
      <el-form-item label="信息填写" >
        <kv-mess :length="3" :data="templateForm.enterMess" @changeData="changeKvmess"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active--">上一步</el-button>
        <el-button type="primary" @click="submitForm">立即提交</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
  </el-form>
    <!-- 开启分销的弹窗 -->
  <el-dialog :title="'分销信息管理'" :close-on-click-modal="false" :visible.sync="openSell" width="650px" append-to-body>
    <sell-form ref="sellForm"  v-if="openSell" @cancel="openSell=false" @success="changeSellData"></sell-form>
  </el-dialog>
</div>
</template>
<script>
import MapBox from '../../utils/map.vue'
import { timestamp } from '../../../utils/timeChange.js'
import Upload from '../../utils/upload.vue'
import quillEditor from '../../utils/editor'
import { getGroup, getGroupChild } from '../utils/getGroup.js'
import PhotoShow from '../utils/PhotoShow.vue'
import kvEdit from '../utils/kvMessage'
import kvMess from '../enterName/kvMess.vue'
import SellForm from '../utils/sellForm.vue'
import { promises } from 'fs'
export default {
  props: {
    formType: {},
    activeType: {}
  },
  components: {
    Upload,
    MapBox,
    quillEditor,
    PhotoShow,
    kvEdit,
    SellForm,
    kvMess
  },
  data() {
    var trim = (rule, value, callback) => {
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
      active: 0,
      openSell: false,
      phoneType: '1',
      enterPhoneNum: '',
      enterPhoneNum_: '',
      enterPhoneNum_2: '',
      templateForm: {
        id: '',
        totalCanBuy: 1,
        price: '',
        isFirstOrderPrice: 0,
        firstOrderPrice: '',
        mainImgUrl: '',
        imgUrlSquare: '',
        showPrice: '',
        totalNum: '',
        sysPrice: 0,
        name: '',
        time: [],
        useTime: [],
        phoneNum: '',
        expla: '',
        poster: '',
        showToC: false,
        fullText: '',
        photoShow: '[]',
        attention: '[]',
        address: '',
        doorAdd: '',
        point: '',
        lat: '',
        lng: '',
        resellPrice: 0,
        resellerText:'',
        resellerPoster: '',
        sellType: 1,
        enterMess: '[]'
      },
      dataRule: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: trim, trigger: 'blur' }
        ],
        totalNum: [
          { required: true, message: '总数量为必填项', trigger: 'blur' },
          { validator: int, trigger: 'blur'}
        ],
        endUseTime: [
          { required: true, message: '结束时间为必填项', trigger: 'blur' }
        ],
        showPrice: [
          { required: true, message: '划线金额为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        price: [
          { required: true, message: '促销价格为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        firstOrderPrice: [
          { required: true, message: '新用户购买价格为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        sysPrice: [
          { required: true, message: '系统回收金额为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ],
        time: [
          { required: true, message: '请选择活动时间', trigger: 'blur' }
        ],
        useTime: [
          { required: true, message: '请选择凭证使用时间', trigger: 'blur' }
        ],
        totalCanBuy: [
          { required: true, message: '购买数量为必填项', trigger: 'blur' },
          { validator: number, trigger: 'blur'}
        ]
      },
      // 分组
      groups: [],
      isMarket: false,
      groupsThird: [],
      checkGroupId: ''
    }
  },
  methods: {
    changeKvmess(data) {
      this.templateForm.enterMess = data
    },
    // 打开信息
    sellFromChange() {
      this.openSell = true
      this.$nextTick(() => {
        this.$refs.sellForm.init(this.templateForm)
      })
    },
    // 选取海报
    chooseImg_poster(data) {
      this.templateForm.poster = data
    },
    // 修改分销信息
    changeSellData(data) {
      this.templateForm.resellPrice = data.resellPrice
      this.templateForm.resellerText = data.resellerText
      this.templateForm.resellerPoster = data.resellerPoster
      this.openSell = false
    },
    // 获取地址信息
    chooseAddressPoint(point) {
      this.templateForm.point = point.lat + ',' + point.lng
      this.templateForm.address = point.address
    },
    chooseAddress(data){
    },
    getAddList(val) {
      this.options = []
      const data = val ? val.map((v, i, a) => {
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
      }) : []
    },
    contentChange(data) {
      this.templateForm.fullText = data
    },
    // 获得风采展示数据
    getPhotoShowData(data) {
      this.templateForm.photoShow = data
    },
    // 获得注意事项数据
    getKvData(data) {
      this.templateForm.attention = data
    },
    init({ data }) {
      const url = this.apiList.shop.template.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: data.id }, url, true)
      }).then(({ data }) => {
        if (this.$cookie.get('moduleType') == '301') {
          this.isMarket = true
        }
        this.templateForm.totalCanBuy = data.data.totalCanBuy
        this.templateForm.enterMess = data.data.enterMess? data.data.enterMess: '[]'
        this.templateForm.id = data.data.id
        this.templateForm.name = data.data.name
        this.templateForm.showPrice = data.data.showPrice / 100
        this.templateForm.sysPrice = data.data.sysPrice ? data.data.sysPrice / 100 : 0
        this.templateForm.price = data.data.price / 100
        this.templateForm.totalNum = data.data.totalNum
        this.templateForm.mainImgUrl = data.data.mainImgUrl
        this.templateForm.imgUrlSquare = data.data.imgUrlSquare
        this.templateForm.showToC = data.data.showToC
        this.templateForm.fullText = data.data.fullText ? data.data.fullText : ''
        // 初始化模板的分销
        this.templateForm.sellType = data.data.sellType ? data.data.sellType : 1
        this.templateForm.resellPrice = data.data.resellPrice ? data.data.resellPrice/100 : 0
        this.templateForm.resellerText = data.data.resellerText
        this.templateForm.resellerPoster = data.data.resellerPoster
        // 初始化促销的时候需要时间和对应的分组
        if (this.activeType === 301 ) {
          // 新用户购买优惠
          if (data.data.firstOrderPrice != '' && data.data.firstOrderPrice !== -1) {
            this.templateForm.isFirstOrderPrice = 1
            this.templateForm.firstOrderPrice = data.data.firstOrderPrice / 100
          } 
          // 根据电话号码判断格式
          this.templateForm.expla = data.data.expla ? data.data.expla : ''
          this.templateForm.phoneNum = data.data.phoneNum ? data.data.phoneNum : ''
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
          this.templateForm.poster = data.data.poster ? data.data.poster : ''
          this.templateForm.time = []
          this.templateForm.time[0] = data.data.startTime
          this.templateForm.time[1] = data.data.endTime
          this.templateForm.useTime = []
          this.templateForm.useTime[0] = data.data.startUseTime
          this.templateForm.useTime[1] = data.data.endUseTime
          // this.groups = getGroup(data.data.activityGroupIds, 2)
          // this.groupsThird = getGroupChild(this.groups[0].id)
          // 初始化选择
          this.templateForm.lng = data.data.lng
          this.templateForm.lat = data.data.lat
          this.templateForm.point = data.data.lat + ',' + data.data.lng
          this.templateForm.doorAdd = data.data.doorAdd
          this.templateForm.address = data.data.address
          this.getGroup().then(() =>{
            if (data.data.activityGroupIds) {
              let arr = data.data.activityGroupIds.split(',')
              arr = arr.filter(item => item !== '')
              arr.forEach(item => {
                this.groupsThird.findIndex(v => v.id === Number(item)) !== -1 ? this.checkGroupId = Number(item) : ''
              })
            }
          })
        }
        this.templateForm.attention = data.data.attention ? data.data.attention : '[]'
        this.templateForm.photoShow = data.data.photoShow ? data.data.photoShow : '[]'
      })
    },
    getGroup() {
      if (this.$cookie.get('moduleType') === '301') {
        this.isMarket = true
        return
      }
      // 异步方法
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
    // 提交表单
    submitForm() {
      this.$refs['templateForm'].validate((valid) => {
        let url = this.apiList.shop.template.add
        if (this.formType === 'edit') {
          url = this.apiList.shop.template.edit
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.templateForm))
          submitData.type = Number(this.activeType)
          submitData.showPrice = Math.round(this.templateForm.showPrice * 100)
          submitData.sysPrice = Math.round(this.templateForm.sysPrice * 100)
          submitData.price = Math.round(this.templateForm.price * 100)
          if (this.activeType === 301) {
            // if (this.templateForm.isSell && submitData.resellPrice==0) {
            //   return this.$message({
            //     message: '您开启了分销但是未填写分销信息'
            //   })
            // }
            submitData.firstOrderPrice = -1
              if (this.templateForm.isFirstOrderPrice == 1) {
                if(!submitData.firstOrderPrice) {
                  return this.$message({
                    message: '您开启了新用户优惠但是未填写新用户购买价格'
                  })
                } else {
                  submitData.firstOrderPrice = Math.round(this.templateForm.firstOrderPrice * 100)
                }
              }
            if (submitData.resellPrice) {
              if (Number(submitData.resellPrice) > Number(submitData.price)) {
                return this.$message({
                  message: '分销金额不能超过促销金额'
                })
              }
              submitData.resellPrice = Math.round(submitData.resellPrice*100)
            } else {
              submitData.resellPrice = 0
              submitData.resellerPoster = ''
              submitData.resellerText = ''
            }
            submitData.startTime = typeof(this.templateForm.time[0]) === 'number' ? this.templateForm.time[0] : timestamp(this.templateForm.time[0])
            submitData.endTime = typeof(this.templateForm.time[1]) === 'number' ? this.templateForm.time[1] : timestamp(this.templateForm.time[1])
            submitData.startUseTime = typeof(this.templateForm.useTime[0]) === 'number' ? this.templateForm.useTime[0] : timestamp(this.templateForm.useTime[0])
            submitData.endUseTime = typeof(this.templateForm.useTime[1]) === 'number' ? this.templateForm.useTime[1] : timestamp(this.templateForm.useTime[1])
            submitData.lat = submitData.point ? submitData.point.split(',')[0] : ''
            submitData.lng = submitData.point ? submitData.point.split(',')[1] : ''
            // 添加促销模板
            // 根据checkGroupId 拼接groupid, 二级分类不变，添加三级分类
            submitData.activityGroupIds = []
            this.groups.forEach((v, i ,a) => {
              submitData.activityGroupIds.push(v.id)
            })
            submitData.activityGroupIds.push(this.checkGroupId)
            submitData.activityGroupIds = submitData.activityGroupIds.join(',')
            if (this.$cookie.get('moduleType') === '301') {
              submitData.activityGroupIds = "8"
            }
            if (this.templateForm.phoneNum === '' && this.enterPhoneNum === '' && this.enterPhoneNum_ === '' && this.enterPhoneNum_2 === '') {
              return this.$message.error('联系电话不能为空，请确认您填写的联系电话')
            } else {
              switch (this.phoneType) {
                case '1':
                  if (!/^1(3|4|7|5|8|9|6)([0-9]{9})/.test(this.templateForm.phoneNum)) {
                    return this.$message.error('您填写的手机号码格式有误，请确认您填写的联系电话')
                  }
                  break
                case '2':
                  this.templateForm.phoneNum = this.enterPhoneNum + '-' + this.enterPhoneNum_
                  if (!/^0[0-9]{2,3}-[0-9]{8}/.test(this.templateForm.phoneNum)) {
                    return this.$message.error('您填写的固定电话格式有误，请确认您填写的联系电话')
                  }
                  break
                case '3':
                  this.templateForm.phoneNum = this.enterPhoneNum + '-' + this.enterPhoneNum_ + '-' + this.enterPhoneNum_2
                  if (!/^400-[0-9]{3}-[0-9]{4}/.test(this.templateForm.phoneNum)) {
                    return this.$message.error('您填写的400号码格式有误，请确认您填写的联系电话')
                  }
                  break
              }
            }
          }
          this.active ++
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
        } else {
          // 做正则判断
          console.log(this.templateForm)
          // if(!this.templateForm.time.length == 0) {
          //   this.$message({
          //     message:'您还未设置活动时间',
          //     type: 'info'
          //   })
          //   this.active = 1
          //   return
          // }
          // if(!this.templateForm.useTime.length == 0) {
          //   this.$message({
          //     message:'您还未设置使用时间',
          //     type: 'info'
          //   })
          //   this.active = 1
          //   return
          // }
          if(this.templateForm.showPrice === '') {
            this.$message({
              message:'您还未设置原始价格',
              type: 'info'
            })
            this.active = 0
            return
          }
          if(this.templateForm.price === '') {
            this.$message({
              message:'您还未设置促销价格',
              type: 'info'
            })
            this.active = 0
            return
          }
          if(this.templateForm.totalNum === '') {
            this.$message({
              message:'您还未设置总数量',
              type: 'info'
            })
            this.active = 0
            return
          }
          if(!this.templateForm.name) {
            this.$message({
              message:'您还未设置名称',
              type: 'info'
            })
            this.active = 0
            return
          }
        }
      })
    },
    // 选择图片
    chooseImg(data) {
      this.templateForm.mainImgUrl = data
    },
    chooseImg_imgUrlSquare(data) {
      this.templateForm.imgUrlSquare = data
    },
    close() {
      this.$emit('close')
    },
    handleCheckedType() {
      
    }
  },
  // created() {
  //   this.getGroup()
  // }
}
</script>
<style lang="scss">
.templateForm{
  .update {
    width: 158px;
    height: 104px;
    line-height: 104px;
    overflow: hidden;
  }
  .el-step{
    cursor: pointer;
  }
  .inline{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    line-height: 48px;
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