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



function lowestCommonAncestor1(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  let ans: TreeNode | null = null

  const help = (node: TreeNode | null): number => {
    let count = 0
    if (node === null) {
      return count
    }
    if (node.val === p.val || node.val === q.val) {
      count++
    }
    count += help(node.left)
    if (count === 2 && ans === null) {
      ans = node
      return count
    }
    count += help(node.right)
    if (count === 2 && ans === null) {
      ans = node
    }
    return count
  }

  help(root)

  return ans
}



function lowestCommonAncestor2(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {

  const dfs = (node: TreeNode | null): TreeNode | null => {
    if (root === null || root === p || root === q) {
      return root
    }

    const left = dfs(node.left)
    const right = dfs(node.right)

    if (left && right) {
      return node
    }

    return left || right
  }


  return dfs(root)
}