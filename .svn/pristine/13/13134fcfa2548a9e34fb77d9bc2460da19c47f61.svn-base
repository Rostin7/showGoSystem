<template>
  <div class="">
    <!-- <el-button @click.native = "addModel" v-if="isAuth('/enterNameKV/add')">
      <i class="el-icon-plus" />
    </el-button> -->
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button @click.native="addModel">
          <i class="el-icon-plus" />
        </el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="dataList" style="margin-top: 30px; width: 100%;" :highlight-current-row="false" >
      <el-table-column label="注意事项">
        <template slot-scope="scope">
          <span>{{ scope.row.noteKey }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template slot-scope="scope">
          <!-- 删除 -->
          <el-button type="danger" size="mini" @click="submitDelete(scope.$index, scope.row)">
            <i class="el-icon-delete" />
          </el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click.native.stop="subEdit(scope.$index, scope.row)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加修改的弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false" :modal="true"  width="500px">
      <add-form ref="kvForm" v-if="dialogFormVisible" :formType="formType" @success="success" @close="dialogFormVisible = !dialogFormVisible"></add-form>
    </el-dialog>
  </div>
</template>
<script>
import addForm from './kvMessageForm'
export default {
  props: {
    data: {}
  },
  data() {
    return {
      dialogTitle: '',
      dataList: [],
      chooseIndex: 0,
      listLoading: true,
      dialogFormVisible: false,
      formType: 'add',
      chooseIndex: 0
    }
  },
  components: {
    addForm
  },
  methods: {
    getDataList() {
      this.listLoading = true
      const arr = this.data ? JSON.parse(this.data) : []
      this.dataList = arr
      this.listLoading = false
    },
    success(data) {
      if(this.formType == 'add') {
        this.dataList.push(data)
      } else {
        this.dataList[this.chooseIndex] = data
      }
      this.$emit('changeData',  this.resetData())
      this.dialogFormVisible = false
    },
    // 删除
    submitDelete(index, data) {
      this.dataList.splice(index, 1)
      this.$emit('changeData',  this.resetData())
    },
    // 新增
    addModel() {
      this.dialogTitle = '添加注意事项'
      this.formType = 'add'
      this.dialogFormVisible = true
    },
    // 点击修改
    subEdit(index, data) {
      this.chooseIndex = index
      this.dialogTitle = '修改注意事项'
      this.formType = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.kvForm.form = {
          id: data.id,
          noteKey:data.noteKey,
          noteValue: data.noteValue,
        }
      })
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