<template>
<div class="cityBanner">
  <el-tabs type="border-card">
    <el-tab-pane label="首页轮播图管理">
      <banner-list :width="355" :height="140"  :cityId="cityId" :typeId="0"></banner-list>
    </el-tab-pane>
    <el-tab-pane v-for="item in typeList" :key="item.id" :label="`${item.label}轮播图管理`">
      <banner-list :width="315" :height="140" :cityId="cityId" :typeId="item.id"></banner-list>
    </el-tab-pane>
    <el-tab-pane label="搜索轮播图">
      <banner-list :width="344" :height="95" :cityId="cityId" :typeId="301"></banner-list>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import BannerList from './bannerList.vue'
import moduleList from '../../../utils/module.js'
export default {
  data() {
    return {
      typeList: moduleList.data,
      cityId: null
    }
  },
  components: {
    BannerList
  },
  methods: {
    
  }
}
</script>