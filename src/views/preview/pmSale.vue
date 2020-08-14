<template>
  <div class="detail_pro">
    <div class="header_fixed1">
      <div
        class="header"
        :class="{
        'headerDefault':!this.defaultTheme,
        'headerPet':this.defaultTheme === 19 ,
        'headerBeauty':this.defaultTheme === 13 ,
        'headerChild':this.defaultTheme === 5,
        'headerMarket':this.defaultTheme === 8,
        'headerOther':this.defaultTheme === 25 || this.defaultTheme > 46,
        'headerFoods':this.defaultTheme === 31,
        'headerTravel':this.defaultTheme === 37,
        'headerFun':this.defaultTheme === 41,
        }"
      >
        <span>
          <img src="../../assets/preview/back.png" alt />
        </span>
        <span
          style="line-height: 35px;color: #fff; font-size: 16px"
          v-if="!this.defaultTheme "
        >促销</span>
        <span style="line-height: 35px" v-if="this.defaultTheme === 19 ">
          <img
            style="width: 50.5px; height: 19.5px;"
            src="../../assets/preview/petsTitle.png"
            alt
          />
        </span>
        <span v-if="this.defaultTheme === 13 ">
          <img
            style="width: 47.5px; height: 20px;"
            src="../../assets/preview/beautyTitle.png"
            alt
          />
        </span>
        <span v-if="this.defaultTheme === 5 " style="line-height: 40px">
          <img
            style="width: 62px; height: 22px;"
            src="../../assets/preview/childTitle.png"
            alt
          />
        </span>
        <span v-if="this.defaultTheme === 8 " style="line-height: 40px">
          <img
            style="width: 60px; height: 21.5px;"
            src="../../assets/preview/marketTitle.png"
            alt
          />
        </span>
        <span v-if="this.defaultTheme === 25 || this.defaultTheme > 46 " style="line-height: 40px">
          <img style="width: 56px; height: 28px;" src="../../assets/preview/promotion.png" alt />
        </span>

        <span v-if="this.defaultTheme === 31 " style="line-height: 40px">
          <img
            style="width: 54px; height: 17px;"
            src="../../assets/preview/foodsTitle.png"
            alt
          />
        </span>
        <span v-if="this.defaultTheme === 37 " style="line-height: 40px">
          <img
            style="width: 64px; height: 20px;"
            src="../../assets/preview/travelTitle.png"
            alt
          />
        </span>
        <span v-if="this.defaultTheme === 41 " style="line-height: 40px">
          <img
            style="width: 50px; height: 19px;"
            src="../../assets/preview/funTitle.png"
            alt
          />
        </span>
        <span>
          <div class="buttonShare">
            <img src="../../assets/preview/shareNew.png" class="img"><span class="spanShare">分享</span>
          </div>
        </span>
      </div>
    </div>

    <div v-show="!nothing">
      <div class="detail_header">
       <img
          v-if="!this.defaultTheme"
          class="detail_header_bg"
          src="../../assets/preview/defaultBg.png"
          :onerror="defaultImg"
        />
        <img
          v-if="this.defaultTheme === 19"
          class="detail_header_petsBg"
          src="../../assets/preview/petsBg.png"
        />
        <img
          v-if="this.defaultTheme === 13"
          class="detail_header_beautyBg"
          src="../../assets/preview/beautyBg.png"
        />
        <img
          v-if="this.defaultTheme === 5"
          class="detail_header_childBg"
          src="../../assets/preview/childBg.png"
        />
        <img
          v-if="this.defaultTheme === 8"
          class="detail_header_beautyBg"
          src="../../assets/preview/marketBg.png"
        />
        <img
          v-if="this.defaultTheme === 25 || this.defaultTheme > 46"
          class="detail_header_otherBg"
          src="../../assets/preview/detaillPromotion.png"
        />
        <img
          v-if="this.defaultTheme === 31"
          class="detail_header_foodsBg"
          src="../../assets/preview/foodsDetail.png"
        />
        <img
          v-if="this.defaultTheme === 37"
          class="detail_header_travelBg"
          src="../../assets/preview/travelDetail.png"
        />
        <img
          v-if="this.defaultTheme === 41"
          class="detail_header_funBg"
          src="../../assets/preview/recreationDetail.png"
        />
        <div class="mainHeader">
          <img :src="imgUrl  + '!660w'" class="imgUrl" :onerror="defaultImg" />
        </div>
        <div class="mainHeader_bottom_detail">
          <div class="mainHeader_flex">
            <div class="price_flex">
              <div class="price">
                <span>
                  <i class="icon1">￥</i>
                  <i>{{ price }}</i>
                </span>
              </div>
              <div class="main-team-mess">
                <p class="p_bottom">
                  <del>
                    <i>￥</i>
                    {{ showPrice }}
                  </del>
                </p>
                <p>已抢{{ alreadyNum }}件 &nbsp; 库存{{ totalNum }}</p>
              </div>
              <img src="../../assets/preview/bg1.png" />
            </div>
            <div class="main-pro">
              <p class="main-pro-time" v-if="this.startTime < this.nowTime ">
                距结束
                <count :endTime="this.endTime" :callback="callback" endText="已经结束了"></count>
              </p>
              <p class="main-pro-time" v-if="this.startTime > this.nowTime ">
                距开始
                <count :endTime="this.startTime" :callback="callback" endText="已经结束了"></count>
              </p>
              <div class="main-progress">
                <div class="main-progress-gress" :style="{'width': percent + '%' }"></div>
                <div class="main-progress-percent">
                  <p>已抢{{ percent }}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail_title">{{ name }}</div>
      <div class="detail_address" v-show="explain">
        说明：{{ explain }}
        <!--        <i class="icon icon-address"></i>-->
      </div>
      <div class="detail_num clearfix">
        <span class="span_left">
          <img src="../../assets/preview/hits.png" />
          浏览{{ viewCount }}
        </span>
        <span class="span_right">
          <img src="../../assets/preview/collect.png" />
          收藏{{ collectCount }}
        </span>
      </div>

      <div class="detail_main">
        <!-- 风采展示 -->
        <div class="mainBody_header">
          <ul class="itemContain">
            <li class="listItem">
              <img
                style="border-radius: 0;width: 24px; height: 27px;"
                src="../../assets/preview/dianpufengcai.png"
              />
            </li>
            <li class="listItem" style="width: 1.5px;">
              <span class="right_border"></span>
            </li>
            <ul class="itemContainPre">
              <li class="listItem" v-for="item in dataList" :key="item.id">
                <img
                  :src="item.imgUrl + '!220w'"
                  :large="item.imgUrl  + '!660w'"
                  :onerror="defaultImg"
                  preview="1"
                  preview-text="风采展示"
                />
              </li>
            </ul>
          </ul>
        </div>
        <!-- 分销商分销页面 -->
        <share-item
          :type="2"
          :description="name"
          :targetType="3011"
          :targetId="Number(activityId)"
          :share_logo="imgUrlSquare+ '!440w'"
          :dataAll="dataAll"
          v-if="isDistributor==='true' && resellPrice > 0"
        ></share-item>
        <!-- 网友点评 -->

        <div class="nav">
          <li v-for="(item, index) in navItem" :key="index" @click="tabClick(index)">
            <p class="title" :class="{'titleColor':selected != index}">{{item}}</p>
            <p class="bottom" :class="{'bottomColor':selected === index}"></p>
          </li>
        </div>
        <div class="list">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
              <div>
                <ul class="notice">
                  <li v-for="item in noticeList" :key="item.id">
                    <p>{{ item.noteKey }}</p>
                    <pre>{{ item.noteValue }}</pre>
                  </li>
                  <li>
                    <p>使用流程</p>
                    <div class="useProcess">
                      <div class="useProcessItem">
                        <img src="../../assets/preview/process0.png" alt />
                        <span>
                          购买后查看
                          <br />我的订单
                        </span>
                      </div>
                      <div class="useProcessItem">
                        <img src="../../assets/preview/process1.png" alt />
                        <span>
                          点击取货码
                          <br />出示二维码
                        </span>
                      </div>
                      <div class="useProcessItem">
                        <img src="../../assets/preview/process2.png" alt />
                        <span>
                          给商铺扫码
                          <br />确认取货
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="shopDetail">
                <div
                  class="detail_img fulltext_desc"
                  style="width: 100%; overflow: hidden;"
                  v-html="fullText"
                ></div>
                <img src="../../assets/preview/1.jpg" />
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <div class="detail_bg_line">
          <i></i>
        </div>
        <div class="detail_info">
          <div class="detail_info_time" v-if="address || doorAdd ">
            <i class="detail_info_time_icon icon3"></i>
            <span class="detail_info_title">{{address}}{{doorAdd ? doorAdd : ''}}</span>
            <div class="detail_info_line margin3"></div>
            <span class="detail_info_remind icon5"></span>
          </div>
          <div class="detail_info_time" v-if="phoneNum">
            <i class="detail_info_time_icon icon4"></i>
            <span class="detail_info_title">{{phoneNum}}</span>
            <div class="detail_info_line"></div>
            <span class="detail_info_remind icon6"></span>
          </div>
        </div>
      </div>
      <div class="commentPro" id="comment_main_footer">
        <div class="comment_footer_fix">
          <div class="comment_footer">
            <div class="left">
              <div class="comment_footer_margin">
                <div class="img_container">
                  <img src="../../assets/preview/chat.png" />
                </div>
                <p>在线咨询</p>
              </div>
              <div class="comment_footer_top">
                <div class="img_container">
                  <img src="../../assets/preview/enter_shop.png" />
                </div>
                <p>进店</p>
              </div>
              <div class="comment_footer_top comment_footer_width">
                <div class="img_container">
                  <img v-if="!this.collect" src="../../assets/preview/collect_big.png" />
                  <img v-if="this.collect" src="../../assets/preview/is_collect_big.png" />
                </div>
                <p v-if="!this.collect">收藏</p>
                <p v-if="this.collect">已收藏</p>
              </div>
            </div>
            <div v-if="this.percent === 100" class="pay1 payDone">
              已卖光
              <span></span>
            </div>
            <div v-if="this.percent !== 100 && this.gotIt" class="pay1">
              您已购买
              <span></span>
            </div>
            <div
              v-if="this.percent !== 100 && !this.gotIt"
              :class="{'pay1': !OnlyMiniApp && !OnlyApp,'pay2': OnlyMiniApp || OnlyApp}"
            >
              立即购买
              <span v-if="OnlyApp">（仅限APP内购买）</span>
              <span v-if="OnlyMiniApp">（仅限小程序内购买）</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="nothing" class="nothing">
      <img src="../../assets/preview/not_shop.png" />
      <p>该商品已过期，不存在</p>
    </div>
  </div>
