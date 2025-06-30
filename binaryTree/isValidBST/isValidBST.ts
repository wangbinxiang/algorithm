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




function isValidBST(root: TreeNode | null): boolean {
  const leftQueue: { parent: TreeNode, node: TreeNode, minParentVal?: number }[] = [];
  const rightQueue: { parent: TreeNode, node: TreeNode, }[] = [];

  if (root === null) {
    return false;
  }

  if (root.left) {
    if (root.left.val < root.val) {
      leftQueue.push({ parent: root, node: root.left })
    } else {
      return false;
    }
  }

  if (root.right) {
    if (root.right.val > root.val) {
      rightQueue.push({ parent: root, node: root.right })
    } else {
      return false;
    }
  }

  while (leftQueue.length) {
    const leftNode = leftQueue.shift();
    if (leftNode) {
      if (leftNode.node.left) {
        if (leftNode.node.left.val < leftNode.node.val) {
          leftQueue.push({ parent: leftNode.node, node: leftNode.node.left })
        } else {
          return false;
        }
      }
      if (leftNode.node.right) {
        if (leftNode.node.right.val > leftNode.node.val && leftNode.node.right.val < leftNode.parent.val) {
          leftQueue.push({ parent: leftNode.node, node: leftNode.node.right })
        } else {
          return false;
        }
      }
    }
  }


  while (rightQueue.length) {
    const rightNode = rightQueue.shift();
    if (rightNode) {
      if (rightNode.node.left) {
        if (rightNode.node.left.val < rightNode.node.val && rightNode.node.left.val > rightNode.parent.val) {
          rightQueue.push({ parent: rightNode.node, node: rightNode.node.left })
        } else {
          return false;
        }
      }

      if (rightNode.node.right) {
        if (rightNode.node.right.val > rightNode.node.val) {
          rightQueue.push({ parent: rightNode.node, node: rightNode.node.right })
        } else {
          return false;
        }
      }
    }
  }



  return true;
};




function isValidBST1(root: TreeNode | null): boolean {


  const bst = (root: TreeNode | null, lower: number, upper: number): boolean => {
    if (root === null) {
      return true;
    }

    if (root.val <= lower || root.val >= upper) {
      return false;
    }

    return bst(root.left, lower, root.val) && bst(root.right, root.val, upper);
  }


  return bst(root, -Infinity, + Infinity);
}



function isValidBST2(root: TreeNode | null): boolean {
  const stack: TreeNode[] = [];
  let inOrder = -Infinity;
  let node = root;
  while (stack.length || node) {
    while (node !== null) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop() as TreeNode;
    if (node.val <= inOrder) {
      return false;
    }
    inOrder = node.val;
    node = node.right
  }
  return true;
}


// 中序遍历
function isValidBST3(root: TreeNode | null): boolean {
  let prevVal = -Infinity
  const stack: TreeNode[] = []
  let node = root
  while (stack.length || node) {
    while (node) {
      stack.push(node)
      node = node.left
    }

    const popNode = stack.pop()!
    if (prevVal >= popNode.val) {
      return false;
    }
    prevVal = popNode.val;
    node = popNode.right
  }

  return true;
}

function isValidBST4(root: TreeNode | null): boolean {
  let prevVal = -Infinity
  let ans = true

  const help = (node: TreeNode | null) => {
    if (node.left) {
      help(node.left)
    }
    if (prevVal < node.val) {
      prevVal = node.val
    } else {
      ans = false
      return
    }
    if (node.right) {
      help(node.right)
    }
  }
  help(root)
  return ans
}

function isValidBST5(root: TreeNode | null): boolean {
  const help = (node: TreeNode | null, min: number, max: number) => {
    if (node === null) {
      return true
    }
    if (min >= node.val || node.val >= max) {
      return false
    }
    return help(node.left, min, node.val) && help(node.right, node.val, max)
  }
  return help(root, -Infinity, +Infinity)
}


function isValidBST6(root: TreeNode | null): boolean {
  let ans = true;
  let prevVal = -Infinity

  const dfs = (node: TreeNode | null) => {
    if (node === null) {
      return
    }
    dfs(node.left)
    if (prevVal >= node.val) {
      ans = false
      return
    }
    prevVal = node.val
    dfs(node.right)
  }



  return ans
}


function isValidBST7(root: TreeNode | null): boolean {
  let ans = true
  const stack: TreeNode[] = []
  let current = root
  let prevVal = -Infinity
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    const node = stack.pop()
    if (node.val <= prevVal) {
      ans = false
      break
    }
    prevVal = node.val
    current = node.right
  }


  return ans
}

const root = new TreeNode(2)
root.left = new TreeNode(1)
root.right = new TreeNode(3)

console.log(isValidBST4(root))