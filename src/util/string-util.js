export function truncateMessage(msg, maxLength = 50) {
  if (!msg) return '';
  return msg.length > maxLength ? msg.substring(0, maxLength) + '...' : msg;
}
