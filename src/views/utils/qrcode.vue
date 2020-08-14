<template>
  <div class="qrcode">
    <div ></div>
    <canvas id="QRCodecanvas"></canvas>
  </div>
</template>
<style></style>
<script>
import QRCode from "qrcode";
export default {
  props: {
    type: {},
    chooseActivityId: {}
  },
  components: {
    QRCode: QRCode
  },
  methods: {
    useqrcode() {
      var canvas = document.getElementById("QRCodecanvas");
      QRCode.toCanvas(
        canvas,
        `https://b.chnzxl.com/p/#/?type=${this.type}&activeId=${this.chooseActivityId}`
        ,
        function(error) {
          if (error) console.error(error);
          console.log("QRCode success!");
        }
      );
    }
  },
  mounted() {
    this.useqrcode()
  }
};
</script>
<style lang="scss">
canvas{
  margin: 15px auto;
  display: block;
}
</style>