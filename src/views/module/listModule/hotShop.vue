<template>
  <div class="hotShop">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true">
        <el-form-item style="float: right">
          <el-button type="text" @click="search"><svg-icon icon-class="search"/></el-button>
        </el-form-item>
        <el-form-item style="float: right" label="请输入店铺名称">
          <el-input
            placeholder="请输入店铺名称"
            v-model="searchName"
            @keydown.enter.prevent.native="getDataList"
            @clear="getDataList"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="dataList" element-loading-text="拼命加载中">
        <el-table-column prop="id" label="#id" width="60">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="店铺名称" />
        <el-table-column prop="shopPhoneNum" label="商家电话" />
        <el-table-column prop="logoImgUrl" label="logo">
          <template slot-scope="scope">
            <img :src="scope.row.logoImgUrl ? scope.row.logoImgUrl : defaultImg" style="cursor: pointer;max-height: 60px" @click="imageDetail(scope.row.logoImgUrl)" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="商家地址" />
        <el-table-column prop="hotGroupIds" label="推荐状态">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.hotGroupIds_" :key="item.id">{{ item.label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="isAuth('/hotActivity/add')"
              size="mini"
              type=""
              @click="submitEdit(scope.$index, scope.row)"
            >
              商户推荐
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, prev, pager, next" background :page-size="pageSize" :total="total" style="text-align:center;" @current-change="handleCurrentChange" />
      <el-dialog :visible.sync="DialogImgVisible">
        <img width="100%" :src="imgUrl" alt="">
      </el-dialog>
      <el-dialog v-loading="dialogLoading" title="推荐分类" :visible.sync="dialogCheckListVisible" element-loading-text="拼命加载中">
        <el-form v-if="dialogCheckListVisible">
          <el-form-item label="推荐分组">
            <el-checkbox v-for="(item, idx) in checkList" :key="item.id" style="margin-bottom: 15px;" border :checked="item.checked" @change="handleCheckedType(item.checked, item.id, idx)">{{ item.label }}</el-checkbox>
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
      defaultImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559642438899&di=58a3bd432d00cf75b5e8db0143fe03ed&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
      pageSize: 10,
      total: 0,
      page: 1,
      searchName: '',
      dataList: [],
      listLoading: false,
      checkData: [],
      checkedType: '',
      cityId: null,
      chooseGroup: [],
      imgUrl: '',
      DialogImgVisible: false,
      dialogCheckListVisible: false,
      dialogLoading: false,
      checkList: [],
      options: moduleList.data,
      chooseId: 0, // 当前被选中的活动ID
      reloadActivityList: false // 重载列表
    }
  },
  created() {
    const vm = this
    this.getDataList()
    eventBus.$on('chooseCity', (val) => {
      vm.changeData(val)
    })
  },
  methods: {
    search() {
      this.page = 1
      this.getDataList()
    },
    getDataList() {
      const url = this.apiList.module.city.hotShop.getSelect
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.cityId, page: this.page, size: this.pageSize, searchKey: this.searchName }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataRender(data.data.records)
          this.total = data.data.total
        } else {
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    dataRender(data) {
      // 初始化数据选择
      const arr = data
      arr.map((v) => {
        v.hotGroupIds_ = []
        const hotGroupIds_ = v.hotCityGroupIds ? v.hotCityGroupIds.split(',').filter(v => v !== '') : []
        for (var i = 0; i < hotGroupIds_.length; i++) {
          if (Number(hotGroupIds_[i]) === 0) {
            hotGroupIds_[i] = {
              id: 0,
              label: '店铺首页'
            }
          } else {
            var value = hotGroupIds_[i]
            let label = ''
            var _index = this.chooseGroup.findIndex(item => item.id === Number(value))
            // 属于三级分组
            if (_index !== -1) {
              hotGroupIds_[i] = {
                id: this.chooseGroup[_index].value,
                label: this.chooseGroup[_index].label
              }
            } else {
              // 属于二级分组
              const index = moduleList.data.findIndex(item => item.id === Number(value))
              if (index !== -1) {
                hotGroupIds_[i] = {
                  id: moduleList.data[index].value,
                  label: moduleList.data[index].label
                }
              }
            }
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
      const groupIds = str.split(',').filter(v => v !== '')
      const arr = this.checkData.filter(item => groupIds.indexOf(item.id.toString()) !== -1)
      this.checkList = arr
      // console.log(this.checkList)
      this.checkList.unshift({
        id: 0,
        label: "店铺首页",
      })
      this.checkList.map((v) => {
        v.checked = false
      })
      // 初始化选择状态
      if (checked) {
        const checkedList = checked.split(',').filter(v => v !== '')
         // 判断如果有展示原来的分组的推荐的时候先下架原有分组
        // checkedList.forEach(element => {
        //   if(groupIds.indexOf(element) == -1) {
        //     const _idx = this.checkData.findIndex( item => item.id == element )
        //     const obj = this.checkData[_idx]
        //     this.checkList.push(obj)
        //   }
        // })
        this.checkList.map((v) => {
          checkedList.indexOf(String(v.id)) !== -1 ? v.checked = true : v.checked = false
        })
      }
    },
    // 切换页码
    handleCurrentChange(val) {
      this.page = val
      this.getDataList()
    },
    // 点击推荐
    submitEdit(index, data) {
      this.getCheckData(data.groupIds, data.hotCityGroupIds)
      this.dialogCheckListVisible = true
      this.chooseId = data.moduleId
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
      !checked ? url = this.apiList.module.city.hotShop.add : url = this.apiList.module.city.hotShop.del
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.cityId, groupId: id, shopId: this.chooseId }, url, true)
      }).then(({ data }) => {
        this.dialogLoading = false
        if (!data.result) {
          this.$message(data.msg)
          this.checkList[idx].checked = !checked
        } else {
          const index = this.dataList.findIndex(v => v.moduleId === this.chooseId)
          const arr = this.checkList.filter(v => v.checked)
          arr.map((v, i, a) => {
            a[i] = v.id
          })
          this.dataList[index].hotCityGroupIds = arr.join(',')
          this.dataRender(this.dataList)
        }
      })
    }
  },
  mounted() {
    moduleList.data.forEach(item => {
      if (item.children) {
        this.chooseGroup = this.chooseGroup.concat(item.children)
      }
    })
    this.chooseGroup.push({
      id: 0,
      label: "店铺首页",
    })
    this.checkData = this.chooseGroup
    // this.checkList =  this.chooseGroup
  }
}
</script>
<style lang="scss">
.hotShop{
  .el-form-item__content {
    box-sizing: border-box;
    // padding-left: 10px;
    .el-checkbox is-bordered{
      margin-bottom: 15px;
    }
  }
}
</style>
