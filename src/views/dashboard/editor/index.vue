<template>
  <div class="dashboard-editor-container">
    <div class="headerContainer">
      <div class="item">
        <img src="../../../assets/index/icon.png" alt="">
        <!-- <p>今日交易额</p> -->
        <p>账户余额</p>
        <p><i>￥</i>{{ money }}</p>
        <img src="../../../assets/index/icon1.png" alt="" style="width: 86px;">
      </div>
      <div class="item">
        <img src="../../../assets/index/icon.png" alt="">
        <p>消息总量</p>
        <p>0</p>
        <img src="../../../assets/index/icon2.png" alt="" style="width: 114px;">
      </div>
      <div class="item">
        <img src="../../../assets/index/icon.png" alt="">
        <p>销售量</p>
        <p>{{ saleNum }}</p>
        <img src="../../../assets/index/icon3.png" alt="" style="width: 74px;">
      </div>
      <div class="item">
        <img src="../../../assets/index/banner.png" alt="" style="width: 100%; height: 100%;">
      </div>
    </div>
    <div class="main_body">
      <div class="shortcut main_body_item">
        <p class="body_header"><img src="../../../assets/index/shortcut.png">快捷键</p>
        <ul>
          <li v-if="isAuth('/moduleShop/modSelf')">
            <router-link to="/shopDetail">
              <div class="imgContainer">
                <img src="../../../assets/index/shopDetail.png">
              </div>
            </router-link>
            <p class="name">商铺信息</p>
          </li>
          <li v-if="isAuth('/moduleMall/modSelf')">
            <router-link to="/market/marketDetail">
              <div class="imgContainer">
                <img src="../../../assets/index/shopDetail.png">
              </div>
            </router-link>
            <p class="name">广场信息</p>
          </li>
          <li @click="dialogFormVisible=true" style="cursor: pointer" v-if="isSelf">
            <div class="imgContainer">
              <img src="../../../assets/index/changepass.png">
            </div>
            <p class="name">修改密码</p>
          </li>
          <li v-show="isAuth('/shopPhotoShow/listByTypeAndTargetId')">
            <router-link to="/shopPhotoShow">
              <div class="imgContainer">
                <img src="../../../assets/index/photoshow.png">
              </div>
            </router-link>
            <p class="name">风采展示</p><!-- 店铺 -->
          </li>
          <li v-show="isAuth('/mallPhotoShow/listByTypeAndTargetId')">
            <router-link to="/market/marketPhotoShow">
              <div class="imgContainer">
                <img src="../../../assets/index/photoshow.png">
              </div>
            </router-link>
            <p class="name">风采展示</p><!-- 广场 -->
          </li>
          <li v-if="isAuth('/pmSale/list')">
            <router-link to="/pmSale">
              <div class="imgContainer">
                <img src="../../../assets/index/active.png">
              </div>
            </router-link>
            <p class="name">促销管理</p>
          </li>
        </ul>
        <ul>
          <li v-if="isAuth('/enterName/list')">
            <router-link to="/enterName">
              <div class="imgContainer">
                <img src="../../../assets/index/enterName.png">
              </div>
            </router-link>
            <p class="name">报名管理</p>
          </li>
          <li v-if="isAuth('/activityPlan/list')">
            <router-link to="/activityPlan">
              <div class="imgContainer">
                <img src="../../../assets/index/coppon.png">
              </div>
            </router-link>
            <p class="name">活动管理</p>
          </li>
          <li v-if="isAuth('/lotteryBy/findListA')">
            <router-link to="/prizeDraw">
              <div class="imgContainer">
                <img src="../../../assets/index/group.png">
              </div>
            </router-link>
            <p class="name">抽奖管理</p>
          </li>
          <li v-if="isAuth('/collectPerson/listUserByPage')">
            <router-link to="/VIP">
              <div class="imgContainer">
                <img src="../../../assets/index/vip.png">
              </div>
            </router-link>
            <p class="name">我的会员</p>
          </li>
        </ul>
      </div>
      <div class="tool main_body_item">
        <p class="body_header"><img src="../../../assets/index/tool.png">实用工具</p>
        <div class="toolcontainer clearfix">
          <a href="https://www.xzlogo.com/" target="_blank">
            <div class="left">
              <div class="imgContainer">
                <img src="../../../assets/index/tool_1.png" alt="">
              </div>
              <p>在线设计LOGO</p>
            </div>
          </a>
          <a href="http://p.haoii123.com/" target="_blank">
            <div  class="right">
              <div class="imgContainer">
                <img src="../../../assets/index/tool_2.png" alt="">
              </div>
              <p>在线自动排版</p>
            </div>
          </a>
        </div>
        <div class="toolcontainer clearfix">
          <a href="https://www.fotor.com.cn/" target="_blank">
            <div class="left">
              <div class="imgContainer">
                <img src="../../../assets/index/tool_3.png" alt="">
              </div>
              <p>在线一键抠图</p>
            </div>
          </a>
          <!-- <a href="https://www.58pic.com/" target="_blank">
            <div  class="right">
              <div class="imgContainer">
                <img src="../../../assets/index/greenlogo.png" alt="">
              </div>
              <p>在线素材</p>
            </div>
          </a> -->
          <a href="https://www.135editor.com/" target="_blank">
            <div  class="right">
              <div class="imgContainer">
                <img style="padding-top: 0;height: 40%" src="../../../assets/index/135whitelogo.png" alt="">
              </div>
              <p>在线编辑文档</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="main_body">
      <div class="shortcut main_body_item" style="height: 380px;">
        <p class="body_header" :style="{border: !nodata ? 'none' : ''}"><img src="../../../assets/index/help.png">异业合作</p>
        <div class="nodata" v-if="nodata" ><img src="../../../assets/index/pic.png" alt=""></div>
        <div v-else>
          <el-table :data="difftrads" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="name" label="名称"/>
            <el-table-column header-align="center" align="center" prop="tradesType" label="分类">
              <template slot-scope="scope">
                <span v-if="scope.row.tradesType === 101" type="success">报名</span>
                <span v-else type="info">活动</span>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="tradesType" label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.tradesType === 101" type="success">报名</span>
                <span v-else type="info">活动</span>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="needNum" label="需求">
              <template slot-scope="scope">
                {{ scope.row.needNum }} 家
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="name" label="方式">
              <template slot-scope="scope">
                <span v-if="scope.row.tradesWay === 101" type="success">现金</span>
                <span v-if="scope.row.tradesWay === 201" type="success">面谈</span>
                <span v-if="scope.row.tradesWay === 301" type="success">礼品</span>
                <span v-if="scope.row.tradesWay === 401" type="success">资源</span>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="goDiffList" type='text' style="float: right">更多 <i class="el-icon-d-arrow-right"/></el-button>
        </div>
      </div>
      <div class="shortcut main_body_item" style="height: 380px; width: 606px;">
        <p class="body_header" :style="{border: !refundNodata ? 'none' : ''}"><img src="../../../assets/index/refundIcon.png">退款列表</p>
        <div class="nodata" v-if="refundNodata" ><img src="../../../assets/index/pic.png" alt=""></div>
        <div v-else>
          <el-table :data="refundList" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="userNickName" label="用户昵称"/>
            <el-table-column header-align="center" align="center" prop="outTradeNo" label="订单号"/>
            <el-table-column header-align="center" align="center" width="100" prop="num" label="退款金额">
              <template slot-scope="scope">
                <span>￥{{ scope.row.num / 100 }}</span>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" width="80" prop="num" label="状态">
              <template slot-scope="scope">
                <span>{{ scope.row.state === 1 ? '待退款': scope.row.state === 101 ? '已退款' : '已拒绝' }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="goRefund" type='text' style="float: right">更多 <i class="el-icon-d-arrow-right"/></el-button>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :modal="true"  width="40%">
      <el-form @submit.native.prevent :model="dataForm" :rules="rules" ref="passwordForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请输入姓名" prop="nickname">
          <el-input v-model="dataForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="hadPwd" label="请输入密码" prop="oldPass">
          <el-input show-password v-model="dataForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input show-password v-model="dataForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="rePass">
          <el-input show-password v-model="dataForm.rePass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { eventBus } from '@/eventBus'
import ShopIframe from '../../utils/ifram'
import { mapGetters } from 'vuex'
import RSA from '../../../utils/rsa.js'
import { Base64 } from 'js-base64'
export default {
  name: 'DashboardEditor',
  components: {  ShopIframe },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback();
      } else {
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.dataForm.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      hadPwd: true,
      dialogFormVisible:false,
      nodata: false,
      refundNodata: false,
      isSelf: true,
      dataForm: {
        oldPass: '',
        newPass: '',
        rePass: '',
        nickname: ''
      },
      canoutMoney: 0,
      money: 0,
      tag: '官方',
      endTime: '',
      acount: '',
      activeNum: '',
      saleNum: 0,
      difftrads: [], // 异业合作列表
      refundList: [], // 退款列表
      rules: {
        oldPass: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入您的称呼', trigger: 'blur' }
        ],
        newPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        rePass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getData() {
      const url = this.apiList.login.hadPwd
      this.$http({
        url:  this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({userType: localStorage.getItem('userType')}, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.hadPwd = data.data
          if (!this.hadPwd) {
            this.changePass()
          }
        }
      })
    },
    submit() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          // 发送修改密码的请求
          this.$http({
            url: this.$http.adornUrl(this.apiList.login.getKey),
            method: 'post',
            data: this.$http.adornData('', '', false)
          }).then(({ data }) => {
            if (!data.result) {
              this.$message('获取公钥失败')
              this.loading = false
              return
            }
            RSA.setMaxDigits(131)
            const key = new RSA.RSAKeyPair(data.data.exponent, '', data.data.modulus)
            const loginPassword = Base64.encode(RSA.encryptedString(key, this.dataForm.newPass))
            const oldPassword = Base64.encode(RSA.encryptedString(key, this.dataForm.oldPass))
            this.$http({
              url: this.$http.adornUrl(this.apiList.login.passManager),
              method: 'post',
              data: this.$http.adornData({ pwd: loginPassword, userType: localStorage.getItem('userType'), oldPwd: oldPassword }, this.apiList.login.passManager, true)
            }).then(({ data }) => {
              this.dialogFormVisible = false
              if (data.result) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                // this.$message({
                //   message: data.msg,
                //   type: 'warning'
                // })
              }
            })
          })
          // 发送修改名称的请求
          this.$http({
            url: this.$http.adornUrl(this.apiList.login.changNickName),
            method: 'post',
            data: this.$http.adornData({nickName: this.dataForm.nickname }, this.apiList.login.changNickName, true)
          }).then(({ data }) => {
            if (data.result) {

            }
          })
        } else {
          return false;
        }
      })
    },
    changePass() {
      this.dialogFormVisible = true
    },
    getMoney() {
      const url = this.apiList.money.get
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.canoutMoney = data.data.canOutMoney / 100
          this.money = data.data.totalMoney / 100
        }
      })
    },
    // 到异业合作列表
    goDiffList() {
      this.$router.push('/diffTradesList')
    },
    // 到退款列表
    goRefund() {
      this.$router.push('/activerefund')
    },
    getDataDetail() {
      const url = this.apiList.money.getDetail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.acount = data.data.collectNum
          this.activeNum = data.data.activityNum
          this.saleNum = data.data.saleNum
        }
      })
    },
    // 异业合作数据
    getDataLIst() {
      const url = this.apiList.shop.diffTrades.listAll
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page:1, size: 5}, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.difftrads = data.data.records
          if (data.data.records.length === 0) {
            this.nodata = true
          }
        }
      })
    },
    // 退款列表数据
    getDataList() {
      this.listLoading = true
      const url = this.apiList.refund.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: 1, size: 5 }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.refundList = data.data.records
          if (data.data.records.length === 0) {
            this.refundNodata = true
          }
        }
      })
    },
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'chineseRoles'
    ])
  },
  mounted() {
    this.getData()
    // this.getMoney()
    if (this.isAuth(this.apiList.money.getDetail)) {
      // 店铺数据
      this.getDataDetail()
    }
    if (this.isAuth(this.apiList.money.get)) {
      this.getMoney()
    }
    if (this.isAuth(this.apiList.shop.diffTrades.listAll)) {
      // 异业合作
      this.getDataLIst()
    }
    // 更具promoduleid判断是否下沉操作
    // if (this.$cookie.get('moduleId') !== this.$cookie.get('promoduleType')) {
    //   this.isSelf = false
    // }
    if (this.isAuth(this.apiList.refund.list)) {
      this.getDataList()
    }
    this.$store.dispatch('user/resetModuleGetPrice')
  },
  created() {
    if (this.isAuth('/moduleMall/modSelf')) {
      this.nodata = true
    }
    const vm = this
    eventBus.$on('user_changePass', () => {
      vm.dialogFormVisible = true
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container{
  width: 100%;
  max-width: 1260px;
  margin: 40px auto;
}
.headerContainer{
  display: flex;
  flex-direction:row;
  justify-content : space-between;
  align-items : center;
  .item{
    max-width: 299px;
    width: 20%;
    height: 182px;
    background: #E3ECFF;
    border-radius: 10px;
    position: relative;
    box-sizing: border-box;
    padding: 17px;
    &:last-child{
      width: 426px;
      max-width: 426px;
    }
    p{
      margin: 0;
      &:nth-child(2){
        font-size: 26px;
        color: #818588;
        line-height: 26px;
        margin: 11px 0px 26px 0px;
      }
      &:nth-child(3){
        font-size: 30px;
        line-height: 50px;
        font-weight: bold;
        color: #5C81F8;
        z-index: 7;
        position: absolute;
        i{
          font-size: 50px;
          font-style: normal;
          font-weight: 400;
        }
      }
    }
    img{
      width: 41px;
      z-index: 1;
      &:last-child{
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}
.main_body{
  width: 100%;
  box-sizing: border-box;
  margin-top: 40px;
  display: flex;
  flex-direction:row;
  justify-content : space-between;
  .main_body_item{
    box-sizing: border-box;
    padding: 26px;
    background: #fff;
    height: 100%;
    box-shadow: #E3ECFF 0 0 7px 3px;
    .body_header{
      color: #4F93FE;
      font-size: 20px;
      font-weight: bold;
      margin: 0;
      padding: 8px 0;
      border-bottom: solid 1px #D7D7D7;
      img{
        vertical-align: top;
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
    }
    table{
      border: solid 1px #e7e7e7;
      border-top: none;
      width: 100%;
    }
    .el-table .cell{
      max-width: 125px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .nodata{
      text-align: center;
      margin-top: 75px;
    }
  }
  .shortcut{
    width: 630px;
    ul{
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      margin-top: 22px;
      &:nth-child(2){
        margin-top: 12px;
      }
      li{
        list-style: none;
        width: 80px;
        .imgContainer{
          width: 78px;
          height: 78px;
          margin: auto;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .name{
          color: #333333;
          font-size: 16px;
          line-height: 20px;
          width: 100%;
          margin: 0;
          margin-top: 9px;
          overflow: hidden;
          text-overflow: clip;
          text-align: center;
        }
      }
    }
  }
  .data{
    ul{
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      li{
        list-style: none;
        width: 50%;
        margin-top: 37px;
        text-align: left;
        img{
          width: 55px;
          height: 55px;
        }
        div{
          padding-left: 6px;
          display: inline-block;
          text-align: center;
          p{
            overflow: hidden;
            font-size: 14px;
            color: #999;
            margin: 0;
            margin-top: 8px;
            text-align: center;
          }
          p:nth-child(1){
            font-size: 20px;
            font-weight: 600;
            color: #000;
            margin-top: 0;
          }
        }
      }
    }
  }
  .tool{
    width: 606px;
    padding-bottom: 30px;
    .toolcontainer{
      margin-top: 15px;
      .imgContainer{
        width: 100%;
        text-align: center;
        height: 52px;
        img{
          vertical-align: middle;
          max-width: 100%;
        }
      }
      p{
        margin: 0;
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #999;
        font-weight: 600;
        padding-bottom: 26px;
        border-bottom: solid 1px #d7d7d7;
      }
      .left{
        float: left;
        width: 50%;
        border-right: solid 1px #d7d7d7;
        text-align: center;
        margin-top: 16px;
      }
      .right{
        float: left;
        width: 50%;
        margin-top: 16px;
        text-align: center;
      }
    }
    .toolcontainer:nth-child(3) {
      margin-top: 0;
      p{
        border: none;
        padding-bottom: 0;
      }
      .imgContainer{
        height: 72px;
        padding-top: 20px;
      }
      .left{
        margin-top: 0;
        padding-top: 20px;
        padding-bottom: 6px;
      }
      .right{
        margin-top: 0;
        padding-top: 20px;
        padding-bottom: 6px;
      }
    }
  }
}
.main_footer{
  height: 360px;
  margin-top: 20px;
  .list_container{
    background: #fff;
    width: 100%;
    height: 360px;
    box-sizing: border-box;
    padding: 28px 45px;
    p{
      color: #666;
      border-bottom: solid 1px #d7d7d7;
      height: 32px;
      line-height: 32px;
      font-weight: 600;
      span{
        display: inline-block;
        padding: 0 0 8px;
        height: 100%;
      }
    }
  }
  .help{
    background-repeat: no-repeat;
    background-size: 143px 117px;
    background-position: top right;
    span{
      border-bottom: solid 1px #E51D27;
    }
  }
}
.main_body_right{
  max-width: 400px;
  width: 100%;
  // max-height: 905px;
  height: 970px;
  height: 100%;
  // background: url('../../../assets/index/iPhonex.png');
  // background-size: 100% 100%;
  margin: 0 auto;
}
</style>
