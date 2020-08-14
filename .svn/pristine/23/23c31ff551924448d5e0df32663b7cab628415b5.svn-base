<template>
  <div class="prizeShareItem" style="margin-top: 5.5px;">
    <div class="clearfix" style="margin-bottom: 1px; margin-top:5.5px; height:60px;">
      <div class="left">
        <h3>发给好友提高中奖几率</h3>
        <p>目前发给<span class="red">1</span>人，中奖几率提高<span class="red">1</span>倍</p>
      </div>
      <div class="right">
        <div class="item div" >
          <img class="logo" src="../../assets/preview/wx.png" alt="">
          <p>发给好友</p>
        </div>
        <div class="border div"></div>
        <div class="item div">
          <img class="logo" src="../../assets/preview/poster.png" alt="">
          <p>获取海报</p>
        </div>
      </div>
    </div>
    <!-- 分享文字 -->
    <div v-if="dataAll.expla" class="shareText">
      <p id="shareItemResellerText">{{ dataAll.expla }}</p>
      <p class="shareItemResellerTextButton" data-clipboard-action="copy" :data-clipboard-text="dataAll.expla"><img src="../../assets/preview/copy.png" alt="" > <span></span>点击复制</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    description: {},
    share_logo: {},
    targetType: {},
    targetId: {},
    dataAll:{},
  },
  data() {
    return{
      money: '0.00',
      shareAppSelect: false
    }
  },
  methods: {
    copyText() {
      let _this = this;
      let clipboard = new this.clipboard(".shareItemResellerTextButton");
      clipboard.on('success', function () {
        _this.$message({
          txt: '复制成功',
          type: 'success',
          time:1000,
        }).show()
      })
      clipboard.on('error', function () {
      })
    },
    // 数字百分比
    resellPrice(data) {
      let num =  
      Math.round(data * (Number(localStorage.getItem('distributorFirstCount')))/100 *
       (100 - Number(localStorage.getItem('distributorFatherCount')))/100 *100 )/ 100 /100
      return num.toFixed(2)
    },
    sendKey() {
      const vm = this
      this.getUrlkey().then((data) => {
        const formData = {
          'type': 'customVariableClass.gainCustomVariable',
          'text': vm.description,
          'img':  vm.share_logo,
          'CustomVariable': data
        }
        this.android.share(formData)
      })
    },
    shareTowx() {
      // 判断是小程序还是app
      if(localStorage.getItem('app_type') === '201' || localStorage.getItem('app_type') === '401'|| localStorage.getItem('app_type') === '501'){
        this.shareAppSelect = true
      } else {
        // 如果是app的话， 分享出去打开的页面
        let description = ''
        switch(this.targetType) {
          case 101 : 
            description = '店铺的分享'
            break
          case 201 : 
            description = '广场的分享'
            break
          case 3011 : 
            description = this.dataAll.expla.slice(0,60)
            break
          case 3012 : 
            description = '报名的分享'
            break
          case 3013 : 
            description = '拼团的分享'
            break
          // case 3014 : 
          //   description = '抢券的分享'
          //   break
          case 3015 : 
            description = '活动的分享'
            break
          case 3016 : 
            description = '商品的分享'
            break
          case 3017 :
            description = '抽奖的分享'
            break
        }
        const formData = {}
        formData.thirdType = 0
        formData.title = this.description
        formData.description = description
        formData.share_logo = this.share_logo
        formData.link_url = 
        'http://b.chnzxl.com/download/index-c.html?' + 
        Base64.encode(
          JSON.stringify({
            targetType: this.targetType, 
            targetId: this.targetId, 
            //resellerId: localStorage.getItem('resellerIdSelf')
            userId:localStorage.getItem('uid'),
          })
        )
        this.android.share(formData)
      }
    },
    getUrlkey() {
      return new Promise((resolve, reject) =>{
        const url = this.apiList.wxTool.senfShagreData
        // 定义分销商分享商品时的参数 resellerId 分销商自己的id，登录的时候存储local (resellerIdSelf)
        const formData = {
          type: 'prize',
          targetType: this.targetType,
          targetId: this.targetId,
          // resellerId: localStorage.getItem('resellerIdSelf')
          userId:localStorage.getItem('uid'),
        }
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData( {sValue: JSON.stringify(formData)}, url , true)
        }).then(({ data }) => {
          if (data.result) {
            resolve(data.data)
          } else {
            reject(data.msg)
          }
        })
      })
    }
  },
  created() {
    this.money = this.resellPrice(this.dataAll.resellPrice)
  },
  watch: {
    share_logo() {
      // 小程序每次改变页面要切换分享参数
      if(localStorage.getItem('app_type') === '201' || localStorage.getItem('app_type') === '401'|| localStorage.getItem('app_type') === '501'){
        this.sendKey()
      }
      console.log(this.dataAll.resellPrice)
      this.money = this.resellPrice(this.dataAll.resellPrice)
    }
  },
  activated() {
    const vm = this
    // 小程序每次改变页面要切换分享参数
    if(localStorage.getItem('app_type') === '201' || localStorage.getItem('app_type') === '401'|| localStorage.getItem('app_type') === '501'){
      this.sendKey()
    }
  },
  deactivated() {
    // 小程序防止首页分享数据错误
    if(localStorage.getItem('app_type') === '201' || localStorage.getItem('app_type') === '401'|| localStorage.getItem('app_type') === '501'){
      const formData = {
        'type': 'customVariableClass.gainCustomVariable',
        'CustomVariable': '',
        'text': '',
        'img':  '',
      }
      this.android.share(formData)
    }
  }
}
</script>
<style lang="scss">
  .prizeShareItem{
    width: 100%;
    // height: 76px;
    box-sizing: border-box;
    padding: 16px 0;
    background: #fff;
    margin-top: 13px;
    .logo{
      width: 36px;
      height: 36px;
      text-align: center;
    }
    .shareText{
      position: relative;
      width: 350px;
      border-radius: 10px;
      // margin-top: 4px;
      box-sizing: border-box;
      padding: 14px;
      padding-bottom: .5px;
      // border: solid 1px #E6E6E6;
      box-shadow: #eee  0 0 8px 2px;  
      &::before{
        content: '推广文案';
        width: 65px;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 8px 0 8px 0;
        background: rgb(92, 158, 255);
        height: 23px;
        text-align: center;
        line-height: 28px;
        color: #fff;
        font-size: 12px;
      }
      p{
        margin-bottom: 9px;
        padding-top: 15px;
        color: #5E5E5E;
        font-size: 12px;
        line-height: 18px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
      .shareItemResellerTextButton{
        border-top: #E6E6E6 solid 1px;
        text-align: center;
        border-bottom: 0;
        color: #FE2121;
        font-size: 16px;
        padding-top: 7px;
        padding-bottom: 0;
        font-weight: Regular;
        img{
          width: 13.5px;
          height: 16.5px;
          vertical-align: middle;
        }
      }

    }
    .left{
      float: left;
      h3{
        font-size: 16px;
        color: #000000;
        font-weight: bold;
        margin: 0;
        line-height: 16px;
      }
      p{
        font-size: 13px;
        color: #9F9E9E;
        font-weight: Medium;
        margin-top: 12px;
        line-height: 13px;
      }
      .yellow{
        color: #F69A19;
      }
      .red{
        color: #FF0000;
      }
    }
    .right{
      float: right;
      margin-top: -8px;
      .div{
        display: inline-block;
        vertical-align: top;
        text-align: center;
        p{
          color: #000000;
          margin-top: 3px;
          font-size: 12px;
          line-height: 12px;
          text-align: center;
          width: 100%;
        }
      }
      .borderShare{
        border-left: solid 1px #E2E2E2;
        height: 30px;
        margin: 0 04px;
      }
      .item{
        width: 50px;
        height: 100%;
      }
    }
    .shareAppSelect{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: 999;
      .to{
        position: fixed;
        top: 0;
        right: 74px;
        width: 71px;
        height: 71px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .item1{
        position: fixed;
        left: 0;
        top: 170px;
      }
      .item2{
        position: fixed;
        left: 0;
        top: 228px;
      }
      .item{
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 23px;
        font-weight: bold;
        .number{
          display: inline-block;
          width: 30px;
          height: 30px;
          vertical-align: middle;
          color: #fff;
          font-size: 20px;
          text-align: center;
          border-radius: 100%;
          background: #E96230;
          margin-left: 25px;
          margin-right: 13px;
        }
      }
    }
    .shadow{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.6;
      z-index: 80;
    }
  }
</style>
