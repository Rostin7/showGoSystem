<template>
  <div class="enterName">
    <el-form @submit.native.prevent :inline="true" style="margin-bottom: 15px;">
      <el-form-item>
        <el-button @click.native="addModel" v-if="isAuth('/enterNameItem/add')" ><i class="el-icon-plus" /></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
      <el-table-column prop="name" label="名称"  align="center" header-align="center" />
      <el-table-column prop="totalNum" label="总数"  align="center" header-align="center" />
      <el-table-column prop="price" label="价格"  align="center" header-align="center" > 
        <template slot-scope="scope">
          {{scope.row.price / 100}}
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" label="开始时间"  align="center" header-align="center" >
        <template slot-scope="scope">
          {{timeChange('Y-m-d', scope.row.beginTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间"  align="center" header-align="center" >
        <template slot-scope="scope">
          {{timeChange('Y-m-d', scope.row.endTime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="submitEdit(scope.$index, scope.row)">
            修改
          </el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true" :append-to-body="true"  width="600px">
      <item-form
        v-if="dialogFormVisible"
        ref="itemForm"
        :form_type="formType"
        @success="success"
        @close="dialogFormVisible = !dialogFormVisible"
      />
    </el-dialog>
  </div>
</template>
<script>
import ItemForm from './itemForm.vue'
export default {
  props: {
    data: {}
  },
  data() {
    return {
      enterNameId: '',
      listLoading: false,
      formType: 'add',
      dialogTitle: '新增分组',
      dialogFormVisible: false,
      tableList: []
    }
  },
  components: {
    ItemForm
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    getDataList() {
      this.listLoading = true
      const arr = this.data ? JSON.parse(this.data) : []
      this.tableList = arr
      this.listLoading = false
    },
    // 点击添加
    addModel(index, data) {
      this.formType = 'add'
      this.dialogTitle = '添加活动分组'
      this.dialogFormVisible = true
    },
    // 点击修改
    submitEdit(index, data) {
      this.formType = 'edit'
      this.dialogTitle = '编辑活动分组'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.itemForm.init({ data })
        this.$refs.itemForm.index = index
      })
    },
    // 点击删除
    submitDelete(index, data) {
      this.tableList.splice(index, 1)
      this.$emit('changeData', JSON.stringify(this.tableList))
    },
    success(data) {
      if (data.type === 'edit') {
        const _idx = data.index
        if (_idx !== -1) {
          this.tableList[_idx] = data.data
        } else {
          this.$message('修改失败')
        }
      } else {
        this.tableList.push(data.data)
      }
      this.$emit('changeData', JSON.stringify(this.tableList))
      this.dialogFormVisible = false
    }
  },
  watch:{
    data() {
      this.getDataList()
    }
  }
}
</script>
<style lang="scss">
  
</style>