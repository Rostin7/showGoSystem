<template>
 <div class="balance">
   <div class="item">
      <img src="../../assets/index/icon.png" alt="">
      <!-- <p>今日交易额</p> -->
      <p>当前利润</p>
      <p><i>￥</i>{{ curMadeMoney }}</p>
      <!-- <img src="../../assets/index/icon1.png" alt="" style="width: 86px;"> -->
    </div>
    <div class="item">
      <img src="../../assets/index/icon.png" alt="">
      <p>微信余额 <span>总差额{{ wxPersonDiff }}</span></p>
      <p><i>￥</i>{{ totalMoneyWx }}</p>
      <!-- <img src="../../assets/index/icon2.png" alt="" style="width: 114px;"> -->
    </div>
    <div class="item">
      <img src="../../assets/index/icon.png" alt="">
      <p>支付宝余额 <span>总差额{{ aliPersonDiff }}</span></p>
      <p><i>￥</i>{{ totalMoneyAli }}</p>
      <!-- <img src="../../assets/index/icon2.png" alt="" style="width: 114px;"> -->
    </div>
    <div class="item">
      <img src="../../assets/index/icon.png" alt="">
      <p>平台滞留资金</p>
      <p><i>￥</i>{{ userCanOutMoney }}</p>
      <!-- <img src="../../assets/index/icon3.png" alt="" style="width: 74px;"> -->
    </div>
 </div>
</template>
<script>
export default {
  data() {
    return{
      total: 0,
      page: 1,
      pageSize: 10,
      totalMoneyAli: 0,
      totalMoneyWx : 0,
      userCanOutMoney: 0,
      curMadeMoney: 0,
      aliPersonDiff: 0,
      wxPersonDiff: 0,
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.finance.thirdMoney
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, url, true)
      }).then(({ data }) => {
        this.curMadeMoney = data.data.curMadeMoney ? data.data.curMadeMoney / 100 : 0
        this.totalMoneyAli = data.data.totalMoneyAli ? data.data.totalMoneyAli / 100 : 0
        this.userCanOutMoney = data.data.userCanOutMoney ? data.data.userCanOutMoney / 100 : 0
        this.totalMoneyWx = data.data.totalMoneyWx ? data.data.totalMoneyWx / 100 : 0
        this.aliPersonDiff = data.data.aliPersonDiff ? data.data.aliPersonDiff / 100 : 0
        this.wxPersonDiff = data.data.wxPersonDiff ? data.data.wxPersonDiff / 100 : 0
      })
    },

  },
  created() {
    this.getDataList()
  }
}
</script>
<style lang="scss">
.balance{
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  .item{
    width: 20%;
    min-width: 300px;
    height: 182px;
    background: #E3ECFF;
    border-radius: 10px;
    position: relative;
    box-sizing: border-box;
    padding: 17px;
    margin-left: 15px;
    p{
      margin: 0;
      span{
        font-size: 15px;
        float: right;
      }
      &:nth-child(2){
        font-size: 26px;
        color: #818588;
        line-height: 26px;
        margin: 11px 0px 26px 0px;
      }
      &:nth-child(3){
        font-size: 50px;
        line-height: 50px;
        font-weight: bold;
        color: #5C81F8;
        i{
          font-style: normal;
          font-weight: 400;
        }
      }
    }
    img{
      width: 41px;
      &:last-child{
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>