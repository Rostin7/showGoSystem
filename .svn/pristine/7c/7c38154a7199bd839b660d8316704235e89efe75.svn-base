<template>
  <div class="hotShop">
    <el-card shadow="hover">
      <el-form @submit.native.prevent :inline="true" :model="marketChoose" class="demo-form-inline" v-if="isAuth('/moduleMall/list')">
        <el-form-item label="商场" v-if="isAuth('/moduleMall/list')">
          <market-list :moduleId="marketChoose.cityId" :marketId="marketChoose.marketId" @chooseMall="chooseMall" v-if="!reloadMaketList"></market-list>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" v-loading="listLoading" element-loading-text="拼命加载中" >
        <el-table-column prop="id" label="#id" width="60">
          <template slot-scope="scope">
            {{scope.row.id}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="店铺名称">
        </el-table-column>
        <el-table-column prop="shopPhoneNum" label="商家电话">
        </el-table-column>
        <el-table-column prop="logoImgUrl" label="logo">
          <template slot-scope="scope">
            <img :src="scope.row.logoImgUrl" @click="imageDetail(scope.row.logoImgUrl)" style="cursor: pointer;max-height: 60px"/>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="商家地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mallHot"
              active-value="1"
              inactive-value="0"
              active-text="加入推荐"
              inactive-text="取消推荐"
              @change="changeState(scope.$index, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, prev, pager, next"
        background
        :page-size="pageSize"
        :total="total"
        style="text-align:center;"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
      <el-dialog :visible.sync="DialogImgVisible">
        <img width="100%" :src="imgUrl" alt="">
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// import CityList from '../../module/cityList.vue'
import MarketList from '../../utils/mallList.vue'
// import moduleList from '../../../utils/module.js'
export default {
  data() {
    return {
      pageSize: 10,
      total: 0,
      page: 1,
      pass: '',
      isadmin: false,
      dataList: [],
      listLoading: false,
      reloadMaketList: false,
      marketChoose: {
        cityId: null,
        marketId: null
      },
      imgUrl: '',
      DialogImgVisible: false
    }
  },
  components: {
    // CityList,
    MarketList
  },
  methods: {
    getDataList() {
      const url = this.apiList.module.moduleMall.hotShop.getSelect
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.marketChoose.marketId, page: this.page, size: this.pageSize }, url, true)
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
      this.dataList = arr
    },
    changeData(cityId) {
      this.marketChoose.cityId = cityId[cityId.length - 1]
      // 重载店铺列表
      this.reloadMaketList = true
      this.marketChoose.marketId = ''
      this.$nextTick(() => {
        this.reloadMaketList = false
      })
    },
    chooseMall(marketId) {
      this.marketChoose.marketId = marketId
      if (!marketId) {
        this.$message('当前城市没有符合商场')
      } else {
        this.getDataList()
      }
    },
    handleCurrentChange(val) {
      this.page = val
      this.getDataList()
    },
    // 点击推荐
    submitEdit(index, data) {
      this.dialogCheckListVisible = true
      this.chooseId = data.id
    },
    // 查看大图
    imageDetail(imgUrl) {
      this.imgUrl = imgUrl
      this.DialogImgVisible = true
    },
    changeState(index, data) {
      console.log(data.mallHot)
      let url = ''
      if (data.mallHot === '0') {
        url = this.apiList.module.moduleMall.hotShop.del
      } else if (data.mallHot === '1') {
        url = this.apiList.module.moduleMall.hotShop.add
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.marketChoose.marketId, shopId: data.moduleId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          if (url === this.apiList.module.moduleMall.hotShop.del) {
            this.$message({
              message: '取消成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
        } else {
          // this.$message(data.msg)
        }
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>
<style lang="scss">
.nodata{
    p{
      text-align: center;
    }
    .mainheader{
      height:43px;
      font-size:44px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(239,168,76,1);
      line-height:28px;
    }
    .secondeHeader{
      height:14px;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(239,168,76,1);
      line-height:15px;
    } 
  }
</style>