<template>
<div class="nodata">
  <p class="mainheader">网站正在建设中，敬请期待！</p>
  <p class="secondeHeader">the website is under construction, please stay tuned.</p>
  <p>
    <img src="../assets/index/nodata.png" alt="">
  </p>
</div>
</template>
<script>
export default {
  data() {
    return{

    }
  }
}
</script>
<style lang="scss">
  .nodata{
    p{
      text-align: center;
    }
    .mainheader{
      height:43px;
      font-size:44px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(239,168,76,1);
      line-height:28px;
    }
    .secondeHeader{
      height:14px;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(239,168,76,1);
      line-height:15px;
    } 
  }
</style>