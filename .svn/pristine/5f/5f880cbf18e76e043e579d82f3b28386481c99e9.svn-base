<template>
  <div class="luckyDraw">
    <div class="header_fixed1">
      <div class="header"
          :class="{
              'headerDefault':!this.defaultTheme,
              'headerPet':this.defaultTheme === 19 ,
              'headerBeauty':this.defaultTheme === 13 ,
              'headerChild':this.defaultTheme === 5,
              'headerMarket':this.defaultTheme === 8,
              'headerOther':this.defaultTheme === 25 || this.defaultTheme > 70,
              'headerFoods':this.defaultTheme === 31,
              'headerTravel':this.defaultTheme === 37,
              'headerFun':this.defaultTheme === 41,
              'headerOnline':this.defaultTheme === 59,
          }"
      >
        <span>
          <img src="../../assets/preview/back.png" />
        </span>
        <span
          style="color: #fff; font-size: 16px"
          v-if="!this.defaultTheme "
        >
            <img  style="width: 44px; height: 21px;" src="../../assets/preview/prize/otherTitle.png" class="lottery-img" />
        </span>
        <span style="line-height: 35px" v-if="this.defaultTheme === 19 ">
            <img
              style="width: 43px; height: 22px;"
              src="../../assets/preview/prize/petsTitle.png"
              alt
            />
        </span>
        <span v-if="this.defaultTheme === 13 ">
            <img
              style="width: 46px; height: 22px;"
              src="../../assets/preview/prize/beautyTitle.png"
              alt
            />
        </span>
        <span v-if="this.defaultTheme === 5 " style="line-height: 40px">
            <img
              style="width: 43px; height: 22px;"
              src="../../assets/preview/prize/childTitle.png"
              alt
            />
        </span>
        <span v-if="this.defaultTheme === 8 " style="line-height: 40px">
            <img
              style="width: 43px; height: 21px;"
              src="../../assets/preview/prize/foodsTitle.png"
              alt
            />
        </span>
        <span v-if="this.defaultTheme === 25 || this.defaultTheme > 70 " style="line-height: 40px">
            <img style="width: 44px; height: 21px;" src="../../assets/preview/prize/otherTitle.png" alt />
        </span>
        <span v-if="this.defaultTheme === 31 " style="line-height: 40px">
            <img
              style="width: 43px; height: 21px;"
              src="../../assets/preview/prize/foodsTitle.png"
              alt
            />
        </span>
        <span v-if="this.defaultTheme === 37 " style="line-height: 40px">
            <img
              style="width: 46px; height: 22px;"
              src="../../assets/preview/prize/travelTitle.png"
              alt
            />
        </span>
        <span v-if="this.defaultTheme === 41 " style="line-height: 40px">
            <img
              style="width: 45px; height: 22px;"
              src="../../assets/preview/prize/funTitle.png"
              alt
            />
        </span>
        <span v-if="this.defaultTheme === 59 ">
            <img
              style="width: 58px; height: 29px;"
              src="../../assets/preview/prize/onlineTitle.png"
              alt
            />
        </span>
        <span class="opacity"></span>
      </div>
    </div>
    <div class="detail_header">
      <img
        v-if="!this.defaultTheme"
        class="detail_header_bg"
        src="../../assets/preview/detaillPromotion.png"
      />
      <img
        v-if="this.defaultTheme === 19"
        class="detail_header_petsBg"
        src="../../assets/preview/petsBg2.png"
      />
      <img
        v-if="this.defaultTheme === 13"
        class="detail_header_beautyBg"
        src="../../assets/preview/navBack.png"
      />
      <img
        v-if="this.defaultTheme === 5"
        class="detail_header_childBg"
        src="../../assets/preview/childBg.jpg"
      />
      <img
        v-if="this.defaultTheme === 8"
        class="detail_header_beautyBg"
        src="../../assets/preview/marketBg.png"
      />
      <img
        v-if="this.defaultTheme === 25 || this.defaultTheme > 70"
        class="detail_header_otherBg"
        src="../../assets/preview/detaillPromotion.png"
      />
      <img
        v-if="this.defaultTheme === 31"
        class="detail_header_foodsBg"
        src="../../assets/preview/foodsBg.png"
      />
      <img
        v-if="this.defaultTheme === 37"
        class="detail_header_travelBg"
        src="../../assets/preview/travelBg.png"
      />
      <img
        v-if="this.defaultTheme === 41"
        class="detail_header_funBg"
        src="../../assets/preview/recreationBg.png"
      />
      <img
        v-if="this.defaultTheme === 59"
        class="detail_header_funBg"
        src="../../assets/preview/onlineBg.png"
      />
      <div class="mainHeader">
        <swiper :options="swiperOptionBanner" ref="mySwiperBanner" id="prizeBanner">
          <swiper-slide  v-for="(item, index) in imgPrizeList" :data-index="index" :key="index" class="imgUrl" >
            <img :src="item" style="width: 100%!important"  :onerror="defaultImg"/>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div>
      <div class="detail_title">{{prizeData.name}}</div>
      <!-- <div class="detail_address" v-show="explain"> -->
      <div class="detail_address">
        <span class="detail_prize">奖品：</span>
        <div class="detail_grade">
          <div v-for="(item,index) in prizeData.entities" :key="index">{{item.rank}}：{{item.prizeName}}<span>x{{item.prizeNum}}份</span> </div>
        </div>
      </div>
      <div class="detail_time" v-if="prizeData.lotteryType ==110">
        <span>{{ timeChange('m月d日',prizeData.lotteryStartTime)}}</span>&nbsp;
        <span>{{ timeChange('H:i',prizeData.lotteryStartTime)}}</span>&nbsp;
        自动开奖
      </div>
      <div class="detail_people" v-if="prizeData.lotteryType ==120 ">满<span>{{prizeData.totalNum}}</span>人将会自动开奖</div>
      <div class="detail_condition">
        <span class="detail_span">参与条件：</span>
        <span class="detail_condition_content" v-if="prizeData.wxFans">公众号粉丝</span>
        <span class="detail_condition_content" v-if="prizeData.integral">需{{prizeData.integralNum}}积分</span>
      </div>
      <div class="detail_num clearfix">
        <span class="span_left">
          <img src="../../assets/preview/hits.png" />
          浏览{{ prizeData.viewCount }}
        </span>
        <span class="span_right">
          <img src="../../assets/preview/collect.png" />
          收藏{{ prizeData.collectNum }}
        </span>
      </div>

      <div class="detail_main">
        <!-- 风采展示 -->
        <div class="mainBody_header">
          <ul class="itemContain">
            <li class="listItem">
              <img
                style="border-radius: 0;width: 24px; height: 27px;"
                src="../../assets/preview/prize/photo.png"
              />
            </li>
            <li class="listItem" style="width: 0.150px;">
              <span class="right_border"></span>
            </li>
            <ul class="itemContainPre">
              <li class="listItem" v-for="(item,index) in prizeData.photoGroupEntities" :key="index">
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
        <share-item
          :type="2"
          :description="name"
          :targetType="3017"
          :targetId="Number(activityId)"
          :share_logo="imgUrlSquare+ '!440w'"
          :dataAll="prizeData"
        ></share-item>

        <!-- 抽奖功能 -->
        <div class="luckyBox">
          <!-- 开奖前页面 -->
          <div class="lotteryFrontBox" v-if="!lottery">
            <div class="luckyImg">
              <img src="../../assets/preview/click-lucky.png"  v-show="!prizeData.gotIt" @click="goPrizeBox" />
              <img src="../../assets/preview/await-lucky.png" v-show="prizeData.gotIt" />
            </div>
            <p class="peopleNum">已有888人参与抽奖</p>
            <div class="peopleNum_detail">
              <ul>
                <li><img src="../../assets/preview/user-img.png" /></li>
                <li><img src="../../assets/preview/user-img.png" /></li>
                <li><img src="../../assets/preview/user-img.png" /></li>
              </ul>
            </div>
          </div>

          <!-- 开奖后页面 -->
          <div class="lotteryLaterBox" v-if="lottery">
            <p class="lotteryTitle" v-show="!win">好遗憾，差点就中奖啦~</p>
            <p class="lotteryTitle red" v-show="win">恭喜你中奖了！</p>
            <div class="luckyList">
              <div class="solid"></div>&nbsp;
              中奖者名单
              &nbsp;<div class="solid"></div>
            </div>
            <div class="prizeClass">
              <p>一等奖：苹果无线耳机</p>
              <ul>
                <li>
                  <img src="../../assets/preview/user-img.png" />
                </li>
              </ul>
            </div>
            <div class="prizeClass">
              <p>二等奖：卡通限量版抱枕</p>
              <ul>
                <li>
                  <img src="../../assets/preview/user-img.png" />
                </li>
                <li>
                  <img src="../../assets/preview/user-img.png" />
                </li>
                <li>
                  <img src="../../assets/preview/user-img.png" />
                </li>
              </ul>
            </div>
            <div class="prizeClass">
              <p>三等奖：儿童平衡车</p>
              <ul>
                <li>
                  <img src="../../assets/preview/user-img.png" />
                </li>
                <li>
                  <img src="../../assets/preview/user-img.png" />
                </li>
                <li>
                  <img src="../../assets/preview/user-img.png" />
                </li>
                <li>
                  <img src="../../assets/preview/user-img.png" />
                </li>
              </ul>
            </div>
            <div class="luckyListMore" @click="winning=true">查看全部中奖名单>></div>
          </div>

          <div class="copyText">
            <div class="copyTextTop">
              <img src="../../assets/preview/star.png" />
              添加微信了解更多福利
            </div>
            <span class="copyTextBottom">{{prizeData.wxNum}}</span>
            <span class="clickCopy" >一键复制</span>
          </div>
        </div>

        <div class="nav">
          <div class="flex">
            <li v-for="(item, index) in navItem" :key="index" @click="tabClick(index)">
              <p class="title" :class="{'titleColor':selected != index}">{{item}}</p>
              <p class="bottom" :class="{'bottomColor':selected === index}"></p>
            </li>
          </div>
        </div>
        <div class="list">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
              <div>
                <ul class="notice">
                  <li v-for="(item,index) in prizeData.activityNoteEntities" :key="index">
                    <p>{{item.noteKey}}</p>
                    <div>{{item.noteValue}}</div>
                  </li>
                </ul>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="shopDetail">
                <!-- 轮播滑动黑边问题 -->
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
        <div class="mainComment" v-if="true">
          <div class="commentHeight">
            <img src="../../assets/preview/comment.png" />
            <span >查看全部>></span>
          </div>
          <div class="commentContent" v-show="!noComment">
            <p class="commentTitle">
              <img :src="avatar" :onerror="defaultImg" />
              <span>{{ userName }}</span>
            </p>
            <p class="commentShow">{{ userContent }}</p>
            <div class="listImage">
              <img v-for="(val, index) in imgUrls" :key="index" :src="val" class="childImg" />
            </div>
          </div>
          <img class="noComment" src="../../assets/preview/noComment.png" v-show="noComment" />
        </div>
      </div>
      <div class="commentPro" id="comment_main_footer">
        <div class="comment_footer_fix">
          <div class="comment_footer">
            <div class="left">
              <div class="comment_footer_top">
                <div class="img_container">
                  <img src="../../assets/preview/enter_shop.png" />
                </div>
                <p>进店</p>
              </div>
              <div class="comment_footer_top comment_footer_width" >
                <div class="img_container">
                  <img v-if="!this.collect" src="../../assets/preview/collect_big.png" />
                  <img v-if="this.collect" src="../../assets/preview/is_collect_big.png" />
                </div>
                <p v-if="!this.collect">收藏</p>
                <p v-if="this.collect">已收藏</p>
              </div>
            </div>
            <div class="luckyBtn" v-show="!prizeData.gotIt" @click="goPrizeBox">
              马上抽奖
              <span></span>
            </div>
            <div class="luckyBtn" v-show="prizeData.gotIt" >
              您已抽奖
              <span></span>
            </div>
            <div class="alreadyLucky" v-show="lottery">
              已开奖
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="nothing" class="nothing">
      <img src="../../assets/preview/not_shop.png" />
      <p>该商品已过期，不存在</p>
    </div>
    <!-- 积分抽奖 -->
    <div class="luckyIntegral" v-show="integral">
      <p>您此次抽奖将会扣除<span>{{prizeData.integralNum}}</span>点积分</p>
      <span class="luckyIntegral_left">马上抽奖</span>
      <span class="luckyIntegral_right" @click="integral=false">我再想想</span>
    </div>

    <!-- 余额抽奖 -->
     <div class="luckyBalance" v-show="balance">
      <p class="hint">抽奖提示</p>
      <div class="dotted">
        <img src="../../assets/preview/dotted.png" />
      </div>
      <p class="costMoney">您此次抽奖需花费<span>￥10.00</span>元</p>
      <div class="startDraw">好的，马上抽奖</div>
      <div class="close" @click="balance=false">
        <img src="../../assets/preview/off.png" />
      </div>
    </div>

    <!-- 中奖名单 -->
    <div class="winningBox" v-show="winning">
      <div class="winningList">
        <div class="prizeBox">
          <div class="prizeClass">
            <p>一等奖</p>
            <ul>
              <li>
                <img src="../../assets/preview/user-img.png" />
              </li>
            </ul>
          </div>
          <div class="prizeClass">
            <p>二等奖</p>
            <ul>
              <li>
                <img src="../../assets/preview/user-img.png" />
              </li>
              <li>
                <img src="../../assets/preview/user-img.png" />
              </li>
              <li>
                <img src="../../assets/preview/user-img.png" />
              </li>
            </ul>
          </div>
          <div class="prizeClass">
            <p>三等奖</p>
            <ul style="border:none">
              <li>
                <img src="../../assets/preview/user-img.png" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="closeBox" @click="winning=false">
        <img src="../../assets/preview/close-btn.png" />
      </div>
      <div class="listTitle">中奖名单</div>
      <div class="egg">
        <img src="../../assets/preview/egg.png" />
      </div>
      <div class="flowerBgc"></div>
    </div>

    <transition name="fade">
      <div
        class="choose_remind_shadow"
        v-show="integral || balance || winning"
      ></div>
    </transition>
  </div>
