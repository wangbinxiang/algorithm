export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}





function kthSmallest(root: TreeNode | null, k: number): number {

  const stack: TreeNode[] = [];
  let node = root;
  let n = k;
  // 后续遍历
  while (stack.length || node !== null) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop()!;
    n--;
    if (n === 0) {
      break;
    }
    node = node.right;

  }
  return k;
};