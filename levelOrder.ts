
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



// 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[9,20],[15,7]]

// 输入：root = [1]
// 输出：[[1]]

// 输入：root = []
// 输出：[]

function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return []
  }
  const ans: number[][] = [];
  const queue = [root];

  while (queue.length > 0) {
    let size = queue.length;
    ans.push([]);
    const index = ans.length - 1;
    while (size > 0) {
      const node = queue.shift();
      if (node) {
        ans[index].push(node.val)
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
      size--
    }
  }

  return ans;
};