</template>

<script>
import ShareItem from "./shareItemLuck";
import { Base64 } from "js-base64";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "luckyDraw",
  components: {
    ShareItem
  },
  props: {
    activityId: {}
  },
  data() {
    return {
      newUser: "",
      countNum: 0,
      value: 0,
      phoneNum: "",
      explain: "",
      OnlyApp: "",
      OnlyMiniApp: "",
      isDistributor: "",
      // mapSelect: false,
      isIphoneX: "",
      lat: "",
      lng: "",
      address: "",
      doorAdd: "",
      callback: "",
      resellPrice: 0,
      imgUrl: "",
      img_url_bg: require("../../assets/preview/detail_bg.png"),
      defaultImg:
        'this.src="' + require("../../assets/preview/signUp/default.png") + '"',
      price: 0,
      imgUrlSquare: "",
      showPrice: 0,
      firstOrderPrice: "",
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
      navItem: ["兑换须知", "商品详情"],
      nothing: false,
      collect: false,
      defaultTheme: 0,
      totalNum: "",
      moduleImgUrl: "",
      swiperOptionBanner: {
        loop: true,
        autoplay: {
          delay: 2000, //自动切换的时间间隔，单位ms
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // autoplay: false,
        speed: 600,
        direction: "horizontal",
        observer:true,
        observeParents:true,
        //touchAngle : 15,
        on: {
          slideChange: () => {
            // const _idx = this.$refs.mySwiper.swiper.realIndex
            // const color = this.commodity[_idx].mainColor
            // if (this.groupId === 0) {
            //   this.android.navColorChange(color)
            //   this.color = color
            // }
          },
          click: () =>{
            const realIndex = this.$refs.mySwiper.swiper.realIndex;
          }
        },
        pagination: {
          el: '.swiper-pagination',
          bulletElement : 'li', //设定分页器指示器（小点）的HTML标签。
        },
      },
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
      avatar: "",
      userName: "",
      userContent: "",
      imgUrls: [],
      page: 1,
      size: 1000,
      noComment: true,
      clickAwait: false, // 点击抽奖 和 等待开奖
      lottery: false, // 马上抽奖 和 已开奖
      integral: false, // 积分抽奖弹窗
      balance: false, // 余额抽奖弹窗
      winning: false, // 中奖名单弹窗
      win: true, // 用户是否中奖
      prizeData:[],
      dataLoad:false,
      imgPrizeList:[],
    };
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
    goPrizeBox(){
      this.integral = true
    },
    tabClick(val) {
      this.selected = val;
      this.$refs.mySwiper.swiper.slideTo(this.selected, 300, true);
      // localStorage.setItem('collect_1',this.selected)
    },
    isOrder() {
      if (this.gotIt) {
        this.$router.push({ name: "order", params: { title: "2" } });
      } else {
        
      }
    },
    goOrder() {
      this.$router.push({ name: "order", params: { title: "2" } });
    },
    getLuckyDraw(type, id){
      return new Promise((resolve, reject) =>{
        const formData = {
          activityId: id,
          activityType: type
        }
        const url = this.apiList.shop.prizeDraw.detail
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData( formData, '' , false)
        }).then(({ data }) => {
          resolve(data)
        })
      })
    },
    getDataList() {
      this.getLuckyDraw(701, this.activityId).then((data) => {
        if (data.result) {
          this.prizeData = data.data
          this.collect = data.data.toCollect
          if(data.data.defaultTheme) {
            this.defaultTheme = data.data.defaultTheme
          }
          this.imgPrizeList = []
          data.data.entities.forEach((i,a)=>{
            console.log('---------------')
            if(i.prizeImg && i.prizeImg != '')
            this.imgPrizeList.push(i.prizeImg)
          })
          console.log(this.imgPrizeList)
          this.dataLoad = true
          this.$nextTick(() => {
          })
          if (!this.defaultTheme) {
            this.defaultTheme = data.data.defaultTheme;
          }
          if (!data.data.showToC) {
            
          } else {
            if (data.data.sysDown) {
              
            }
          }
          this.prizeData.photoGroupEntities = data.data.photoGroupEntities
          this.fullText = Base64.decode(data.data.fullText)
        } else if (data.msg === "不存在") {
          this.nothing = true;
        }
      });
    },
    addNum() {
      this.countNum++;
    },
    subtractNum() {
      if (this.countNum <= 0) {
      } else {
        this.countNum -= 1;
      }
    },
  },
  created() {
    this.nothing = false;
    this.nowTime = new Date().getTime();
    this.defaultTheme = 19
    this.getDataList()
  }
};
</script>

