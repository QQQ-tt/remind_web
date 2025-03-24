class ElMsg {
  /**
   * 警告消息
   * @param {string} msg 提示消息
   */
  static warningMsg = (msg) => {
    ElMessage({
      message: msg,
      type: 'warning',
    })
  }
  /**
   * 成功消息
   * @param {string} msg 提示消息
   */
  static successMsg = (msg) => {
    ElMessage({
      message: msg,
      type: 'success',
    })
  }
  /**
   * 错误消息
   * @param {string} msg 提示消息
   */
  static errorMsg = (msg) => {
    ElMessage.error(msg)
  }
}

export default ElMsg
