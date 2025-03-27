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
/**
 * 去除多余字段
 * @param {obj} obj
 * @returns
 */
export function removeIsEmpty(obj) {
  if (!obj) return obj;
  Object.keys(obj).forEach(key => {
    if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}
