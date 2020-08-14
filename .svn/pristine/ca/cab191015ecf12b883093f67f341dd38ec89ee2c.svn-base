<template>
<div>
  <el-tabs type="card">
    <el-tab-pane label="平台首页">
      <el-table :data="tableList">
        <el-table-column prop="id" label="#ID" align="center" header-align="center" />
        <el-table-column prop="level" label="层级" align="center" header-align="center" />
        <el-table-column prop="name" label="名称" align="center" header-align="center" />
        <el-table-column label="操作"  header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="choosePage(scope.row)">
              选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="商家主页">
      <shop-list @chooseShop="chooseShop"></shop-list>
    </el-tab-pane>
    <el-tab-pane label="商品详情">
      <active-list @chooseActive="chooseActive"></active-list>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import shopList from '../utils/shopList.vue'
import activeList from '../utils/activeList.vue'
import moduleList from '../../utils/module.js'
export default {
  props: {},
  data() {
    return {
      tableList: []
    }
  },
  components: {
    shopList,
    activeList,
  },
  methods: {
    chooseActive(data) {
      const formData = {
        activityType: data.type,
        activityId: data.activityId,
        activityName: data.name,
        moduleName: data.moduleName,
        targetModuleId: data.moduleId,
        channelType: 101
      }
      this.$emit('success', formData)
    },
    chooseShop(data) {
      const formData = {
        moduleName: data.name,
        targetModuleId: data.id,
        channelType: 1
      }
      this.$emit('success', formData)
    },
    choosePage(data) {
      const formData = {
        moduleName: data.name,
        targetModuleId: data.id,
        channelType: 0
      }
      this.$emit('success', formData)
    }
  },
  created() {
    let groupArray = []
    let tableList = [
      {
        name: '平台首页',
        id: 1,
        level: 1
      }
    ]
    moduleList.data.forEach(element => {
      tableList.push({
        name: `${element.label}首页`,
        id: element.id,
        level: 2
      })
      if (element.children.length > 0) {
        groupArray = groupArray.concat(element.children)
      }
    })
    // groupArray.forEach(element => {
    //   tableList.push({
    //     name: element.label ,
    //     id: element.id,
    //     level: 3
    //   })
    // })
    this.tableList = tableList
  }
}
</script>