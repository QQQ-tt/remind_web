class ElMsg {
  static warningMsg = (msg) => {
    ElMessage({
      message: msg,
      type: 'warning',
    })
  }
  static successMsg = (msg) => {
    ElMessage({
      message: msg,
      type: 'success',
    })
  }
  static errorMsg = (msg) => {
    ElMessage.error(msg)
  }
}

export default ElMsg
