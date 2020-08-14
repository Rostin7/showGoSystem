<template>
  <div :class="{'show':show}" class="cityList header-search">
    <svg-icon class-name="search-icon" icon-class="location" @click.stop="click" /><span v-show="!show" class="addressName">{{ address }}</span><el-cascader
      ref="headerSearchSelect"
      v-model="chooseId"
      class="header-search-select"
      expand-trigger="hover"
      :placeholder="city"
      :options="dataList"
      filterable
      :props="dataProps"
      change-on-select
      @visible-change="chooseCity($event)"
    />
  </div>
</template>
<script>
import { treeDataTranslate } from '@/utils/getTree'
import { eventBus } from '@/eventBus'
export default {
  data() {
    return {
      city: '全部城市',
      show: false,
      dialogVisible: false,
      chooseId: [],
      dataProps: {
        value: 'id',
        label: 'name'
      },
      dataList: [],
      dataListPro: [],
      address: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    click() {
      this.show = !this.show
      // if (this.show) {
      //   this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      // }
    },
    close() {
      // this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.show = false
    },
    init() {
      this.getDataList()
    },
    // 获得管理员的城市信息
    getCityDetail() {
      const url = this.apiList.module.city.detail
      this.$http({
        url: url,
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.address = data.name
        }
      })
    },
    getDataList() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.city.listNextAll),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.$cookie.get('cityModuleId') }, this.apiList.module.city.listNextAll, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataListPro = data.data
          this.dataList = treeDataTranslate(data.data)
          this.dataListPro.unshift({ id: this.$cookie.get('cityModuleId'), name: '当前' })
          this.dataList.unshift({ value: this.$cookie.get('cityModuleId'), label: '当前' })
          // 初始化城市名称
          const _idx = this.dataListPro.findIndex(item => Number(item.id) === Number(this.$cookie.get('moduleId')))
          console.log(this.dataListPro)
          console.log(this.$cookie.get('moduleId'))
          this.address = this.dataListPro[_idx].name
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
      if (!status) {
        const _idx = this.dataListPro.findIndex(item => item.id === this.chooseId[0])
        this.address = this.dataListPro[_idx].name
        this.$cookie.set('moduleId', this.chooseId[0])
        this.$cookie.set('chooseCityId', this.chooseId[0])
        this.$store.dispatch('user/getInfo').then((data) => {
          this.$store.dispatch('permission/generateRoutes', data).then((accessRoutes) => {
            this.$router.addRoutes(accessRoutes)
            this.$router.push({ path: '/' })
            this.close()
            eventBus.$emit('chooseCity', this.chooseId)
          })
        })
      }
    }
  }
}
</script>

<style lang="scss">
.cityList{
  .addressName{
    font-size: 14px;
  }
  .el-cascader__label{
    font-size: 14px;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
