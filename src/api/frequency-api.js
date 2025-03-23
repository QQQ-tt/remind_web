import Request from '@/util/request'

export function pageFrequencyRule(e) {
  return Request.post('remind/frequencyRule/pageFrequency', { ...e }, { noSuccessMsg: true })
}

export function listFrequencyRule() {
  return Request.get('remind/frequencyRule/listFrequency', { noSuccessMsg: true })
}

export function pageFrequencyTask(e) {
  return Request.post('remind/remindTask/pageTask', { ...e }, { noSuccessMsg: true })
}

export function saveOrUpdateTask(e) {
  return Request.post('remind/remindTask/saveOrUpdateTask', { ...e })
}
