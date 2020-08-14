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
    <el-table v-loading="listLoading" :data="dataList" style="margin-top: 30px; width: 100%;" :highlight-current-row="false" >
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
            @click.native.stop="confirmEdit(scope.$index, scope.row)"
          >
            确认
          </el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click.native.stop="subEdit(scope.$index, scope.row)"
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
    data: {}
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
      const arr = this.data ? JSON.parse(this.data) : []
      arr.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalNoteValue = v.noteValue
        v.originalNoteKey = v.noteKey
        return v
      })
      this.dataList = arr
      this.listLoading = false
    },
    // 删除
    submitDelete(index, data) {
      this.dataList.splice(index, 1)
      this.$emit('changeData',  this.resetData())
    },
    // 新增
    addModel() {
      if (this.formData.noteKey&& this.formData.noteValue) {
        const formData = JSON.parse(JSON.stringify(this.formData))
        formData.id = null
        formData.originalNoteValue = formData.noteValue
        formData.originalNoteKey = formData.noteKey
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
    // 点击修改
    subEdit(index, data) {
      this.dataList[index].edit = true
    },
    // 确认修改
    confirmEdit(index, data) {
      const arr = [...this.dataList]
      arr[index].originalKey = arr[index].keyName
      arr[index] = {
        noteKey: data.noteKey, noteValue: data.noteValue
      }
      this.$emit('changeData', this.resetData())
      arr[index].edit = false
      this.dataList = arr
    },
    // 将对应的数据转换成提交形式
    resetData() {
      const arr = []
      this.dataList.map( item => {
        arr.push({
          id: item.id,
          noteKey: item.noteKey,
          noteValue: item.noteValue
        })
      })
      return JSON.stringify(arr)
    }
  },
  watch:{
    data() {
      this.getDataList()
    }
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