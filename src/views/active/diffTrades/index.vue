<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" :model="shopChoose" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">异业合作管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native = "addModel" v-if="isAuth('/coupon/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <!--列表-->
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="activityId" label="Id" width="60"/>
            <el-table-column header-align="center" align="center" prop="name" label="名称" />
            <el-table-column header-align="center" align="center" prop="showToC" label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.showToC" type="success">已上架</el-tag>
                <el-tag v-else type="info">未上架</el-tag>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="beginTime" label="活动时间">
              <template slot-scope="scope">
                <!-- {{timeChange('Y-m-d', scope.row.beginTime)}} -->
                <el-popover trigger="hover" placement="top">
                  <p>活动开始时间：{{ timeChange('Y-m-d H:i:s', scope.row.startTime) }}</p>
                  <p>活动结束时间：{{ timeChange('Y-m-d H:i:s', scope.row.endTime) }}</p>
                  <p>凭证使用开始时间：{{ timeChange('Y-m-d H:i:s', scope.row.startUseTime) }}</p>
                  <p>凭证使用结束时间：{{ timeChange('Y-m-d H:i:s', scope.row.endUseTime) }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ timeChange('Y-m-d', scope.row.startTime) }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="主图" header-align="center" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <img :src="scope.row.imgUrl" alt="" style="max-width: 400px;">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ '查看详情' }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="出售信息" header-align="center" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>售价： {{scope.row.price/100}}</p>
                  <p>优惠金额：{{scope.row.showPrice/100}}</p>
                  <p>最大数量： {{scope.row.totalNum}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">售价：￥{{scope.row.price/100}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 异业合作 diffId -->
            <el-table-column header-align="center" align="center" prop="showToC" label="合作状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.diffId" type="success">异业合作</el-tag>
                <el-tag v-else type="info">无合作</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" header-align="center" align="center"> 
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/diffTrades/add') && !scope.row.diffId"
                  @click="addModel(scope.$index, scope.row)">
                  添加
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/diffTrades/mod') && scope.row.diffId"
                  @click="submitEdit(scope.$index, scope.row)">
                  修改
                </el-button>
                <el-button
                  v-if="isAuth('/diffTrades/del') && scope.row.diffId"
                  size="mini"
                  type="text"
                  @click="submitDelete(scope.$index, scope.row)"
                  class="danger"
                  >
                  取消
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--工具条-->
          <el-pagination
            layout="total, prev, pager, next"
            background
            :page-size="pageSize"
            :total="total"
            style="text-align:center;"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="650px">
      <difftrades-form v-if="dialogFormVisible" ref="difftradesForm" :formType="formType" :targetId="targetId" :targetType="targetType" @success="success" @close="dialogFormVisible = !dialogFormVisible"/>
    </el-dialog>
    <el-dialog :visible.sync="DialogImgVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import DifftradesForm from './difftradesForm.vue'
import { eventBus } from '@/eventBus'
export default {
  props: {
    type: {
      type: 'string'
    }
  },
  data() {
    return {
      pass:'',
      isadmin: false,
      shopChoose: {
        cityId: '',
        shopId: ''
      },
      tableList: [],
      listLoading: true,
      isShowEditVisible: false,
      reloadShopList: false,
      total: 0,
      page: 1,
      pageSize: 10,
      DialogImgVisible: false,
      imgUrl: '',
      dialogTitle: '添加异业合作',
      dialogFormVisible: false,
      formType: 'add',
      targetType: '',
      targetId: ''
    }
  },
  components: {
    DifftradesForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shop.diffTrades.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      }).catch(() => {
        // this.$message.error('未知错误')
        this.listLoading = false
      })
    },
    // 点击删除
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将取消该活动的合作信息, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.shop.diffTrades.del),
          method: 'post',
          data: this.$http.adornData({ tradesId: data.diffId }, this.apiList.shop.diffTrades.del, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '取消成功' })
            // 删除当前列
            this.tableList.splice(index, 1)
            this.total --
          } else {
          }
        })
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    // 点击添加
    addModel(index, data) {
      this.targetType = data.targetType
      this.targetId = data.activityId
      this.formType = 'add'
      this.dialogTitle = '添加异业合作'
      this.dialogFormVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.targetType = data.targetType
      this.targetId = data.activityId
      this.formType = 'edit'
      this.dialogTitle = '修改异业合作'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.difftradesForm.init(data)
      })
    },
    success() {
      this.dialogFormVisible = false
      this.getDataList()
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    }
  },
  mounted() {
    // this.$
  },
  created() {
    this.getDataList()
  }
}
</script>
<style>

</style>