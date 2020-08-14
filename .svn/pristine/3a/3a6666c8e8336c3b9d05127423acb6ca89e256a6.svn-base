<template>
  <div class="activityPlan">
     <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">活动管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native="addTypeChoose = true" v-if="isAuth('/activityPlan/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="activityId" label="Id" width="60" align="center" header-align="center" />
            <el-table-column prop="name" label="名称" align="center" header-align="center">
              <template slot-scope="scope">
                <span style="color: #1890ff; cursor:pointer;" @click="lookDetail(scope.row)">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="showToC" label="状态" align="center" header-align="center">
              <template slot-scope="scope">
                <!-- 审批组件 -->
                <check
                  :approvalId="scope.row.approvalId"
                  :sysDown="scope.row.sysDown"
                  :show="scope.row.showToC"
                  :activityId="scope.row.activityId"
                  :activityType="501"
                  @changeData="getDataList"/>
              </template>
            </el-table-column>
            <el-table-column prop="showToC" label="微信分享信息" align="center" header-align="center" width="120" v-if="isAuth('/wxTool/getMiniUnlimitedCode')">
              <template slot-scope="scope">
                <wx-code 
                :img="scope.row.wxMiniUrl" 
                :code="scope.row.wxMiniUrlCode" 
                :targetId="scope.row.activityId" 
                :type="501"
                @getminiAppUrl="getminiAppUrl"
                @getWxAppEr="getWxAppEr"></wx-code>
              </template>
            </el-table-column>
            <el-table-column prop="showPrice" label="价格" align="center" header-align="center"> 
              <template slot-scope="scope">
                {{scope.row.price / 100}}
              </template>
            </el-table-column>
            <el-table-column prop="beginTime" label="购买/查看" align="center" header-align="center">
              <template slot-scope="scope">
                {{ `${scope.row.alreadyNum}/${scope.row.viewCount}` }}
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
                  <img :src="scope.row.imgUrl" alt="" style="max-width: 100%;">
              </template>
            </el-table-column>
            <el-table-column label="操作" :width="200" align="center" header-align="center">
              <template slot-scope="scope">
                <router-link v-if="isAuth('/activityPlan/listOrderData')" :to="'/activityPlanOrderInfo/'+scope.row.activityId">
                  <el-button
                    size="mini"
                    type="text"
                    class="block block-center"
                  >查看订单</el-button>
                </router-link>
                <router-link v-if="isAuth('/zComment/findComment')" :to="`/zCommentList/${scope.row.activityId}/${501}`">
                  <el-button
                    size="mini"
                    type="text"
                    class="block block-center"
                  >查看评论</el-button>
                </router-link>
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/activityPlan/mod')"
                  class="block block-center"
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/activityPlan/del')"
                  size="mini"
                  type="text"
                  class="danger block block-center"
                  @click="submitDelete(scope.$index, scope.row)">删除</el-button>
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
    <!-- 弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="true" width="800px">
      <enter-form
        v-if="dialogFormVisible"
        ref="enterFrom"
        :form_type="formType"
        @success="success"
        @close="dialogFormVisible = !dialogFormVisible"
      />
    </el-dialog>
    <!-- 选择添加方式 -->
    <el-dialog title="添加报名" :visible.sync="addTypeChoose" :close-on-click-modal="false" :modal="true"  width="600px">
      <active-template :activeType="501" v-if="addTypeChoose" @addModel="addModel" @getModuleData="getModuleData" @close="addTypeChoose = !addTypeChoose"/>
    </el-dialog>
    <!-- 查看详情弹窗 -->
    <el-dialog title="查看详情" :visible.sync="getDetail" :modal="true"  width="500px">
      <div v-html="activeDetail" class="fulltext"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getDetail = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EnterForm from './activityPlanForm.vue'
import ActiveTemplate from '../utils/template'
import WxCode from '../utils/wCode'
import check from '../utils/check'
export default {
  data() {
    return {
      getDetail: false,
      activeDetail: '',
      isadmin: false,
      pass: '',
      tableList: [],
      listLoading: true,
      isShowEditVisible: false,
      reloadShopList: false,
      total: 0,
      page: 1,
      pageSize: 10,
      dialogItemVisible: false,
      imgUrl: '',
      dialogTitle: '添加',
      dialogFormVisible: false,
      dialogMessVisible: false,
      dialogFullVisible: false,
      formType: 'add',
      addTypeChoose: false
    }
  },
  components: {
    EnterForm,
    ActiveTemplate,
    check,
    WxCode
  },
  methods: {
    // 获得小程序分享链接后提交修改
    getminiAppUrl(data) {
      const url = this.apiList.shop.activityPlan.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: data.targetId, wxMiniUrlCode: data.code }, url, true)
      })
    },
    getWxAppEr(data) {
      const url = this.apiList.shop.activityPlan.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: data.targetId, wxMiniUrl: data.code }, url, true)
      })
    },
    // 点击查看详情
    lookDetail(data) {
      this.activeDetail = Base64.decode(data.fullText)
      this.getDetail = true
    },
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.shop.activityPlan.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, this.apiList.shop.activityPlan.list, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = data.data.records
          this.total = data.data.total
        } else {
          // 请求失败
          // this.$message.error(data.msg)
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
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.shop.activityPlan.del),
          method: 'post',
          data: this.$http.adornData({ id: data.activityId }, this.apiList.shop.activityPlan.del, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.tableList.splice(index, 1)
            this.total --
          }
        })
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.enterFrom.getGroup()
      })
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.enterFrom.init({ data })
      })
    },
    // 修改富文本信息
    enterFull(index, data) {
      this.dialogFullVisible = true
      this.$nextTick(() => {
        this.$refs.enterFull.init({ data })
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
    },
    // 提交模板数据
    getModuleData(data) {
      this.formType = 'add'
      this.dialogTitle = '添加活动'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.enterFrom.setData(data)
      })
    }
  },
  created() {
    this.getDataList()
  },
}
</script>
<style lang="scss">
.activityPlan{
  .el-dialog__body{
    // padding: 0
  }
}
</style>
