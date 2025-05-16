import Request from '@/util/request'

export function pageRuleTemplate(e) {
  return Request.post('remind/ruleTemplate/pageRuleTemplate', {
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

export function pageSysUserRule(e) {
  return Request.post('remind/sysUser/pageSysUserRule', {
    ...e,
  }, { noSuccessMsg: true })
}

export function getRuleUserByUserId(e) {
  return Request.get('remind/ruleUser/getRuleUserByUserId', {
    params: {
      userId: e,
    }
  })
}
