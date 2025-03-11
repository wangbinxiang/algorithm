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


function isSymmetric(root: TreeNode | null): boolean {
  if (root === null) {
    return false;
  }

  // left
  // right

  //

  const symmetric = (left: TreeNode | null, right: TreeNode | null): boolean => {
    if (left === null && right === null) {
      return true;
    }

    if (left && right && left.val === right.val) {
      const lRes = symmetric(left.left, right.right);
      const rRes = symmetric(left.right, right.left);
      if (!lRes || !rRes) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }



  return symmetric(root.left, root.right);
};


function isSymmetric1(root: TreeNode | null): boolean {
  if (root === null) {
    return false;
  }
  const queue: (TreeNode | null)[] = [];
  queue.push(root.left);
  queue.push(root.right);
  while (queue.length > 0) {
    const left = queue.shift();
    const right = queue.shift();
    if (left === null && right === null) {
      continue;
    }
    if (left && right && left.val === right.val) {
      queue.push(left.left)
      queue.push(right.right)
      queue.push(left.right)
      queue.push(right.left)
    } else {
      return false
    }
  }
  return true;
}