<template>
  <div class="navShopDetail">
    <span class="text">您所在的{{ moduletype }}：</span>
    <img class="mian_logo"  :src="logo" alt="" >
    <span class="shop_name">{{ name }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return{
      name: '',
      logo: '',
      moduletype: ''
    }
  },
  methods: {
    getDataList() {
      let url = this.apiList.module.moduleShop.getDetail
      if (this.$cookie.get('moduleType') === '301') {
        url = this.apiList.module.moduleMall.detail
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        this.name = data.data.name
        this.logo = data.data.logoImgUrl
      })
    }
  },
  mounted() {
    console.log(this.$cookie.get('moduleType'))
    if (this.$cookie.get('moduleType') === '301' ) {
      this.moduletype = '广场'
    } else if (this.$cookie.get('moduleType')  === '201' ) {
      this.moduletype = '商铺'
    }
    // 只有下沉操作时显示，操作时使用的是管理员的身份，一定拥有权限
    this.getDataList()
  }
}
</script>
<style lang="scss">
  .navShopDetail{
    display: inline-block;
    vertical-align: text-bottom;
    .text{
      font-size: 14px;
      color: #FFD49A;
      vertical-align: middle;
    }
    .mian_logo{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .shop_name{
      font-size: 20px;
      color: #fff;
      vertical-align: middle;
    }
  }
</style>