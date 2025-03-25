import Request from '@/util/request'

export function listDelayTaskNum() {
  return Request.get('remind/requestLog/listDelayTaskNum', { noSuccessMsg: true })
}

export function listDelayTaskError() {
  return Request.get('remind/requestLog/listDelayTaskError', { noSuccessMsg: true })
}

export function listSlowRequest(dayNum) {
  return Request.get('remind/requestLog/listSlowRequest', { params: { dayNum }, noSuccessMsg: true })
}

export function listCountRequest(dayNum) {
  return Request.get('remind/requestLog/listCountRequest', { params: { dayNum }, noSuccessMsg: true })
}

export function listHighConcurrencyRequest(dayNum) {
  return Request.get('remind/requestLog/listHighConcurrencyRequest', { params: { dayNum }, noSuccessMsg: true })
}

export function listErrorCountRequest(dayNum) {
  return Request.get('remind/requestLog/listErrorCountRequest', { params: { dayNum }, noSuccessMsg: true })
}

export function listIpCountRequest(dayNum) {
  return Request.get('remind/requestLog/listIpCountRequest', { params: { dayNum }, noSuccessMsg: true })
}
