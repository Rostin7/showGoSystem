<template>
<div>
  <el-row :gutter="40" class="panel-group">
    <!-- 运营数据 -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/1.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            平台滞留资金
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="totalUserMoneyNum" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/2.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日交易金额
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="todayMoneyNum" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/3.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日提现金额
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="todayMoneyOutNum" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/4.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日交易笔数
          </div>
          <count-to :start-val="0" :end-val="todayOrderNum" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/5.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            运营利润
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="madedMoney" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/6.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            杂项支出
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="totalMoneyWx + totalMoneyAli - (totalUserMoneyNum + sysTotal + resellMadeMoney + sysMadeMoney + madedMoney)" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/7.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            分销利润
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="resellMadeMoney" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/8.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            系统利润
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="sysMadeMoney" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/9.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            支付宝余额
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="totalMoneyAli" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/10.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            微信余额
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="totalMoneyWx" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/11.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            BOSS资金
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="sysTotal" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <img src="@/assets/dataCommit/12.png" class="card-panel-icon" alt="">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总利润
          </div>
          <count-to :decimals="2" :start-val="0" :end-val="resellMadeMoney + sysMadeMoney + madedMoney" :duration="duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <!-- 统计数据 -->
    <el-col :xs="24" :sm="24" :lg="12">
      <div class="chart-wrapper">
        <div ref="totalChart" :style="{height:height,width:width}" ></div>
      </div>
    </el-col>
    <!-- 运营数据 -->
    <el-col :xs="24" :sm="24" :lg="12">
      <div class="chart-wrapper">
        <div ref="countChart" :style="{height:height,width:width}" ></div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import CountTo from 'vue-count-to'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
