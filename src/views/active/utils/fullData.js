/**
 * 数据转换和微信小程序码生成
 */

import request from '@/utils/httpRequest'
import apiList from '@/utils/apiList'
/**
 * 使用接口将数据以键值对的形式存储
 * @param {object} data  默认type, targetType, targetId
 */
export function getFullData (data) {
  return new Promise((resolve, reject) =>{
    const url = apiList.wxTool.sendShagreData
    const formData = data
    request({
      url: request.adornUrl(url),
      method: 'post',
      data: request.adornData( {sValue: JSON.stringify(formData)}, url , true)
    }).then(({ data }) => {
      if (data.result) {
        resolve(data.data)
      } else {
        reject(data.msg)
      }
    })
  })
}

/**
 * 使用根据键获得数据对象
 * @param {object} data
 */
export function loadFullData (data) {
  return new Promise((resolve, reject) =>{
    const url = apiList.wxTool.getShagreData
    const formData = {sKey: data}
    request({
      url: request.adornUrl(url),
      method: 'post',
      data: request.adornData( formData, url , true)
    }).then(({ data }) => {
      if (data.result) {
        resolve(data.data)
      } else {
        reject(data.msg)
      }
    })
  })
}

/**
 * 获得小程序码
 * @param {string} getFullData 小程序跳转参数
 */
export function getWxAppEr(getFullData) {
  return new Promise((resolve, reject) =>{
    const url = apiList.wxTool.getImgUrl
    request({
      url: request.adornUrl(url),
      method: "post",
      data: request.adornData({
        page: 'pages/index/index',
        scene: getFullData,
        hyaline: false
      }, url, true)
    }).then(({ data }) => {
      if (data.result) {
        resolve(data.data)
      }
    })
  })
}
/**
 * 提交修改审批
 */
export function submitApprove(type, submitData) {
  return new Promise((resolve, reject) =>{
    const url = apiList.showToCApproval.change.add
    const fromData = submitData
    fromData.type = type
    if(fromData.id && !fromData.activityId) {
      fromData.activityId = fromData.id
    }
    // fromData.activityId = 1172
    request({
      url: request.adornUrl(url),
      method: "post",
      data: request.adornData(fromData, url, true)
    }).then(({ data }) => {
      if (data.result) {
        resolve(data.data)
      }
    })
  })
}