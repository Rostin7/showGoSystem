<template>
<div class="cityBanner">

  <el-tabs  type="border-card">
    <el-tab-pane label="首页优选管理">
      <active-list :typeId="0"></active-list>
    </el-tab-pane>
    <el-tab-pane v-for="item in typeList" :key="item.id" :label="`${item.label}优选管理`">
      <active-list :typeId="item.id"></active-list>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
// import CityList from '../cityList.vue'
import ActiveList from './activeList.vue'
import moduleList from '../../../../utils/module.js'
export default {
  data() {
    return {
      typeList: moduleList.data,
    }
  },
  components: {
    ActiveList
  },
  methods: {

  },
  created() {
   
  }
}
</script>