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
      <el-button class="transfer-footer transfer-footer-left" slot="right-footer" size="small" @click="show">显示</el-button>
      <el-button class="transfer-footer transfer-footer-right" slot="right-footer" size="small" @click="hide">隐藏</el-button>
    </el-transfer>
  </div>
</template>
<script>
  export default {
    // 获得父组件穿的值
    props: {
      moduleTypeId: {
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
        let requestUrl = this.apiList.moduleTypeApi.add
        if (type === 'del') {
          requestUrl = this.apiList.moduleTypeApi.del
        }
        for (var i in movedKeys) {
          this.$http({
            url: this.$http.adornUrl(requestUrl),
            method: 'post',
            data: this.$http.adornData({ moduleType: this.moduleTypeId, apiUrl: this.dataList[this.dataList.findIndex(item => item.key === movedKeys[i])].url }, requestUrl, true)
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
        this.$http({
          url: this.$http.adornUrl(this.apiList.moduleTypeApi.list),
          method: 'post',
          data: this.$http.adornData({ moduleTypeId: this.moduleTypeId }, this.apiList.moduleTypeApi.list, true)
        }).then(({ data }) => {
          if (data.result) {
            // 数据获取成功
            const pushData = []
            const pushDataList = []
            for (var i in data.data) {
              // 默认选中值
              if (data.data[i].checked) {
                pushData.push(data.data[i].id)
              }
              // 初始化数组数据
              pushDataList.push({
                key: data.data[i].id,
                label: data.data[i].show === 1 ? data.data[i].name + '  ' + '显示' : data.data[i].name + '  ' + '隐藏',
                disabled: false,
                url: data.data[i].url
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
      changeShow(type) {
        this.loading = true
        let index = 0 // 判断是否全部发送，全部发送取消loading
        this.rightCheckData.forEach(element => {
          const obj = this.dataList.filter(item => item.key === element)
          this.$http({
            url: this.$http.adornUrl(this.apiList.moduleTypeApi.show),
            method: 'post',
            data: this.$http.adornData({ moduleType: this.moduleTypeId, apiUrl: obj[0].url, show: type }, this.apiList.moduleTypeApi.show, true)
          }).then(({ data }) => {
            index ++
            if (!data.result) {
              
            }
            if (index === this.rightCheckData.length) {
              // 全部发送成功
              this.loading = false
              this.$message({ message: '数据请求完毕', type: 'success' })
              this.getDataList()
            }
          })
        })
      },
      show(){
        this.changeShow(1)
      },
      hide() {
        this.changeShow(0)
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