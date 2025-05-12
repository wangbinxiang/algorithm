
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

// 给定一个二叉树 root ，返回其最大深度。

// 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

// 输入：root = [3,9,20,null,null,15,7]
// 输出：3


// 输入：root = [1,null,2]
// 输出：2

function maxDepth(root: TreeNode | null): number {
  let d = 0;
  const depth = (node: TreeNode | null, n: number) => {
    if (node === null) {
      d = Math.max(d, n);
      return;
    }
    n++;
    depth(node.left, n);
    depth(node.right, n);
  }

  depth(root, 0);
  return d;
};


function maxDepth1(root: TreeNode | null): number {
  if (root === null) {
    return 0
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};


function maxDepth2(root: TreeNode | null): number {
  if (root === null) {
    return 0
  }
  let ans = 0;
  // 新建队列
  const queue: TreeNode[] = [];
  queue.push(root);
  while (queue.length > 0) {
    let size = queue.length;
    while (size > 0) {
      const node = queue.shift();
      if (node?.left) {
        queue.push(node.left);
      }
      if (node?.right) {
        queue.push(node.right);
      }
      size--;
    }
    ans++;
  }

  return ans;
};