<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form @submit.native.prevent :inline="true">
        <el-form-item>
          <el-input placeholder="接口url或者接口名称" v-model="searchName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="search"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSearch"><i class="el-icon-refresh"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="tableList" ref="apiTable" v-loading="listLoading" element-loading-text="拼命加载中">
      <el-table-column prop="id" label="#id" width="65" >
      </el-table-column>
      <el-table-column prop="url" label="url" width="150">
      </el-table-column>
      <el-table-column prop="type" label="终端" width="150" 
      :filters="[{ id:0, text: 'A端开发者接口', value: 0 }, { id:1, text: 'A端管理员接口', value: 1 }, { id:2, text: '无权限控制接口', value: 2 }, {text: 'C端接口', value: 3 }]"
      :filter-method="filterType">
        <template slot-scope="scope">
          <li v-if="scope.row.type === 0">
            A端开发者接口
          </li>
          <li v-if="scope.row.type === 1">
            A端管理员接口
          </li>
          <li v-if="scope.row.type === 2">
            无权限控制接口
          </li>
          <li v-if="scope.row.type === 3">
            C端接口
          </li>
        </template>
      </el-table-column>
      <el-table-column prop="apiDesc" label="描述" width="150">
      </el-table-column>
      <el-table-column prop="apiParam" label="参数">
        <template slot-scope="scope">
          <li v-for="(item, index) in JSON.parse(scope.row.apiParam)" :key="index">参数:&nbsp;&nbsp;{{item.paramName}}&nbsp;&nbsp;&nbsp;详情:&nbsp;&nbsp;{{item.paramDesc}}</li>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="apiOut" label="返回值"> -->
      <!-- </el-table-column> -->
      <el-table-column prop="groupName" label="分组" width="150" 
        :filters="filterTableGroup"
        :filter-method="filterGroupName">
      </el-table-column>
       <el-table-column prop="name" label="名称" width="150">
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="150" sortable>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination layout="total, prev, pager, next"
        background
        :page-size="10"
        :total="total"
        style="text-align:center;">
    </el-pagination>

    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteVisible"
      width="30%">
      <span>确认删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { timeChange } from '../../../utils/timeChange.js'
export default {
  data() {
    return {
      isSearch: false,
      tableList: [],
      proTableList: [],
      searchName: '',
      maxHeight: '550px',
      listLoading: true,
      isShowEditVisible: false,
      deleteVisible: false,
      total: 0,
      page: 1,
      pageSize: 10,
      value: '',
      filterTableGroupName: [],
      filterTableGroup: []
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    // 点击搜索
    search() {
      this.isSearch = true
      this.tableList = this.proTableList.filter(item => item.url.indexOf(this.searchName) !== -1 || item.name.indexOf(this.searchName) !== -1 )
    },
    fetchData() {
      this.listLoading = true
      // 发送请求获得数据
      this.$http({
        url: this.$http.adornUrl(this.apiList.config.api),
        method: 'post',
        data: this.$http.adornData('', this.apiList.config.api, true)
      }).then(({ data }) => {
        if (data.result) {
          // 数据获取成功
          this.total = data.data.length
          this.tableList = data.data
          this.listLoading = false
          const arrData = { id: 0, text: '', value: '', type: '' }
          this.tableList.forEach((v) => {
            const _index = this.filterTableGroupName.length > 0 ? this.filterTableGroupName.findIndex(item => item.text === v.groupName) : -1
            if (_index === -1) {
              arrData.id = v.id
              arrData.text = v.groupName
              arrData.value = v.groupName
              arrData.type = v.type
              this.filterTableGroupName.push(JSON.parse(JSON.stringify(arrData)))
            }
          })
          Object.assign(this.filterTableGroup, this.filterTableGroupName)
          this.proTableList = this.tableList
        }
      })
    },
    submitDelete() {
      console.log('确认删除')
    },
    filterType(val, row) {
      if (val) {
        this.filterTableGroup = this.filterTableGroupName.filter(v => v.type === val)
      } else {
        this.filterTableGroup = this.filterTableGroupName
      }
      return row.type === val
    },
    filterGroupName(val, row) {
      return row.groupName === val
    },
    resetSearch() {
      this.$refs.apiTable.clearFilter()
      if (this.isSearch) {
        this.tableList = this.proTableList
      }
    }
  },
  created() {
    this.fetchData()
    const datatime = Date.parse(new Date())
    console.log(datatime)
    console.log(timeChange('Y-m-d H:i:s', datatime))
  }
}
</script>
<style>

</style>