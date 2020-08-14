<template>
  <div class="comment">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">帖子管理</p></el-form-item>
            <el-form-item>
              <el-button @click.native="addModel" v-if="isAuth('/comment/addComment')"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
            <!-- <active-list :moduleId="cityId" :activeId="targetId.activeId"  @chooseActive="chooseActive" @chooseActiveType="chooseActiveType" v-if="type === 301"></active-list> -->
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column prop="title" label="帖子名" align="center" header-align="center"/>
            <el-table-column prop="content" label="详情" align="center" header-align="center"/>
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <router-link v-if="isAuth('/comment/getById')" :to="'/commentDetail/'+scope.row.id">
                  <el-button
                    size="mini"
                    type="text"
                  >
                    查看详情
                  </el-button>
                </router-link>
                <el-button
                  v-if="isAuth('/comment/delComment')"
                  size="mini"
                  type="text"
                  class="danger"
                  @click="submitDelete(scope.$index, scope.row)">
                  删除
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
    <!-- 选择添加方式 -->
    <el-dialog title="添加帖子" :visible.sync="formVisit" :close-on-click-modal="false" :modal="true"  width="600px">
      <comment-form v-if="formVisit" @success="success" @close="formVisit = !formVisit"/>
    </el-dialog>
  </div>
</template>
<script>
import CommentForm from './commentForm.vue'
// 活动筛选列表 
// import ActiveList from '../module/ActiveList.vue'
import { eventBus } from '@/eventBus'
export default {
  data() {
    return {
      pass: '',
      chooseActivityId: 0,
      tableList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      imgUrl: '',
      dialogTitle: '添加帖子',
      formType: 'add',
      formVisit: false
    }
  },
  components: {
    CommentForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      this.$http({
        url: this.$http.adornUrl(this.apiList.comment.list),
        method: 'post',
        data: this.$http.adornData({ page: this.page, size: this.pageSize }, this.apiList.comment.list, true)
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
          url: this.$http.adornUrl(this.apiList.comment.del),
          method: 'post',
          data: this.$http.adornData({ commentId: data.id }, this.apiList.comment.del, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({ type: 'success', message: '删除成功' })
            this.tableList.splice(index, 1)
            this.total --
          }
        })
      })
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加帖子'
      this.formVisit = true
    },
    success() {
      this.formVisit = false
      this.getDataList()
    },
    // 分页组件切换
    handleCurrentChange(value) {
      this.page = value
      this.getDataList()
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
<style lang="scss">
.comment{
  .el-dialog__body{
    padding-top: 15px;
  }
}
</style>
