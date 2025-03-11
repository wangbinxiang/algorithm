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




function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  let ans: TreeNode | null = null;
  const dfs = (root: TreeNode | null): number => {
    if (root === null) {
      return 0;
    }
    // 当前节点是否是指定节点
    let findNode = 0;
    if (root === p || root === q) {
      findNode++
    }
    findNode += dfs(root.left);
    if (findNode === 2 && ans === null) {
      ans = root;
      return findNode
    }

    findNode += dfs(root.right);
    if (findNode === 2 && ans === null) {
      ans = root;
      return findNode
    }

    return findNode;
  }

  dfs(root);

  return ans;
};