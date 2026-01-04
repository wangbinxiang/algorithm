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



function maxPathSum1(root: TreeNode | null): number {
  let ans = -Infinity
  const help = (node: TreeNode | null): number => {
    if (node === null) {
      return 0
    }
    let pathSum = node.val
    if (pathSum > ans) {
      ans = pathSum
    }

    const left = help(node.left)
    if (left > 0) {
      pathSum += left
      if (pathSum > ans) {
        ans = pathSum
      }
    }
    const right = help(node.right)
    if (right > 0) {
      pathSum += right
      if (pathSum > ans) {
        ans = pathSum
      }
    }

    if (left > 0 || right > 0) {
      return node.val + Math.max(left, right)
    } else {
      return node.val
    }
  }
  help(root)

  return ans
}



function maxPathSum2(root: TreeNode | null): number {
  let ans = -Infinity
  const dfs = (node: TreeNode | null): number => {
    if (node === null) {
      return 0
    }
    if (node.val > ans) {
      ans = node.val
    }
    const left = dfs(node.left)
    const right = dfs(node.right)
    const count = node.val + left + right;
    if (count > ans) {
      ans = count
    }
    const res = node.val + (left > right ? left : right)
    if (res > ans) {
      ans = res
    }
    return node.val + (left > 0 && right > 0 && (left > right ? left : right));
  }

  dfs(root)
  return ans
}


function maxPathSum3(root: TreeNode | null): number {
  let ans = - Infinity
  const dfs = (node: TreeNode | null): number => {
    if (node === null) {
      return 0
    }

    if (node.val > ans) {
      ans = node.val
    }

    const left = Math.max(0, dfs(node.left))
    const right = Math.max(0, dfs(node.right))

    const count = node.val + left + right
    if (count > ans) {
      ans = count
    }

    return node.val + (left > right ? left : right)
  }


  dfs(root)
  return ans;
}



function maxPathSum4(root: TreeNode | null): number {
  let ans = -Infinity;

  const dfs = (node: TreeNode | null) => {
    if (node === null) {
      return 0;
    }
    const val = node.val;
    const left = dfs(node.left);
    const right = dfs(node.right);
    const count = val + (left > 0 ? left : 0) + (right > 0 ? right : 0);
    if (count > ans) {
      ans = count;
    }

    const current = left > right ? left : right;
    if (current + val > val) {
      return current + val;
    } else {
      return val;
    }
  }

  dfs(root);


  return ans;
};


function maxPathSum5(root: TreeNode | null): number {
  let ans = -Infinity;

  const dfs = (node: TreeNode | null) => {
    if (node === null) {
      return 0;
    }
    const left = Math.max(dfs(node.left), 0);
    const right = Math.max(dfs(node.right), 0);
    const count = node.val + left + right;
    if (count > ans) {
      ans = count;
    }
    return node.val + Math.max(left, right);
  }

  dfs(root);


  return ans;
};