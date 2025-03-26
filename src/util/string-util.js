/**
 * 截取字符串
 * @param {string} msg 字符串
 * @param {length} maxLength 长度
 * @returns
 */
export function truncateMessage(msg, maxLength = 50) {
  if (!msg) return '';
  return msg.length > maxLength ? msg.substring(0, maxLength) + '...' : msg;
}
