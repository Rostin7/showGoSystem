import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'
import merge from 'lodash/merge'
import sha256 from 'sha256'
// import { clearLoginInfo } from '@/utils'
import { Loading } from 'element-ui'

const http = axios.create({
  timeout: 1000 * 60,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }
})

/**
 * 请求拦截
 */
var loadinginstace
http.interceptors.request.use(config => {
  // debugger
  // 请求遮罩
  config.loadding = false
  if (config.resTimeout) {
    config.timeout = config.resTimeout
  } else {
    config.timeout = 1000 * 60
  }
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  if (config.loadding !== false) {
    loadinginstace = Loading.service({ fullscreen: true })
  }
  return config
}, error => {
  if (loadinginstace) {
    loadinginstace.close()
  }
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.msg === 'sign验证失败') { // 401, token失效
    Message({ message: '您的账号登录超时，请重新登录', type: 'warning' })
    store.dispatch('user/logout')
    setTimeout(() => {
      if (Vue.cookie.get('loginType') == 'entrya' ){
        router.push(`/login?userType=adminUser&loginType=entraAdmin`)
      } else {
        router.push(`/login?redirect=${router.fullPath}`)
      }
    }, 600)
  }
  if (response.data && response.data.result === false) {
    if (response.data.msg !== 'sign验证失败') {
      Message({ message: response.data.msg, type: 'warning' })
    }
  }

  return response
}, error => {
  if (loadinginstace) {
    loadinginstace.close()
  }
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 自动拼接url
  return process.env.VUE_APP_BASE_API + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, actionName, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime(),
    'token': sha256(actionName + Vue.cookie.get('token')),
    'uid': Vue.cookie.get('uid')
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, actionName, openDefultdata = true, contentType = 'json') => {
  let moduleId = Vue.cookie.get('moduleId')
  if (data.moduleId) {
    moduleId = data.moduleId
  }
  var defaults = {
    't': new Date().getTime(),
    'sign': sha256(actionName + Vue.cookie.get('token')),
    'userId': Vue.cookie.get('uid'),
    'moduleId': moduleId
  }
  data = openDefultdata ? merge(defaults, data) : data
  if (openDefultdata) {
    if (!data.moduleId) {
      data.moduleId = Vue.cookie.get('moduleId')
    }
  }
  return qs.stringify(data)
}

export default http
