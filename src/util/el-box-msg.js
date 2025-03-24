class ElBoxMsg {
  /**
   * 普通消息弹框
   * @param {string} msg 提示消息
   * @param {string} type 消息类型：warning、success、error、info
   */
  static alertMsg = (msg, type = 'info') => {
    ElMessageBox.alert(msg, '提示', {
      confirmButtonText: '确定',
      type: type,
    })
  }

  /**
   * 确认操作（适用于删除等）
   * @param {string} msg 确认提示
   * @param {function} onConfirm 确认后的回调
   */
  static confirmAction = (msg, onConfirm) => {
    ElMessageBox.confirm(msg, '确认操作', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        if (onConfirm) onConfirm()
      })
      .catch(() => {
        console.log('操作取消')
      })
  }

  /**
   * 输入框提示（适用于修改用户名等）
   * @param {string} title 标题
   * @param {function} onInput 确认后的回调（参数是用户输入的值）
   */
  static promptInput = (title, onInput) => {
    ElMessageBox.prompt('请输入内容', title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
      .then(({ value }) => {
        if (onInput) onInput(value)
      })
      .catch(() => {
        console.log('输入取消')
      })
  }

  /**
   * 右上角通知提示
   * @param {string} msg 提示消息
   * @param {string} type 消息类型：success、warning、info、error
   */
  static notifyMsg = (msg, type = 'info') => {
    ElNotification({
      title: '通知',
      message: msg,
      type: type,
    })
  }
}

export default ElBoxMsg

// ElBoxMsg.alertMsg('操作成功', 'success')
// ElBoxMsg.alertMsg('出现错误', 'error')
// ElBoxMsg.confirmAction('确定要删除该项吗？', () => {
//   console.log('用户确认删除')
// })
// ElBoxMsg.promptInput('请输入用户名', (value) => {
//   console.log('用户输入的值:', value)
// })
// ElBoxMsg.notifyMsg('任务已完成', 'success')
// ElBoxMsg.notifyMsg('任务失败', 'error')
