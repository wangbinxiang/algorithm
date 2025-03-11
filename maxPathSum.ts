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


// 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

// 路径和 是路径中各节点值的总和。

// 给你一个二叉树的根节点 root ，返回其 最大路径和 。



function maxPathSum(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  let ans = -Infinity;

  const pathSum = (root: TreeNode | null): number => {
    if (root === null) {
      return 0;
    }




    const leftAns = Math.max(pathSum(root.left), 0);
    const rightAns = Math.max(pathSum(root.right), 0);

    ans = Math.max(ans, root.val + leftAns + rightAns);

    return root.val + Math.max(leftAns, rightAns);
  }

  pathSum(root);

  return ans;
};