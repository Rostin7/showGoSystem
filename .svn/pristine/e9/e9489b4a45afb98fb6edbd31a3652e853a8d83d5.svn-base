<template>
  <div class="userInfo">
    <div class="header clearFloat">
      <div class="left">
        <img :src="avatar">
      </div>
      <div class="right">
        <p>{{ name }}</p>
        <p>{{ phone }}</p>
      </div>
    </div>
    <p class="text">客户属性：{{ type }}</p>
    <p class="text">管理权限：{{ roleName }}</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return{
      type: '商户'
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name',
      'phone',
      'sidebar',
      'roleName'
    ])
  },
  created() {
    switch (this.$cookie.get('moduleType')) {
      case "1": 
        this.type = '平台管理员'
        break
      case "101":
        this.type = "城市管理员"
        break
      case "201":
        this.type = "商户"
        break
      case "301":
        this.type = "商场"
        break
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';
  .userInfo{
    width: $sideBarWidth;
    box-sizing: border-box;
    padding: 18px 0 18px 18px;
    background: $menuHover;
    .header{
      height: 72px;
      .left{
        float: left;
        img{
          width: 72px;
          height: 72px;
          border-radius: 100%;
        }
      }
      .right{
        float: left;
        height: 100%;
        margin-left: 10px;
        p{
          color: $menuText;
          font-size: 22px;
          line-height: 24px;
          margin: 0;
          font-weight: bold;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 12px;
          margin-top: 8px;
          &:nth-child(2){
            font-weight: 400;
            font-size: 16px;
          }
        }
      }
    }
    .text{
      font-size: 14px;
      color: #E4E4E4;
      line-height: 14px;
      margin-top: 14px;
      font-weight: 200;
      &:nth-child(2){
        margin-top: 28px;
      }
      &:last-child{
        margin-bottom: 7px;
      }
    }
  }
</style>