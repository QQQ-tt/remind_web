import Request from '@/util/request.js'

export function loginUser(e) {
  return Request.post('remind/sysUser/loginUser', {
    ...e
  })
}
