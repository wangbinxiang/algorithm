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