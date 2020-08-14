<template>
  <div class="enterName">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <!-- 改变店铺 -->
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">报名管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native="addTypeChoose = true" v-if="isAuth('/enterName/add')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="activityId" label="Id" width="60" align="center" header-align="center" />
            <el-table-column prop="name" label="名称" align="center" header-align="center">
              <template slot-scope="scope">
                <preview :activeData="scope.row" />
              </template>
            </el-table-column>
            <el-table-column prop="showToC" label="微信分享信息" align="center" header-align="center" width="120" v-if="isAuth('/wxTool/getMiniUnlimitedCode')">
              <template slot-scope="scope">
                <wx-code 
                :img="scope.row.wxMiniUrl" 
                :code="scope.row.wxMiniUrlCode" 
                :targetId="scope.row.activityId" 
                :type="101"
                @getminiAppUrl="getminiAppUrl"
                @getWxAppEr="getWxAppEr"></wx-code>
              </template>
            </el-table-column>
            <el-table-column prop="showPrice" label="价格" align="center" header-align="center"> 
              <template slot-scope="scope">
                {{scope.row.showPrice / 100}}
              </template>
            </el-table-column>
            <el-table-column prop="beginTime" label="购买/查看" align="center" header-align="center">
              <template slot-scope="scope">
                {{ `${scope.row.alreadyNum}/${scope.row.viewCount}` }}
              </template>
            </el-table-column>
            <el-table-column prop="showToC" label="状态" align="center" header-align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.approvalId">
                  <el-tag @click.stop="cancelCheckState(scope.$index, scope.row)">审批中</el-tag>
                  <!-- 如果是审批中，b端用户点击取消审批申请，a端管理员点击的话弹出通过审批和拒绝审批的操作 -->
                </div>
                <div v-else>
                  <el-tag v-if="scope.row.showToC" type="success" @click.stop="changeState(scope.$index, scope.row)">已上架</el-tag>
                  <el-tag v-else type="info" @click.stop="changeState(scope.$index, scope.row)">未上架</el-tag>
                </div>
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
                <el-button
                  size="mini"
                  type="text"
                  class="block block-center"
                  @click="getSign(scope.row)">获取授权码
                </el-button>
                <router-link v-if="isAuth('/enterName/listOrderData')" :to="'/enterNameOrderInfo/'+scope.row.activityId">
                  <el-button
                    size="mini"
                    type="text"
                    class="block block-center"
                  >查看订单</el-button>
                </router-link>
                <router-link v-if="isAuth('/zComment/findComment')" :to="`/zCommentList/${scope.row.activityId}/${101}`">
                  <el-button
                    size="mini"
                    type="text"
                    class="block block-center"
                  >查看评论</el-button>
                </router-link>
                <el-button
                  size="mini"
                  type="text"
                  class="block block-center"
                  @click="phoneDetail=true; chooseActivityId=scope.row.activityId">真机预览</el-button>
                <el-button
                  size="mini"
                  type="text"
                  class="block block-center"
                  v-if="isAuth('/enterName/mod') "
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/enterName/del')"
                  size="mini"
                  type="text"
                  class="block block-center danger"
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="true" width="850px">
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
      <active-template :activeType="101" v-if="addTypeChoose" @addModel="addModel" @getModuleData="getModuleData" @close="addTypeChoose = !addTypeChoose"/>
    </el-dialog>
    <!-- 整机预览 -->
    <el-dialog title="手机扫描二维码" :visible.sync="phoneDetail" :modal="true"  width="300px">
      <qr-code v-if="phoneDetail" :type="101" :chooseActivityId="chooseActivityId"/>
    </el-dialog>
  </div>
