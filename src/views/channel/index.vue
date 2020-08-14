<template>
  <div class="channelList">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">渠道管理</p></el-form-item>
            <el-form-item>
              <!-- v-if="isAuth('/pmSale/add')" -->
              <el-button @click.native="addModel" ><i class="el-icon-plus"></i></el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="text" @click="search"><svg-icon icon-class="search"/></el-button>
            </el-form-item>
            <el-form-item style="float: right" label="请输入渠道名称">
              <el-input
                placeholder="请输入渠道名称"
                v-model="searchName"
                @keydown.enter.prevent.native="search"
                @clear="search"
                clearable>
              </el-input>
            </el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="name" label="渠道名"  align="center" header-align="center" />
            <el-table-column prop="moduleName" label="店铺"  align="center" header-align="center" />
            <!-- <el-table-column prop="channelType" label="推广类型" align="center" header-align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.channelType === 101" type="success" >活动</el-tag>
                <el-tag v-else  type="success">店铺</el-tag>
              </template>
            </el-table-column> -->
            <el-table-column prop="channelType" label="推广方式" align="center" header-align="center">
              <template slot-scope="scope">
                <span style="color: #1890ff; cursor:pointer;" @click="getImgUrl(scope.row)">小程序码</span>
              </template>
            </el-table-column>
            <el-table-column prop="showToC" label="PV/UV" align="center" header-align="center">
              <template slot-scope="scope">
                 
                  {{ `${scope.row.pv ? scope.row.pv : 0}/${scope.row.uv ? scope.row.uv : 0}` }}
                  <!-- 0/0 -->
              </template>
            </el-table-column>
            <el-table-column prop="showToC" label="直接购买" align="center" header-align="center">
              <template slot-scope="scope">
                 <router-link v-if="isAuth('/saleChannel/channelOrder')" :to="'/channel/channelOrder/'+scope.row.id">
                  <span style="color: #1890ff; cursor:pointer;">{{ `${scope.row.userNum == null ? 0 : scope.row.userNum}人成交${scope.row.orderNum == null ? 0 :scope.row.orderNum}单` }}</span>
                  <p class="no-margin">(浏览转化率{{ scope.row.pv ? Math.round(scope.row.uv/scope.row.pv * 100 *100) / 100 : 0}}%)</p>
                  <p class="no-margin">(用户转化率{{ scope.row.pv ? Math.round(scope.row.userNum/scope.row.pv * 100 * 100) / 100 : 0 }}%)</p>
                  <!-- 0/0 -->
                </router-link>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="id" label="直接购买" align="center" header-align="center" /> -->
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  class="danger"
                  @click="submitDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
    <!-- 添加弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="true"  width="600px">
      <add-form v-if="dialogFormVisible" @close="dialogFormVisible=false" @success="success"/>
    </el-dialog>
    <!-- 点击查看下载小程序码 -->
    <el-dialog title="查看详情" :visible.sync="dialogDetailVisible" :modal="true" width="400px">
      <img :src="imgUrl" alt="" style="margin: auto;display:block;">
      <p class="img_size_text" style="word-break: break-all;">小程序码地址：{{ imgUrl }} <copy :copyValue="imgUrl"/></p>
      <!-- <a :href="imgUrl" download="test.png">点击下载</a> -->
    </el-dialog>
    
  </div>
</template>
<script>
import addForm from './addForm'
import copy from '../utils/copy'
export default {
  data() {
    return {
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      dialogTitle: '添加促销活动',
      dialogFormVisible: false,
      dialogDetailVisible: false,
      formType: 'add',
      imgUrl: '',
      searchName: ''
    }
  },
  components: {
    addForm,
    copy
  },
  methods: {
    // 获得小程序生成 的参数
    getFullData(data) {
      return new Promise((resolve, reject) =>{
        const url = this.apiList.wxTool.sendShagreData
        const formData = {
          // 自定义参数 targetType 101为店铺 201为广场 3011为促销 3012为报名 3013为拼团 3014抢券
          id: data.id,
          type: 'channelData',
          targetType:  101,
          targetModuleId: data.targetModuleId,
          activityId: data.activityId ? data.activityId : ''
        }
        if(data.channelType == 0) {
          formData.targetType = 0 // 进入首页
        }
        if(data.channelType == 101) {
          switch (data.activityType) {
            case 301:
              formData.targetType = 3011
              break
            case 101:
              formData.targetType = 3012
              break
            case 201:
              formData.targetType = 3013
              break
            case 501:
              formData.targetType = 3015
              break
            case 601:
              formData.targetType = 3016
              break
            case 701:
              formData.targetType = 3017
              break
          }
        }
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData( {sValue: JSON.stringify(formData)}, url , true)
        }).then(({ data }) => {
          if (data.result) {
            resolve(data.data)
          } else {
            reject(data.msg)
          }
        })
      })
    },
    // 获得小程序码
    getWxAppEr(getFullData) {
      return new Promise((resolve, reject) =>{
        const url = this.apiList.wxTool.getImgUrl
        this.$http({
          url: this.$http.adornUrl(url),
          method: "post",
          data: this.$http.adornData({
            page: 'pages/index/index',
            scene: getFullData,
            hyaline: false
          }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.imgUrl = data.data
            resolve(data.data)
          }
        })
      })
    },
    // 初始化图片地址
    getImgUrl(data) {
      this.getFullData(data).then((_data) => {
        this.getWxAppEr(_data).then(() => {
          this.dialogDetailVisible = true
        })
      })
    },
    // 获得数据列表
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.saleChannel.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, this.apiList.saleChannel.list, true)
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
    // 点击删除
    submitDelete(index, data) {
      // 点击确认删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.saleChannel.del),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, this.apiList.saleChannel.del, true)
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
      this.dialogTitle = '添加渠道'
      this.dialogFormVisible = true
    },
    success() {
      this.dialogFormVisible = false
      this.page = 1
      this.getDataList()
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    // 点击搜索
    search() {
      this.page = 1
      this.getDataList()
    }
  },
  created() {
    console.log(localStorage)
    this.getDataList()
  }
}
</script>