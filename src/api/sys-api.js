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

export function pageSysRole(e) {
  return Request.post('remind/sysRole/pageSysRole', { ...e }, { noSuccessMsg: true })
}

export function pageSysResource(e) {
  return Request.post('remind/sysResource/pageResource', { ...e }, { noSuccessMsg: true })
}
