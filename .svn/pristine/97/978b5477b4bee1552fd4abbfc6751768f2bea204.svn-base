<template>
  <div class="">
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline" style="margin-bottom: 15px;">
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
      <el-form-item v-show="dataList.length<length">
        <el-button @click.native="addModel">
          <i class="el-icon-plus" />
        </el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="dataList"  highlight-current-row style="width: 100%">
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
          <el-tag v-if="row.type === '501'">
            身份证
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
  props: {
    data: {},
    length: {
      default: 10
    }
  },
  data() {
    return {
      dataList: [],
      enterNameId: '',
      listLoading: false,
      dialogFormVisible: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      formData: {
        keyName: '',
        mustInput: false,
        type: ''
      },
      options: [
        {
          label: '任意类型',
          value: '101'
        },
        {
          label: '手机号',
          value: '201'
        },
        // {
        //   label: '时间',
        //   value: '301'
        // },
        {
          label: '数字',
          value: '401'
        },
        {
          label: '身份证',
          value: '501'
        }
      ]
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const arr = this.data ? JSON.parse(this.data) : []
      arr.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalKey = v.keyName
        return v
      })
      this.dataList = arr
      this.listLoading = false
    },
    handleModifyStatus(row, status) {
      row.mustInput = status
      this.$emit('changeData',  this.resetData())
    },
    cancelEdit(row) {
      row.keyName = row.originalKey
      row.edit = false
    },
    confirmEdit(row) {
      row.originalKey = row.keyName
      row.edit = false
      this.$emit('changeData', this.resetData())
    },
    // 删除
    submitDelete(index, data) {
      this.dataList.splice(index, 1)
      this.$emit('changeData',  this.resetData())
    },
    // 新增
    addModel() {
      if (this.formData.keyName&& this.formData.type) {
        const formData = JSON.parse(JSON.stringify(this.formData))
        formData.id = null
        formData.originalKey = formData.keyName
        formData.edit = false
        this.dataList.push(formData)
        this.$emit('changeData',  this.resetData())
      } else {
        this.$message({
          message: '请检查输入内容',
          type: 'message'
        })
      }
    },
    resetData() {
      const arr = []
      this.dataList.map( item => {
        arr.push({
          id: item.id,
          keyName: item.keyName,
          mustInput: item.mustInput,
          type: item.type
        })
      })
      return JSON.stringify(arr)
    }
  },
  watch:{
    data() {
      this.getDataList()
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
