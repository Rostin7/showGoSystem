<template>
<div class="update">
  <!-- 通过input获取文件 ，为了美观使用v-show="false" 将input隐藏 通过input的change事件绑定fileChange-->
  <input type="file" v-show="false" accept="image/*" ref="input" @change="fileChange($event.target.files)" />
  <div @click="$refs.input.click()">
    <slot></slot>
  </div>
</div>
</template>
<script>
import sha256 from 'sha256'
export default {
  props: {
    width: {},
    height: {}
  },
  data() {
    return {
      model: false,
      modelSrc: '',
      crap: false,
      loading: false,
      previews: {},
      filesName: '',
      _width: 0,
      option: {
        img: ''
      },
      style: '',
      previews: {},
      popupVisible: false
    }
  },
  methods: {
    fileChange(files) {
      if(files[0].size > 1024*1024*20) {
        return this.$message.error('图片大小超过20M了')
      }
      this.filesName = files[0].name
      this.option.img = files[0]
      this.$refs.input.value = null
      this.upload()
    },
    upload() {
      const formData = new FormData()
      const file = this.option.img
      formData.append('file', file)
      formData.append('userId', this.$cookie.get('uid'))
      formData.append('sign', sha256(this.apiList.upload + this.$cookie.get('token')))
      // 显示loading
      this.loading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.upload),
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then(({ data }) => {
        this.loading = false
        this.popupVisible = false
        if (data.result) {
          this.$emit('fileChange', data.data)
        } else {
          // this.MessageBox('提示', data.msg)
        }
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="scss">
.crop-info{
  display: none;
}
.update{
  display: inline-block;
  width: 148px;
  height: 148px;
  box-sizing: border-box;
  margin: 0 0 8px 0;
  vertical-align: top;
  text-align: center;
  line-height: 146px;
  border-radius: 6px;
  border: 1px dashed #c0ccda;
}
.cut{
  // width: 375px;
  height: auto;
  min-height: 275px;
  .btnContainer{
    box-sizing: border-box;
    padding: 15px;
  }
  .vue-cropper{
    height: 325px;
    // display: inline-block;
    // vertical-align: middle;
    // width: 375px;
    // height: 30%;
  }
}
.show-preview{
  // display: inline-block;
  // vertical-align: middle;
}
.update:hover{
  border-color: #409eff;
  color: #409eff;
}
</style>