
<template>
  <div class="mapFrame" :class="type ===1 ? '' : 'small'">
    <!-- <iframe src="http://b.chnzxl.com/#/shoproview" ref="mapFrame"></iframe> -->
    <div class="iframe" >
      <div style="width: 100%; height: 100%; overflow: hidden;">
        <iframe :src="url" scrolling="yes" frameBorder=0 ref="iframe"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {}
  },
  data() {
    return {
      data: {},
      url: "http://b.chnzxl.com/#/shoproview"
    }
  },
  methods: {
    sendMessage (data) {
      this.data = data
      // 外部vue向iframe内部传数据
      this.$refs.iframe.contentWindow.postMessage({
        cmd: 'getFormJson',
        params: data
      }, '*')
    },
    han() {
      this.sendMessage(this.data)
    }
  },
  created() {
    if (this.type === 1) {
      this.url = this.$cookie.get('moduleType') === '401' ? "http://b.chnzxl.com/#/shoproview?shopId="+ this.$cookie.get('moduleId') + '&type=entryb' : this.$cookie.get('moduleType') === '301' ? "http://b.chnzxl.com/#/marketview?mallId="+ this.$cookie.get('moduleId') + '&type=entryb' : "http://b.chnzxl.com/#/shoproview?shopId="+ this.$cookie.get('moduleId') + '&type=entryb'
    } else {
      window.addEventListener('message', this.han)
    }
  }
}
</script>
<style lang="scss">
.mapFrame{
  width: 100%;
  height: 800px;
  background: url('../../assets/index/iPhonex.png');
  background-size: 100% 100%;
  text-align: center;
  line-height: 800px;
  .iframe{
    display: inline-block;
    // width: 402px;
    width: 100%;
    box-sizing: border-box;
    padding: 45px 15px;
    // height: 804px;
    height: 100%;
    margin-top: 3px;
    margin-left: 2px;
    vertical-align: middle;
    border-radius: 2px;
    overflow: hidden;
    iframe{
      width: 103%;
      height: 100%;
      // width: 402px;
      // height: 824px;
    }
  }
}
.small{
  width: 372px;
  height: 685px;
  line-height: 685px;
  margin: auto;
  background: url('../../assets/index/iPhonex.png');
  background-size: 100% 100%;
  text-align: center;
  line-height: 905px;
  .iframe{
    display: inline-block;
    // width: 332px;
    height: 100%;
    padding-top: 43px;
    vertical-align: top;
    border-radius: 2px;
    overflow: hidden;
    iframe{
      // width: 332px;
      height: 630px;
    }
  }
}
</style>