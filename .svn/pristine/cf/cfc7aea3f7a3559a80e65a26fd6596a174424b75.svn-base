<template>
  <div class="hotActivity">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true">
        <!-- <el-form-item  label="分组" v-show="false">
          <el-select v-model="chooseGroup" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- 搜索 -->
        <el-form-item style="float: right">
          <el-button type="text" @click="search"><svg-icon icon-class="search"/></el-button>
        </el-form-item>
        <el-form-item style="float: right" label="请输入活动名">
          <el-input
            placeholder="请输入活活动名"
            v-model="searchName"
            @keydown.enter.prevent.native="getDataList"
            @clear="getDataList"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" v-loading="listLoading" element-loading-text="拼命加载中" >
        <el-table-column prop="activityId" label="#id" width="85" align="center" header-align="center">
          <template slot-scope="scope">
            {{scope.row.activityId}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" align="center" header-align="center">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column prop="hotGroupIds" label="推荐状态" align="center" header-align="center">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.hotGroupIds_" :key="item.id">{{item.label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalNum" label="最大数量" align="center" header-align="center">
          <template slot-scope="scope">
            {{scope.row.totalNum}}
          </template>
        </el-table-column>
        <el-table-column prop="mainImgUrl" label="主图" align="center" header-align="center">
          <template slot-scope="scope">
            <span @click="imageDetail(scope.row.imgUrl)" style="cursor: pointer">点击查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="活动开始时间" align="center" header-align="center">
          <template slot-scope="scope">
            {{timeChange('Y-m-d', scope.row.beginTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="活动结束时间" align="center" header-align="center">
          <template slot-scope="scope">
            {{timeChange('Y-m-d', scope.row.endTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button
            v-if="isAuth('/hotActivity/add')"
            size="mini"
            type=""
            @click="submitEdit(scope.$index, scope.row)">推荐管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, prev, pager, next" background :page-size="pageSize" :total="total" style="text-align:center;" @current-change="handleCurrentChange" />
      <el-dialog :visible.sync="DialogImgVisible">
        <img width="100%" :src="imgUrl" alt="">
      </el-dialog>
      <el-dialog v-loading="dialogLoading" title="推荐分类" :visible.sync="dialogCheckListVisible" element-loading-text="拼命加载中">
        <el-form v-if="dialogCheckListVisible">
          <el-form-item label="活动分组">
            <el-checkbox v-for="(item, idx) in checkList" :key="item.id" border :checked="item.checked" @change="handleCheckedType(item.checked, item.id, idx)">{{ item.label }}</el-checkbox>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// import CityList from '../cityList.vue'
import { eventBus } from '@/eventBus'
import moduleList from '../../../utils/module.js'
export default {
  data() {
    return {
      searchName: '',
      pageSize: 10,
      total: 0,
      page: 1, 
      dataList: [],
      listLoading: false,
      checkedType: '',
      cityId: null,
      chooseGroup: null,
      imgUrl: '',
      DialogImgVisible: false,
      dialogCheckListVisible: false,
      dialogLoading: false,
      checkList: [],
      options: moduleList.data,
      chooseId: 0, // 当前被选中的活动ID
      chooseType: 0, // 当前被选中的活动type
      reloadActivityList: false // 重载列表
    }
  },
  created() {
    const vm = this
    eventBus.$on('chooseCity', (val) => {
      vm.changeData(val)
    })
    this.getDataList()
  },
  methods: {
    search() {
      this.page = 1
      this.getDataList()
    },
    getDataList() {
      const url = this.apiList.module.city.hotActivity.getSelect
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.cityId, page: this.page, size: this.pageSize, searchKey: this.searchName }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataRender(data.data.records)
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
    dataRender(data) {
      const arr = data
      arr.map((v) => {
        v.hotGroupIds_ = []
        const hotGroupIds_ = v.hotGroupIds ? v.hotGroupIds.split(',').filter(v => v !== '') : []
        for (var i = 0; i < hotGroupIds_.length; i++) {
          var value = hotGroupIds_[i]
          let label = ''
          if (value === '0') {
            label = '首页'
          } else {
            var _index = moduleList.data.findIndex(item => item.id === Number(value))
            label = moduleList.data[_index].label
          }
          hotGroupIds_[i] = {
            id: value,
            label: label
          }
        }
        v.hotGroupIds_ = hotGroupIds_
      })
      this.dataList = arr
    },
    changeData(cityId) {
      this.cityId = cityId[cityId.length - 1]
      this.getDataList()
    },
    // 获取并初始化推荐分类选择
    getCheckData(str, checked) {
      // const groupIds = str.split(',').filter(v => v !== '')
      // const arr = moduleList.data.filter(item => groupIds.indexOf(String(item.id)) !== -1)
      const arr = moduleList.data
      if (arr.findIndex( item => item.id == '0' ) === -1 ) {
        arr.unshift({ id: '0', label: '首页' })
      }
      this.checkList = arr
      this.checkList.map((v) => {
        v.checked = false
      })
      // 初始化选择状态
      if (checked) {
        const checkedList = checked.split(',').filter(v => v !== '')
        this.checkList.map((v) => {
          checkedList.indexOf(String(v.id)) !== -1 ? v.checked = true : v.checked = false
        })
      }
    },
    changeType(val) {
      console.log(val)
    },
    // 切换页码
    handleCurrentChange(val) {
      this.page = val
      this.getDataList()
    },
    // 点击推荐
    submitEdit(index, data) {
      this.getCheckData(data.groupIds, data.hotGroupIds)
      this.dialogCheckListVisible = true
      this.chooseId = data.activityId
      this.chooseType = data.type
    },
    // 查看大图
    imageDetail(imgUrl) {
      this.imgUrl = imgUrl
      this.DialogImgVisible = true
    },
    handleCheckedType(checked, id, idx) {
      this.checkList[idx].checked = !checked
      let url = ''
      this.dialogLoading = true
      !checked ? url = this.apiList.module.city.hotActivity.add : url = this.apiList.module.city.hotActivity.del
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: this.chooseId, moduleId: this.cityId, groupId: id, activityId: this.chooseId, activityType: this.chooseType }, url, true)
      }).then(({ data }) => {
        this.dialogLoading = false
        if (!data.result) {
          // this.$message(data.msg)
          this.checkList[idx].checked = !checked
        } else {
          const index = this.dataList.findIndex(v => v.activityId === this.chooseId)
          const arr = this.checkList.filter(v => v.checked)
          arr.map((v, i, a) => {
            a[i] = v.id
          })
          this.dataList[index].hotGroupIds = arr.join(',')
          this.dataRender(this.dataList)
        }
      })
    }
  }
}
</script>
