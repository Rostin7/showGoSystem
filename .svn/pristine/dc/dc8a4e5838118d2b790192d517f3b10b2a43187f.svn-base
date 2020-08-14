// import { login, logout, getInfo } from '@/api/user'
import Vue from 'vue'
// import { logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import request from '@/utils/httpRequest'
import apiList from '@/utils/apiList'
import Cookies from 'js-cookie'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  phone: '',
  introduction: '',
  roles: [],
  roleName: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLES_CHINESE: (state, roles) => {
    state.chineseRoles = roles
  },
  SET_ROLE_NAME: (state, rolename) => {
    state.roleName = rolename
  }
}

const actions = {
  Login({ commit }, userToken) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', userToken)
      setToken(userToken)
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (Vue.cookie.get('uid') === '1') {
        // console.log('开发者登录')
        commit('SET_ROLES', 'admin')
        resolve('admin')
      } else {
        request({
          url: request.adornUrl(apiList.login.menu),
          method: 'post',
          data: request.adornData('', apiList.login.menu, true)
        }).then(({ data }) => {
          if (data.result) {
            const roles = []
            const roles_chinese = []
            for (const i in data.data) {
              if (data.data[i].show === 1) {
                roles.push(data.data[i].url)
              }
              roles_chinese.push(data.data[i].name)
            }
            if (roles.length === 0) {
              roles.push('noData')
            }
            // 判断当前登录时候有没有城市的权限
            console.log(state.roles)
            if (state.roles.indexOf('/moduleCity/listNextAll') !== -1 || Vue.cookie.get('userType') === 1) {
              roles.push('/moduleCity/listNext')
            }
            commit('SET_ROLES', roles)
            commit('SET_ROLES_CHINESE', roles_chinese)
            resolve(roles)
          } else {
            removeToken()
            resolve([])
          }
        }).catch(error => {
          reject(error)
        })
        }
    })
  },
  getuserData({ commit, state }) {
    return new Promise((resolve, reject) => {
      let url = apiList.login.detail
      request({
        url: request.adornUrl(url),
        method: 'post',
        data: request.adornData('', url, true)
      }).then(({ data }) => {
        if (data.result) {
          if (!data.data) {
            resolve()
            return
          }
          commit('SET_NAME', data.data.name ? data.data.name : '管理员')
          commit('SET_PHONE', data.data.phoneNum)
          let roleName 
          data.data.adminId == Vue.cookie.get('uid') ? roleName = '管理员' : roleName = data.data.roleName
          // console.log(roleName)
          commit('SET_ROLE_NAME', roleName)
          // localStorage.setItem('info_shopName', data.data.name)
          let logo
          data.data.logoImgUrl ? logo = data.data.logoImgUrl : logo = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559642438899&di=58a3bd432d00cf75b5e8db0143fe03ed&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg'
          commit('SET_AVATAR', logo)
          resolve()
        } else {
          reject(data.msg)
        }
      })
    })
  },
  /**
   *
   * @param {this.isAuth('/moduleCity/listNextAll') || this.isAuth('/moduleCity/listNext')} param0
   */
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  },

  //
  resetModuleGetPrice() {
    let url = apiList.moduleGetPrice
    request({
      url: request.adornUrl(url),
      method: 'post',
      data: request.adornData('', url, true)
    }).then(({ data }) => {
      if (data.result) {
        Cookies.set('moduleGetPrice', 1- data.data / 10000)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
