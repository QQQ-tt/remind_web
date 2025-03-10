import Request from '@/util/request.js'

export function randomNum() {
  return Request.get('/remind/test/randomNum', {
    noSuccessMsg: true,
  })
}

export function msgRandomNum() {
  return Request.get('/remind/test/randomNum')
}
