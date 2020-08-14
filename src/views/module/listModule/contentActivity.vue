<template>
<div class="cityBanner">
  <el-tabs  type="border-card">
    <el-tab-pane label="狂欢活动管理">
      <content-list :typeId="0" :id="id"></content-list>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import contentList from './hotActivity/contentList.vue'
export default {
  props:{
    id: '',
  },
  data() {
    return {

    }
  },
  components: {
    contentList
  },
  methods: {

  }
}
</script>
