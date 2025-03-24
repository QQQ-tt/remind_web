import Request from '@/util/request'

export function pageSysUser(e) {
  return Request.post(
    'remind/sysUser/pageSysUser',
    {
      ...e,
    },
    { noSuccessMsg: true }
  )
}

export function saveOrUpdateSysUser(e) {
  return Request.put('remind/sysUser/saveOrUpdateSysUser', { ...e })
}

export function listSysRole(e) {
  return Request.get('remind/sysRole/listSysRole', { params: { name: e }, noSuccessMsg: true })
}

export function removeSysUserByUserId(e) {
  return Request.delete('remind/sysUser/removeByUserId', { params: { id: e } })
}

export function pageSysRole(e) {
  return Request.post('remind/sysRole/pageSysRole', { ...e }, { noSuccessMsg: true })
}

export function saveOrUpdateSysRole(e) {
  return Request.put('remind/sysRole/saveOrUpdateSysRole', { ...e })
}

export function removeSysRoleByRoleId(e) {
  return Request.delete('remind/sysRole/removeByRoleId', { params: { id: e } })
}

export function pageSysResource(e) {
  return Request.post('remind/sysResource/pageResource', { ...e }, { noSuccessMsg: true })
}

export function saveOrUpdateSysResource(e) {
  return Request.put('remind/sysResource/saveOrUpdateResource', { ...e })
}

export function treeResource() {
  return Request.get('remind/sysResource/treeResource?type=route', { noSuccessMsg: true })
}

export function removeSysResourceByResourceId(e) {
  return Request.delete('remind/sysResource/removeByResourceId', { params: { id: e } })
}
