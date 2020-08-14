<template>
  <div class="tobeBistributorShareItem" style="margin-top: .55rem;">
    <div class="clearfix" style="margin-bottom: 1px; margin-top:.55rem; height:6rem;">
      <div class="left">
        <h3>发给好友下单我赚 <span class="yellow">￥{{ money }}</span>元</h3>
        <p>发朋友圈成交量<span class="red">更高</span></p>
      </div>
      <div class="right">
        <div class="item div" @click="shareTowx">
          <share-wx />
          <p>发给好友</p>
        </div>
        <div class="border div"></div>
        <div class="item div">
          <poster :dataAll="dataAll" :targetType="targetType" :targetId="targetId"/>
          <p>获取海报</p>
        </div>
      </div>
    </div>
    <!-- 分享文字 -->
    <div v-if="dataAll.resellerText" class="shareText">
      <p id="shareItemResellerText">{{ dataAll.resellerText }}</p>
      <p class="shareItemResellerTextButton" data-clipboard-action="copy" :data-clipboard-text="dataAll.resellerText" @click="copyText"><img src="../../assets/preview/copy.png" alt="" > <span></span>点击复制</p>
    </div>
    <!-- 小程序的分享引导遮罩 -->
    <!-- 弹出小程序引导 -->
    <transition name="fade">
      <div class="shareAppSelect" @click="shareAppSelect = false" v-show="shareAppSelect">
        <div class="to">
          <img src="../../assets/preview/miniappShareTo.png" alt="">
        </div>
        <div class="item item1">
          <span class="number">1</span>
          <span>点击右上角的</span>
          <span> <img src="../../assets/preview/miniappShareButton.png" alt=""> </span>
          <span>按钮</span>
        </div>
        <div class="item item2">
          <span class="number">2</span>
          <span>选择</span>
          <span><img src="../../assets/preview/miniappShareShare.png" alt=""> </span>
          <span>发送给朋友</span>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="shadow" v-show="shareAppSelect" @click="shareAppSelect = false"></div>
    </transition>
  </div>
</template>
<script>
import Poster from './poster'
import ShareWx from './shareTowx'
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
  components: {
    Poster,
    ShareWx
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
      if(localStorage.getItem('app_type') === '201' || localStorage.getItem('app_type') === '401'){
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
            description = '促销的分享'
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
            resellerId: localStorage.getItem('resellerIdSelf')
          })
        )
        this.android.share(formData)
      }
    },
    getUrlkey() {
      return new Promise((resolve, reject) =>{
        const url = this.apiList.wxTool.sendShagreData
        // 定义分销商分享商品时的参数 resellerId 分销商自己的id，登录的时候存储local (resellerIdSelf)
        const formData = {
          type: 'distributor',
          targetType: this.targetType,
          targetId: this.targetId,
          resellerId: localStorage.getItem('resellerIdSelf')
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
      if(localStorage.getItem('app_type') === '201' || localStorage.getItem('app_type') === '401'){
        this.sendKey()
      }
      console.log(this.dataAll.resellPrice)
      this.money = this.resellPrice(this.dataAll.resellPrice)
    }
  },
  activated() {
    const vm = this
    // 小程序每次改变页面要切换分享参数
    if(localStorage.getItem('app_type') === '201' || localStorage.getItem('app_type') === '401'){
      this.sendKey()
    }
  },
  deactivated() {
    // 小程序防止首页分享数据错误
    if(localStorage.getItem('app_type') === '201' || localStorage.getItem('app_type') === '401'){
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
  .tobeBistributorShareItem{
    width: 100%;
    // height: 7.6rem;
    box-sizing: border-box;
    padding: 1.6rem 0;
    background: #fff;
    margin-top: 1.3rem;
    .shareText{
      position: relative;
      width: 35rem;
      border-radius: 10px;
      // margin-top: .4rem;
      box-sizing: border-box;
      padding: 1.4rem;
      padding-bottom: .05rem;
      // border: solid .1rem #E6E6E6;
      box-shadow: #eee  0 0 .8rem .2rem;  
      &::before{
        content: '推广文案';
        width: 6.5rem;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: .8rem 0 .8rem 0;
        background: rgb(92, 158, 255);
        height: 2.3rem;
        text-align: center;
        line-height: 2.8rem;
        color: #fff;
        font-size: 1.2rem;
      }
      p{
        margin-bottom: .9rem;
        padding-top: 1.5rem;
        color: #5E5E5E;
        font-size: 1.2rem;
        line-height: 1.8rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
      .shareItemResellerTextButton{
        border-top: #E6E6E6 solid .1rem;
        text-align: center;
        border-bottom: 0;
        color: #FE2121;
        font-size: 1.6rem;
        padding-top: .7rem;
        padding-bottom: 0;
        font-weight: Regular;
        img{
          width: 1.35rem;
          height: 1.65rem;
          vertical-align: middle;
        }
      }

    }
    .left{
      float: left;
      h3{
        font-size: 1.6rem;
        color: #000000;
        font-weight: Medium;
        margin: 0;
        line-height: 1.6rem;
      }
      p{
        font-size: 1.3rem;
        color: #9F9E9E;
        font-weight: Medium;
        margin-top: 1.2rem;
        line-height: 1.3rem;
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
      margin-top: -.8rem;
      .div{
        display: inline-block;
        vertical-align: top;
        p{
          color: #000000;
          margin-top: .3rem;
          font-size: 1.2rem;
          line-height: 1.2rem;
          text-align: center;
          width: 100%;
        }
      }
      .border{
        border-left: solid .1rem #E2E2E2;
        height: 3rem;
        margin: 0 0.4rem;
      }
      .item{
        width: 5rem;
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
        right: 7.4rem;
        width: 7.1rem;
        height: 7.1rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .item1{
        position: fixed;
        left: 0;
        top: 17rem;
      }
      .item2{
        position: fixed;
        left: 0;
        top: 22.8rem;
      }
      .item{
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        color: #fff;
        font-size: 2.3rem;
        font-weight: bold;
        .number{
          display: inline-block;
          width: 3rem;
          height: 3rem;
          vertical-align: middle;
          color: #fff;
          font-size: 2rem;
          text-align: center;
          border-radius: 100%;
          background: #E96230;
          margin-left: 2.5rem;
          margin-right: 1.3rem;
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