</template>
<script>
import ShareItem from "./shareItem";
import Count from "./endTime.vue";
import { Base64 } from "js-base64";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "detailPromotion",
  props: {
    activityId: {},
    url: {},
    listId: {}
  },
  data() {
    return {
      value: 0,
      phoneNum: "",
      explain: "",
      OnlyApp: "",
      OnlyMiniApp: "",
      isDistributor: "",
      mapSelect: false,
      isIphoneX: "",
      lat: "",
      lng: "",
      address: "",
      doorAdd: "",
      callback: "",
      resellPrice: 0,
      imgUrl: "",
      defaultImg:
        'this.src="' + require("../../assets/preview/default.png") + '"',
      price: 0,
      imgUrlSquare: "",
      showPrice: 0,
      endTime: 1,
      startTime: "",
      nowTime: "",
      name: "众享乐默认标题",
      viewCount: 0,
      collectCount: 0,
      alreadyNum: 0,
      percent: 0,
      fullText: "",
      moduleId: 15,
      type: 301,
      userId: "",
      dataAll: [],
      gotIt: "",
      dataList: [],
      noticeList: [],
      selected: 0,
      isDistributor: "",
      navItem: ["购买须知", "商品详情"],
      nothing: false,
      collect: false,
      defaultTheme: 0,
      totalNum: "",
      moduleImgUrl: "",
      swiperOption: {
        notNextTick: false,
        paginationClickable: true,
        autoHeight: true,
        observer: true,
        observeParents: true,
        loop: false,
        //touchAngle : 15,
        on: {
          slideChange: () => {
            this.selected = this.$refs.mySwiper.swiper.realIndex;
          }
        }
      },
      isMess: false,
      navColor: "",
      name: "",
      isWeChat: false,
      commentListX: {
        userEntity: {
          avatar: "",
          name: ""
        },
        content: "",
      },

      imgUrlsC: [],
      page: 1,
      size: 1000,
      noComment: false
    };
  },
  components: {
    Count,
    ShareItem
  },
  filters: {
    formatDay: function(startTime) {
      var today = new Date(); //当前时间
      var nowTime = today.getTime();
      var day = Math.ceil((startTime - nowTime) / 86400000);
      if (day < 0) {
        day = 0;
      }
      return day;
    }
  },
  methods: {
    tabClick(val) {
      this.selected = val;
      this.$refs.mySwiper.swiper.slideTo(this.selected, 300, true);
      // localStorage.setItem('collect_1',this.selected)
    },
    getDataList() {
      let url = this.apiList.shop.pmSale.detail
      let id = this.activityId
      if(this.url) {
        url = this.url
      }
      if(this.listId) {
        id = this.listId
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: "post",
        data: this.$http.adornData({ id: id}, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.resellPrice = data.data.resellPrice;
          this.imgUrl = data.data.imgUrl;
          this.imgUrlSquare = data.data.imgUrlSquare;
          this.price = data.data.price / 100;
          this.showPrice = data.data.showPrice / 100;
          this.endTime = data.data.endTime;
          this.startTime = data.data.startTime;
          this.name = data.data.name;
          this.viewCount = data.data.viewCount;
          this.collectCount = data.data.collectCount;
          this.alreadyNum = data.data.alreadyNum;
          this.totalNum = data.data.totalNum;
          this.percent = parseInt(
            (data.data.alreadyNum / data.data.totalNum) * 100
          );
          this.moduleId = data.data.moduleId;
          this.type = data.data.type;
          this.collect = data.data.collect;
          this.dataAll = data.data;
          if(data.data.defaultTheme) {
            this.defaultTheme = data.data.defaultTheme
          }
          this.moduleName = data.data.moduleName;
          this.moduleImgUrl = data.data.moduleImgUrl;
          this.doorAdd = data.data.doorAdd;
          this.address = data.data.address;
          this.phoneNum = data.data.phoneNum;
          this.explain = data.data.expla;
          this.lat = data.data.lat;
          this.lng = data.data.lng;
          if(data.data.gotNum >= data.data.totalCanBuy){
            this.gotIt = true
          }else{
            this.gotIt = false
          }
          this.fullText = Base64.decode(data.data.fullText)
          // 风采展示
          this.dataList = data.data.photoShow.length > 6 ? data.data.photoShow.splice(0, 6) : data.data.photoShow;
          // 注意事项
          this.noticeList = data.data.attention
        }
      });
    },
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }
  },
  created() {
    this.nothing = false;
    this.nowTime = new Date().getTime();
    // this.defaultTheme = Number(this.$route.query.defaultTheme);
    this.defaultTheme = 19
    // this.name = this.noticeList.name;
    this.isDistributor = localStorage.getItem("isDistributor")
      ? localStorage.getItem("isDistributor")
      : false;
    if (localStorage.getItem("uid")) {
      this.userId = localStorage.getItem("uid");
    } else {
      this.userId = null;
    }
    let that = this;
    this.getDataList()
  }
};
</script>

