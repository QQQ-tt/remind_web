import Request from '@/util/request'

export function pageFrequencyRule(e) {
  return Request.post('remind/frequencyRule/pageFrequency', { ...e }, { noSuccessMsg: true })
}

export function saveOrUpdateFrequencyRule(e) {
  return Request.post('remind/frequencyRule/saveOrUpdateFrequency', { ...e })
}

export function listFrequencyRule() {
  return Request.get('remind/frequencyRule/listFrequency', { noSuccessMsg: true })
}

export function removeFrequencyRuleById(e) {
  return Request.delete('remind/frequencyRule/removeFrequencyById', { params: { id: e } })
}

export function pageFrequencyTask(e) {
  return Request.post('remind/remindTask/pageTask', { ...e }, { noSuccessMsg: true })
}

export function saveOrUpdateTask(e) {
  return Request.post('remind/remindTask/saveOrUpdateTask', { ...e })
}

export function pageFrequencyTaskInfo(e) {
  return Request.post('remind/remindTaskInfo/pageTaskInfo', { ...e }, { noSuccessMsg: true })
}

export function removeFrequencyTaskById(e) {
  return Request.delete('remind/remindTask/removeTaskById', { params: { id: e } })
}
