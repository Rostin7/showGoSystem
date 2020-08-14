<template>
  <div class="mallNews">
    <el-card shadow="never">
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item style="margin-bottom: 0"><p class="main_header">商场新闻</p></el-form-item>
        <el-form-item>
          <el-button @click.native="addModel" v-if="isAuth('/mallNews/add')"><i class="el-icon-plus"></i></el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column prop="id" width="80" label="#ID"/>
        <el-table-column align="center" header-align="center"  prop="title" label="标题"></el-table-column>
        <el-table-column prop="imgUrl" label="主图" align="center" header-align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <img :src="scope.row.imgUrl" alt="" style="max-width: 400px;">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ '查看详情' }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" width="260" prop="createdAt" label="发布时间"></el-table-column>
        <el-table-column align="center" header-align="center" label="新闻来源" prop="newsFrom" />
        <el-table-column align="center" header-align="center" label="热门新闻">
          <template slot-scope="scope">
            {{ scope.row.newsHot ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" header-align="center" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="preview(scope.$index, scope.row)">
              查看
            </el-button>
            <el-button
              v-if="isAuth('/mallNews/mod')"
              size="mini"
              type="text"
              @click="submitEdit(scope.$index, scope.row)">
              修改
            </el-button>
            <el-button
              v-if="isAuth('/mallNews/del')"
              size="mini"
              type="text"
              @click="submitDelete(scope.$index, scope.row)">
              删除
            </el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, prev, pager, next"
        background
        :page-size="pageSize"
        :total="total"
        style="text-align:center;"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
    </el-card>
    <!-- 修改弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogDetailVisible"  width="65%">
      <news-form v-if="dialogDetailVisible" :formType="formType" ref="newsForm" @success="success" @close="dialogDetailVisible = !dialogDetailVisible"/>
    </el-dialog>
    <el-dialog :title="'新闻预览'" :visible.sync="dialogPrevVisible">
      <div class="prev" v-html="desc"></div>
    </el-dialog>
  </div>
</template>
<script>
import { Base64 } from 'js-base64'
import NewsForm from './newsForm.vue'
export default {
  data() {
    return{
      tableList:[],
      listLoading: false,
      dialogTitle: '添加新闻',
      dialogDetailVisible: false,
      dialogPrevVisible: false,
      formType: 'add',
      total: 0,
      page: 1,
      pageSize: 10,
      desc: ''
    }
  },
  components: {
    NewsForm
  },
  methods: {
    preview(index, data) {
      this.desc = Base64.decode(data.fullText)
      this.dialogPrevVisible = true
    },
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.module.moduleMall.news.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, url, true)
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
     // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加'
      this.dialogDetailVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '修改'
      this.dialogDetailVisible = true
      this.$nextTick(() => {
        this.$refs.newsForm.init({ data })
      })
    },
    submitDelete(index, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.module.moduleMall.news.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, url, true)
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
    success() {
      this.dialogDetailVisible = false
      this.getDataList()
    }
  },
  mounted() {
    this.getDataList()
  }
}
</script>
<style lang="scss">
.mallNews{
  
}
</style>