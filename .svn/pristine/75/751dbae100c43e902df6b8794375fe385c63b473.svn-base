<template>
<div class="pmSaleForm">
  <el-form @submit.native.prevent :model="pmSaleForm" :rules="dataRule" :inline="false"  ref="pmSaleForm" label-width="110px" class="demo-ruleForm">
    <el-steps :active="active" finish-status="success" simple STYLE="margin-bottom: 15PX">
      <el-step title="基础信息" @click.native="active=0" />
      <el-step title="详细信息" @click.native="active=1" />
      <el-step title="注意事项" @click.native="active=2" />
      <el-step title="风采展示" @click.native="active=3" />
      <el-step title="信息填写" @click.native="active=4" />
    </el-steps>
    <canvas-form 
      ref="CanvasForm" 
      :type="301" 
      :imgUrl="pmSaleForm.mainImgUrl"
      :price="pmSaleForm.price"
      :endTime="pmSaleForm.time[1]"
      :showPrice="pmSaleForm.showPrice"/>
    <div v-show="active === 0" >
      <el-form-item label="ID" v-show="false">
        <el-input v-model="pmSaleForm.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称"  prop="name">
        <el-input v-model="pmSaleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- A端运营填写负责人 -->
      <el-form-item label="负责人" v-if="$cookie.get('moduleType') != $cookie.get('promoduleType')">
        <!-- <el-input v-model="pmSaleForm.charger" autocomplete="off" maxlength="4"></el-input> -->
        <list-charger :id="pmSaleForm.chargerId" :name="pmSaleForm.charger" @choose="chooseCharger"/>
      </el-form-item>
      <!-- 联系电话 -->
      <el-form-item label="联系电话" class="phone">
        <div class="inline">
          <el-select v-model="phoneType" placeholder="请选择" @change="enterPhoneNum ='' ; enterPhoneNum_ = ''; enterPhoneNum_2='' ; pmSaleForm.phoneNum ='';">
            <el-option label="手机号" value="1"></el-option>
            <el-option label="固定电话" value="2"></el-option>
            <el-option label="400电话" value="3"></el-option>
          </el-select>
        </div>
        <div class="inline" v-show="phoneType === '1'">
          <el-row>
            <el-col :span="24">
              <el-input type="text" v-model="pmSaleForm.phoneNum" autocomplete="off" maxlength="11"/>
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
      <!-- 自定义商户码 -->
      <el-form-item label="使用商户码">
        <el-radio-group v-model="pmSaleForm.useThirdCode">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商户码使用说明" v-if="pmSaleForm.useThirdCode">
        <el-input type="textarea" :rows="8" v-model="pmSaleForm.thirdCodeExp"></el-input>
      </el-form-item>
      <!-- 数量 -->
      <el-row :gutter="20">
        <el-col :span="12" v-if="!pmSaleForm.useThirdCode">
          <el-form-item label="总数量"  prop="totalNum">
            <el-input v-model="pmSaleForm.totalNum" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大购买次数"  prop="totalCanBuy">
            <el-input v-model="pmSaleForm.totalCanBuy" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 价格 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="促销价格"  prop="price">
            <el-input v-model="pmSaleForm.price" autocomplete="off" @input="pmSaleForm.moduleGetPrice = Math.round(pmSaleForm.price * Number($cookie.get('moduleGetPrice')) * 100) / 100"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原始价格"  prop="showPrice">
            <el-input v-model="pmSaleForm.showPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 销售渠道 -->
      <el-form-item label="销售渠道">
        <!-- <el-input v-model="pmSaleForm.sellType" autocomplete="off"></el-input> -->
        <el-radio-group v-model="pmSaleForm.sellType">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="101">仅APP</el-radio>
          <el-radio :label="201">仅小程序</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 新用户促销价格 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开启新用户优惠">
            <!-- <el-input v-model="pmSaleForm.sellType" autocomplete="off"></el-input> -->
            <el-radio-group v-model="pmSaleForm.isFirstOrderPrice">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="pmSaleForm.isFirstOrderPrice">
          <el-form-item label="新用户购买价"  prop="firstOrderPrice">
            <el-input v-model="pmSaleForm.firstOrderPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-else>
          <el-form-item label="平台每单抽佣">
            <el-input v-model="pmSaleForm.sysPrice" :disabled="$cookie.get('loginType') != 'entrya'" autocomplete="off" placeholder="该功能即将弃用，请谨慎使用"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="商户结算价" prop="moduleGetPrice">
        <el-input v-model="pmSaleForm.moduleGetPrice" :disabled="$cookie.get('loginType') != 'entrya'" autocomplete="off" ></el-input>
      </el-form-item>
      <!-- 分销 -->
      <el-row :gutter="20">
        <!-- <el-col :span="12">
          <el-form-item label="开启分销">
            <el-radio-group v-model="pmSaleForm.isSell">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
           <el-form-item label="分销信息" v-if="pmSaleForm.isSell">
            <el-button @click="sellFromChange"> 分销信息管理 </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="主图">
        <upload @fileChange="chooseImg" class="avatar-uploader" :width="343" :height="160" style="width: 172px;height: 80px; line-height: 80px">
          <img v-if="pmSaleForm.mainImgUrl" :src="pmSaleForm.mainImgUrl" class="avatar">
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
          <img v-if="pmSaleForm.imgUrlSquare" :src="pmSaleForm.imgUrlSquare" class="avatar" style="width: 122px;height: 127px">
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
        <upload @fileChange="chooseImg_poster" :width="375" :height="667" style="width: 122px;height: 220px; line-height: 220px">
          <img v-if="pmSaleForm.poster" :src="pmSaleForm.poster" class="avatar" style="width: 122px">
          <i v-else class="el-icon-plus"></i>
        </upload>
        <i class="el-icon-close" v-if="pmSaleForm.poster"  @click="pmSaleForm.poster = ''" style="position: absolute; left: 100px; top: 10px; color: red;"></i>
        <!-- <div class="test_container">
          <span>示例：</span>
          <img class="" src="../../../assets/test_2.png" alt="">  
        </div> -->
        <div class="img_size_text">推荐尺寸: {{ 750 }} * {{ 1334 }}</div>
      </el-form-item>
      <!-- <el-form-item label="上架" >
        <el-switch
          v-model="pmSaleForm.showToC">
        </el-switch>
      </el-form-item> -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="活动地址"  prop="address">
            <el-input v-model="pmSaleForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详细地址">
            <el-input v-model="pmSaleForm.doorAdd" autocomplete="off" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址坐标" >
        <el-input v-model="pmSaleForm.point" autocomplete="off" placeholder="请选择坐标" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <map-box :lat="pmSaleForm.lat" :lng="pmSaleForm.lng" :address="pmSaleForm.address" @chooseAddressPoint="chooseAddressPoint" ref="myMap" @getDataList="getAddList"></map-box>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active++">下一步</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
    <div v-show="active === 1">
      <el-form-item label="分组" v-if="!isMarket">
        <el-radio-group v-model="checkGroupId">
          <el-radio-button :key="item.id" v-for="item in groupsThird" :label="item.id">{{ item.label }}</el-radio-button>
        </el-radio-group>
        <!-- <el-checkbox v-for="(item, idx) in groupsThird" :key="item.id" border @change="handleCheckedType(item.checked, item.id, idx)">{{ item.label }}</el-checkbox> -->
      </el-form-item>
      <el-form-item label="活动时间" prop="time">
        <el-date-picker
          v-model="pmSaleForm.time"
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
          v-model="pmSaleForm.useTime"
          type="datetimerange"
          align="right"
          :editable="false"
          :time-arrow-control = "true"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="['00:00:00', '00:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="pmSaleForm.expla" autocomplete="off" placeholder="请输入促销活动说明"></el-input>
      </el-form-item>
      <el-form-item label="详情" >
        <quill-editor ref="shopDetailInfo" :pro_content="pmSaleForm.fullText"  @contentChange="contentChange"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active--">上一步</el-button>
        <el-button type="primary" @click="active++">下一步</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
    <div v-show="active === 2">
      <el-form-item label="注意事项" >
        <kv-edit :data="pmSaleForm.attention" @changeData="getKvData"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active--">上一步</el-button>
        <el-button type="primary" @click="active++">下一步</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
    <div v-show="active === 3">
      <el-form-item label="风采展示" >
        <photo-show :data="pmSaleForm.photoShow" @changeData="getPhotoShowData"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active--">上一步</el-button>
        <el-button type="primary" @click="active++">下一步</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </div>
    <div v-show="active === 4">
      <el-form-item label="信息填写" >
        <kv-mess :length="3" :data="pmSaleForm.enterMess" @changeData="changeKvmess"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="active--">上一步</el-button>
        <el-button type="primary" @click="submitForm">立即提交</el-button>
        <el-button @click="close">取消</el-button>
        <el-checkbox style="float: right;" v-if="isNew && isAuth('/activityTemplate/add')" v-model="saveData">保存为新模板</el-checkbox>
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
import ListCharger from '../../utils/listCharger.vue'
import SellForm from '../utils/sellForm.vue'
import MapBox from '../../utils/map.vue'
import { timestamp } from '../../../utils/timeChange.js'
import Upload from '../../utils/upload.vue'
import quillEditor from '../../utils/editor'
import { getGroup, getGroupChild } from '../utils/getGroup.js'
import { submitApprove } from '../utils/fullData.js'
import PhotoShow from '../utils/PhotoShow.vue'
// import kvEdit from '../utils/kv'
import kvEdit from '../utils/kvMessage'
import kvMess from '../enterName/kvMess.vue'
import CanvasForm from '../utils/canvas'
export default {
  props: {
    formType: {}
  },
  components: {
    Upload,
    ListCharger,
    quillEditor,
    PhotoShow,
    kvEdit,
    MapBox,
    SellForm,
    kvMess,
    CanvasForm
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
      if (!/^(\-|\+)?(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)|([0-9]*))$/.test(value)) {
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
      openSell: false,
      isNew: true,
      saveData: false,
      width: 316,
      height: 208,
      active: 0,
      phoneType: '1',
      enterPhoneNum: '',
      enterPhoneNum_: '',
      enterPhoneNum_2: '',
      pmSaleForm: {
        id: '',
        charger: '',
        moduleGetPrice: 0,
        isFirstOrderPrice: 0,
        firstOrderPrice: '',
        price: '',
        isSell: 1,
        totalCanBuy: 1,
        resellPrice: 0,
        resellerText:'',
        resellerPoster: '',
        mainImgUrl: '',
        chargerId: '',
        imgUrlSquare: '',
        showPrice: '',
        sysPrice: '',
        totalNum: '',
        name: '',
        phoneNum: '',
        time: [],
        useTime: [],
        showToC: false,
        fullText: '',
        expla: '',
        photoShow: '[]',
        attention: '[]',
        address: '',
        doorAdd: '',
        point: '',
        lat: '',
        lng: '',
        sellType: 1,
        enterMess: '[]',
        poster: '',
        useThirdCode: false, // 是否使用商户码
        thirdCodeExp: '',  // 商户码使用说明富文本
        wxMiniShareImg: ''
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
        sysPrice: [
          { required: true, message: '系统回收金额为必填项', trigger: 'blur' },
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
        moduleGetPrice: [
          { required: true, message: '商户结算价为必填项', trigger: 'blur' },
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
      checkGroupId: '',
    }
  },
  methods: {
    chooseCharger(data) {
      this.pmSaleForm.charger = data.name
      this.pmSaleForm.chargerId = data.id
    },
    changeKvmess(data) {
      this.pmSaleForm.enterMess = data
    },
    // 打开信息
    sellFromChange() {
      this.openSell = true
      this.$nextTick(() => {
        this.$refs.sellForm.init(this.pmSaleForm)
      })
    },
    // 修改分销信息
    changeSellData(data) {
      this.pmSaleForm.resellPrice = data.resellPrice
      this.pmSaleForm.resellerText = data.resellerText
      this.pmSaleForm.resellerPoster = data.resellerPoster
      this.openSell = false
    },
    // 获取地址信息
    chooseAddressPoint(point) {
      this.pmSaleForm.point = point.lat + ',' + point.lng
      this.pmSaleForm.address = point.address
    },
    chooseAddress(data){
      // const _idx = this.options.findIndex(item => item.title === data)
      // console.log(this.options[_idx])
      // this.pmSaleForm.lat = this.options[_idx].lat
      // this.pmSaleForm.lng = this.options[_idx].lng
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
      // this.$nextTick(() => {
      //   this.$refs.addSelect.focus()
      // })
    },
    // 富文本修改
    contentChange(data) {
      this.pmSaleForm.fullText = data
    },
    // 获得风采展示数据
    getPhotoShowData(data) {
      this.pmSaleForm.photoShow = data
    },
    // 获得注意事项数据
    getKvData(data) {
      this.pmSaleForm.attention = data
    },
    // 修改时获得促销的原数据
    init({ data }) {
      // this.isNew = false
      const url = this.apiList.shop.pmSale.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: data.activityId }, url, true)
      }).then(({ data }) => {
        if (this.$cookie.get('moduleType') == '301') {
          this.isMarket = true
        }
        if (data.data.firstOrderPrice != '' && data.data.firstOrderPrice !== -1) {
          this.pmSaleForm.isFirstOrderPrice = 1
          this.pmSaleForm.firstOrderPrice = data.data.firstOrderPrice / 100
        }
        // 根据电话号码判断格式
        this.pmSaleForm.expla = data.data.expla ? data.data.expla : ''
        this.pmSaleForm.phoneNum = data.data.phoneNum ? data.data.phoneNum : ''
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
        this.pmSaleForm.chargerId = data.data.chargerId
        this.pmSaleForm.enterMess = data.data.enterMess? JSON.stringify(data.data.enterMess): '[]'
        this.pmSaleForm.id = data.data.activityId
        this.pmSaleForm.name = data.data.name
        this.pmSaleForm.charger = data.data.charger
        this.pmSaleForm.totalCanBuy = data.data.totalCanBuy
        this.pmSaleForm.showPrice = data.data.showPrice / 100
        this.pmSaleForm.sysPrice = data.data.sysPrice ? data.data.sysPrice / 100 : 0
        this.pmSaleForm.moduleGetPrice = data.data.moduleGetPrice > 0 ? data.data.moduleGetPrice / 100 : data.data.moduleGetPrice
        // this.pmSaleForm.moduleGetPrice = data.data.moduleGetPrice > 0 ? data.data.moduleGetPrice / 100 : Math.round(data.data.price * Number(this.$cookie.get('moduleGetPrice')) * 100) / 100 / 100
        this.pmSaleForm.price = data.data.price / 100
        this.pmSaleForm.totalNum = data.data.totalNum
        this.pmSaleForm.mainImgUrl = data.data.imgUrl
        this.pmSaleForm.imgUrlSquare = data.data.imgUrlSquare
        this.pmSaleForm.showToC = data.data.showToC
        this.pmSaleForm.sysDown = data.data.sysDown
        this.pmSaleForm.fullText = data.data.fullText ? data.data.fullText : ''
        this.pmSaleForm.time = []
        this.pmSaleForm.time[0] = data.data.startTime
        this.pmSaleForm.time[1] = data.data.endTime
        this.pmSaleForm.useTime = []
        this.pmSaleForm.useTime[0] = data.data.startUseTime
        this.pmSaleForm.useTime[1] = data.data.endUseTime
        this.pmSaleForm.sellType = data.data.sellType
        // 商户码信息
        this.pmSaleForm.useThirdCode = data.data.useThirdCode
        this.pmSaleForm.thirdCodeExp = data.data.thirdCodeExp
        // 地址信息
        this.pmSaleForm.lng = data.data.lng
        this.pmSaleForm.lat = data.data.lat
        this.pmSaleForm.point = data.data.lat + ',' + data.data.lng
        this.pmSaleForm.doorAdd = data.data.doorAdd
        this.pmSaleForm.address = data.data.address
        this.pmSaleForm.poster = data.data.poster ? data.data.poster : ''
        // 分销价格信息
        // if (data.data.resellPrice) {
          this.pmSaleForm.isSell = 1
          this.pmSaleForm.resellPrice = data.data.resellPrice/100
          this.pmSaleForm.resellerText = data.data.resellerText
          this.pmSaleForm.resellerPoster = data.data.resellerPoster
        // }
        // this.pmSaleForm.attention = data.data.attention && data.data.attention.length > 0 ? JSON.stringify(data.data.attention) : '[]'
        const attentionArr = []
        // 将注意事项转换成对应的值
        const attention = data.data.attention && data.data.attention.length > 0 ? data.data.attention : []
        attention.forEach( element => {
          attentionArr.push({
            id: element.id,
            noteKey: element.noteKey,
            noteValue: element.noteValue
          })
        })
        this.pmSaleForm.attention = JSON.stringify(attentionArr)
        // 将风采展示转换成对应的值
        const photoShowArr = []
        const photoShow = data.data.photoShow && data.data.photoShow.length > 0 ? data.data.photoShow : []
        photoShow.forEach( element => {
          photoShowArr.push({
            id: element.id,
            url: element.imgUrl
          })
        })
        this.pmSaleForm.photoShow = JSON.stringify(photoShowArr)
        this.groups = getGroup(data.data.groupIds, 2)
        this.groupsThird = getGroup(data.data.groupIds, 3)
        // 初始化选择
        if (data.data.activityGroupIds) {
          let arr = data.data.activityGroupIds.split(',')
          arr = arr.filter(item => item !== '')
          arr.forEach(item => {
            this.groupsThird.findIndex(v => v.id === Number(item)) !== -1 ? this.checkGroupId = Number(item) : ''
          })
        }
        // 初始完数据之后绘制小程序分享图片
        this.pmSaleForm.wxMiniShareImg = data.data.wxMiniShareImg
        this.$nextTick(() => {
          this.$refs.CanvasForm.changeimg = false
        })
      })
    },
    // 通过模板写入数据
    setData(data) {
      this.isNew = false
      if (data.firstOrderPrice != '' && data.firstOrderPrice !== -1) {
        this.pmSaleForm.isFirstOrderPrice = 1
        this.pmSaleForm.firstOrderPrice = data.firstOrderPrice / 100
      }
      if (data.phoneNum) {
        if (data.phoneNum.indexOf('-') === -1 || data.phoneNum === '') {
          this.phoneType = '1'
        } else if (data.phoneNum.indexOf('-') === 3) {
          this.phoneType = '3'
          this.enterPhoneNum = data.phoneNum.split('-')[0]
          this.enterPhoneNum_ = data.phoneNum.split('-')[1]
          this.enterPhoneNum_2 = data.phoneNum.split('-')[2]
        } else if (data.phoneNum.indexOf('-') === 4) {
          this.phoneType = '2'
          this.enterPhoneNum = data.phoneNum.split('-')[0]
          this.enterPhoneNum_ = data.phoneNum.split('-')[1]
        }
      }
      this.pmSaleForm.charger = data.charger
      this.pmSaleForm.chargerId = data.chargerId
      this.pmSaleForm.totalCanBuy = data.totalCanBuy
      this.pmSaleForm.expla = data.expla ? data.expla : ''
      this.pmSaleForm.phoneNum = data.phoneNum ? data.phoneNum : ''
      this.pmSaleForm.name = data.name
      this.pmSaleForm.sellType = data.sellType ? data.sellType : 1
      this.pmSaleForm.showPrice = data.showPrice / 100
      this.pmSaleForm.sysPrice = data.sysPrice ?  data.sysPrice / 100 : 0
      this.pmSaleForm.moduleGetPrice = data.moduleGetPrice > 0 ? data.moduleGetPrice / 100 : data.moduleGetPrice
      // this.pmSaleForm.moduleGetPrice = data.moduleGetPrice > 0 ? data.moduleGetPrice / 100 :  Math.round(data.price * Number(this.$cookie.get('moduleGetPrice')) * 100) / 100 / 100
      this.pmSaleForm.price = data.price / 100
      this.pmSaleForm.totalNum = data.totalNum
      this.pmSaleForm.mainImgUrl = data.mainImgUrl
      this.pmSaleForm.imgUrlSquare = data.imgUrlSquare
      // this.pmSaleForm.showToC = data.showToC
      this.pmSaleForm.fullText = data.fullText ? data.fullText : ''
      this.pmSaleForm.time = []
      this.pmSaleForm.time[0] = data.startTime
      this.pmSaleForm.time[1] = data.endTime
      this.pmSaleForm.useTime = []
      this.pmSaleForm.useTime[0] = data.startUseTime
      this.pmSaleForm.useTime[1] = data.endUseTime
      this.pmSaleForm.attention = data.attention
      this.pmSaleForm.photoShow = data.photoShow
      this.pmSaleForm.lng = data.lng
      this.pmSaleForm.lat = data.lat
      this.pmSaleForm.poster = data.poster ? data.poster : ''
      this.pmSaleForm.point = data.lat + ',' + data.lng
      this.pmSaleForm.doorAdd = data.doorAdd
      this.pmSaleForm.address = data.address
      // 分销价格信息
      this.pmSaleForm.enterMess = data.enterMess? data.enterMess: '[]'
      if (data.activityGroupIds) {
        this.groups = getGroup(data.activityGroupIds, 2)
        this.groupsThird = getGroupChild(this.groups[0].id)
        let arr = data.activityGroupIds.split(',')
        arr = arr.filter(item => item !== '')
        arr.forEach(item => {
          this.groupsThird.findIndex(v => v.id === Number(item)) !== -1 ? this.checkGroupId = Number(item) : ''
        })
      } else {
        this.getGroup()
      }
      // 分销信息提示
      if (data.resellPrice) {
        this.$confirm('该模板包含分销信息，是否使用模板的分销信息?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
        ).then(() => {
          this.pmSaleForm.resellPrice = data.resellPrice/100
          this.pmSaleForm.resellerText = data.resellerText
          this.pmSaleForm.resellerPoster = data.resellerPoster
        })
      }
    },
    getGroup() {
      if (this.$cookie.get('moduleType') === '301') {
        this.isMarket = true
        return
      }
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
      })
    },
    // 点击提交表单
    submitForm() {
      if(!this.pmSaleForm.wxMiniShareImg) {
        const vm = JSON.parse(JSON.stringify(this.pmSaleForm))
        const formData = {
          type: 301,
          imgUrl: vm.mainImgUrl,
          lotteryStartTime: vm.lotteryStartTime,
          price: vm.price,
          showPrice: vm.showPrice,
          endTime: vm.endTime,
        }
        this.$refs.CanvasForm.drawImg(formData).then(() => {
          this.$refs.CanvasForm.upload().then((data) => {
            this.pmSaleForm.wxMiniShareImg = data
            this.submit()
          })
        })
      } else {
        this.$refs.CanvasForm.finish().then((data) => {
          this.pmSaleForm.wxMiniShareImg = data
          this.submit()
        }).catch(() => {
          this.submit()
        })
      }
    },
    // 发送提交表单请求
    submit() {
      this.$refs['pmSaleForm'].validate((valid) => {
        let url = this.apiList.shop.pmSale.add
        if (this.formType === 'edit') {
          url = this.apiList.shop.pmSale.edit
        }
        if (!(this.pmSaleForm.phoneNum === ''  && this.enterPhoneNum_ === '' && this.enterPhoneNum_2 === '')) {
          switch (this.phoneType) {
            case '1':
              if (!/^1(3|4|7|5|8|9|6)([0-9]{9})/.test(this.pmSaleForm.phoneNum)) {
                return this.$message.error('您填写的手机号码格式有误，请确认您填写的联系电话')
              }
              break
            case '2':
              this.pmSaleForm.phoneNum = this.enterPhoneNum + '-' + this.enterPhoneNum_
              if (!/^0[0-9]{2,3}-[0-9]{8}/.test(this.pmSaleForm.phoneNum)) {
                return this.$message.error('您填写的固定电话格式有误，请确认您填写的联系电话')
              }
              break
            case '3':
              this.pmSaleForm.phoneNum = this.enterPhoneNum + '-' + this.enterPhoneNum_ + '-' + this.enterPhoneNum_2
              if (!/^400-[0-9]{3}-[0-9]{4}/.test(this.pmSaleForm.phoneNum)) {
                return this.$message.error('您填写的400号码格式有误，请确认您填写的联系电话')
              }
              break
          }
        }
        if (valid) {
          const submitData = JSON.parse(JSON.stringify(this.pmSaleForm))
          // if (this.pmSaleForm.isSell && submitData.resellPrice==0) {
          //   return this.$message({
          //     message: '您开启了分销但是未填写分销信息'
          //   })
          // }
          if (submitData.resellPrice) {
            if (Number(submitData.resellPrice) > Number(submitData.price)) {
              return this.$message({
                message: '分销金额不能超过促销金额'
              })
            }
            submitData.resellPrice = Math.round(submitData.resellPrice*100)
          } 
          // else {
          //   submitData.resellPrice = 0
          //   submitData.resellerPoster = ''
          //   submitData.resellerText = ''
          // }
          if(submitData.useThirdCode) {
            submitData.totalNum = ''
          } else {
            submitData.thirdCodeExp = ''
          }
          submitData.startTime = typeof(this.pmSaleForm.time[0]) === 'number' ? this.pmSaleForm.time[0] : timestamp(this.pmSaleForm.time[0])
          submitData.endTime = typeof(this.pmSaleForm.time[1]) === 'number' ? this.pmSaleForm.time[1] : timestamp(this.pmSaleForm.time[1])
          submitData.startUseTime = typeof(this.pmSaleForm.useTime[0]) === 'number' ? this.pmSaleForm.useTime[0] : timestamp(this.pmSaleForm.useTime[0])
          submitData.endUseTime = typeof(this.pmSaleForm.useTime[1]) === 'number' ? this.pmSaleForm.useTime[1] : timestamp(this.pmSaleForm.useTime[1])
          submitData.showPrice = Math.round(this.pmSaleForm.showPrice * 100)
          submitData.sysPrice = this.pmSaleForm.moduleGetPrice >= 0 ? 0 : Math.round(this.pmSaleForm.sysPrice * 100)
          submitData.moduleGetPrice = submitData.sysPrice > 0 ? -1 : this.pmSaleForm.moduleGetPrice >= 0 ? Math.round(this.pmSaleForm.moduleGetPrice * 100) : -1
          submitData.price = Math.round(this.pmSaleForm.price * 100)
          submitData.firstOrderPrice = -1
          if (this.pmSaleForm.isFirstOrderPrice == 1) {
            submitData.sysPrice = 0
            if(!submitData.firstOrderPrice) {
              return this.$message({
                message: '您开启了新用户优惠但是未填写新用户购买价格'
              })
            } else {
              submitData.firstOrderPrice = Math.round(this.pmSaleForm.firstOrderPrice * 100)
            }
          }
          
          // 系统回收金额
          if (Number(submitData.sysPrice) > Number(submitData.price) - Number(submitData.resellPrice)) {
            return this.$message({
              message: '回收金额不能超过促销金额'
            })
          }
          // 坐标
          submitData.lat = submitData.point ? submitData.point.split(',')[0] : ''
          submitData.lng = submitData.point ? submitData.point.split(',')[1] : ''
          if (submitData.lat == 'null') {
            this.$message('请选择促销活动地址')
            this.active = 0
            return
          }
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
          const submit = () => {
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'post',
              data: this.$http.adornData(submitData, url, true)
            }).then(({ data }) => {
              if (data.result) {
                this.active ++
                if (this.saveData) {
                  const url = this.apiList.shop.template.add
                  const formData = submitData
                  formData.type = 301
                  this.$http({
                    url: this.$http.adornUrl(url),
                    method: 'post',
                    data: this.$http.adornData(formData, url, true)
                  }).then(({ data }) => {
                    if (data.result) {
                      this.$message({ type: 'success', message: '提交成功' })
                      this.$emit('success')
                    }
                  })
                } else {
                  this.$message({ type: 'success', message: '提交成功' })
                  this.$emit('success')
                }
              } else {
                // this.$message({ message: data.msg, type: 'warning' })
                // this.$emit('close')
              }
            })
          }
          // 判断已上架的活动修改需要调用submitApprove请求
          const isAdmin = this.$cookie.get('moduleType') != this.$cookie.get('promoduleType')
          if (!isAdmin) {
            if(this.formType == 'edit' && submitData.showToC) {
              submitApprove(301, submitData).then(() => {
                this.$message({ type: 'success', message: '您的修改审批已提交' })
                this.$emit('success')
              })
            } else {
              submit()
            }
          } else {
            if (this.formType === 'edit' && this.pmSaleForm.sysDown && this.pmSaleForm.showToC) {
              this.$confirm('当前活动因过期或售罄已被系统自动下架，提交后将会重新上架显示，是否确定?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                submit()
              }).catch(() => {
                return false
              })
            } else {
              submit()
            }
          }
        } else {
          // 做正则判断
          
          if(this.pmSaleForm.time.length == 0) {
            this.$message({
              message:'您还未设置活动时间',
              type: 'info'
            })
            this.active = 1
            return
          }
          if(this.pmSaleForm.useTime.length == 0) {
            this.$message({
              message:'您还未设置凭证使用时间',
              type: 'info'
            })
            this.active = 1
            return
          }
          if(this.pmSaleForm.showPrice === '') {
            this.$message({
              message:'您还未设置原始价格',
              type: 'info'
            })
            this.active = 0
            return
          }
          if(this.pmSaleForm.moduleGetPrice === '') {
            this.$message({
              message:'您还未设置店铺抽取价格',
              type: 'info'
            })
            this.active = 0
            return
          }
          // if(this.pmSaleForm.sysPrice === '') {
          //   this.$message({
          //     message:'您还未设置平台每单抽佣',
          //     type: 'info'
          //   })
          //   this.active = 0
          //   return
          // }
          if(this.pmSaleForm.totalCanBuy === '') {
            this.$message({
              message:'您还未设置最大购买次数',
              type: 'info'
            })
            this.active = 0
            return
          }
          if(this.pmSaleForm.price === '') {
            this.$message({
              message:'您还未设置促销价格',
              type: 'info'
            })
            this.active = 0
            return
          }
          if(this.pmSaleForm.useThirdCode && this.pmSaleForm.totalNum == '') {
            this.$message({
              message:'您还未设置总数量',
              type: 'info'
            })
            this.active = 0
            return
          }
          if(!this.pmSaleForm.name) {
            this.$message({
              message:'您还未设置名称',
              type: 'info'
            })
            this.active = 0
            return
          }
          if(this.pmSaleForm.firstOrderPrice == '') {
            this.$message({
              message:'您还未设置新用户购买价格',
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
      this.pmSaleForm.mainImgUrl = data
    },
    chooseImg_imgUrlSquare(data) {
      this.pmSaleForm.imgUrlSquare = data
    },
    // 选取海报
    chooseImg_poster(data) {
      this.pmSaleForm.poster = data
    },
    close() {
      this.$emit('close')
    },
    handleCheckedType() {
      
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
.pmSaleForm{
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