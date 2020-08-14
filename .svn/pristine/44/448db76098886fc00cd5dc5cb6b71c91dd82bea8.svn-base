<template>
  <div class="hostActiveActiveList">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">每日优选</p></el-form-item>
            <el-form-item>
              <el-button @click.native="addTypeChoose = true" v-if="isAuth('/hotActivity/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="dataList" v-loading="listLoading" element-loading-text="拼命加载中" ref="dragTable" >
            <el-table-column prop="id" label="Id" width="60" align="center" header-align="center" />
            <el-table-column prop="name" label="名称" align="center" header-align="center">
              <template slot-scope="scope">
                <span style="color: #1890ff; cursor:pointer;">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="showToC" label="状态" align="center" header-align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.approvalId">
                  <el-tag @click.stop="cancelCheckState(scope.$index, scope.row)">审批中</el-tag>
                </div>
                <div v-else>
                  <el-tag v-if="scope.row.showToC" type="success">已上架</el-tag>
                  <el-tag v-else type="info" >已下架</el-tag>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="viewCount" label="查看次数" align="center" header-align="center"/>
            <el-table-column prop="alreadyNum" label="购买次数" align="center" header-align="center"/> -->
            <el-table-column prop="beginTime" label="购买" align="center" header-align="center">
              <template slot-scope="scope">
                {{ `${scope.row.alreadyNum}` }}
              </template>
            </el-table-column>
            <el-table-column prop="beginTime" label="活动时间" align="center" header-align="center" width="300">
              <template slot-scope="scope">
                <!-- {{timeChange('Y-m-d', scope.row.beginTime)}} -->
                <!-- <el-popover trigger="hover" placement="top"> -->
                  <p style="margin: 0">活动开始时间：{{ timeChange('Y-m-d H:i:s', scope.row.startTime) }}</p>
                  <p style="margin: 0">活动结束时间：{{ timeChange('Y-m-d H:i:s', scope.row.endTime) }}</p>
                  <p style="margin: 0">凭证使用开始时间：{{ timeChange('Y-m-d H:i:s', scope.row.startUseTime) }}</p>
                  <p style="margin: 0">凭证使用结束时间：{{ timeChange('Y-m-d H:i:s', scope.row.endUseTime) }}</p>
                  <!-- <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ timeChange('Y-m-d', scope.row.startTime) }}</el-tag>
                  </div> -->
                <!-- </el-popover> -->
              </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="主图" align="center" header-align="center" width="200">
              <template slot-scope="scope">
                <!-- <el-popover trigger="hover" placement="top"> -->
                  <img :src="scope.row.imgUrl" alt="" style="max-width: 100%;">
                  <!-- <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ '查看详情' }}</el-tag>
                  </div> -->
                <!-- </el-popover> -->
              </template>
            </el-table-column>
            <el-table-column prop="price" label="出售信息" align="center" header-align="center" width="200">
              <template slot-scope="scope">
                <!-- {{timeChange('Y-m-d', scope.row.beginTime)}} -->
                <!-- <el-popover trigger="hover" placement="top"> -->
                  <p style="margin: 0">促销价格： ￥{{scope.row.price/100}}</p>
                  <p style="margin: 0">原始价格： ￥{{scope.row.showPrice/100}}</p>
                  <p style="margin: 0">促销数量： {{scope.row.totalNum}}</p>
                  <p style="margin: 0" v-if="scope.row.totalCanBuy">最大购买数量： {{scope.row.totalCanBuy}}</p>
                  <p v-if="scope.row.resellPrice" style="margin: 0">分销价格：￥{{scope.row.resellPrice / 100}}</p>
                  <!-- <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">售价：￥{{scope.row.price/100}}</el-tag>
                  </div> -->
                <!-- </el-popover> -->
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="isAuth('/hotActivity/del')"
                  size="mini"
                  type="text"
                  class="danger block block-center"
                  @click="submitDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--工具条-->
          <!-- <el-pagination
            layout="total, prev, pager, next"
            background
            :page-size="pageSize"
            :total="total"
            style="text-align:center;"
            @current-change="handleCurrentChange"
          /> -->
        </el-card>
      </el-col>
    </el-row>
    <!-- 选择添加方式 -->
    <el-dialog title="添加推荐" :visible.sync="addTypeChoose" :close-on-click-modal="false" :modal="true"  width="800px">
      <active-list v-if="addTypeChoose" @chooseActive="chooseActive"/>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import activeList from '../../../utils/activeList'
