<template>
<div>
  <el-button
    size="mini"
    type="text"
    v-if="only && (rowData.useState == 1 || rowData.useState == 101)"
    @click="refund">
    办理退款
  </el-button>
  <el-button
    size="mini"
    type="text"
    v-if="only && (rowData.useState == 201 || rowData.useState == 301)">
    已退款
  </el-button>
  <el-button v-if="!only" @click="refundAll" type='text'>批量退款</el-button>
</div>
</template>
<script>
export default {
  props: {
    only: {
      type: Boolean,
      default: true
    },
    rowData: {
      type: Object
    },
    listData: {
      type: Array
    }
  },
  methods: {
    // 点击批量退款
    refundAll() {
      const arr = this.listData.filter( item => item.useState === 1 || item.useState === 101)
      this.$confirm('此操作将从您的账户余额退款给该用户, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(async() => {
        if (arr.length > 0) {
          // 将异步请求变成同步请求
          // arr.forEach( (item, index) => {
          for (let i = 0; i < arr.length ; i ++) {
            const index = i
            const item = arr[i]
            await this.sendData(item)
            if (index === arr.length -1) {
              this.$message({
                type: 'success',
                message: '数据请求完成'
              })
              this.$emit('changeData')
            }
          }
          // })
        } else {
          this.$message({
            type: 'warning',
            message: '所有內容都已退款'
          })
        }
      })
    },
    // 点击单条退款
    refund() {
      this.$confirm('此操作将从您的账户余额退款给该用户, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.sendData(this.rowData).then(() => {
          this.$message({
            message: '退款成功',
            type: 'success'
          })
          this.$emit('changeData')
        })
      })
    },
    // 发送请求
    sendData(item) {
      return new Promise((resolve, reject) => {
        const url = this.apiList.refund.orderEdit
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ orderId: item.orderId, getId: item.id }, url, true)
        }).then(({ data }) => {
          if(data.result) {
            resolve()
          } else {
            this.$emit('changeData')
          }
        })
      })
    }
  }
}
</script>