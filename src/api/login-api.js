import Request from '@/util/request'

export function loginUser(e) {
  return Request.post('remind/sysUser/loginUser', {
    ...e,
  })
}

export function testToken() {
  return Request.get('remind/sysUser/testToken', {
    noSuccessMsg: true,
  })
}