export default {
  props: {
    typeId: {}
  },
  data() {
    return {
      addTypeChoose: false,
      pageSize: 1000,
      total: 0,
      page: 1,
      dataList: [],
      listLoading: false,
      newList: []
    }
  },
  components: {
    activeList
  },
  methods: {
    datadragEnd(newIndex, oldIndex) {
      let _idx = 0 // 排序差值
      let lastIndex = 0 // 上一位的排序值
      if(newIndex == this.newList.length -1) {
        // 拖拽到最后一位
        lastIndex = this.newList[newIndex - 1].sortCode
        _idx =  10
      } else if(newIndex == 0){
        lastIndex = 0
         _idx = Math.round(this.newList[newIndex + 1].sortCode * 1000 / 2) / 1000
      } else {
        lastIndex = this.newList[newIndex - 1].sortCode
        _idx = Math.abs(Math.round(( this.newList[newIndex + 1].sortCode - this.newList[newIndex - 1].sortCode) * 1000 / 2)/ 1000)
      }
      const url = this.apiList.module.city.hotActivity.sort
      const fromData = {
        groupId: this.typeId,
        id: this.newList[newIndex].id,
        sortCode: _idx,
        lastCode: lastIndex,
        cityId: this.$cookie.get('chooseCityId')
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData( fromData, url, true)
      }).then(({ data }) => {
        if (data.result) {
          // console.log(data)
          this.newList[newIndex].sortCode = _idx + lastIndex
          const vm = this
          if(data.data != null) {
            Object.keys(data.data).forEach(function(key){
              const index = vm.newList.findIndex( item => item.id == key )
              if(index != -1) {
                vm.newList[index].sortCode = data.data[key]
              }
            })
          }
        }
      })
      // const _idx = this.dataList[newIndex]
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        onEnd: evt => {
          evt.preventDefault()
          // 改变原数组
          const targetRow = this.dataList[evt.oldIndex]
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
          this.datadragEnd(evt.newIndex, evt.oldIndex)
        }
      })
    },
    async getDataList() {
      this.listLoading = true
      const url = this.apiList.module.city.hotActivity.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize, groupId: this.typeId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = data.data.records
          this.total = data.data.total
          this.newList = this.dataList.slice()
          this.$nextTick(() => {
            this.setSort()
          })
        }
        this.listLoading = false
      }).catch(() => {
        // this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    // 选择添加
    chooseActive(data) {
      const formData = {
        activityType: data.type,
        activityId: data.activityId,
        activityName: data.name,
        moduleName: data.moduleName,
        targetModuleId: data.moduleId,
        channelType: 101
      }
      this.addActive(formData)
    },
    // 添加分组请求数据
    addActive(data) {
      const url = this.apiList.module.city.hotActivity.add
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({groupId: this.typeId, activityId: data.activityId, activityType: data.activityType}, url, true)
      }).then(({ data }) =>{
        if(data.result) {
          this.$message({ type: 'success', message: '提交成功' })
          this.addTypeChoose = false
          this.getDataList()
        }
      })
    },
    
    // 点击确认删除
    submitDelete(index, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.module.city.hotActivity.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ id: data.activityId, groupId: this.typeId, activityType: data.activityType }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.dataList.splice(index, 1)
            this.total --
          }
        })
      })
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
  },
  created() {
    this.getDataList()
  }
}
</script>

<style lang="scss">
.hostActiveActiveList{
  .el-table__row{
    cursor: move;
  }
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
  .icon-star{
    margin-right:2px;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .show-d{
    margin-top: 15px;
  }
}
</style>
