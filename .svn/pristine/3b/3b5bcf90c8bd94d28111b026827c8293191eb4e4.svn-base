<template>
  <div>
    <div>
      <span style="color: #1890ff; cursor:pointer;" @click="getDetail= true">{{ `${activeData.name}` }}</span>
    </div>
    <el-dialog title="查看详情" :visible.sync="getDetail" :modal="true"  width="500px" :append-to-body="true">
      <!-- 报名 -->
      <enter-name v-if="getDetail&&(activeData.type==101||activeData.activityType==101)" :activityId="activeData.activityId" :listId="listId" :url="url"/>
      <!-- 促销 -->
      <pm-sale v-if="getDetail&&(activeData.type==301||activeData.activityType==301)" :activityId="activeData.activityId" :listId="listId" :url="url"/>
      <!-- 抽奖 -->
      <prize-draw v-if="getDetail&&(activeData.type==701||activeData.activityType==701)" :activityId="activeData.activityId" :listId="listId" :url="url"/>
    </el-dialog>
  </div>
</template>
<script>
import enterName from './enterName'
import pmSale from './pmSale'
import prizeDraw from './luckyDraw'
export default {
  props: {
    activeData: {},
    url: {}, // 如果是修改，调用的预览数据的接口变成新的接口
    listId: {}, // 列表的ID
  },
  data() {
    return {
      getDetail: false
    }
  },
  components: {
    enterName,
    pmSale,
    prizeDraw
  },
  created() {
    // console.log(this.activeData)
  }
}
</script>