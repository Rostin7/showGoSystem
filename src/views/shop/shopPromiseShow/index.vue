<template>
<div class="container">
  <!-- 文件列表 -->
  <el-card  shadow="never" class="container">
    <p class="photoShowheader">店铺承诺</p>
    <photo-show class="photoShowBody"></photo-show>
  </el-card>
</div>
</template>
<script>
import PhotoShow from './photoShow.vue'
export default {
  components: {
    PhotoShow
  }
}
</script>
<style scope>
.container{
  position: absolute;
  top: 20px;
  bottom: 20px;
  background: #fff;
  left: 20px;
  right: 20px;
}
.photoShowheader{
  font-size: 24px;
  color: #666;
  font-weight: 600;
  margin-bottom: 30px;
}
.photoShowBody{
  border: solid 1px #E5E5E5;
}
</style>