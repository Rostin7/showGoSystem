<template>
  <div class="groupBuy">
    <div v-show="!isadmin">
      <p class="mainheader">网站正在建设中，敬请期待！</p>
      <p class="secondeHeader">the website is under construction, please stay tuned.</p>
      <el-form @submit.native.prevent>
        <el-form-item>
          <el-input v-model="pass" autocomplete="off" type="password" placeholder="请输入验证密码进行内部操作"  @keyup.stop.native="pass == 'admin75229' ? isadmin = true : isadmin = false"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="15" v-show="isadmin">
    <!-- <el-row :gutter="15"> -->
      <el-col :span="24">
        <el-card shadow="never">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">团购管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native = "addModel" v-if="isAuth('/groupBuy/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="activityId" label="Id" width="60" sortable align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center" header-align="center">
            </el-table-column>
            <!-- <el-table-column prop="phoneNum" label="联系电话" /> -->
            <el-table-column prop="showToC" label="状态" align="center" header-align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.showToC" type="success">已上架</el-tag>
                <el-tag v-else type="info">未上架</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="beginTime" label="活动时间" align="center" header-align="center">
              <template slot-scope="scope">
                <!-- {{timeChange('Y-m-d', scope.row.beginTime)}} -->
                <el-popover trigger="hover" placement="top">
                  <p>团购活动开始时间：{{ timeChange('Y-m-d H:i:s', scope.row.startTime) }}</p>
                  <p>团购活动结束时间：{{ timeChange('Y-m-d H:i:s', scope.row.endTime) }}</p>
                  <p>凭证使用开始时间：{{ timeChange('Y-m-d H:i:s', scope.row.startUseTime) }}</p>
                  <p>凭证使用结束时间：{{ timeChange('Y-m-d H:i:s', scope.row.endUseTime) }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ timeChange('Y-m-d', scope.row.startTime) }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="主图" align="center" header-align="center">
              <template slot-scope="scope">
                <!-- <span @click="imageDetail(scope.row.imgUrl)" style="cursor: pointer">点击查看</span> -->
                <el-popover trigger="hover" placement="top">
                  <img :src="scope.row.imgUrl" alt="" style="max-width: 400px;">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ '点击查看' }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="出售管理" align="center" header-align="center" :width="isAuth('/groupBuyItem/list') ? 340 : 200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-if="isAuth('/groupBuy/mod')"
                  @click="submitSelf(scope.$index, scope.row)">单独购买信息修改
                </el-button>
                <router-link :to="'/groupBuyItem/'+scope.row.activityId">
                  <el-button
                    size="mini"
                    v-if="isAuth('/groupBuyItem/list')"
                  >
                    分组管理
                  </el-button>
                </router-link>
                <!-- {{timeChange('Y-m-d', scope.row.beginTime)}} -->
                <!-- <el-popover trigger="hover" placement="top">
                  <p>售价： {{ scope.row.price ? scope.row.price/100 : 0 }}</p>
                  <p>划线价格： {{ scope.row.showPrice ? scope.row.showPrice/100 : 0 }}</p>
                  <p>最大数量： {{ scope.row.totalNum ? scope.row.totalNum : 0 }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">售价：￥{{ scope.row.price ? scope.row.price/100 : 0 }}</el-tag>
                  </div>
                </el-popover> -->
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  v-if="isAuth('/groupBuy/mod')"
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/groupBuy/del')"
                  size="mini"
                  type="text"
                  class="danger"
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="40%">
      <group-form
        v-if="dialogFormVisible"
        ref="GroupForm"
        :form_type="formType"
        @success="success"
        @close="dialogFormVisible = !dialogFormVisible"
      />
    </el-dialog>
    <el-dialog :visible.sync="DialogEditVisible">
      <groupbuy-self ref="groupbuyself" @close="DialogEditVisible = !DialogEditVisible" />
    </el-dialog>
  </div>
</template>
<script>
import GroupForm from './groupBuyForm.vue'
import GroupbuySelf from './groupBuySelf.vue'
import { eventBus } from '@/eventBus'
export default {
  components: {
    GroupForm,
    GroupbuySelf
  },
  data() {
    return {
      isadmin: false,
      pass: '',
      tableList: [],
      listLoading: true,
      isShowEditVisible: false,
      reloadShopList: false,
      total: 0,
      page: 1,
      pageSize: 10,
      DialogEditVisible: false,
      imgUrl: '',
      dialogTitle: '添加团购活动',
      dialogFormVisible: false,
      formType: 'add'
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.shop.groupBuy.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, this.apiList.shop.groupBuy.list, true)
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
          url: this.$http.adornUrl(this.apiList.shop.groupBuy.del),
          method: 'post',
          data: this.$http.adornData({ id: data.activityId }, this.apiList.shop.groupBuy.del, true)
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
      this.dialogTitle = '添加团购活动'
      this.dialogFormVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑团购活动'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.GroupForm.init({ data })
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
    // 修改团购价格
    submitSelf(index, data) {
      this.groupbuyid = data.activityId 
      this.DialogEditVisible = true
      this.$nextTick(() => {
        this.$refs.groupbuyself.init(data.activityId)
      })
    }
  }
}
</script>
<style lang="scss">
.groupBuy{
  .el-tag{ 
    cursor: pointer;
  }
}
</style>
