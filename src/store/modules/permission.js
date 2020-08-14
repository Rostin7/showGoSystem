import { asyncRoutes, constantRoutes } from '@/router'
/**
 * 通过meta.role判断用户权限里面是否包含数据展示
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(role => roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由数组
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 递归生成数组与原有路由做映射
 * @param asyncRouterMap
 */
function mapAsyncRouter(asyncRouterMap, routes) {
  if (!routes) {
    routes = asyncRoutes
  }
  const asyncRouter = []
  asyncRouterMap.forEach(element => {
    const _index = routes.findIndex(item => item.path === element.path)
    element.component = routes[_index].component
    if (element.children && element.children.length) {
      mapAsyncRouter(element.children, routes[_index].children)
    }
    asyncRouter.push(element)
  })
  return asyncRouter
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles === 'admin') {
        // commit('SET_ROUTERS', asyncRoutes)
        accessedRoutes = asyncRoutes
      } else {
        // commit('SET_ROUTERS', filterAsyncRouter(asyncRoutes, roles))
        accessedRoutes = mapAsyncRouter(filterAsyncRouter(JSON.parse(JSON.stringify(asyncRoutes)), roles))
      }
      // 根据数组表示对应相应的router

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
