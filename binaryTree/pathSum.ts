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

// 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

// 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

// function pathSum(root: TreeNode | null, targetSum: number): number {
//   let targetN = 0;
//   const deep = (root: TreeNode | null, count: number, left: boolean) => {
//     if (root === null) {
//       return;
//     }
//     const newCount = count + root.val;
//     if (newCount === targetSum) {
//       targetN++;
//     }
//     if (left) {
//       deep(root.left, newCount, true);
//     } else {
//       deep(root.right, newCount, false);
//     }
//     deep(root.left, root.val, true);
//     deep(root.right, 0, false);
//   }
//   deep(root, 0, true);
//   return targetN;
// };

// 双层嵌套解决问题
function pathSum(root: TreeNode | null, targetSum: number): number {
  if (root === null) {
    return 0;
  }



  let targetN = 0;

  targetN += deep(root, targetSum);

  targetN += pathSum(root.left, targetSum);
  targetN += pathSum(root.right, targetSum);

  return targetN;
};

const deep = (root: TreeNode | null, targetSum: number) => {
  if (root === null) {
    return 0;
  }
  let targetN = 0;

  if (root.val === targetSum) {
    targetN++;
  }

  targetN += deep(root.left, targetSum - root.val);
  targetN += deep(root.right, targetSum - root.val);

  return targetN;
}



// 类似数组的路径和问题
function pathSum1(root: TreeNode | null, targetSum: number): number {
  let ans = 0
  const map = new Map()
  map.set(0, 1)

  const dep = (node: TreeNode | null, count: number) => {
    if (node === null) {
      return
    }
    count += node.val
    const target = map.get(count - targetSum)
    if (target) {
      ans += target
    }
    const c = map.get(count) || 0
    map.set(count, c + 1)
    dep(node.left, count)
    dep(node.right, count)
    map.set(count, c)
  }
  dep(root, 0)
  return ans;
}


function pathSum2(root: TreeNode | null, targetSum: number): number {
  let ans = 0
  const map = new Map<number, number>()
  map.set(0, 1)

  const dfs = (node: TreeNode | null, preSum: number) => {
    if (node === null) {
      return
    }

    const sum = preSum + node.val
    const res = sum - targetSum
    const count = map.get(res) ?? 0
    if (count > 0) {
      ans += count
    }

    const sumCount = map.get(sum) ?? 0
    map.set(sum, sumCount + 1)
    dfs(node.left, sum)
    dfs(node.right, sum)
    map.set(sum, sumCount)

  }
  dfs(root, 0)

  return ans
}


function pathSum3(root: TreeNode | null, targetSum: number): number {
  let ans = 0;
  const map = new Map<number, number>();
  map.set(0, 1);


  const dfs = (node: TreeNode | null, preSum: number) => {
    if (node === null) {
      return;
    }

    const currentSum = preSum + node.val;
    const target = currentSum - targetSum;

    const count = map.get(target);

    if (count) {
      ans += count;
    }

    const currentCount = map.get(currentSum) ?? 0;
    map.set(currentSum, currentCount + 1);
    dfs(node.left, currentSum);
    dfs(node.right, currentSum);
    map.set(currentSum, currentCount);
  }
  dfs(root, 0);

  return ans;
};


function pathSum4(root: TreeNode | null, targetSum: number): number {
  let ans = 0;
  const map = new Map<number, number>();
  map.set(0, 1);

  const dfs = (node: TreeNode | null, preSum) => {
    if (node === null) {
      return;
    }

    const currentSum = preSum + node.val;
    const target = currentSum - targetSum;
    if (map.get(target)) {
      ans += map.get(target);
    }

    const currentCount = map.get(currentSum) ?? 0;
    map.set(currentSum, currentCount + 1);
    dfs(node.left, currentSum);
    dfs(node.right, currentSum);
    map.set(currentSum, currentCount);
  }

  dfs(root, 0);


  return ans;
};


function pathSum5(root: TreeNode | null, targetSum: number): number {
  let ans = 0;
  const map = new Map<number, number>();
  map.set(0, 1);

  const dfs = (node: TreeNode | null, count: number) => {
    if (node === null) {
      return 0;
    }
    count += node.val;
    const k = count - targetSum;

    if (map.has(k)) {
      ans += map.get(k);
    }
    const tmp = map.get(count) ?? 0;
    map.set(count, tmp + 1);
    dfs(node.left, count);
    dfs(node.right, count);
    map.set(count, tmp);
  }

  dfs(root, 0);


  return ans;
};