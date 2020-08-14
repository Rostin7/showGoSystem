<template>
  <div class="vipInfo">
    <el-row :gutter="20">
      <el-col :span="24" class="leftBody">
        <div class="header">
          <div class="refund">
            <div class="refund_header">
              <p v-show="!isUser">可提现余额</p>
              <p>{{ canoutMoney }}</p>
            </div>
            <router-link :to="'/mouneyOut'">
              <div class="btn" v-show="!isUser">提现</div>
            </router-link>
          </div>
          <div class="viptype">
            <p>我的会员等级：{{ tag }}</p>
            <p>会员有效期至：{{ endTime }}</p>
            <el-row :gutter="59">
              <el-col :span="6">
                <div class="item">
                  <div class="imgcontainer">
                    <img src="../../assets/index/vip_1.png" alt="">
                  </div>
                  <p>认证</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item">
                  <div class="imgcontainer">
                    <img src="../../assets/index/vip_2.png" alt="">
                  </div>
                  <p>月费</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item">
                  <div class="imgcontainer">
                    <img src="../../assets/index/vip_3.png" alt="">
                  </div>
                  <p>年费</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item">
                  <div class="imgcontainer">
                    <img src="../../assets/index/vip_4.png" alt="">
                  </div>
                  <p>官方</p>
                </div>
              </el-col>
            </el-row >
            <div class="btn" @click="goUpdateVip">去升级</div>
          </div>
        </div>
        <div class="infoCointer">
          <!-- 点击进入余额明细 -->
            <div class="item" @click="goMoneyDetail">
              <p>{{ money }}</p>
              <p>总余额(元)</p>
            </div>
            <div class="item item_2" @click="tovip">
              <p>{{ acount }}</p>
              <p>关注人数(人)</p>
            </div>
            <div class="item item_3">
              <p>{{ activeNum }}</p>
              <p>活动个数(个)</p>
            </div>
            <div class="item item_4">
              <p>0</p>
              <p>消息数量(条)</p>
            </div>
        </div>
      </el-col>
      <!-- <el-col :span="8" style="
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 32px;
        padding-bottom: 32px;
      ">
        <div class="main_body_right">
          <shop-iframe :type="1" />
        </div>
      </el-col> -->
  </el-row>
  </div>
</template>
<script>
import ShopIframe from '../utils/ifram'
export default {
  data() {
    return{
      isUser: false,
      canoutMoney: 0,
      money: 0,
      tag: '官方',
      endTime: '',
      acount: '',
      activeNum: '',
    }
  },
  components: { ShopIframe },
  methods: {
    tovip() {
      this.$router.push('VIP')
    },
    goMoneyDetail() {
      if(this.isAuth('/money/logModule')) {
        this.$router.push('moneyDetail')
      }
    },
    goUpdateVip() {
      this.$router.push('updateVip')
    },
    getData() {
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
        }
      })
    }
  },
  created() {
    this.getData()
    this.getDataDetail()
    if(this.$cookie.get('uid') == '63') {
      this.isUser = true
    }
  }
}
</script>
<style lang="scss">
  .vipInfo{
    .btn{
      cursor: pointer;
    }
    .leftBody{
      box-sizing: border-box;
      padding: 22px;
      background: #fff;
      .header{
        margin-top: 60px;
        box-sizing: border-box;
        padding-left: 10px;
        .refund{
          width: 586px;
          height: 338px;
          background: url('../../assets/index/refund.png');
          background-size: 100% 100%;
          box-sizing: border-box;
          padding: 55px 0 0 260px;
          display: inline-block;
          vertical-align: top;
          margin-right: 22px;
          .refund_header{
            p{
              text-align: left;
              margin-bottom: 33px;
              font-size: 24px;
              color: #FFE9E9;
              margin-top: 0;
            }
            p:nth-child(2){
              font-size: 58px;
              color: #FFF657;
              font-weight: 600;
              margin-bottom: 70px;
            }
          }
          .btn{
            width: 174px;
            height: 58px;
            line-height: 58px;
            text-align: center;
            border: solid 1px #fff;
            color: #fff;
            border-radius: 8px;
          }
        }
        .viptype{
          width: 468px;
          height: 344px;
          background: url('../../assets/index/vipstate.png');
          background-size: 100% 100%;
          box-sizing: border-box;
          position: relative;
          padding: 20px;
          display: inline-block;
          vertical-align: top;
          p{
            color: #977742;
            font-size: 20px;
            height: 20px;
            margin: 0 0 8px;
          }
          p:nth-child(2){
            font-size: 14px;
          }
          .item{
            text-align: center;
            margin-top: 29px;
            .imgcontainer{
              width: 56px;
              height: 56px;
              border-radius: 100%;
              border: solid 1px #fff;
              line-height: 56px;
              text-align: center;
              margin: auto;
              margin-bottom: 8px;
              img{
                vertical-align: middle;
              }
            }
          }
          .btn{
            width: 174px;
            height: 58px;
            line-height: 58px;
            text-align: center;
            color: #977742;
            border-radius: 8px;
            background: #DDAA3D;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 33px;
          }
        }
      }
      .infoCointer{
        margin-top: 53px;
        box-sizing: border-box;
        padding-left: 10px;
        .item{
          cursor: pointer;
          width: 253px;
          height: 179px;
          display: inline-block;
          margin-right: 15px;
          text-align: center;
          box-sizing: border-box;
          padding-top: 70px;
          background: url('../../assets/index/item_1.png');
          background-size: 100% 100%;
          p{
            color: #fff;
            font-size: 50px;
            height: 50px;
            margin: 0;
            font-weight: 600;
          }
          p:nth-child(2){
            font-size: 16px;
            height: 16px;
            margin-top: 30px;
          }
        }
        .item:last-child{
          margin-right: 0;
        }
        .item_2{
          background: url('../../assets/index/item_2.png');
          background-size: 100% 100%;
        }
        .item_3{
          background: url('../../assets/index/item_3.png');
          background-size: 100% 100%;
        }
        .item_4{
          background: url('../../assets/index/item_4.png');
          background-size: 100% 100%;
        }
      }
    }
    .main_body_right{
      max-width: 400px;
      margin: auto;
    }
  }
</style>