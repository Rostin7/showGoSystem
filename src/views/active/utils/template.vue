<template>
  <div class="templateForm">
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button @click="submitData" type="primary" :disabled="!idChoose">导入数据模板</el-button>
        <el-button @click="addModel" type="primary">自定义添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 卡片列表 -->
    <el-row :gutter="20">
      <el-col v-for="item in tableList" :key="item.id" :span="6" style="margin-bottom: 15px;">
        <el-card v-if="type != 'prize'" :body-style="{ padding: '0px', height: '115px' }" @click.native="chooseModule(item.id)" :class="{'achive': chooseId == item.id}">
          <img v-if="item.mainImgUrl" :src="item.mainImgUrl" alt="" style="max-width: 100%;">
          <div v-else style="width: 100%; height: 60px;"></div>
          <div style="padding: 14px;">
            <p class="textoverflow">{{ item.name }}</p>
          </div>
          <div class="delButton" @click.stop="del(item)"><i class="el-icon-circle-close-outline"/></div>
        </el-card>
        <el-card v-if="type == 'prize'" :body-style="{ padding: '0px' }" @click.native="chooseModule(item.id)" :class="{'achive': chooseId == item.id}">
          <img v-if="JSON.parse(item.prizeJson).length > 0" :src="JSON.parse(item.prizeJson)[0].prizeImg" alt="" style="max-width: 100%;">
          <div v-else style="width: 100%; height: 60px;"></div>
          <div style="padding: 14px;">
            <p class="textoverflow">{{ item.name }}</p>
          </div>
          <div class="delButton" @click.stop="del(item)"><i class="el-icon-circle-close-outline"/></div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      layout="total, prev, pager, next"
      background
      :page-size="pageSize"
      :total="total"
      style="text-align:center;"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    activeType: {},
    type: {}
  },
  data() {
    return {
      idChoose: false,
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 12,
      chooseId: ''
    }
  },
  methods: {
    del(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.shop.template.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.getDataList()
          }
        })
      })
    },
    addModel() {
      this.$emit("close")
      this.$emit("addModel")
    },
    chooseModule(data) {
      this.chooseId = data
      this.idChoose = true
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shop.template.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, type: this.activeType }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    // 提交选中模板的数据
    submitData() {
      const url = this.apiList.shop.template.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: this.chooseId }, url, true)
      }).then(({ data }) => {
        this.$emit('getModuleData', data.data)
        this.$emit('close')
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
<style lang="scss">
.templateForm{
  .delButton{
    position: absolute;
    top: 0;
    right: 0;
  }
  .el-card__body{
    position: relative;
  }
  .textoverflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
  .achive{
    background: url("../../../assets/moneyOut/bgAchive.png");
    background-size: 31px 31px;
    background-position-x: 100%;
    background-position-y: 100%;
    background-repeat: no-repeat;
  }
}
</style>