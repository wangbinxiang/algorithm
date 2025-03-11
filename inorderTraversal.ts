
// Definition for a binary tree node.
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

// 输入：root = [1,null,2,3]
// 输出：[1,3,2]

// 输入：root = []
// 输出：[]

// 输入：root = [1]
// 输出：[1]

// 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
function inorderTraversal(root: TreeNode | null): number[] {
  const ans: number[] = [];

  const inorder = (node: TreeNode | null) => {
    if (node === null) {
      return;
    }
    inorder(node.left)
    ans.push(node.val);
    inorder(node.right)
  }
  inorder(root);

  return ans;
};