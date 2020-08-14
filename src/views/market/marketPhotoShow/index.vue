<template>
<div>
  <!-- 文件列表 -->
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card>
        <div slot="header" class="clearfix">
          <span>风采展示</span>
        </div>
        <photo-show />
      </el-card>
    </el-col>
  </el-row>
</div>
</template>
<script>
import PhotoShow from './photoShow.vue'
// import MarketList from '../../module/mallList.vue'
export default {
  data() {
    return {
      marketChoose: {
        cityId: '',
        marketId: ''
      }
    }
  },
  components: {
    // CityList,
    // MarketList,
    PhotoShow
  }
}
</script>
<style></style>