
class TreeNodeInvert {
  val: number
  left: TreeNodeInvert | null
  right: TreeNodeInvert | null
  constructor(val?: number, left?: TreeNodeInvert | null, right?: TreeNodeInvert | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}


function invertTree(root: TreeNodeInvert | null): TreeNodeInvert | null {
  if (root === null) {
    return null;
  }
  const stack: TreeNodeInvert[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()
    if (node) {
      const tmp = node.left;
      node.left = node.right;
      node.right = tmp
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
    }
  }

  return root;
};