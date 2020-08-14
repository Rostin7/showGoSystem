<template>
  <div class="">
    <!-- <el-button @click.native = "addModel" v-if="isAuth('/enterNameKV/add')">
      <i class="el-icon-plus" />
    </el-button> -->
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formData.noteKey" placeholder="注意事项"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.noteValue" placeholder="详情"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.native="addModel">
          <i class="el-icon-plus" />
        </el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="dataList" style="width: 100%">
      <!-- <el-table-column label="注意事项" prop="noteKey" align="center" header-align="center"/> -->
      <el-table-column label="注意事项">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.noteKey" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.noteKey }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="详情" prop="noteValue" align="center" header-align="center"/> -->
      <el-table-column label="详情">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.noteValue" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.noteValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template slot-scope="scope">
          <!-- 删除 -->
          <el-button type="danger" size="mini" @click="submitDelete(scope.$index, scope.row)">
            <i class="el-icon-delete" />
          </el-button>
          <!-- 修改 -->
          <el-button
            v-if="scope.row.edit"
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)"
          >
            确认
          </el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="scope.row.edit = true"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { fetchList } from '@/api/article'
export default {
  props: {
    activityType: {},
    activityId: {}
  },
  data() {
    return {
      dataList: [],
      listLoading: true,
      formData: {
        noteKey: '',
        noteValue: ''
      }
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shop.activeattention.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ activityType: this.activityType, activityId: this.activityId }, url , true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = data.data.map(v => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            v.originalNoteValue = v.noteValue
            v.originalNoteKey = v.noteKey
            return v
          })
        }
        this.listLoading = false
      })
    },
    // 删除
    submitDelete(index, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        const url = this.apiList.shop.activeattention.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            this.dataList.splice(index, 1)
          } else {
            // this.$store.dispatch('LogOut')
          }
        })
      }).catch(() => {
      })
    },
    // 新增
    addModel() {
      if (this.formData.noteKey&& this.formData.noteValue) {
        const url = this.apiList.shop.activeattention.add
        const formData = this.formData
        formData.activityId = this.activityId
        formData.activityType = this.activityType
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData(formData, url , true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getDataList()
          }
        })
      } else {
        this.$message({
          message: '请检查输入内容',
          type: 'message'
        })
      }
    },
    // 修改
    confirmEdit(row) {
      const url = this.apiList.shop.activeattention.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: row.id, noteKey: row.noteKey, noteValue: row.noteValue }, url , true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          row.originalKey = row.keyName
        } else {
          row.noteValue = row.originalNoteValue
          row.noteKey = row.originalNoteKey
          // this.$message({
          //   message: data.msg,
          //   type: 'warning'
          // })
        }
        row.edit = false
      })
    },
  },
  mounted() {
    this.getDataList()
  }
}
</script>
<style scoped>
.edit-input {
  padding-right: 0px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>