export default {
  data() {
    return {
      height: '300px',
      width: '100%',
      userNum: 0,
      mallNum: 0,
      shopNum: 0,
      pmSaleNum: 0,
      enterNameNum: 0,
      activityPlanNum: 0,
      duration: 2600,
      totalUserMoneyNum: 0,
      totalMoneyNum: 0,
      todayMoneyOutNum: 0,
      todayMoneyNum: 0,
      todayOrderNum: 0,
      madedMoney: 0,
      resellMadeMoney: 0,
      sysMadeMoney: 0,
      totalMoneyAli: 0,
      totalMoneyWx: 0,
      sysTotal: 0,
    }
  },
  components: {
    CountTo
  },
  methods: {
    // 初始化echart
    initChart(pmSale, enterName, active, groupBuy) {
      this.chart = echarts.init(this.$refs.countChart, 'macarons')
      this.chart.setOption({
        title: {
          text: '平台活动分布',
          left: 'center',
          top: 0
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '0',
          data: ['促销', '报名', '活动', '团购']
        },
        series: [
          {
            name: '活动分布',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: [
              { value: pmSale, name: '促销' },
              { value: enterName, name: '报名' },
              { value: active, name: '活动' },
              { value: groupBuy, name: '团购' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
          }
        ]
      })
    },
    // 初始化统计数据
    initTotalChart() {
      const vm = this
      var pathSymbols = {
        user: 'path://M933.237561 340.38581c-4.68962-5.355769-15.550857-18.066151-29.865751-34.800205-43.093383-50.365452-115.195497-134.661899-148.391391-170.441241-13.7161-14.804363-30.776534-33.210084-63.823328-34.515598-2.406169-0.081545-9.733201-0.35396-102.38918-0.35396-105.339979 0-254.124903 0.33957-254.057749 0.33957-15.754918 0-39.775432 3.574776-66.243687 34.555371-19.412438 22.756771-49.563796 57.570167-80.082304 92.805878-38.87884 44.887366-78.327894 90.453872-96.870322 112.530504-32.230947 37.328691-33.033603 89.394191-2.107171 135.912451l2.053208 2.719156c36.513644 42.535361 115.9288 133.846052 209.727205 241.686736l145.795551 167.694703c26.929342 31.021168 48.190927 35.208129 65.441031 35.208129 18.121114 0 38.593234-4.268506 65.441031-35.194938l150.797359-173.472586c88.714052-101.995447 163.83432-188.357494 204.996812-236.290395C961.146039 445.602274 968.97613 383.477994 933.237561 340.38581zM891.096932 442.869926c-40.795341 47.497397-115.833865 133.777699-204.452981 235.650829l-150.81155 173.500167c-13.919962 16.027333-19.398248 16.027333-23.408529 16.027333-3.778838 0-9.488367 0-23.395138-16.027333l-145.822133-167.735475c-92.696752-106.577141-171.337833-196.990241-208.327754-240.041652-16.366903-25.420765-16.815599-49.29138-0.979136-67.629747 18.691327-22.239721 57.924127-67.548202 96.571525-112.177544 30.627634-35.358027 60.873728-70.293941 80.340329-93.104675 12.84609-15.034806 19.493983-15.034806 23.966351-15.034806 0 0 148.704378-0.33957 253.989395-0.33957 79.728344 0 97.087575 0.204062 100.283008 0.313188 8.659329 0.33957 11.949698 2.528486 25.094586 16.734054 32.435009 34.963295 104.102618 118.729501 146.909395 168.782965 14.504566 16.951307 25.5157 29.811788 29.784006 34.692079C907.137457 396.121222 903.889059 427.428196 891.096932 442.869926zM682.614084 394.823901l-170.78201 218.719908-170.561759-219.314505c-1.742019-2.740542-2.268262-2.740542-4.739587-2.740542l-83.213381 0 0 38.453529 1.998045 0c15.731534 0 21.56338 4.092026 28.017604 12.705386 0.633371 0.865014 1.377866 1.850146 2.862859 3.6871 37.509169 50.997823 184.517497 229.654694 226.009366 285.296169 41.478677-55.681248 188.393269-234.461635 226.4011-285.999892 0.918977-1.092259 1.634892-2.0644 2.268262-2.916023 6.494996-8.654132 12.341233-12.773739 28.003414-12.773739l1.890918 0 0-38.518884-82.915583 0C685.516716 391.422408 684.814991 391.422408 682.614084 394.823901z',
        active: 'path://M42.756,472.471a0.412,0.412,0,0,1-.411-0.418v13.7a0.415,0.415,0,0,1,.411-0.418H21.244a0.413,0.413,0,0,1,.411.418v-13.7a0.414,0.414,0,0,1-.411.418H42.756ZM20,472.053v13.7A1.245,1.245,0,0,0,21.244,487H42.756A1.243,1.243,0,0,0,44,485.757v-13.7a1.245,1.245,0,0,0-1.244-1.242H21.244A1.243,1.243,0,0,0,20,472.053h0Zm21.516-2.487a0.831,0.831,0,0,0,0-1.661H22.484a0.831,0.831,0,0,0,0,1.661H41.516ZM26.622,465a0.83,0.83,0,0,0,0,1.66H37.378a0.83,0.83,0,0,0,0-1.66H26.622Zm9.518,17.018a0.83,0.83,0,0,0,0-1.66H27.861a0.83,0.83,0,0,0,0,1.66h8.279Zm-8.279-4.566a0.831,0.831,0,0,0,0,1.661h8.279a0.831,0.831,0,0,0,0-1.661H27.861Zm3.312,6.228a0.828,0.828,0,1,0,1.655,0V478.7a0.828,0.828,0,1,0-1.655,0v4.984Zm1.706-5.318,2.924-2.934a0.829,0.829,0,0,0-1.17-1.174l-2.924,2.934a0.409,0.409,0,0,1,.584,0,0.829,0.829,0,1,0-1.17,1.174,1.243,1.243,0,0,0,1.757,0h0Zm-1.757,0a0.829,0.829,0,0,0,1.17-1.174l-2.925-2.934a0.829,0.829,0,0,0-1.17,1.174Zm0,0',
        shop: 'path://M39.684,402H24.316a1.694,1.694,0,0,1-1.692-1.693V389.729a0.846,0.846,0,0,1,1.692,0v10.578H39.684V389.729a0.846,0.846,0,0,1,1.693,0v10.578A1.694,1.694,0,0,1,39.684,402h0Zm0,0M25.879,391.352a4.821,4.821,0,0,1-2.3-.535l-0.036-.02A4.869,4.869,0,0,1,21,386.517c0-.339.137-0.718,1.49-3.673,0.322-.7.627-1.37,0.823-1.824A1.689,1.689,0,0,1,24.866,380H39.182a1.688,1.688,0,0,1,1.558,1.03c0.192,0.454.491,1.118,0.805,1.818,1.323,2.942,1.457,3.32,1.455,3.657a4.875,4.875,0,0,1-7.949,3.745,4.8,4.8,0,0,1-6.1,0,4.868,4.868,0,0,1-3.072,1.1h0ZM24.4,389.335a3.277,3.277,0,0,0,3.9-.809,0.849,0.849,0,0,1,.647-0.3h0a0.849,0.849,0,0,1,.647.3,3.123,3.123,0,0,0,4.806,0,0.874,0.874,0,0,1,1.3,0,3.164,3.164,0,0,0,5.608-1.945c-0.125-.411-0.831-1.982-1.305-3.036-0.32-.712-0.623-1.388-0.819-1.85H24.866c-0.2.461-.509,1.14-0.837,1.856-0.484,1.058-1.205,2.633-1.335,3.048a3.179,3.179,0,0,0,1.685,2.726l0.023,0.013h0ZM41.308,386.5h0Zm-2.125-4.809h0Zm0,0-6.125,17.346H30.942v-4.231a0.846,0.846,0,0,1,.846-0.846h0.423a0.846,0.846,0,0,1,.846.846v4.231Zm0,0',
        mall: 'path://M40.333,306.35V305.8L32,299.2l-8.333,6.6v0.551H22v-1.039a1.367,1.367,0,0,1,.5-0.978l9.043-7.12a0.594,0.594,0,0,1,.913,0l9.043,7.12a1.367,1.367,0,0,1,.5.978v1.039H40.333Zm-16.667,0v7.7A3.317,3.317,0,0,0,27,317.35H37a3.317,3.317,0,0,0,3.333-3.3v-7.7H42v8.25a4.422,4.422,0,0,1-4.444,4.4H26.444A4.422,4.422,0,0,1,22,314.6v-8.25h1.667Z',
      }
      var labelSetting = {
        normal: {
          show: true,
          position: 'right',
          offset: [10, 0],
          textStyle: {
            fontSize: 16
          }
        }
      };
      this.totalChart = echarts.init(this.$refs.totalChart, 'macarons')
      this.totalChart.setOption({
        title: {
          text: '平台数据统计',
          left: 'center'
        },
        grid: {
          containLabel: true,
          left: 20
        },
        yAxis: {
          data: ['平台用户', '活动数量', '入驻店铺', '入驻商场'],
          inverse: true,
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {
            margin: 30,
            textStyle: {
              fontSize: 14
            }
          },
          axisPointer: {
            label: {
              show: true,
              margin: 30
            }
          }
        },
        xAxis: {
          splitLine: {show: false},
          axisLabel: {show: false},
          axisTick: {show: false},
          axisLine: {show: false}
        },
        series: [{
          name: 'data',
          type: 'pictorialBar',
          label: labelSetting,
          symbolRepeat: true,
          symbolSize: ['80%', '60%'],
          barCategoryGap: '40%',
          data: [{
            value: vm.userNum,
            symbol: pathSymbols.user
          }, {
              value: vm.pmSaleNum + vm.enterNameNum + vm.pmSaleNum,
              symbol: pathSymbols.active
          }, {
              value: vm.shopNum,
              symbol: pathSymbols.shop
          }, {
              value: vm.mallNum,
              symbol: pathSymbols.mall
          }]
        }]
      })
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getDataList() {
      const url = this.apiList.finance.thirdMoney
      this.$http({
        url:  this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        this.totalMoneyWx = data.data.totalMoneyWx / 100
        this.totalMoneyAli = data.data.totalMoneyAli / 100
        this.sysTotal = data.data.sysTotal / 100
      })
    },
    getDataMore() {
      const url = this.apiList.finance.getGrossData
      this.$http({
        url:  this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        this.userNum = data.data.userNum ? data.data.userNum : 0
        this.mallNum = data.data.mallNum ? data.data.mallNum : 0
        this.shopNum = data.data.shopNum ? data.data.shopNum : 0
        this.pmSaleNum = data.data.pmSaleNum ? data.data.pmSaleNum : 0
        this.enterNameNum = data.data.enterNameNum ? data.data.enterNameNum : 0
        this.activityPlanNum = data.data.activityPlanNum ? data.data.activityPlanNum : 0
        this.todayOrderNum = data.data.todayOrderNum ? data.data.todayOrderNum : 0
        this.todayMoneyNum = data.data.todayMoneyNum ? data.data.todayMoneyNum / 100 : 0
        this.totalUserMoneyNum = data.data.totalUserMoneyNum ? data.data.totalUserMoneyNum / 100 : 0
        this.totalMoneyNum = data.data.totalMoneyNum ? data.data.totalMoneyNum / 100 : 0
        this.todayMoneyOutNum = data.data.todayMoneyOutNum ? data.data.todayMoneyOutNum / 100 : 0
        this.madedMoney = data.data.madedMoney ? data.data.madedMoney / 100 : 0
        this.resellMadeMoney = data.data.resellMadeMoney ? data.data.resellMadeMoney / 100 : 0
        this.sysMadeMoney = data.data.sysMadeMoney ? data.data.sysMadeMoney / 100 : 0
        this.initChart(data.data.pmSaleNum, data.data.enterNameNum, data.data.activityPlanNum, data.data.groupBuyNum)
        this.initTotalChart()
      })
    }
  },
  created() {
    this.getDataMore()
    this.getDataList()
  },
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
.panel-group {
  margin-top: 18px;
  .card-panel-icon{
    width: 60px;
    height: 60px;
  }
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        // background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      // color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      text-align: right;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
