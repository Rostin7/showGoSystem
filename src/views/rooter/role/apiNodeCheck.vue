<!-- 注册管理员组件 -->
<template>
<div>
  <el-tree
    :props="props"
    :data="dataList"
    ref="treeNode"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[-1]"
    :default-checked-keys="defaultchecked"
    :check-on-click-node="true"
  />
  <!-- 点击提交 -->
  <el-form @submit.native.prevent>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  props: {
    roleId: {
      type: Number,
      default: false
    }
  },
  data() {
    return{
      dataList: [],
      defaultchecked: [],
      props: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    getDataList() {
      const vm = this
      const url = this.apiList.role.api.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ roleId: this.roleId, page:1, size: 100000 }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          const arr = []
          const pushDataList = data.data.records
          pushDataList.forEach((element, index, array) => {
            element.checked === 1 ? vm.defaultchecked.push(index) : ''
            const idx = arr.findIndex(item => item.label === element.groupName )
            if ( idx === -1) {
              arr.push({
                id: index,
                label: element.groupName,
                children: [{
                  id: index,
                  label: element.name,
                  value:element.url,
                  desc: element.apiDesc
                }]
              })
            } else {
              arr[idx].children.push({
                id: index,
                label: element.name,
                value: element.url,
                desc: element.apiDesc
              })
            }
          })
          this.dataList = [{
            label: '所有权限',
            value: 'all',
            id: -1,
            desc: '全部选择',
            children: arr
          }]
        }
      })
    },
    onSubmit() {
      const arr = [] 
      this.$refs.treeNode.getCheckedNodes(true, false).forEach((v, i, a ) => {
        arr.push(v.value)
      })
      const submitData = arr.join(",")
      // 提交数据
      const url = this.apiList.role.api.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ roleId: this.roleId, apiUrls: submitData }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '数据提交成功',
            type: 'success'
          })
          this.cancel()
        }
      })
    },
    cancel() {
      this.$emit('close')
    }
  },
  created() {
    this.getDataList()
  }
}
</script>