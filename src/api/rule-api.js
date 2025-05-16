import Request from '@/util/request'

export function ruleTemplatePage(e) {
  return Request.post('remind/ruleTemplate/ruleTemplatePage', {
    ...e,
  }, { noSuccessMsg: true })
}

export function saveOrUpdateRuleTemplate(e) {
  return Request.put('remind/ruleTemplate/saveOrUpdateRuleTemplate', {
    ...e,
  })
}

export function updateRuleTemplateStatus(e) {
  return Request.put('remind/ruleTemplate/updateRuleTemplateStatus', {
    ...e,
  })
}
