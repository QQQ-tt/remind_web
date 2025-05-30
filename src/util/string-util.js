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
/**
 * 去除假的选中父节点
 * @param {*} treeData
 * @param {*} checkedKeys
 * @returns
 */
export function removeFakeCheckedParents(treeData, checkedKeys) {
  const checkedSet = new Set(checkedKeys);

  function traverse(nodes) {
    for (const node of nodes) {
      const children = node.children || [];
      if (children.length > 0) {
        const allChildIds = getAllNodeIds(children);
        const selectedChildIds = allChildIds.filter(id => checkedSet.has(id));

        // 如果子节点没全选，且父节点在 checkedKeys 中，就移除它
        if (
          selectedChildIds.length < allChildIds.length &&
          checkedSet.has(node.id)
        ) {
          checkedSet.delete(node.id);
        }

        traverse(children); // 递归处理子节点
      }
    }
  }

  function getAllNodeIds(nodes) {
    let ids = [];
    for (const node of nodes) {
      ids.push(node.id);
      if (node.children) {
        ids = ids.concat(getAllNodeIds(node.children));
      }
    }
    return ids;
  }

  traverse(treeData);
  return Array.from(checkedSet);
}
