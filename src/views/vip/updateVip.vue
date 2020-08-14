<template>
  <div class="updateVip">
    <el-card shadow="hover">
      <el-form  @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">升级会员</p></el-form-item>
      </el-form>
      <div class="main_body">
        <div>
          <div class="inline label top">选择会员等级 ：&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div class="inline">
            <div class="inline item" :class="{'achive': viptype == 1}" @click="chooseType(1)">
              <p>月度会员</p>
              <p><i>￥</i>{{ vip_1 }}</p>
              <p>原价<del><i>￥</i>{{ vip_1_pro }}</del></p>
            </div>
            <div class="inline item recommend" :class="{'achive': viptype == 2}" @click="chooseType(2)">
              <p>年度会员</p>
              <p><i>￥</i>{{ vip_2 }}</p>
              <p>原价<del><i>￥</i>{{ vip_2_pro }}</del></p>
            </div>
          </div>
        </div>
        <div class="margin-top">
          <div class="inline label top">有效期限 :</div>
          <div class="inline right_text">
            {{ timeChange('Y.m.d', dateStart) }}至{{ timeChange('Y.m.d', dateEnd) }}
          </div>
        </div>
        <div class="margin-top">
          <div class="inline label top">支付金额 :</div>
          <div class="inline right_text red">
            {{ viptype === 2 ? vip_2 : vip_1 }}元
          </div>
        </div>
        <div class="margin-top" style="width: 735px; max-width: 100%; border-bottom: solid 1px #ddd;">
        </div>
        <div class="margin-top">
          <div class="inline label top">支付方式 :</div>
          <div class="inline top">
            <div class="inline right_item" @click="payType = 301">
              <i :class="{'choose': payType === 301}"></i>
              余额支付
            </div>
            <div class="inline right_item" @click="payType = 101">
              <i :class="{'choose': payType === 101}"></i>
              扫码支付
            </div>
          </div>
          <div class="pay margin-top" v-if="payType === 101">
            <div class="inline">
              <img src="../../assets/index/ewm.png" alt="">
              <p>刷新二维码</p>
            </div>
            <div class="inline">
              <p><img src="../../assets/index/zfb.png" alt=""><i>+</i><img src="../../assets/index/wechart.png" alt=""></p>
              <p>请使用微信或支付宝扫码支付</p>
            </div>
          </div>
          <div v-else class="pay margin-top">
            <div class="inline">
              <el-button @click="order">确认支付</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return{
      viptype: 2,
      vip_1: 666.00,
      vip_1_pro: 999,
      vip_2: 999.00,
      vip_2_pro: 1000,
      dateStart: 0,
      dateEnd: 0,
      yearVip:false,
      isvip: false,
      payType: 301
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    // 获得VIP信息
    getInfo() {
      const url = this.apiList.vip.state
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        if (data.result) {
          const timeadd = this.viptype === 1? 60*60*24*31*1000 : 60*60*24*365*1000
          this.yearVip = data.data.vipType === 101
          console.log(this.yearVip)
          let now = 0
          if (data.data.vipEndTime == 0) {
            this.isvip = false
            now = (new Date()).getTime()
          } else {
            this.isvip = true
            now = data.data.vipEndTime
          }
          this.dateStart = now
          this.dateEnd = now + timeadd
        }
      })
    },
    // 切换状态
    chooseType(type) {
      if (type === 1) {
        if (! this.yearVip) {
          this.viptype = 1;
          this.dateEnd = this.dateStart + 60*60*24*31*1000 
        } else {
          this.$message({
            message: '您已经是年费会员，请等待会员到期',
            type: 'info'
          })
        }
      }
      if (type === 2) {
        this.viptype = 2;
        this.dateEnd = this.dateStart + 60*60*24*365*1000
      }
    },
    // 点击支付
    order() {
      let url = this.apiList.vip.year
      if (this.viptype === 1) {
        url = this.apiList.vip.month
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        const url = this.apiList.vip.orderPay
        const orderId = data.data
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ orderId: orderId, payType : this.payType }, url, true)
        }).then(({ data }) => {
          console.log(data)
          if (data.result) {
            if (this.payType !== 301) {
              // this.android.pay(this.payType, data.data)
              // 生成支付的二维码
            } else {
              this.$message({
                message: '支付成功',
                type: 'success'
              })
              this.getInfo()
            }
          }else {
            this.$toast(data.msg)
          }
        })
      })
    },
  },
  created() {
    if (this.isAuth(this.apiList.vip.state)) {
      this.getInfo()
    }
  }
}
</script>
<style lang="scss">
.updateVip{
  .main_body{
    box-sizing: border-box;
    padding: 90px;
    margin: 15px;
    margin-top: 0;
    border: solid 1px #D7D7D7;
    .label{
      font-size: 20px;
      color: #333;
    }
    .inline{
      display: inline-block;
      vertical-align: middle;
      .item{
        width: 193px;
        height: 110px;
        border-radius: 16px;
        text-align: center;
        border: solid 1px #D7D7D7;
        cursor: pointer;
        margin-right: 41px;
        p{
          margin: 0;
          font-weight: bold;
          i{
            font-style: normal;
          }
          &:nth-child(1){
            font-size: 16px;
            color: #333;
            line-height: 16px;
            margin-top: 12px;
          }
          &:nth-child(2){
            color: #A07352;
            font-size: 30px;
            margin-top: 10px;
            i{
              font-size: 18px;
            }
          }
          &:nth-child(3){
            color: #999999;
            font-size: 14px;
          }
        }
      }
      .recommend{
        background-color: #fffdf1;
        position: relative;
        border: solid 1px #A68D7A;
        &::after{
          content: '推荐';
          display: inline-block;
          position: absolute;
          left: 4px;
          top: -10px;
          width: 52px;
          height: 22px;
          background: #535353;
          color: #F6E2AC;
          font-size: 14px;
          line-height: 22px;
          border-radius: 0 10px;
        }
      }
    }
    // 选中
    .achive{
      background-image: url('../../assets/index/choose.png');
      background-size: 40px 40px;
      background-repeat: no-repeat;
      background-position-y: 100%;
      background-position-x: 100%;
    }
    .right_text{
      font-size: 20px;
      color: #999;
      margin-left: 66px;
    }
    .red{
      color: #E51D27;
    }
    .top{
      vertical-align: top;
    }
    // 选择充值方式
    .right_item{
      font-size: 20px;
      color: #666666;
      margin-left: 124px;
      cursor: pointer;
      &:first-child{
        margin-left: 66px;
      }
      i{
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: top;
        border: solid 1px #ddd;
        border-radius: 100%;
      }
      .choose{
        background: url('../../assets/index/check.png');
        background-size: 100%;
        border: none;
      }
    }
    .margin-top{
      margin-top: 20px;
    }
    .pay{
      margin-left: 156px;
      div{
        p{
          text-align: center;
          color: #999999;
        }
        &:first-child{
          width: 114px;
          img{
            width: 100%;
          }
        }
        &:nth-child(2){
          margin-left: 22px;
          p:first-child{
            text-align: left;
          }
          img{
            width: 32px;
            height: 32px;
            vertical-align: middle;
          }
          i{
            display: inline-block;
            vertical-align: middle;
            margin: 0 9px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>