</template>
<script>
import QrCode from '../../utils/qrcode'
import EnterForm from './enterNameFrom.vue'
import EnterMess from './kv.vue'
import FullText from './fulltext.vue'
import ActiveTemplate from '../utils/template'
import RSA from '../../../utils/rsa.js'
import { Base64 } from 'js-base64'
import preview from '../../preview/index'
import WxCode from '../utils/wCode'
export default {
  data() {
    return {
      chooseActivityId: 0,
      phoneDetail: false,
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
  created() {
    this.getDataList()
  },
  components: {
    EnterForm,
    EnterMess,
    FullText,
    ActiveTemplate,
    preview,
    QrCode,
    WxCode
  },
  methods: {
    // 获得小程序分享链接后提交修改
    getminiAppUrl(data) {
      const url = this.apiList.shop.enterName.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: data.targetId, wxMiniUrlCode: data.code }, url, true)
      })
    },
    getWxAppEr(data) {
      const url = this.apiList.shop.enterName.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: data.targetId, wxMiniUrl: data.code }, url, true)
      })
    },
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.shop.enterName.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, this.apiList.shop.enterName.list, true)
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
          url: this.$http.adornUrl(this.apiList.shop.enterName.del),
          method: 'post',
          data: this.$http.adornData({ id: data.activityId }, this.apiList.shop.enterName.del, true)
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
    /**
     * 切换上架状态 （使用的接口和促销是同一个接口）
     * @param {num} index 序号
     * @param {obj} data 列表数据
     */
    changeState(index, data) {
      const state = !data.showToC
      const url = this.apiList.shop.enterName.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ showToC: state, id: data.activityId, activityType: 101 }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          // this.tableList[index].showToC = state
          this.getDataList()
        }
      })
    },
    /**
     * 取消审批并下架商品
     * @param {num} index 序号
     * @param {obj} data 列表数据
     */
    cancelCheck(index, data) {
      const url = this.apiList.shop.pmSale.cancel
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ approvalId: data.approvalId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.getDataList()
        }
      })
    },
    /**
     * 通过审批并上架商品
     * @param {num} index 序号
     * @param {obj} data 列表数据
     */
    check(index, data) {
      const url = this.apiList.showToCApproval.check
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ approvalId: data.approvalId,agree: true }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.getDataList()
        }
      })
    },
    // 点击审核中的操作
    cancelCheckState(index, data) {
      // 判断是b端原生商户账号还是切换身份的账号
      if(this.$cookie.get('moduleType') == this.$cookie.get('promoduleType')) {
        this.$confirm('此操作将撤回已提交的审批, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cancelCheck(index, data)
        }).catch(() => {
          console.log('已取消')
        })
      } else {
        this.$confirm('此操作将改变商户提交的审批状态', '提示', {
          confirmButtonText: '上架',
          cancelButtonText: '下架',
          type: 'info',
          center: true
        }).then(() => {
          this.check(index, data)
        }).catch(() => {
          this.cancelCheck(index, data)
        })
      }
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加活动报名'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.enterFrom.getGroup()
      })
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑活动报名'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.enterFrom.init({ data })
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
    // 生成授权码
    getSign(item) {
      this.$confirm('需要授权扫码时设置本值传输过程做了加密处理，请勿泄露多次设置以最后一次设置的值为准', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$prompt('请输入授权码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(?![^a-zA-Z]+$)(?!\D+$)[a-zA-Z0-9]{6,}$/,
          inputErrorMessage: '授权码最少六位且必须包含字母和数字'
        }).then(({ value }) => {
          this.$http({
            url: this.$http.adornUrl(this.apiList.login.getKey),
            method: 'post',
            data: this.$http.adornData( '', '', false)
          }).then(({ data }) => {
            if (!data.result) {
              this.$message('获取公钥失败')
              this.loading = false
              return
            }
            RSA.setMaxDigits(131)
            const key = new RSA.RSAKeyPair(data.data.exponent, '', data.data.modulus)
            const pass  = Base64.encode(RSA.encryptedString(key, value))
            console.log(this.apiList.shop.setAuthCode)
            this.$http({
              url: this.$http.adornUrl(this.apiList.shop.setAuthCode),
              method: 'post',
              data: this.$http.adornData({activityId: item.activityId, activityType: 101, authCode: pass }, this.apiList.shop.setAuthCode, true)
            }).then(({ data }) => {
              if (data.result) {
                this.$message({
                  message: '授权码设置成功',
                  type: 'success'
                })
              }
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })   
        })
      }).catch(() => {
        console.log('取消')
      })
    },
    // 提交模板数据
    getModuleData(data) {
      this.formType = 'add'
      this.dialogTitle = '添加报名活动'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.enterFrom.setData(data)
      })
    }
  }
}
</script>

