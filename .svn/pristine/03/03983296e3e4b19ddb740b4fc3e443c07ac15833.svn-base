<template>
  <div class="template">
    <el-tabs type="border-card">
      <el-tab-pane v-for="item in dataList" :key="item.type" :label="item.name">
        <item :type="item.type" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import item from './item'
export default {
  data() {
    return{
      dataList: [
        {
          type: 201,
          name: '商户端常见问题'
        }
        ,
        {
          type: 301,
          name: '客户端常见问题'
        }
      ]
    }
  },
  components: {
    item
  }
}
</script>
<style lang="scss">
  .template{

  }
</style>