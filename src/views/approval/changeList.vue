<template>
<div>
  <el-tabs type="border-card">
    <el-tab-pane label="促销审批列表">
      <approval-list :activityType="301"/>
    </el-tab-pane>
    <!-- <el-tab-pane label="报名审批列表">
      <approval-list :activityType="101"/>
    </el-tab-pane>
    <el-tab-pane label="抽奖审批列表">
      <approval-list :activityType="701"/>
    </el-tab-pane>
    <el-tab-pane label="商品审批列表">
      <approval-list :activityType="601"/>
    </el-tab-pane> -->
  </el-tabs>
</div>
</template>
<script>
import ApprovalList from './changeItem.vue'
export default {
  props: {},
  data() {
    return {
      cityId: null,
      name: ''
    }
  },
  components: {
    ApprovalList
  }
}
</script>