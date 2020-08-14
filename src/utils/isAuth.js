import store from '@/store'
/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  const authList = store.getters.roles
  // 判断如果权限是admin，则默认显示全部
  if (authList === 'admin') {
    return true
  }
  return authList.indexOf(key) !== -1 || false
}