<template>
  <div class="">
    <!-- <el-button @click.native = "addModel" v-if="isAuth('/enterNameKV/add')">
      <i class="el-icon-plus" />
    </el-button> -->
    <el-form  @submit.native.prevent :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formData.parameter" placeholder="商品参数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.specification" placeholder="详情"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.native="addModel">
          <i class="el-icon-plus" />
        </el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="dataList" style="margin-top: 30px; width: 100%;" :highlight-current-row="false" >
      <el-table-column label="商品参数">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.parameter" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.parameter }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="详情" prop="specification" align="center" header-align="center"/> -->
      <el-table-column label="详情">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.specification" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.specification }}</span>
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
        parameter: '',
        specification: ''
      }
    }
  },
  methods: {
    getDataList() {
      this.listLoading = true
      this.dataList = this.data ? JSON.parse(this.data) : []
      this.dataList = this.dataList.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalNoteValue = v.specification
        v.originalNoteKey = v.parameter
        return v
      })
      this.listLoading = false
    },
    // 删除
    submitDelete(index, data) {
      this.dataList.splice(index, 1)
      this.$emit('changeData', JSON.stringify(this.resetDataList()))
    },
    // 新增
    addModel() {
      if (this.formData.parameter&& this.formData.specification) {
        const formData = JSON.parse(JSON.stringify(this.formData))
        formData.originalNoteValue = formData.specification
        formData.originalNoteKey = formData.parameter
        formData.edit = false
        this.dataList.push(formData)
        this.$emit('changeData', JSON.stringify(this.resetDataList()))
      } else {
        this.$message({
          message: '请检查输入内容',
          type: 'message'
        })
      }
    },
    // 将提交的数据变成转换之前的数据
    resetDataList() {
      const arr = []
      this.dataList.forEach( item => {
        arr.push({
          parameter: item.parameter,
          specification: item.specification
        })
      })
      return arr
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
        parameter: data.parameter, specification: data.specification
      }
      this.$emit('changeData', JSON.stringify(this.resetDataList()))
      arr[index].edit = false
      this.dataList = arr
    }
  },
  mounted() {
    this.getDataList()
  },
  watch: {
    data() {
      this.getDataList()
    }
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