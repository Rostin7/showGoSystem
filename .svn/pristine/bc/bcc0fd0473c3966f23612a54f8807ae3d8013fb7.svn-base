<template>
  <div class="container">
    <el-card  shadow="never" class="container">
      <p class="main_header">店铺风采</p>
      <el-button @click="handleTabsEdit('add', 'add')" style="position: absolute; right: 40px;top: 40px; z-index: 500">添加分组</el-button>
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="handleTabsEdit">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <photo-item :data="item.dataList" :label="item.label" @delSuccess="delSuccess" @addSuccess="addSuccess"/>
        </el-tab-pane>
      </el-tabs>
      <p style="color: #e51D27; font-size: 12px;">建议尺寸：640 x 640 像素 </p>
    </el-card>
  </div>
</template>
<script>
import PhotoItem from './photoShowItem'
export default {
  data() {
    return {
      editableTabsValue: '全部',
      editableTabs: [],
      dataList: []
    }
  },
  components: {
    PhotoItem
  },
  methods: {
    // 获得风采展示数据
    getDataList() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.shop.photoShow.list),
        method: 'post',
        data: this.$http.adornData('', this.apiList.shop.photoShow.list, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = data.data
          this.editableTabs.push({
            name: '全部',
            label: '全部',
            dataList: []
          })
          // 数据分组
          this.dataList.map(item => {
            const label = item.grouping
            const index = this.editableTabs.findIndex(item => item.name === label)
            if (index === -1) {
              const obj = {
                name: label,
                label: label,
                dataList: [{
                  imgUrl: item.imgUrl,
                  id: item.id
                }]
              }
              this.editableTabs.push(obj)
            } else if (label !== '全部') {
              this.editableTabs[index].dataList.push({
                imgUrl: item.imgUrl,
                id: item.id
              })
            }
            // 填入全部选项
            const _idx = this.editableTabs.findIndex(item => item.name === '全部')
            this.editableTabs[_idx].dataList.push({
              imgUrl: item.imgUrl,
              id: item.id
            })
          })
          console.log(this.editableTabs)
        }
      })
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        this.$prompt('请输入分组名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[^\s]/,
          // inputErrorMessage: '分组名不能包含空字符串'
        }).then(({ value }) => {
          if (!value) {
            return this.$message({
              type: 'warning',
              message: '请输入您要创建的分组名'
            })
          }
          const _index = this.editableTabs.findIndex( item => item.name === value)
          if (_index == -1) {
            this.editableTabs.push({
              name: value,
              label: value,
              dataList: []
            })
          } else {
            this.$message('该分组已存在')
          }
        })
      } else {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
        ).then(() => {
          const index = this.editableTabs.findIndex(item => item.name === targetName)
          console.log(index)
          console.log(this.editableTabs)
          console.log(targetName)
          const dataList = this.editableTabs[index].dataList
          let num = 0
          dataList.forEach(element => {
            const url = this.apiList.shop.photoShow.del
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'post',
              data: this.$http.adornData({ id: element.id }, url, true)
            }).then(({ data }) => {
              if (data.result) {
                if (++ num === dataList.length ) {
                  this.editableTabs.splice(index, 1)
                  if (index > 0) {
                    this.editableTabsValue = this.editableTabs[index -1].name
                  } else {
                    this.getDataList()
                  }
                }
              } else {
                this.getDataList()
              }
            })
          })
        })
      }
    },
    delSuccess(data) {
      if (data.label !== '全部') {
        const index = this.editableTabs.findIndex(item => item.name === '全部')
        const _idx = this.editableTabs[index].dataList.findIndex( item => item.id === data.id)
        this.editableTabs[index].dataList.splice(_idx, 1)
      } else {
        const index = this.dataList.findIndex( item => item.id === data.id )
        const action = this.dataList[index].grouping
        const _idx = this.editableTabs.findIndex(item => item.name === action)
        if (_idx !== -1 && action !== '全部') {
          const dataList = this.editableTabs[_idx].dataList
          dataList.splice(dataList.findIndex(item => item.id === data.id), 1)
          if (dataList.length === 0) {
            this.editableTabs.splice(_idx, 1)
          }
        }
      }
    },
    addSuccess(data) {
      if (data.label !== '全部') {
        const index = this.editableTabs.findIndex(item => item.name === '全部')
        this.editableTabs[index].dataList.push(data)
      }
    },
  },
  created() {
    this.getDataList()
  }
}
</script>