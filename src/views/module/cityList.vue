<template>
  <div class="cityList">
    <el-cascader
        v-model="chooseId"
        :placeholder="city"
        :options="dataList"
        filterable
        :props="dataProps"
        change-on-select
        @visible-change="chooseCity($event)"
      ></el-cascader>
  </div>
</template>
<script>
import { treeDataTranslate } from '@/utils/getTree'
export default {
  data() {
    return {
      city: '所有城市',
      dialogVisible: false,
      chooseId: [],
      dataProps: {
        value: 'id',
        label: 'name'
      },
      dataList: []
    }
  },
  methods: {
    init() {
      this.getDataList()
    },
    getDataList() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.city.listNextAll),
        method: 'post',
        data: this.$http.adornData('', this.apiList.module.city.listNextAll, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = treeDataTranslate(data.data)
          this.dataList.unshift({ value: this.$cookie.get('moduleId'), label: '所有城市' })
        } else {
          // 删除失败
          // this.$message.error(data.msg)
        }
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    chooseCity(status) {
      // 判断当前数据的值有没有变化
      console.log(status)
      if (!status) {
        this.$emit('chooseCity', this.chooseId)
      }
    }
  },
  created() {
    this.init()
  }
}
</script>