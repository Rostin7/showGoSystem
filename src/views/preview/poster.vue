<template>
  <div class="shareToposter">
    <img class="logo"  @click="share" src="../../assets/preview/poster.png" alt="">
    <!-- 促销生成海报的组件 -->
    <get-poster ref="poster" v-show="false" @success="success" @percentChange="percentChange"/>
    <transition name="fade">
      <div class="sharePoster" v-if="sharePoster">
        <div class="main">
          <img class="close" src="../../assets/preview/close.png" @click.stop="close">
          <img class="posterUrl" :src="getPoster">
          <div class="savePoster">保存到手机</div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="loading" class="loading">
        <div class="wrapper">
          <div class="box" ref="sliderBox">
            <div class='el'>{{ progress }}</div>
          </div>
        </div>
        <p class="content">正在努力生成海报...</p>
      </div>
    </transition>
    <!-- 生成进度条的遮罩 -->
    <transition name="fade">
      <div class="shadow" v-show="loading" ></div>
    </transition>
    <!-- 海报的遮罩 -->
    <transition name="fade">
      <div class="shadow" v-show="sharePoster" ></div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    type: { // 图标类型
      default: 1
    },
    targetId: { // 跳转目标Id
      type: Number
    },
    targetType: { // 跳转类型， 101为店铺 201为广场 3011为促销 3012为报名 3013为拼团 3014抢券
      type: Number
    },
    dataAll:{},
  },
  data() {
    return{
      shareWay: false,
      progress: 0,
      sharePoster: false,
      getPoster:false,
      loading:false,
      toast: {}
    }
  },
  methods: {
    percentChange(data) {
      this.progress = data + '%'
      this.$refs.sliderBox.style.width = data + '%'
    },
    // 生成海报
    share() {
      console.log('------------------------------')
      if(this.getPoster){
        this.sharePoster = true
      }else{
        this.loading = true
        // 有海报
        if (this.dataAll.resellerPoster) {
          this.$refs.poster.imgSrc = this.dataAll.resellerPoster
          this.$refs.poster.drawBgImage_(this.targetType,this.targetId)
        } else {
        // 无海报
          this.getShopAddress(this.dataAll.moduleId)
        }
      }
    },
    // 获得店铺信息
    getShopAddress(shopId){
      this.$http({
        url: this.$http.adornUrl(this.apiList.shop.getDetail),
        method: 'post',
        data: this.$http.adornData({ shopId: shopId} ,this.apiList.shop.getDetail, true)
      }).then(({ data }) => {
        this.shareWay = true
        this.$refs.poster.drawBgImage(this.dataAll,data.data.address+data.data.doorAdd,this.targetType,this.targetId)
      })
    },
    // 生成海报成功
    success(data) {
      this.getPoster = data
      this.loading = false
      this.shareWay = false
      this.sharePoster = true
    },
    // 转换base64 图片文件
    dataURLtoFile(dataurl, filename = "0000img") {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 将图片变为网络图片保存到手机
    upload(file) {
      
      const formData = new FormData();
      formData.append("file", file);
      this.$http({
        url: this.$http.adornUrl(this.apiList.upload),
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData
      }).then(({ data }) => {
        if (data.result) {
          this.android.saveImg(data.data)
        } else {
          this.MessageBox("提示", data.msg);
        }
      }).catch(() => {});
    },
    close(){
      this.sharePoster = false
      this.loading = false
    },
  }
}
</script>
<style lang="scss">
.shareToposter{
  width: 3.6rem;
  height: 3.6rem;
  margin: 0 .6rem;
  .logo{
    width: 3.6rem;
    height: 3.6rem;
  }
  .sharePoster{
    /*width: 100%;*/
    /*height: 100%;*/
    position: fixed;

    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    //background: #fff;
    z-index: 60;
    .main{
      width: 28.4rem;
      height: 54.2rem;
      padding: 1rem;
      position: relative;
      background-color: #ffffff;
      .close{
        width: 2rem;
        height: 2rem;
        position: absolute;
        top:-2rem;
        right: -3rem;
      }
      .posterUrl{
        width: 26.4rem !important;
        height: 47rem !important;
      }
      .savePoster{
        width:18rem;
        //height:3.4rem;
        background:rgba(3,174,246,1);
        border-radius:1.7rem;
        line-height: 3.4rem;
        text-align: center;
        color: #FFFFFF;
        font-size: 1.4rem;
        margin: 1.4rem auto;
        vertical-align: middle;
      }
    }

  }
  .loading{
    z-index: 60;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .content {
      font-size: 1.6rem;
      font-weight: 500;
      color: #FEFEFE;
      //margin-top: 1rem;
      text-align:center;
    }
    .wrapper {
      width: 20.5rem;
      height: 2.3rem;
      border: 0.2rem solid #a9d0fb;
      border-radius: 1.2rem;
      padding: 0.2rem;
      text-align: center;
      overflow:hidden;
      line-height: 2.1rem;
      .box {
        background-color: #3593fd;
        width: 0;
        /* -webkit-animation: loading 100s linear; */
        //animation: loading 300s linear;
        //max-width: 20.5rem;
        border-radius: 1.2rem;
        height: 1.5rem;
        transition: all .1s ease-in-out;
        .el {
         // content: "100%";
          width: 19.7rem;
          font-size: 1.6rem;
          height: 1.4rem;
          line-height: 1.4rem;
          display: inline-block;
          color: #fff;
         // height: 1.6rem;
         // border-radius: 0.8rem;
          //margin-left: 0.5rem;
        }
        /*.el:after {*/
        /*  content: "100%";*/
        /*  display: inline-block;*/
        /*  !* text-align: center; *!*/
        /*  font-size: 1.6rem;*/
        /*  height: 1.4rem;*/
        /*  line-height: 1.4rem;*/
        /*  //padding: 0.1rem 0 0.1rem 1rem;*/
        /*  color: #fff;*/
        /*  !* mix-blend-mode: difference; *!*/
        /*  !* -webkit-animation: percentage 2s linear; *!*/
        /*  animation: percentage .3s linear;*/
        /*}*/
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
    z-index: 17;
  }
}
</style>