<style lang="scss">
.luckyDraw {
  position: relative;
  width: 375px;
  margin: auto;
  li{
    list-style: none;
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
  .header_fixed1 {
    // position: fixed;
    width: 100%;
    /*background-image: url("../../assets/preview/header-bgc-img.png");*/
    /*background-size: cover;*/
    /*background-repeat: no-repeat;*/
    // background-position-y: 24px;
  }
  .header {
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 12px;
    padding-right: 12px;
    span img {
      vertical-align: middle;
      height: 18px;
    }
    span:first-child {
      width: 50px;
    }
    .lottery-img {
      width: 47px;
      height: 23px;
    }
    .opacity {
      width: 50px;  
    }
  }
  .headerDefault {
    background-image: url("../../assets/preview/detaillPromotion.png");
    background-size: cover;
    background-repeat: no-repeat;
    //background-position-y: 24px;
    background-color: #fff;
  }
  .headerPet {
    background-image: url("../../assets/preview/petsBg.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .headerBeauty {
    background-image: url("../../assets/preview/navBack.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .headerChild {
    background-image: url("../../assets/preview/childBg.png");
    background-size: cover;
    background-repeat: no-repeat;
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
    //background-position-y: 24px;
    background-color: #fff;
  }
  .headerFoods {
    background-image: url("../../assets/preview/foodsBg.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .headerFun {
    background-image: url("../../assets/preview/recreationBg.png");
    background-size: cover;
    background-repeat: no-repeat;
    //background-position-y: 24px;
    background-color: #fff;
    height: 44px;
  }
  .headerTravel {
    background-image: url("../../assets/preview/travelBg.png");
    background-size: cover;
    background-repeat: no-repeat;
    //background-position-y: 24px;
    //background-color: #fff;
  }
  .headerOnline {
    background-image: url("../../assets/preview/onlineBg.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .background-box {
    position: relative;
    width: 100%;
    height: 174px;
    background: url("../../assets/preview/header-bgc-img.png") no-repeat;
    background-size: cover;
    .background-shopImg {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 316px;
        height: 141px;
        background-color: skyblue;
        border-radius: 10px;
    }
  }

  .detail_header {
    background-size: 100%;
    background-color: #fff;

    .detail_header_bg {
      position: absolute;
      width: 100%;
      height: 172px;
      top: 0rem;
    }
    .detail_header_beautyBg {
      position: absolute;
      width: 100%;
      height: 172px;
      top: 0;
    }
    .detail_header_petsBg {
      position: absolute;
      width: 363px;
      height: 116px;
      left: 6px;
      top: 44px;
    }
    .detail_header_childBg {
      position: absolute;
      width: 100%;
      height: 172px;
      top: 0rem;
    }
    .detail_header_otherBg {
      position: absolute;
      width: 100%;
      height: 172px;
      top: 0rem;
    }
    .detail_header_travelBg {
      position: absolute;
      width: 100%;
      height: 172px;
      top: 0rem;
    }
    .detail_header_funBg {
      position: absolute;
      width: 100%;
      height: 172px;
      top: 0rem;
    }
    .detail_header_foodsBg {
      position: absolute;
      width: 100%;
      height: 172px;
      top: 0rem;
    }
    .mainHeader {
      width: 316px;
      height: 141px;
      margin: 0 auto;
      border-radius: 8px;
      overflow: hidden;
      background-size: 100% 100%;
      position: relative;
      // top: 44px;
      .imgUrl {
        width: 316px;
        height: 141px;
        border-radius: 8px;
        background-size: 100% 100%;
      }
    }
    .mainHeader_bottom_detail {
      width: 343px;
      margin: auto;
      margin-top: 34px;
      height: 45px;
      background: rgba(250, 45, 79, 1);
      border-radius: 0 0 8px 8px;
      .price_flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          position: absolute;
          width: 4.050px;
          height: 3.650px;
          top: 221px;
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
            font-size: 34px;
            .icon1 {
              font-size: 12px;
              font-style: normal;
            }
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
            margin-left: 0.350px;
          }
        }
      }
    }
  }
  .detail_title {
    padding: 0 16px;
    margin-top: 14px;
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
    margin-top: 13px;
    font-size: 12px;
    color: #999;
    line-height: 18px;
    overflow: hidden;
    .detail_prize {
      float: left;
      color: #505050;
      font-size: 14px;
    }
    .detail_grade {
      float: left;
      margin-left: 10px;
      div {
        margin-bottom: 6px;
        color: #505050;
        font-size: 14px;
        span {
          display: inline-block;
          margin-left: 15px;
        }
      }
    }
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
  .detail_time {
    padding-left: 16px;
    margin-top: 10px;
    font-size: 14px;
    color: #505050;
    span {
      font-size: 14px;
      color: #FF0000;
    }
  }
  .detail_people {
    padding-left: 16px;
    margin-top: 10px;
    font-size: 14px;
    color: #505050;
    span {
      color: #FF0000;
    }
  }
  .detail_condition {
    padding-left: 16px;
    font-size: 14px;
    line-height: 16px;
    height: 16px;
    color: #505050;
    margin-top: 9px;
    .detail_span {
      //float: left;
      margin-top: 3px;
    }
    .detail_condition_content {
      display: inline-block;
      width: 58px;
      height: 16px;
      font-size: 11px;
      color: #fff;
      background-color: #86D3FF;
      border-radius: 3px;
      text-align: center;
      line-height: 14px;
      vertical-align: top;
      padding: 2px;
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
      box-shadow: 0 0.150px 0.350px 0 rgba(3, 11, 7, 0.35);
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
            height: 1.250px;
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
    padding: 12px 15px 50px;
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
      box-shadow: 0 0.150px 0.350px 0 rgba(3, 11, 7, 0.35);
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
            height: 1.250px;
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
      padding: 0.6em 23px 13px 13px;
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
          margin-bottom: 9px;
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
            margin: 0 0.750px 0.750px 0;
          }
        }
      }
      .noComment {
        margin: 0 136px;
        width: 78px;
        height: 99px;
      }
    }
    .luckyBox {
      .lotteryFrontBox {
        .luckyImg {
        width: 84px;
        height: 99px;
        margin: 10px auto 0;
        img {
          width: 100%;
          height: 100%;
        }
        }
        .peopleNum {
        font-size: 14px;
        color: #505050;
        text-align: center;
        margin: 10px 0;
        }
        .peopleNum_detail {
        margin-top: 12px;
        padding: 0 17px;
        ul {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          width: 315px;
          li {
            width: 30px;
            height: 30px;
            margin: 0 5px 5px 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        }
      }
      .lotteryLaterBox {
        .lotteryTitle {
          font-size: 20px;
          text-align: center;
          color: #737373;
        }
        .red {
          color: #FF0000;
        }
        .luckyList {
          font-size: 10px;
          color: #737373;
          text-align: center;
          margin: 12px 0 15px;
          line-height: 9px;
          .solid {
            display: inline-block;
            width: 11px;
            height: 1px;
            background-color: #4F4F4F;
            margin-bottom: 2px;
          }
        }
        .prizeClass {
          p {
              font-size: 10px;
              color: #FF0000;
              text-align: center;
              margin-bottom: 10px;
          }
          ul {
            display: flex;
            width: 250px;
            justify-content: space-around;
            flex-wrap: wrap;
            margin: 0 auto;
            li {
              width: 33.33%;
              text-align: center;
              margin-bottom: 16px;
              img {
                width: 30px;
                height: 30px;
              }
            }
          }
        }
        .luckyListMore {
          font-size: 9px;
          color: #5458FF;
          text-align: center;
        }
      }
      .copyText {
        width: 284px;
        height: 59px;
        margin: 22px auto 30px;
        border: 1px solid #005674;
        box-shadow: 3px 2px 5px 0 rgba(1,189,249,1);
        border-radius: 5px;
        .copyTextTop {
          font-size: 14px;
          color: #505050;
          img {
            width: 23px;
            height: 17px;
            margin: 6px 0 0 7px;
            vertical-align: sub;
          }
        }
        .copyTextBottom {
          display: inline-block;
          width: 138px;
          height: 21px;
          background-color: #AFAFAF;
          margin: 8px 0 0 7px;
          color: #fff;
          font-size: 1.250px;
          text-align: center;
          line-height: 21px;
          vertical-align: middle;
        }
        .clickCopy {
          vertical-align: middle;
          margin-top: .8rem;
          display: inline-block;
          width: 67px;
          height: 21px;
          background-color: #DF431F;
          color: #fff;
          font-size: 1.250px;
          text-align: center;
          line-height: 21px;
          border-radius: 10px;
          margin-left: 55px;
        }
      }
    }
    .nav {
      height: 44px;
      // width: 100%;
      padding: 2px 50px;
      margin-top: 4px;
      position: -webkit-sticky;
      position: sticky;
      top: 42px;
      top: calc(42px + env(safe-area-inset-top));
      background: #ffffff;
      z-index: 2;
      .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        .title {
          line-height: 14px;
          text-align: center;
          font-size: 17px;
          color: #fe9f03;
          vertical-align: middle;
          margin-top: 6px;
          font-weight: bold;
        }
        .titleColor {
          opacity: 0.8;
          color: #000;
        }
        .bottom {
          width: 66px;
          height: 3px;

          border-radius: 1px;
          margin-top: 4px;
        }
        .bottomColor {
          background-color: #fe9f03;
        }
      }
    }
    .list {
      .notice {
        width: 100%;
        box-sizing: border-box;
        padding: 0 16px 16px;
        li {
          margin-top: 18px;
          p {
            font-size: 15px;
            border: 600;
            color: #666;
            line-height: 18px;
            color: #fa2d4f;
            margin-bottom: 16px;
          }
          div {
            margin-left: 30px;
            font-size: 15px;
            color: #6C6C6C;
          }
          pre:nth-child(2) {
            color: #666;
            font-size: 13px;
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
    // position: fixed;
    bottom: 0;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
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
        margin-bottom: 4.150px;
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
        .luckyBtn {
          width: 102.5px;
          height: 33px;
          border-radius: 1.650px;
          vertical-align: middle;
          line-height: 33px;
          color: #fefefe;
          font-size: 17px;
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
        .alreadyLucky {
          width: 102.5px;
          height: 33px;
          border-radius: 1.650px;
          vertical-align: middle;
          line-height: 33px;
          color: #FEFEFE;
          font-size: 17px;
          margin-right: 16px;
          margin-top: 9px;
          background-color: #CFCFCF; 
          span {
            font-size: 10px;
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
          p{
            margin: 0;
          }
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
      margin-bottom: 70px;
    }
    p {
      font-size: 14px;
      color: #333333;
    }
  }
 
  .luckyIntegral {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 285px;
    height: 318px;
    background: url("../../assets/preview/newLuckyBox.png") no-repeat;
    background-size: cover;
    z-index: 999;
    p {
      font-size: 16px;
      color: #fff;
      text-align: center;
      margin-top: 225px;
      margin-bottom: 22px;
    }
    .luckyIntegral_left {
      display: inline-block;
      width: 94px;
      height: 39px;
      background-color: #FFF000;
      color: #FD5F07;
      font-size: 17px;
      text-align: center;
      line-height: 39px;
      border-radius: 5px;
      margin-left: 33px;
      margin-right: 30px;
    }
    .luckyIntegral_right {
      display: inline-block;
      width: 94px;
      height: 39px;
      background-color: #BDBDBD;
      color: #fff;
      font-size: 17px;
      text-align: center;
      line-height: 39px;
      border-radius: 5px;
    }
  }
  .luckyBalance {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 253px;
    height: 174px;
    z-index: 999;
    background-color: #fff;
    border-radius: 5px;
    .hint {
      font-size: 2.350px;
      color: #000;
      text-align: center;
      margin-top: 15px;
      margin-bottom: 11px;
    }
    .dotted {
      width: 100%;
      height: 2px;
      padding: 0 5px;
      margin-bottom: 22px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .costMoney {
      color: #FFA632;
      font-size: 16px;
      text-align: center;
      span {
        color: #FF0000;
      }
    }
    .startDraw {
      width: 153px;
      height: 30px;
      font-size: 15px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      background-color: #FF9812;
      border-radius: 15px;
      margin: 24px auto 0;
    }
    .close {
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translateX(-50%);
      width: 35px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .winningBox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 32px;
    height: 34px;
    background-color: #FFEC75;
    padding: 33px 19px 19px;
    border-radius: 10px;
    box-shadow: 0 4px 0 0 rgba(240,168,5,1);
    .winningList {
      width: 264px;
      height: 252px;
      background-color: #FCFBC9;
      border: 2px solid #F0A805;
      border-radius: 5px;
      padding: 11px 25px;
      .prizeBox {
        height: 100%;
        overflow-x: hidden; /*x轴禁止滚动*/
        overflow-y: scroll; /*y轴滚动*/
        .prizeBox::-webkit-scrollbar {
          display: none; /*隐藏滚动条*/
        }
        .prizeClass {
          p {
            font-size: 12px;
            color: #F62121;
            text-align: center;
            margin-bottom: 10px;
          }
          ul {
            display: flex;
            width: 100%;
            justify-content: space-around;
            flex-wrap: wrap;
            margin: 0 auto 11px;
            border-bottom: 1px solid #F1CD49;
            li {
              width: 20%;
              text-align: center;
              margin-bottom: 10px;
              img {
                width: 30px;
                height: 30px;
              }
            }
          }
        }
      }
    }
    .slider {
      position: absolute;
      top: 0;
      right: 0;
      width: 3px;
      height: 214px;
      background-color: #F2AB25;
      margin: 55px 8px 0 0;
    }
    .sliderBlock {
      position: absolute;
      top: 0;
      right: 0;
      width: 12px;
      height: 20px;
      margin: 55px 4px 0 0;
    }
    .closeBox {
      position: absolute;
      top: -13px;
      right: -13px;
      width: 31px;
      height: 31px;
      background-color: #F0A805;
      border-radius: 50%;
      text-align: center;
      line-height: 34px;
      img {
        width: 11px;
        height: 11px;
      }
    }
    .listTitle {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 138px;
      height: 43px;
      font-size: 15px;
      color: #CF930B;
      text-align: center;
      line-height: 35px;
      background: url("../../assets/preview/list-bgc.png") no-repeat;
      background-size: cover;
      z-index: 2;
    }
    .egg {
      position: absolute;
      top: -140px;
      left: 50%;
      transform: translateX(-50%);
      width: 223px;
      height: 255px;
      z-index: -1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .flowerBgc {
      position: absolute;
      top: -64px;
      left: 50%;
      transform: translateX(-50%);
      width: 234px;
      height: 118px;
      background: url("../../assets/preview/decorated.png") no-repeat;
      background-size: contain;
      z-index: 3;
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

  .numContainer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 999;
    border-radius: 8px 8px 0 0;
    .flex {
      display: flex;
      justify-content: space-between;
      height: 50px;
      align-items: center;
      padding: 0 7px 0 14px;
      .left {
        font-size: 16px;
        color: #000000;
      }
      .right {
        display: flex;
        justify-content: space-between;
        width: 130px;
        align-items: center;
        .choose {
          display: flex;
          justify-content: space-between;
          width: 57px;
          input {
            width: 18px;
            height: 18px;
            background: rgba(218, 218, 218, 1);
            border-radius: 2px;
            text-align: center;
          }
          button {
            width: 18px;
            height: 18px;
            background: rgba(218, 218, 218, 1);
            border-radius: 2px;
            border: none;
          }
        }
        .submit {
          width: 64px;
          height: 21px;
          background: linear-gradient(
            10deg,
            rgba(5, 145, 232, 1) 0%,
            rgba(0, 193, 250, 1) 100%
          );
          border-radius: 11px;
          border: none;
          color: #ffffff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
