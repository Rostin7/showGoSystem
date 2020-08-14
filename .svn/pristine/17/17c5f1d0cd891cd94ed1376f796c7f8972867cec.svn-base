<template>
  <div class="">
    <!-- <el-button @click.native = "addModel" v-if="isAuth('/enterNameKV/add')">
      <i class="el-icon-plus" />
    </el-button> -->
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline" v-if="isAuth('/enterNameKV/add')">
      <el-form-item v-if="dialogFormVisible">
        <el-input v-model="formData.keyName" placeholder="信息名称"></el-input>
      </el-form-item>
      <el-form-item v-if="dialogFormVisible">
        <el-select v-model="formData.type" placeholder="信息分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="dialogFormVisible">
        <el-checkbox v-model="formData.mustInput">必填</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button @click.native = "addModel">
          <i class="el-icon-plus" />
        </el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="dataList" border fit highlight-current-row style="width: 100%">
      <!-- <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="信息名称">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.keyName" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >
            </el-button>
          </template>
          <span v-else>{{ scope.row.keyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag v-if="row.type === '101'">
            任意类型
          </el-tag>
           <el-tag v-if="row.type === '201'">
            手机号
          </el-tag>
           <el-tag v-if="row.type === '301'">
            时间
          </el-tag>
          <el-tag v-if="row.type === '401'">
            数字
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="必填" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.mustInput ? 'success' : 'info' ">
            {{ row.mustInput ? '必填' : '选填'  }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button
            v-if="scope.row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)"
          >
            确认
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="scope.row.edit = true"
          >
          </el-button>
          <!-- 必填 -->
          <el-button v-if="!scope.row.mustInput" size="mini" type="success" @click="handleModifyStatus(scope.row, true)">
            必填
          </el-button>
          <el-button v-else size="mini" @click="handleModifyStatus(scope.row, false)">
            选填
          </el-button>
          <!-- 删除 -->
          <el-button type="danger" size="mini" @click="submitDelete(scope.$index, scope.row)">
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { fetchList } from '@/api/article'
export default {
  data() {
    return {
      dataList: [],
      enterNameId: '',
      listLoading: true,
      dialogFormVisible: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      formData: {
        keyName: '',
        mustInput: '',
        type: ''
      },
      options: [
        {
          label: '任意类型',
          value: '101'
        },
        // {
        //   label: '手机号',
        //   value: '201'
        // },
        {
          label: '时间',
          value: '301'
        },
        {
          label: '数字',
          value: '401'
        }
      ]
    }
  },
  methods: {
    init ({ data }) {
      this.enterNameId = data.activityId 
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shop.enterName.kv.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ enterNameId: this.enterNameId }, url , true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = data.data.map(v => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            v.originalKey = v.keyName
            return v
          })
        }
        this.listLoading = false
      })
    },
    handleModifyStatus(row, status) {
      const url = this.apiList.shop.enterName.kv.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: row.id, mustInput: status }, url , true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          row.mustInput = status
        } else {
          // this.$message({
          //   message: data.msg,
          //   type: 'warning'
          // })
        }
      })
    },
    cancelEdit(row) {
      row.keyName = row.originalKey
      row.edit = false
      // this.$message({
      //   message: '取消修改',
      //   type: 'warning'
      // })
    },
    confirmEdit(row) {
      const url = this.apiList.shop.enterName.kv.edit
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: row.id, keyName: row.keyName }, url , true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          row.originalKey = row.keyName
        } else {
          row.keyName = row.originalKey
          // this.$message({
          //   message: data.msg,
          //   type: 'warning'
          // })
        }
        row.edit = false
      })
    },
    // 删除
    submitDelete(index, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        console.log(data)
        this.$http({
          url: this.$http.adornUrl(this.apiList.shop.enterName.kv.del),
          method: 'post',
          data: this.$http.adornData({ id: data.id }, this.apiList.shop.enterName.kv.del, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '删除成功' })
            // 删除当前列表
            this.dataList.splice(index, 1)
          } else {
            // this.$message({ message: data.msg, type: 'warning' })
            // this.$store.dispatch('LogOut')
          }
        })
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    },
    // 新增
    addModel() {
      const url = this.apiList.shop.enterName.kv.add
      const formData = JSON.parse(JSON.stringify(this.formData))
      formData.enterNameId = this.enterNameId
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
        } else {
          // this.$message({
          //   message: data.msg,
          //   type: 'warning'
          // })
        }
      })
    }
  }
}
</script>
<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
