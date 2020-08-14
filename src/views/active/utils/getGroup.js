import moduleList from '../../../utils/module.js'
/**
 *
 * @param {Array} groupIds 所属分组
 * @param {Number} num 所属层级
 */
export function getGroup(progroupIds, num = 3) {
  const groupIds = progroupIds ? progroupIds.split(',').filter(item => item != '') : []
  let groupArray = []
  // 获得三级分组的合集
  moduleList.data.forEach(element => {
    if (element.children.length > 0) {
      groupArray = groupArray.concat(element.children)
    }
  })
  let filterGroupIds = []
  switch (num) {
    case 2:
      const arr = moduleList.data.filter(item => groupIds.indexOf(item.id.toString()) !== -1)
      console.log(arr)
      arr.forEach(element => {
        filterGroupIds.push({ id: element.id, label: element.label })
      })
      break
    case 3:
      filterGroupIds = groupArray.filter(item => groupIds.indexOf(item.id.toString()) !== -1)
      break
  }
  return filterGroupIds
}

/**
 * 获得二级分组的所有三级分组id
 * @param {*} groupId 
 */
export function getGroupChild (groupId) {
  const _idx = moduleList.data.findIndex(item => item.id === Number(groupId))
  let filterGroupIds = moduleList.data[_idx].children
  return filterGroupIds
}
