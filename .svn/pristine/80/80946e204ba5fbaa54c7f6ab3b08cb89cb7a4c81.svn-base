<template>
  <div style="width: 210px; height: 168px;" v-show="false">
    <canvas ref="myCanvas"  :width="width*multiple" :height="height*multiple" class="canvas"></canvas>
    <img :src="imgSrc" alt="">
  </div>
</template>
<script>
import sha256 from 'sha256'
import { promises } from 'fs'
export default {
  props: {
    type: {},
    imgUrl: {},
    lotteryStartTime: {},
    price: {},
    showPrice: {},
    endTime: {}
  },
  data(){
    return{
      imgSrc: '',
      ctx: {},
      changeimg: false,
      width: 420,
      height: 336,
      // 685* 410
      imgWidth: 420,
      imgHeight: 220,
      txtFont:25,
      multiple: 2,
      textMarginTop: 30
    }
  },
  methods: {
    drawImg(drawData) {
      return new Promise((resolve, reject) => {
        let myCanvas = this.$refs.myCanvas
        this.ctx = myCanvas.getContext('2d')
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, this.width * this.multiple, this.height * this.multiple)
        const draw = () => {
          switch(drawData.type) {
            case 701:
              this.drawText(0)
              this.drawTime(drawData.lotteryType == 110 ? `${this.timeChange('Y-m-d', drawData.lotteryStartTime)}开奖` : `满${drawData.totalNum}人开奖`)
              this.drawButton('去抽奖')
              break
            case 301:
              this.drawText(drawData.price, drawData.showPrice, false)
              this.drawButton('去抢购')
              break
            case 101:
              this.drawText(drawData.price, drawData.showPrice)
              this.drawTime(`报名截止${this.timeChange('Y-m-d', drawData.endTime)}`)
              this.drawButton('去报名')
              break
          }
        }
        if(drawData.imgUrl) {
          let img = new Image()
          img.setAttribute("crossOrigin",'anonymous')
          img.src = drawData.imgUrl
          img.onload = () => {
            this.ctx.drawImage(img, 0, 0,this.imgWidth * this.multiple*1.2,this.imgHeight* this.multiple*1.2)
            draw()
            resolve()
          }
        } else {
          draw()
          resolve()
        }
      })
    },
    // 绘制时间
    drawTime(timeText) {
      this.ctx.fillStyle = '#666666'
      this.ctx.font = '48px Arial bolder'
      this.ctx.fillText(timeText,  10* this.multiple, 280* this.multiple)
    },
    // 绘制价格
    drawText(price, showPrice, isTop = true) {
      if(price > 0) {
        this.ctx.fillStyle = '#EF4F59'
        this.ctx.font = `${36 * this.multiple}px Arial `
        this.ctx.fillText(price, 0 * this.multiple, (281 + this.textMarginTop) * this.multiple)
        let widthPrice = this.ctx.measureText(price).width
        this.ctx.fillStyle = '#EF4F59'
        this.ctx.font = this.txtFont * this.multiple + 'px Arial '
        this.ctx.fillText('元', widthPrice + 4 * this.multiple, (280+ this.textMarginTop) * this.multiple)
        // 原价
        this.ctx.fillStyle = '#999999'
        this.ctx.font = this.txtFont * this.multiple + 'px Arial '
        this.ctx.fillText(`原价:${showPrice}`, widthPrice + 40 * this.multiple, (280+ this.textMarginTop) * this.multiple)
        // 绘制原价的划线
        this.ctx.moveTo (widthPrice + 40* this.multiple, (275 + this.textMarginTop)* this.multiple)       //设置起点状态
        this.ctx.lineTo (widthPrice + 40* this.multiple + this.ctx.measureText(`原价:${showPrice}`).width, (275+ this.textMarginTop) * this.multiple)       //设置末端状态
        this.ctx.lineWidth = 4 * this.multiple       //设置线宽状态
        this.ctx.strokeStyle = "#999999"  //设置线的颜色状态
        this.ctx.stroke()
      } else {
        if(isTop) {
          this.ctx.fillStyle = '#EF4F59'
          this.ctx.font = this.txtFont* this.multiple + 'px Arial '
          this.ctx.fillText(`免费`, 10* this.multiple, (276 + this.textMarginTop)* this.multiple)
        } else {
          this.ctx.fillStyle = '#EF4F59'
          this.ctx.font = this.txtFont* this.multiple + 'px Arial '
          this.ctx.fillText(`免费`, 10* this.multiple, (276 + this.textMarginTop)* this.multiple)
        }
      }
    },
    // 绘制按钮
    drawButton(buttonText) {
      this.roundedRect(this.ctx, 288* this.multiple, (248 + this.textMarginTop)* this.multiple, 120* this.multiple, 36* this.multiple, 20* this.multiple, '#F64542')
      this.ctx.fillStyle = '#ffffff'
      this.ctx.font = this.txtFont* this.multiple + 'px Arial '
      this.ctx.fillText(buttonText, 310* this.multiple, (274 + this.textMarginTop)* this.multiple, 240* this.multiple)
    },
    // 绘制图块
    roundedRect(ctx, x, y, width, height, radius, color) {
      // ctx.strokeStyle = "#ffffff";
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(x, y + height - radius)
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
      ctx.lineTo(x + width - radius, y + height)
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
      ctx.lineTo(x + width, y + radius)
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
      ctx.lineTo(x + radius, y)
      ctx.quadraticCurveTo(x, y, x, y + radius)
      ctx.fill()
      ctx.stroke()
    },
    // base64转为blob为文件
    dataURLtoFile(dataurl, filename) {//将base64转换为文件
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
      const bytes = window.atob(dataurl.split(',')[1])
      var ab = new ArrayBuffer(bytes.length);  
      var ia = new Uint8Array(ab);  
      for (var i = 0; i < bytes.length; i++) {  
          ia[i] = bytes.charCodeAt(i);  
      } 
      return new Blob( [ab] , {type : mime});  
    },
    upload() {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        this.imgSrc = this.$refs.myCanvas.toDataURL("image/png", 1.0)
        const file = this.dataURLtoFile(this.$refs.myCanvas.toDataURL('image/png', 1.0), 'shareImg')
        formData.append('file', file)
        formData.append('userId', this.$cookie.get('uid'))
        formData.append('sign', sha256(this.apiList.upload + this.$cookie.get('token')))
        this.loading = true
        this.$http({
          url: this.$http.adornUrl(this.apiList.upload),
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }).then(({ data }) => {
          if (data.result) {
            resolve(data.data)
          } else {
            reject()
          }
        })
      })
    },
    // 提交前的验证
    finish() {
      return new Promise((resolve, reject) => {
        if(this.changeimg) {
          const vm = this
          const formData = {
            type: vm.type,
            imgUrl: vm.imgUrl,
            lotteryStartTime: vm.lotteryStartTime,
            price: vm.price,
            showPrice: vm.showPrice,
            endTime: vm.endTime,
          }
          this.drawImg(formData).then(() => {
            this.upload().then((data) => {
              resolve(data)
            })
          }).catch(() => {
            reject()
          })
        } else {
          reject()
        }
      })
    }
  },
  watch: {
    imgUrl() {
      this.changeimg = true
    },
    lotteryStartTime() {
      this.changeimg = true
    },
    price() {
      this.changeimg = true
    },
    showPrice() {
      this.changeimg = true
    },
    endTime() {
      this.changeimg = true
    },
  }
}
</script>