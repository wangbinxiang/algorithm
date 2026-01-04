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



function isSymmetric2(root: TreeNode | null): boolean {
  let ans = true
  if (root === null) {
    return ans
  }

  const dfs = (left: TreeNode | null, right: TreeNode | null) => {
    if (left === null && right === null) {
      return
    }
    if (left === null || right === null || left.val !== right.val) {
      ans = false
      return
    }
    dfs(left.left, right.right)
    dfs(left.right, right.left)
  }

  dfs(root.left, root.right)
  return ans
}


function isSymmetric3(root: TreeNode | null): boolean {
  let ans = true
  if (root === null) {
    return ans
  }

  const queue: (TreeNode | null)[][] = [[root.left, root.right]]

  while (queue.length) {
    const [left, right] = queue.shift()
    if (left === null && right === null) {
      continue
    }
    if (left === null || right === null || left.val !== right.val) {
      ans = false
      break
    }
    queue.push([left.left, right.right], [left.right, right.left])
  }



  return ans
}



function isSymmetric4(root: TreeNode | null): boolean {

  const leftQueue: (TreeNode | null)[] = [root.left];
  const rightQueue: (TreeNode | null)[] = [root.right];

  while (leftQueue.length && rightQueue.length) {
    const left = leftQueue.shift();
    const right = rightQueue.shift();
    if (left === null && right === null) {
      continue;
    }
    if (left === null || right === null || left.val !== right.val) {
      return false;
    }
    if (left) {
      leftQueue.push(left.left);
      rightQueue.push(right.right);
      rightQueue.push(left.right);
      leftQueue.push(right.left);
    }
  }


  return true;
};


function isSymmetric5(root: TreeNode | null): boolean {
  let ans = true;

  const dfs = (left: TreeNode | null, right: TreeNode | null) => {
    if ((left === null && right === null) || !ans) {
      return;
    }
    if (left === null || right === null || left.val !== right.val) {
      ans = false;
    }

    dfs(left.left, right.right);
    dfs(left.right, right.left);
  }
  dfs(root.left, root.right)

  return ans;
};


function isSymmetric6
  (root: TreeNode | null): boolean {
  const queue: (TreeNode | null)[][] = [[root.left, root.right]];
  while (queue.length) {
    const [left, right] = queue.shift();
    if (left !== right && left.val !== right.val) {
      return false;
    }
    if (left && right) {
      queue.push([left.left, right.right], [left.right, right.left])
    }
  }



  return true;
};