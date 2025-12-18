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


// function invertTree(root: TreeNodeInvert | null): TreeNodeInvert | null {
//   if (root === null) {
//     return root;
//   }

//   const invert = (root: TreeNodeInvert) => {
//     [root.left, root.right] = [root.right, root.left];
//     if (root.left) {
//       invert(root.left);
//     }
//     if (root.right) {
//       invert(root.right);
//     }
//   }


//   return root;

// }


function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return root;
  }


  const queue: TreeNode[] = [];

  queue.push(root);
  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      [node.left, node.right] = [node.right, node.left];
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return root
}


function invertTree1(root: TreeNode | null): TreeNode | null {
  const dfs = (node: TreeNode | null) => {
    if (node === null) {
      return
    }

    const left = node.left
    node.left = node.right
    node.right = left
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return root
}


function invertTree2(root: TreeNode | null): TreeNode | null {
  const queue: (TreeNode | null)[] = [root]

  while (queue.length) {
    const node = queue.shift()
    if (node) {
      const left = node.left
      node.left = node.right
      node.right = left
      queue.push(node.left, node.right)
    }
  }

  return root
}


function invertTree3(root: TreeNode | null): TreeNode | null {
  const dfs = (node: TreeNode | null) => {
    if (node === null) {
      return;
    }

    const tmp = node.left;
    node.left = node.right;
    node.right = tmp;
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root)

  return root;
};