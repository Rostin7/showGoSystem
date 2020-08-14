<template>
  <div class="shopList">
    <el-form @submit.native.prevent>
      <el-form-item>
        <el-input name="title" placeholder="输入店铺名称" v-model="shop" @input="search" suffix-icon="el-icon-search"></el-input>
      </el-form-item>
    </el-form>
    <div v-for="item in dataList" :key="item.id" :class="{'component-item': true, 'component-achive': item.id === chooseId}">
      <!-- <p class-name="mallki-text" :text="item.name" @click.native="chooseShop(item)"/> -->
      <p class="" @click="chooseShop(item)">{{ item.name }}</p>
    </div>
  </div>
</template>
<script>
import MdInput from '@/components/MDinput'
export default {
  props: {
    module_id: {},
    shop_id: {}
  },
  components: {
    MdInput
  },
  data() {
    return {
      shop: '',
      dialogVisible: false,
      chooseId: '',
      dataList: [],
      dataListPro: []
    }
  },
  methods: {
    init() {
      this.getDataList()
    },
    getDataList() {
      this.$http({
        url: this.$http.adornUrl(this.apiList.module.moduleShop.listAll),
        method: 'post',
        data: this.$http.adornData({ moduleId: this.module_id === '' ? false : this.module_id }, this.apiList.module.moduleShop.listAll, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = data.data
          this.dataListPro = [...data.data]
        } else {
          // this.$message.error(data.msg)
        }
        this.$nextTick(() => {
          if (!this.shop_id) {
            console.log(this.dataList)
            if (this.dataList.length !== 0) {
              this.chooseId = this.dataList[0].id
              // this.shop = this.dataList[0].name
            }
          } else {
            // const _index = this.dataList.findIndex(item => Number(item.id) === Number(this.shop_id)) 
            // this.shop = _index === -1 ? '' : this.dataList[_index].name
            this.chooseId = this.shop_id
          }
          this.$emit('chooseShop', this.chooseId)
        })
      }).catch(res => {
        // this.$message.error('未知错误')
        console.log(res)
      })
    },
    search() {
      this.dataList = this.dataListPro.filter(item => item.name.indexOf(this.shop) !== -1)
    },
    searchinit() {
      if (! this.shop) {
        const index = this.dataList.findIndex(item => item.id === this.chooseId)
        this.shop = this.dataList[index].name
      } 
    },
    chooseShop(val) {
      this.chooseId = val.id
      // this.shop = val.name
      this.$emit('chooseShop', this.chooseId)
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="scss">
.shopList{
  .component-item{
    margin-top: 15px;
    p{
      color: #999;
      cursor: pointer;
    }
  }
  .component-achive{
    p{
      color: #3888fa ;
    }
  }
}
</style>
