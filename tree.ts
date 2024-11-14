// 二叉树

// 根结点： 位于二叉树顶层的节点，没有父节点。
// 叶节点： 没有子节点的节点，其两个指针均指向None。
// 完美二叉树： 所有层的节点都被完全填满。
// 完全二叉树： 只有底层的节点未被填满，且最底层节点尽量靠左填充。
// 完满二叉树： 除了叶节点之外，其余所有节点都有两个子节点。 
// 平衡二叉树： 任意节点的左子树和右子树的高度之差绝对值不超过1.


// 层序遍历
// 广度优先遍历


class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(value: number) {
    this.value = value;
  }
}


const levelOrder = (root: TreeNode): number[] => {
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.value)
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return result;
}

// 前序遍历，先读区父节点
// 中序遍历，父节点中间读取，先读区左子节点
// 后序遍历，父节点最后读取，先读区左子节点

const preOrder = (root: TreeNode | null): number[] => {
  const result: number[] = [];
  const dfs = (root: TreeNode | null): void => {
    if (root) {
      result.push(root.value);
      dfs(root.left);
      dfs(root.right);
    }
  }
  dfs(root);
  return result;
}

const preOrderTraversal = (root: TreeNode): number[] => {
  const result: number[] = [];
  const stack: TreeNode[] = []; // 存储排序后的node
  let node: TreeNode | null = root;
  while (node || stack.length > 0) {
    while (node) {
      result.push(node.value);
      stack.push(node);
      node = node.left
    }
    node = stack.pop()?.right!;
  }
  return result;
}

const inOrder = (root: TreeNode | null): number[] => {
  const result: number[] = [];

  const dfs = (root: TreeNode | null): void => {
    if (!root) {
      return;
    }
    dfs(root.left);
    result.push(root.value);
    dfs(root.right);
  }
  dfs(root);
  return result;
}

const inOrderTraversal = (root: TreeNode): number[] => {
  const result: number[] = [];
  const stack: TreeNode[] = [];

  let node: TreeNode | undefined | null = root;
  while (node || stack.length > 0) {
    while (node) {
      stack.push(node)
      node = node.left;
    }
    node = stack.pop();
    if (node) {
      result.push(node.value);
      node = node.right;
    }
  }
  return result;
}

const inOrderWhile = (root: TreeNode): number[] => {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let node: TreeNode | null = root;
  while (node || stack.length > 0) {
    while (node) {
      stack.push(node);
      node = node.left;

    }
    node = stack.pop() as TreeNode;
    result.push(node.value);
    node = node.right;
  }


  return result;
}

const postOrder = (root: TreeNode | null): number[] => {
  const result: number[] = [];

  const dfs = (root: TreeNode | null) => {
    if (!root) {
      return result;
    }

    dfs(root.left);
    dfs(root.right);
    result.push(root.value);
  }
  dfs(root);
  return result;
}

const postOrderWhile = (root: TreeNode): number[] => {
  const result: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node) {
      result.push(node?.value)
      if (node.left) {
        stack.push()
      }
    }
  }
  return result;
}

const postOrderTraversal = (root: TreeNode): number[] => {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let lastNode: TreeNode | null = null;

  let node: TreeNode | null = root;
  while (node || stack.length > 0) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    const peekNode = stack[stack.length - 1]!;
    if (peekNode.right && peekNode.right !== lastNode) {
      node = peekNode.right;
    } else {
      result.push(peekNode.value);
      lastNode = stack.pop()!;
    }

  }

  return result;
}

const postOrderTraversalAI = (root: TreeNode): number[] => {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let lastNode: TreeNode | null = null;

  let node: TreeNode | null = root;
  while (node || stack.length > 0) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    const peekNode = stack[stack.length - 1];
    if (peekNode.right && lastNode != peekNode.right) {
      node = peekNode.right;
    } else {
      result.push(peekNode.value);
      lastNode = stack.pop()!;
    }

  }

  return result;
}



const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];


// let val;
// let root = new TreeNode(0);
// let curr = root;
// while (arr.length) {
//   const left = arr.shift();
//   if (left) {
//     curr.left = new TreeNode(left);
//   }
//   const right = arr.shift();
//   if (right) {
//     curr.right = new TreeNode(right);;
//   }
//   if (curr.left) {
//     curr = curr.left;
//   }
// }
// console.log(root);
// console.log(inOrderWhile(root))



const buildTree = (nums: number[]): TreeNode | null => {
  let i = 0;


  const dfs = (i: number): TreeNode | null => {
    if (nums[i] === void 0) {
      return null;
    }
    const root = new TreeNode(nums[i]);

    root.left = dfs(i * 2 + 1);
    root.right = dfs(i * 2 + 2);
    return root;
  }

  return dfs(0);
}
const root = buildTree(arr);
// console.log(root);

console.log(postOrder(root!));