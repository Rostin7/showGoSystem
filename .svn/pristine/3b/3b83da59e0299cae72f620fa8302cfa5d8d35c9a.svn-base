<template>
  <el-select
    v-model="value"
    filterable
    placeholder="请输入负责人"
    @change="change"
    :filter-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.nickName"
      :value="item.id">
    </el-option>
    <div>
      <el-pagination
      style="text-align: center;"
        small
        layout="prev, pager, next"
         @current-change="handleCurrentChange"
        :total="total"
        :page-size="size">
      </el-pagination>
    </div>
  </el-select>
</template>
<script>
export default {
  props: {
    name: '',
    id: ''
  },
  data() {
    return{
      loading: true,
      value: '',
      searchKey: '',
      options: [],
      page: 1,
      size: 5,
      total: 0
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getDataList()
    },
    change() {
      const index = this.options.findIndex( item => item.id == this.value)
      const item = this.options[index]
      this.$emit('choose', {id: item.id, name: item.nickName})
    },
    remoteMethod(data) {
      this.searchKey = data
      this.getDataList()
    },
    getDataList() {
      const url = this.apiList.role.user.listCharger
       this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page:this.page, size: this.size, searchKey: this.searchKey }, url, true)
      }).then(({ data }) => {
        this.loading = false
        if(data.result) {
          this.options = data.data.records
          this.total = data.data.total
        }
      })
    }
  },
  watch: {
    id() {
      if(this.id) {
        const index = this.options.findIndex( item => item.id == this.id)
        if(index == -1) {
          this.options.shift()
          this.options.unshift({
            id: this.id,
            nickName: this.name
          })
          this.value = this.id
        } else {
          this.value = this.id
        }
      }
    }
  },
  created() {
    this.getDataList()
  }
}
</script>