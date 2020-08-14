<template>
  <div class="navbar" :class="{'mallNav': isAuth('/moduleMall/modSelf')}">
    <div class="logo"><img :src="isAuth('/moduleMall/modSelf') ? malllogo : shoplogo">{{ isAuth('/moduleCity/listNext') ? '众享乐管理系统' : isAuth('/moduleMall/modSelf') ?  '众享乐商场管理系统' : '众享乐商铺管理系统' }}</div>
    <!-- <hamburger v-if="isAuth('/moduleCity/getById')" id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb v-if="isAuth('/moduleCity/getById')" id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu" v-if="isAdmin">
      <template v-if="device!=='mobile'">
        <el-tooltip content="返回城市" effect="dark" placement="bottom">
          <back-city v-show="isSelectModule" class="right-menu-item" @returnCity="returnCity" :url="url" />
        </el-tooltip>
        <!-- 当前店铺 -->
        <city-list v-if="isAuth('/moduleCity/listNextAll')" v-show="!isSelectModule" class="right-menu-item" />
        <search id="header-search" class="right-menu-item" />
        <!-- <error-log class="errLog-container right-menu-item hover-effect"/> -->
        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <el-tooltip content="字体设置" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
      </template>
      <shop-detail v-if="isSelectModule" class="right-menu-item"/>
      <div class="right-menu-item">
        <span @click="logout">|&nbsp;退出</span>
      </div>
      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper"> -->
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <!-- <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown"> -->
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>我的</el-dropdown-item>
          </router-link> -->
          <!-- <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link> -->
          <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <!-- <el-dropdown-item divided>
            <span style="display:block;" @click="logout">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
    <div class="right-menu" v-else>
      <!-- <span class="right_logo"><img :src="avatar" alt=""></span><span>{{ name }}</span><span>{{ phone }}</span> -->
      <span @click="logout">|&nbsp;退出</span>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import CityList from '@/components/CityList'
import BackCity from '@/components/CityList/BackCity.vue' // 返回城市
import ShopDetail from '@/components/CityList/shopDetail.vue' // 当前店铺或广场
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    CityList,
    BackCity,
    ShopDetail
  },
  data() {
    return {
      shopPhone: localStorage.getItem('info_shopPhone'),
      shopName: localStorage.getItem('info_shopName'),
      isSelectModule: false,
      url: '',
      malllogo: require('../../assets/loginImg/malllogo.png'),
      shoplogo: require('../../assets/loginImg/mainlogo.png'),
      isAdmin: false
    }
  },
  mounted () {
    this.$store.dispatch('user/getuserData')
    const vm = this
    if (this.$cookie.get('userType') === '1') { 
      this.isAdmin = true
    }
    // this.$cookie.set('moduleId', this.$cookie.get('cityModuleId'))
    if (this.$cookie.get('cityModuleId') !== this.$cookie.get('moduleId')) {
      if (this.isAuth('/moduleCity/listNextAll') || this.isAuth('/moduleCity/listNext')) {
        // 初始化选择
      } else {
        this.isSelectModule = true
      }
    }
    eventBus.$on('chooseModule', (val) => {
      vm.isSelectModule = true
      vm.url = val
    })
    eventBus.$on('getMess', (val) => {
      vm.shopPhone = val.shopPhoneNum
      vm.shopName = val.name
    })
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'phone',
      'device'
    ])
  },
  methods: {
    returnCity() {
      const protype = this.$cookie.get('promoduleType')
      this.$cookie.set('moduleType', protype)
      this.isSelectModule = false
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      if (this.$cookie.get('userType') === '1'){
        this.$router.push(`/login?userType=adminUser&loginType=entraAdmin`)
      } else {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      } 
    },
    changePass() {
      eventBus.$emit('user_changePass')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 58px;
  line-height: 58px;
  overflow: hidden;
  position: relative;
  background: #364655;
  z-index: 9999;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  // nav字体颜色
  .right_logo{
    display: inline-block;
    height: 70%!important;
    vertical-align: middle;
    border-radius: 58px;
    overflow: hidden;
    background: #fff;
    img{
      height: 100%;
    }
  }
  .logo{
    float: left;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    img{
      width: 42px;
      height: 42px;
      vertical-align: middle;
      margin-right: 15px;
      margin-left: 29px;
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    color: #fff;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    span{
      color: #fff;
      font-size:16px;
      display: inline-block;
      margin-right: 12px;
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
      cursor: pointer;
    }
    span:nth-child(2){
      border-right: solid 1px #fff;
      padding-right: 12px;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.mallNav{
  // background: -moz-linear-gradient(left, #3D6CAC 10%, #602c9e 100%);
  // background: -webkit-gradient(left, #3D6CAC 10%, #602c9e 100%);
  // background: -webkit-linear-gradient(left, #3D6CAC 10%, #602c9e 100%);
  // background: -o-linear-gradient(left, #3D6CAC 10%, #602c9e 100%);
  // background: -ms-linear-gradient(left, #3D6CAC 10%, #602c9e 100%);
  // background: linear-gradient(to right, #3D6CAC 10%, #602c9e 100%);
}
</style>