<style lang="scss">
.detail_pro {
  position: relative;
  width: 375px;
  margin: auto;
  .fulltext_desc{
    img{
      max-width: 100%;
      //height:auto !important;
    }
    p{
    //   font-size: 12px;
      min-height: 17.5px;
    //   line-height: 20px;
    }
    // div{
    //   font-size: 12px;
    //   // line-height: 1.7rem;
    // }
    strong{
      font-weight: bold;
      word-wrap: break-word;
      word-break: normal;
    }
    video{
      max-width: 100%;
      border: solid 1px #ccc;
    }
  }
  .buttonShare{
    width:50px;
    height:20px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7px;
    box-shadow: 0 0 2px 0 #999999;
    .img{
      width: 12px;
      height: 12px;
    }
    .spanShare{
      font-weight: bold;
      font-size: 11px;
      color: #333333;
    }
  }
  li{
    list-style: none;
  }
  .header_fixed1 {
    position: -webkit-sticky;
    position: sticky;
    top: 0rem;
    top: env(safe-area-inset-top);
    z-index: 15;
    width: 100%;
    height: 44px;
    .header{
      span:nth-child(1){
        img{
          padding-right: 20px;
        }
      }
      span:nth-child(3){
        .util_share{
          padding-left: 18px;
        }
      }
    }
  }
  p{
    margin: 0;
  }
  i{
    font-style: normal;
  }
  // 使用流程
  .useProcess{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .useProcessItem{
      display: inline-block;
      img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      span{
        display: inline-block;
        width: 62px;
        font-size: 11px;
        line-height: 15px;
        color: #666;
        vertical-align: middle;
      }
    }
  }
  .fixedButtom {
    height: 50px;
    line-height: 50px;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 50px;
    width: 100%;
    z-index: 999;
    box-sizing: border-box;
    padding: 0 20px;
    span {
      color: #fff;
      font-size: 14px;
    }
    span:nth-child(2) {
      float: right;
      background: #00a1fc;
      border-radius: 30px;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      margin-top: 25px;
      transform: translateY(-50%);
    }
  }
  .content_text {
    margin: 20px 40px 0;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 30%;
      height: 30%;
      display: inline-block;
    }
    span {
      font-size: 14px;
    }
  }
  .header_fixed {
    background-image: url("../../assets/preview/detaillPromotion.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 24px;
  }
  .header {
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 12px;
    padding-right: 16px;
    span img {
      vertical-align: middle;
      height: 18px;
    }
    span:first-child {
      width: 5px;
    }
  }
  .headerDefault {
    background-image: url("../../assets/preview/defaultBgTitle.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .headerPet {
    background-image: url("../../assets/preview/petsBg.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .headerBeauty {
    background-image: url("../../assets/preview/beautyBg.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .headerChild {
    background-color: #ecf2d8;
  }
  .headerMarket {
    background-image: url("../../assets/preview/marketBg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #fff;
  }
  .headerOther {
    background-image: url("../../assets/preview/detaillPromotion.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 24px;
    background-color: #fff;
  }
  .headerFoods {
    background-color: #d9e8d2;
  }
  .headerFun {
    background-image: url("../../assets/preview/recreationDetail.png");
    background-size: cover;
    background-repeat: no-repeat;
    //background-position-y: 24px;
    background-color: #fff;
  }
  .headerTravel {
    background-image: url("../../assets/preview/travelDetail.png");
    background-size: cover;
    background-repeat: no-repeat;
    //background-position-y: 24px;
    background-color: #fff;
  }
  .detail_header {
    background-size: 100%;
    background-color: #fff;
    /*.detail_header_bg{*/
    /*  position: absolute;*/
    /*  width: 100%;*/
    /*  height: 159px;*/
    /*  overflow: hidden;*/
    /*  opacity: 0.2;*/
    /*  top:44px;*/
    /*}*/

    .detail_header_bg {
      position: absolute;
      width: 100%;
      height: 218px;
      /*overflow: hidden;*/
      /*opacity: 0.2;*/
      top: 0;
    }
    .detail_header_beautyBg {
      position: absolute;
      width: 100%;
      //height: 197px;
      /*overflow: hidden;*/
      /*opacity: 0.2;*/
      top: 0;
    }
    .detail_header_petsBg {
      position: absolute;
      width: 100%;
      //height: 174px;
      /*overflow: hidden;*/
      /*opacity: 0.2;*/
      top: 4px;
    }
    .detail_header_childBg {
      position: absolute;
      width: 100%;
      height: 193px;
      /*overflow: hidden;*/
      /*opacity: 0.2;*/
      top: 44px;
    }
    .detail_header_otherBg {
      position: absolute;
      width: 100%;
      height: 193px;
      /*overflow: hidden;*/
      /*opacity: 0.2;*/
      top: 24px;
    }
    .detail_header_travelBg {
      position: absolute;
      width: 100%;
      height: 237px;
      /*overflow: hidden;*/
      /*opacity: 0.2;*/
      top: 0rem;
    }
    .detail_header_funBg {
      position: absolute;
      width: 100%;
      height: 237px;
      /*overflow: hidden;*/
      /*opacity: 0.2;*/
      top: 0rem;
    }
    .detail_header_foodsBg {
      position: absolute;
      width: 100%;
      height: 193px;
      /*overflow: hidden;*/
      /*opacity: 0.2;*/
      top: 44px;
    }

    /*.imgUrl_bg{*/
    /*  width: 100%;*/
    /*  height: 175px;*/
    /*  position: absolute;*/
    /*  //top:26px;*/
    /*  left: 0;*/
    /*}*/
    /*.imgUrl_bg1{*/
    /*  width: 100%;*/
    /*  height: 175px;*/
    /*  position: absolute;*/
    /*  left: 0;*/
    /*  //z-index: 15;*/
    /*  top: 24px;*/
    /*}*/
    .mainHeader {
      width: 343px;
      height: 159px;
      margin: 0 auto;
      border-radius: 8px 8px 0 0;
      overflow: hidden;
      background-size: 100% 100%;
      position: relative;
      top: 39px;
      //box-shadow: 0 3px 3px -.5px #03070B2B;
      //background-color: #ffffff;
      //z-index: 16;
      .imgUrl {
        width: 343px;
        height: 159px;
        border-radius: 8px 8px 0 0;
        background-size: 100% 100%;
      }
    }
    .mainHeader_bottom_detail {
      // position: absolute;
      // bottom: -45px;
      width: 343px;
      margin: auto;
      margin-top: 38px;
      height: 45px;
      background: rgba(250, 45, 79, 1);
      border-radius: 0 0 8px 8px;
      .price_flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          position: absolute;
          width: 40.5px;
          height: 36.5px;
          top: 225px;
          left: 215px;
        }
      }
      .mainHeader_flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 8px;
        box-sizing: border-box;
        .price {
          color: #fff;
          font-family: Source-Medium;
          margin-right: 8px;
          span {
            font-size: 22px;
            .icon1 {
              font-size: 12px;
              font-style: normal;
            }
            /*.icon2{*/
            /*  font-size: 16px;*/
            /*  font-style: normal;*/
            /*}*/
          }
        }
        .main-progress {
          width: 86px;
          height: 13px;
          line-height: 13px;
          margin: 3px auto 0;
          background: #d7d7d7;
          font-size: 9px;
          border-radius: 7px;
          position: relative;
          overflow: hidden;
          width: 100%;
          .main-progress-percent {
            color: #ffffff;
            position: absolute;
            top: 1px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 4;
            width: 100%;
            p {
              font-size: 10px;
              line-height: 13px;
              text-align: center;
            }
          }
          .main-progress-gress {
            background: #fc993c;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 41%;
            border-radius: 7px;
            z-index: 3;
          }
        }
        .main-team-mess {
          p {
            font-size: 12px;
            color: #ffffff;
            i {
              font-style: normal;
              font-size: 12px;
            }
            del {
              font-style: normal;
              font-weight: 400;
            }
          }
        }
        .main-pro {
          .main-pro-time {
            color: #ffffff;
            margin-left: 3.5px;
          }
        }
      }
    }
  }
  .detail_title {
    padding: 16px 16px 0rem;
    font-size: 16px;
    background-color: #fff;
    color: #333;
    line-height: 23px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    span {
      float: right;
      font-size: 12px;
      color: #999;
    }
  }
  .detail_address {
    width: 360px;
    padding-left: 16px;
    font-size: 12px;
    color: #999;
    line-height: 18px;
    padding-top: 5px;
    .icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      font-style: normal;
      vertical-align: bottom;
    }
    .icon-address {
      background: url("../../assets/preview/dingwei.png");
      background-size: 10px 10px;
      background-repeat: no-repeat;
      background-position: 4px 4px;
    }
  }
  .detail_num {
    padding: 16px 16px 0rem 16px;
    text-align: center;
    background-color: #fff;
    .span_right {
      float: right;
      margin-right: 37px;
    }
    .span_left {
      float: left;
      margin-left: 37px;
    }
    span {
      color: #999999;
      font-size: 12px;
      img {
        width: 10px;
        background-size: 100% 100%;
        margin-right: 3px;
      }
    }
  }

  .detail_bg_line {
    background-color: #ffffff;
    i {
      background-image: url("../../assets/preview/bg_line.png");
      width: 94.4%;
      height: 11px;
      background-size: 100% 100%;
      display: inline-block;
      margin-left: 21px;
    }
  }
  .detail_info {
    padding: 0 16px 10px;
    background-color: #fff;
    .detail_info_time {
      display: flex;
      justify-content: space-between;
      //align-items: center;
      padding: 8px 0;
      .detail_info_time_icon {
        display: inline-block;
        background-image: url("../../assets/preview/time.png");
        width: 14px;
        height: 14px;
        background-size: 100% 100%;
        margin-top: 2px;
      }
      .icon2 {
        background-image: url("../../assets/preview/old.png");
      }
      .icon3 {
        background-image: url("../../assets/preview/position.png");
      }
      .icon4 {
        background-image: url("../../assets/preview/phone.png");
      }
      .detail_info_title {
        font-size: 14px;
        color: #666666;
        flex: 0.88;
        line-height: 18px;
      }
      .detail_info_line {
        width: 1px;
        height: 14px;
        border-left: 1px solid #d7d7d7;
        margin-top: 2px;
      }
      .detail_info_remind {
        font-size: 14px;
        color: #00a1fc;
        margin-top: 2px;
      }
      .icon5 {
        background-image: url("../../assets/preview/icon5.png");
        width: 14px;
        height: 14px;
        background-size: 100% 100%;
        margin-left: 6px;
        margin-right: 8px;
      }
      .icon6 {
        background-image: url("../../assets/preview/icon6.png");
        width: 14px;
        height: 14px;
        background-size: 100% 100%;
        margin-left: 6px;
        margin-right: 8px;
      }
    }
    .mainBody_header {
      width: 343px;
      margin: 10px auto 0;
      border-radius: 8px;
      background: #fff;
      height: 48px;
      line-height: 48px;
      /*box-shadow: 0 1px 1px 1px #03070B2B;*/
      box-shadow: 0 1.5px 3.5px 0 rgba(3, 11, 7, 0.35);
      .itemContain {
        height: 100%;
        line-height: 48px;
        overflow: hidden;
        padding: 0;
        .listItem {
          /*float: left;*/
          width: 45px;
          display: inline-block;
          transition: all 0.6s;
          text-align: center;
          vertical-align: top;
          img {
            border-radius: 4px;
            width: 34px;
            height: 34px;
            vertical-align: middle;
          }
          .right_border {
            display: inline-block;
            width: 0;
            height: 12.5px;
            border-right: solid 1px #e9e9e9;
            vertical-align: middle;
          }
        }
        .itemContainPre {
          display: inline-block;
          height: 115%;
          width: 82%;
          padding: 0;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overflow-y: hidden;
          white-space: nowrap;
          ::-webkit-scrollbar {display:none}
        }
      }
    }
  }

  .detail_main {
    // margin-top: 12px;
    padding: 12px 15px 50px 12px;
    background-color: #fff;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
    /*height:425px ;*/
    .mainBody_header {
      width: 343px;
      margin: 0 auto;
      border-radius: 8px;
      background: #fff;
      height: 48px;
      line-height: 48px;
      /*box-shadow: 0 1px 1px 1px #03070B2B;*/
      box-shadow: 0 1.5px 3.5px 0 rgba(3, 11, 7, 0.35);
      .itemContain {
        height: 100%;
        line-height: 48px;
        overflow: hidden;
        padding: 0;
        .listItem {
          /*float: left;*/
          width: 45px;
          display: inline-block;
          transition: all 0.6s;
          text-align: center;
          vertical-align: top;
          img {
            border-radius: 4px;
            width: 34px;
            height: 34px;
            vertical-align: middle;
          }
          .right_border {
            display: inline-block;
            width: 0;
            height: 12.5px;
            border-right: solid 1px #e9e9e9;
            vertical-align: middle;
          }
        }
        .itemContainPre {
          display: inline-block;
          height: 115%;
          width: 82%;
          padding: 0;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overflow-y: hidden;
          white-space: nowrap;
          ::-webkit-scrollbar {display:none}
        }
      }
    }
    .mainComment {
      //margin-top: 15px;
      padding: 6px 23px 13px 13px;
      margin-left: -15px;
      margin-right: -15px;
      border-top: 5px solid #f8f8f8;
      /*text-align: center;*/
      // border-bottom: 5px solid #f8f8f8;
      .commentHeight {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 23px;
        margin-left: 10px;
        img {
          width: 89px;
          height: 23px;
        }
        span {
          color: #f5ac3a;
          font-size: 14px;
        }
      }
      .commentContent {
        margin: 0 13px;
        .commentTitle {
          display: flex;
          align-items: center;
          margin-bottom: 09px;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
          span {
            color: #999999;
            font-size: 13px;
            margin-left: 6px;
          }
        }
        .commentShow {
          color: #070707;
          font-size: 12px;
          line-height: 16px;
          font-weight: 600;
          margin: 10px 0;
        }
        .listImage {
          display: flex;
          width: 300px;
          justify-content: flex-start;
          flex-wrap: wrap;
          // margin-bottom: 10px;
          .childImg {
            width: 91px;
            height: 91px;
            margin: 0 7.5px 7.5px 0;
          }
        }
      }
      .noComment {
        margin: 0 136px;
        width: 78px;
        height: 99px;
      }
    }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      width: 100%;
      /*background: #00A1FC;*/
      box-sizing: border-box;
      padding: 0 50px;
      margin-top: 4px;
      position: -webkit-sticky;
      position: sticky;
      top: 40px;
      top: calc(40px + env(safe-area-inset-top));
      background: #fff;
      z-index: 2;
      // li {
      //   width:40px;
      //   height: 50px;
      //   line-height: 50px;
      //   text-align: center;
      //   font-size: 14px;
      //   color: #FFFFFF;
      //   vertical-align: middle;
      //   box-sizing: border-box;
      // }
      .title {
        // width: 40px;
        // height: 20px;
        line-height: 14px;
        text-align: center;
        font-size: 17px;
        color: #fe9f03;
        vertical-align: middle;
        box-sizing: border-box;
        margin-top: 6.5px;
        font-weight: bold;
      }

      .titleColor {
        opacity: 0.8;
        color: #000;
      }
      .bottom {
        width: 66px;
        height: 3px;

        border-radius: 1.5px;
        margin-top: 4.5px;
        /*margin-left: 03px;*/
      }
      .bottomColor {
        background-color: #fe9f03;
      }
    }
    .list {
      .notice {
        width: 100%;
        box-sizing: border-box;
        padding: 16px;
        li {
          p {
            font-size: 14px;
            border: 600;
            color: #666;
            line-height: 18px;
            margin-top: 15px;
            color: #fa2d4f;
            i {
              color: #fa2d4f;
            }
          }
          pre:nth-child(2) {
            color: #666;
            font-size: 14px;
            border: 600;
            line-height: 18px;
            margin-top: 15px;
            padding-left: 30px;
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
            *white-space: normal !important;
          }
        }
      }
      .shopDetail {
        img {
          width: 350px;
          // height: 350px;
        }
      }
    }

    h2 {
      border-bottom: 1px solid #d7d7d7;
      font-size: 16px;
      padding-bottom: 16px;
    }
    .detail_img {
      margin: 16px 0 0;
      padding-bottom: 12px;
      img {
        max-width: 100%;
      }
    }
  }
  .commentPro {
    background-color: #ffffff;
    width: 100%;
    height: 50px;
    z-index: 2;
    .end_line {
      padding: 0 0 50px !important;
    }
    .bg {
      background-color: #eaeaea;
      margin: 0;
      padding: 20px 0 70px;
    }
    .comment_margin {
      margin: 0 16px;
      position: relative;
      .comment_i1 {
        position: absolute;
        top: 155px;
        left: -16px;
        background-image: url("../../assets/preview/bg_1.png");
        width: 32px;
        height: 47px;
        background-size: 100% 100%;
      }
      .comment_i2 {
        position: absolute;
        bottom: 50px;
        left: -16px;
        background-image: url("../../assets/preview/bg_2.png");
        width: 32px;
        height: 24px;
        background-size: 100% 100%;
      }
      h2 {
        padding: 16px 0;
        border-bottom: 1px solid #d7d7d7;
        font-size: 16px;
      }
      .comment_on {
        display: flex;
        justify-content: space-between;
        margin-top: 19px;
        align-items: center;
        display: none;
        img {
          height: 34px;
          width: 34px;
          margin-right: 13px;
        }
        input {
          height: 36px;
          width: 296px;
          font-size: 14px;
          background: rgba(250, 250, 250, 1);
          box-shadow: .5px .5px 4px 0px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
        }
        .comment_user_content {
          width: 296px;
          h3 {
            font-size: 12px;
            color: #999999;
          }
          p {
            font-size: 13px;
            color: #333333;
            margin-top: 12px;
          }
        }
      }
      .comment_user {
        margin-bottom: 41.5px;
        .comment_time {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          .comment_time_after {
            margin-left: 47px;
            color: #999999;
            font-size: 12px;
          }
          .comment_time_icon {
            .icon_line {
              margin: 0 12px;
              width: 1px;
              border-left: 1px solid #d7d7d7;
            }
            .icon_num {
              margin-right: 12px;
              color: #999999;
              font-size: 12px;
            }
            img {
              width: 12px;
            }
          }
        }
        .comment_reply {
          background-color: #fafafa;
          margin: 16px 0 0 47px;
          padding: 16px 0;
          .comment_reply_flex {
            display: flex;
            justify-content: space-between;
            img {
              height: 34px;
              width: 34px;
              margin-right: 13px;
            }
            .comment_user_content {
              flex: 1.8;
              h3 {
                font-size: 12px;
                color: #999999;
              }
              p {
                font-size: 13px;
                color: #333333;
                margin-top: 12px;
              }
              .comment_reply_time {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                img {
                  width: 12px;
                  height: 9px;
                }
                span {
                  color: #999999;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
      .comment_user:last-child {
        margin-bottom: 16px;
      }
    }
    .comment_footer_fix {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -1px 8px 0px rgba(0, 0, 0, 0.08);
      .comment_footer {
        height: 50px;
        display: flex;
        justify-content: space-between;
        justify-items: center;
        background-color: #ffffff;
        div {
          text-align: center;
        }
        .left {
          width: 50%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .pay1 {
          width: 50%;
          border-radius: 16.5px;
          vertical-align: middle;
          height: 33px;
          flex: 0.75;
          line-height: 33px;
          color: #fefefe;
          font-size: 15px;
          margin-right: 16px;
          margin-top: 9px;
          background: linear-gradient(
            13deg,
            rgba(0, 197, 252, 1),
            rgba(5, 145, 232, 1)
          );
          span {
            font-size: 10px;
          }
        }
        .pay2 {
          width: 50%;
          border-radius: 16.5px;
          vertical-align: middle;
          height: 33px;
          line-height: 15px;
          padding-top: 5px;
          flex: 0.75;
          color: #fffefefe;
          font-size: 17px;
          margin-right: 16px;
          margin-top: 9px;
          background: linear-gradient(
            13deg,
            rgba(0, 197, 252, 1),
            rgba(5, 145, 232, 1)
          );
          span {
            display: block;
            font-size: 7px;
            color: #ffffffff;
          }
        }
        .payDone {
          background: #999999;
          color: #fefefe;
        }
        .comment_footer_margin {
          // margin: 0 0 0 16px;
          margin-left: 16px;
          .img_container {
            width: 18px;
            height: 18px;
            text-align: center;
            margin: 0 auto;
            margin-bottom: 5px;
            img {
              width: 18px;
            }
          }
        }
        .comment_footer_top {
          /*margin-top: 9px;*/
          margin-left: 26px;
          width: 25px;
          .img_container {
            width: 18px;
            height: 18px;
            text-align: center;
            margin: 0 auto;
            margin-bottom: 5px;
            img {
              width: 18px;
            }
          }
        }
        .comment_footer_width {
          width: 40px;
        }
        p {
          color: #666666;
          font-size: 10px;
        }

        .pay3 {
          display: flex;
          justify-content: space-between;
          flex: 0.75;
          .oneself {
            background-color: #fc993c;
            width: 50%;
            height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .oneself_price {
              color: #ffffff;
              font-size: 17px;
              font-weight: bolder;
              i {
                font-size: 10px;
              }
            }
            .oneself_buy {
              color: #fefefe;
              font-size: 12px;
            }
          }
          .spell {
            background-color: #fa2d4f;
            width: 50%;
            height: 50px;
            line-height: 50px;
            color: #fefefe;
            font-size: 12px;
          }
        }
      }
    }
    .choose_pay_shadow {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: #000;
      opacity: 0.6;
      z-index: 998;
    }
    .choose_pay_body {
      position: fixed;
      bottom: 0;
      z-index: 999;
      background: #fff;
      width: 100%;
      .choose_pay_title {
        font-size: 18px;
        height: 47px;
        line-height: 47px;
        text-align: center;
        position: relative;
        border-bottom: 1px solid #d7d7d7;
        img {
          position: absolute;
          top: 17px;
          left: 20px;

          height: 13px;

          background: url("../../assets/preview/back.png");
          background-size: 100% 100%;

          /*margin: 1.350px 0rem 1.350px 16px;*/
        }
        span {
          font-size: 14px;
          color: #333;
        }
      }
      .money_pay_choose {
        margin: 10px 15px 0;
        height: 55px;
        position: relative;
        border: 1px solid #d7d7d7;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        .c1 {
          height: 55px;
          line-height: 55px;
          i {
            font-size: 16px;
            color: #333;
            height: 20px;
            margin-left: 10px;
            font-style: normal;
          }
        }
        .c2 {
          height: 55px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          .content_left {
            .price {
              font-size: 16px;
              color: #333333;
              font-weight: 600;
            }
            .item {
              margin-top: 5px;
              font-size: 14px;
              color: #666666;
            }
          }
          .content_right {
            font-size: 14px;
            color: #999999;
            i {
              color: #00a1fc;
            }
            .no_choose {
              color: #cccccc !important;
            }
          }
        }
        .no_choose {
          color: #cccccc !important;
        }
      }
      .no_choose {
        background-color: #ededed;
      }
      .choose_border {
        border: 1px solid #00a1fc;
      }
      .go_next {
        margin: 29px 15px 20px;
        width: 345px;
        height: 41px;
        background: rgba(0, 161, 252, 1);
        border-radius: 4px;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        border: none;
      }
      .disable {
        background: #f4f4f5 !important;
        color: #bcbec2 !important;
        cursor: not-allowed;
      }
    }
  }
  .nothing {
    border-top: .5px solid #fdfdfd;
    background-color: #ffffff;
    text-align: center;
    padding: 70px;
    img {
      width: 112px;
      /*border-radius: 50%;*/
      /*box-shadow:0 1.5px 3.5px 0 rgba(0, 0, 0, 0.35);*/
      margin-bottom: 70px;
    }
    p {
      font-size: 14px;
      color: #333333;
    }
  }
  .mapContainer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 999;
    .mapItem {
      padding: 0 16px;
      height: 60px;
      line-height: 60px;
      position: relative;
      img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
      }
      i {
        font-size: 14px;
        color: #333;
        height: 20px;
        margin-left: 10px;
        font-style: normal;
      }
      &:nth-child(1) {
        border-bottom: 1px solid #d7d7d7;
      }
    }
  }
  .choose_remind_shadow {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #000;
    opacity: 0.6;
    z-index: 998;
  }
}
</style>
