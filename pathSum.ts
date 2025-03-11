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