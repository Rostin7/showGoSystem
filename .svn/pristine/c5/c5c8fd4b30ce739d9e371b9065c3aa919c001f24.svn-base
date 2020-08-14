<!-- 注册管理员组件 -->
<template>
  <div class="module_moduleTypeApi">
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="value"
      v-loading="loading"
      element-loading-text="请求中……"
      filterable
      :render-content="renderFunc"
      :titles="['权限列表', '当前权限']"
      :button-texts="['移除权限', '添加权限']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      @right-check-change="rightCheckChange"
      :data="dataList">
    </el-transfer>
  </div>
</template>
<script>
  export default {
    // 获得父组件穿的值
    props: {
      roleId: {
        type: Number,
        default: false
      }
    },
    data() {
      return {
        dataList: [],
        loading: false,
        value: [], // 初始化选中数据
        rightCheckData: [],
        renderFunc(h, option) {
          // 模板引擎，调用的时list对象
          return <span>{ option.key } - { option.label }</span>
        }
      }
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        this.loading = true
        switch (direction) {
          case 'right':
            this.addApi(movedKeys, 'add')
            break
          case 'left':
            this.addApi(movedKeys, 'del')
            break
        }
      },
      // 添加权限
      addApi(movedKeys, type) {
        let index = 0 // 判断是否全部发送，全部发送取消loading
        let requestUrl = this.apiList.role.api.add
        if (type === 'del') {
          requestUrl = this.apiList.role.api.del
        }
        for (var i in movedKeys) {
          this.$http({
            url: this.$http.adornUrl(requestUrl),
            method: 'post',
            data: this.$http.adornData({ roleId: this.roleId, apiUrl: this.dataList[this.dataList.findIndex(item => item.key === movedKeys[i])].url }, requestUrl, true)
          }).then(({ data }) => {
            if (data.result) {
              // 数据获取成功
              index ++
              if (index === movedKeys.length) {
                // 全部发送成功
                this.loading = false
                this.$message({ message: '数据请求完毕', type: 'success' })
              }
            } else {
              // 弹出错误提示
              this.loading = false
              // 判断当前添加还是修改记录当前数据并移除
              if (type === 'add') {
                this.value.replice(this.value.findIndex(item => item === movedKeys[i]), 1)
              } else {
                this.value.push(this.dataList[this.dataList.findIndex(item => item === movedKeys[i])])
              }
              index++
              // this.$message({ message: data.msg, type: 'warning' })
              // this.$store.dispatch('LogOut')
            }
          }).catch(() => {
            // console.log('请求错误')
          })
        }
      },
      getDataList() {
        const url = this.apiList.role.api.list
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ roleId: this.roleId, page:1, size: 100000 }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            // 数据获取成功
            const pushData = []
            const pushDataList = []
            for (var i in data.data.records) {
              // 默认选中值
              if (data.data.records[i].checked === 1) {
                pushData.push(Number(i) + 1)
              }
              // 初始化数组数据
              pushDataList.push({
                key: Number(i) + 1,
                label: data.data.records[i].name,
                disabled: false,
                url: data.data.records[i].url
              })
            }
            console.log(pushData)
            this.dataList = pushDataList
            this.value = pushData
          } else {
            // 弹出错误提示
            // this.$message({ message: data.msg, type: 'warning' })
            // this.$store.dispatch('LogOut')
          }
        }).catch(({ data }) => {
          console.log(data)
        })
      },
      rightCheckChange(data) {
        this.rightCheckData = data
      }
    },
    created() {
      this.getDataList()
    }
  }
</script>
<style lang="scss">
.module_moduleTypeApi{
  text-align: center;
  .el-transfer-panel{
    width: 250px;
  }
  .transfer-footer {
    margin-left: 20px;
    margin-right: 20px;
    padding: 6px 5px;
  }
  .el-transfer-panel__body{
    height: 325px;
  }
  .el-transfer-panel__list.is-filterable{
    height: 245px;
  }
  .el-transfer-panel__footer{
    text-align: center;
  }
}
</style>