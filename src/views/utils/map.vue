<template>
  <div class="mapbox">
    <el-card shadow="never">
      <el-row :gutter="15">
        <el-col :span="6">
          <el-form :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="mapSearchAdd" autocomplete="off" type="text" placeholder="" @keyup.stop.native="getAddList"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- <el-button type="text" @click="getAddList">搜索</el-button> -->
            </el-form-item>
          </el-form>
          <div class="searchDataList">
            <div class="searchDataHeader">{{ dataList.length === 0 ? '暂无搜索结果' : ''}}</div>
            <div class="searchDataItem" v-for="(item, index) in dataList" :key="index" @click="setPoint(item)">
              <p>{{ item.title }}</p>
              <p>地址：{{ item.address }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <!-- <el-form :inline="true">
            <el-form-item label="当前坐标" >
              <el-input v-model="mapPoint" autocomplete="off" type="text" placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="当前地址" >
              <el-input v-model="mapAddress" autocomplete="off" type="text" placeholder="" ></el-input>
            </el-form-item>
          </el-form> -->
          <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:500px" :scroll-wheel-zoom="true" @click="getClickInfo">
            <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"  />
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-geolocation :autoLocation="false" @locationSuccess="getLOcationsuccess"></bm-geolocation>
            <bm-marker :position="{lng: clickPoint.lng, lat: clickPoint.lat}" :dragging="false"  animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
          </baidu-map>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'mapbox',
  props: {
    lng: {},
    lat: {},
    address: {}
  },
  data() {
    return {
      mapSearchAdd: '',
      mapAddress: '',
      isReady: false,
      mapPoint: '',
      center: { lng: 119.21, lat: 26.0409 },
      clickPoint: {
        lng: '',
        lat: ''
      },
      dataList: [],
      zoom: 12,
      // 指向百度地图的实例
      Bmap: {},
      myGeo: {},
      local: {}
    }
  },
  methods: {
    getLOcationsuccess(data) {
      console.log(data)
      this.$message({
        message: '已为您定位到' + data.addressComponent.province +  data.addressComponent.city + data.addressComponent.district + data.addressComponent.street + data.addressComponent.streetNumber
      })
    },
    handler({ BMap, map }) {
      const vm = this
      vm.Bmap = BMap
      var options = {
        onSearchComplete: function(results){
          // 判断状态是否正确
          if (vm.local.getStatus() == BMAP_STATUS_SUCCESS){
            var s = [];
            for (var i = 0; i < results.getCurrentNumPois(); i ++){
              s.push({
                title: results.getPoi(i).title,
                address: results.getPoi(i).address,
                lat: results.getPoi(i).point.lat,
                lng: results.getPoi(i).point.lng
              })
            }
            // vm.$emit('getDataList', s)
            vm.dataList = s
          } else {
            // vm.$emit('getDataList', [])
            vm.dataList = []
          }
          console.log(vm.dataList)
        }
      }
      vm.local = new BMap.LocalSearch('福建省', options)
      // 初始化地图中心
      const myGeo = new BMap.Geocoder()
      vm.myGeo = myGeo
      if (this.lng) {
        this.center.lng = this.lng
        this.center.lat = this.lat
        this.clickPoint = JSON.parse(JSON.stringify(this.center))
      } else {
        myGeo.getPoint(vm.address, function(point) {
          if (point) {
            vm.center = point
            vm.clickPoint.lng = point.lng
            vm.clickPoint.lat = point.lat
          }
        }, '福建省')
      }
      vm.isReady = true
    },
    getAddList() {
      const vm = this
      vm.local.search(vm.mapSearchAdd)
    },
    // 设置坐标
    setPoint(item) {
      const vm = this
      vm.clickPoint.lng = item.lng
      vm.clickPoint.lat = item.lat
      vm.center.lng = item.lng
      vm.center.lat = item.lat
      vm.mapPoint = vm.clickPoint.lat + ',' + vm.clickPoint.lng
      vm.mapAddress = item.address
      this.$emit('chooseAddressPoint', {lng: item.lng, lat: item.lat, address: item.address})
    },
    getClickInfo(e) {
      const vm = this
      vm.clickPoint.lng = e.point.lng
      vm.clickPoint.lat = e.point.lat
      vm.mapPoint = vm.clickPoint.lat + ',' + vm.clickPoint.lng
      vm.myGeo.getLocation(e.point, (res) => {
        vm.mapAddress = res.addressComponents.district + res.addressComponents.street + res.addressComponents.streetNumber
      })
      this.$emit('chooseAddressPoint', {lng: e.point.lng, lat: e.point.lat, address: vm.mapAddress})
    }
  },
  watch: {
    lng: function(val) {
      const vm = this
      // console.log(vm.center)
      // if (val) {
      //   vm.center.lng = this.lng
      //   vm.center.lat = this.lat
      //   vm.clickPoint.lng = this.lng
      //   vm.clickPoint.lat = this.lat
      // }
    },
    lat: function(val) {
      const vm = this
      if (val && vm.isReady) {
        // console.log('22222222222222222222')
        // console.log(this.lat)
        // console.log(this.lng)
        // console.log('3333333333333333333')
        vm.center.lng = this.lng
        vm.center.lat = this.lat
        vm.clickPoint.lng = this.lng
        vm.clickPoint.lat = this.lat
      }
    }
  }
}
</script>
<style lang="scss">
.mapbox{
  // 店铺详情覆盖样式
  .el-card {
    .el-col{
      border-bottom: none;
      text-align: left;
      .el-input--medium{
        .el-input__inner {
          border-left: auto;
          text-align: left;
          border: 1px solid #DCDFE6;
        }
      }
    }
    .el-form-item--medium .el-form-item__content{
      border: none;
      line-height: auto;
      padding-left: 0;
    }
    .el-form-item{
      border-bottom: none;
      margin-bottom: 0;
      min-height: auto;
    }
    
    .anchorBL{
      img{
        display: none
      }
    }
    .el-card__body{
      .el-col{
        border-bottom: none;
      }
    }
  }
  .searchDataList{
    height: 400px;
    overflow-y: scroll;
    .searchDataHeader{
      text-align: left;
    }
    .searchDataItem{
      // line-height: 25px;
      p{
        cursor: pointer;
        &:nth-child(1){
          margin-top: 10px;
          line-height: 18px;
          color: #1890ff;
        }
        &:nth-child(2){
          font-size: 12px;
          line-height: 12px;
          margin-top: -5px;
        }
      }
    }
  }
}
</style>