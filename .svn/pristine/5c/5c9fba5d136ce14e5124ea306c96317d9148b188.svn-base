<template>
  <div class="cityModuleDetail">
    <h4>管理区域：{{ name }}</h4>
    <div class="detail">
      <el-form @submit.native.prevent ref="form" :model="form" label-width="80px">
        <el-form-item label="城市名称">
          <el-input v-model="form.name" :disabled="!isAuth('/moduleCity/mod')" />
        </el-form-item>
        <el-form-item label="审批状态">
          <el-switch v-model="form.showed" :disabled="!isAuth('/moduleCity/mod')" />
        </el-form-item>
        <el-form-item label="地址">
          <!-- <el-col :span="11">
            <el-input v-model="form.superModuleIdLine" :disabled="!isAuth('/moduleCity/mod')" placeholder="经度" />
          </el-col>
          <el-col class="line" :span="2" style="text-align:center">--</el-col>
          <el-col :span="11">
            <el-input v-model="form.superModuleIdLine_" :disabled="!isAuth('/moduleCity/mod')" placeholder="维度" />
          </el-col> -->
          <map-box v-if="form.name !== '当前'" :lat="form.lat" :lng="form.lng" :address="form.name" @chooseAddressPoint="chooseAddressPoint" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="isAuth('/moduleCity/mod')" type="primary" @click="onSubmit">提交修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import MapBox from '../../utils/map.vue'
export default {
  props: {},
  data() {
    return {
      cityId: null,
      name: '',
      form: {
        name: '',
        lng: '',
        lat: '',
        showed: false
      }
    }
  },
  components: {
    MapBox
  },
  created() {
    this.init()
  },
  methods: {
    init(id, name) {
      this.cityId = id
      this.name = name
      if (!name) {
        this.name = '全部城市'
      }
      this.getdataList()
    },
    getdataList() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.city.detail),
        method: 'post',
        data: this.$http.adornData({ targetModuleId: this.cityId }, this.apiList.module.city.detail, true)
      }).then(({ data }) => {
        if (data.result) {
          this.form = data.data
          if (!this.form.name) {
            this.form.name = this.name
          }
        } else {
          // this.$message({ message: data.msg, type: 'warning' })
          // this.$store.dispatch('LogOut')
        }
        this.listLoading = false
      }).catch((res) => {
        this.$message(res)
      })
    },
    onSubmit() {
      this.$confirm('此操作将修改城市信息, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.apiList.module.city.edit),
          method: 'post',
          data: this.$http.adornData({ moduleId: this.cityId, name: this.form.name, lat: this.form.lat, lng: this.form.lng, showed: this.form.showed }, this.apiList.module.city.edit, true)
        }).then(({ data }) => {
          if (data.result) {
            // 删除成功
            this.$message({ type: 'success', message: '修改成功' })
            // 删除当前列表
            this.$emit('changeData')
          } else {
            // this.$message({ message: data.msg, type: 'warning' })
            // this.$store.dispatch('LogOut')
          }
        })
      })
    },
    chooseAddressPoint(point) {
      this.form.lng = point.lng
      this.form.lat = point.lat
    }
  }
}
</script>
