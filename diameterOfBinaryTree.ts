
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




function diameterOfBinaryTree(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }
  const map = new Map<TreeNode, { left: number, right: number }>;
  const queue: TreeNode[] = [];
  queue.push(root)
  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      let left = 0;
      if (node.left) {
        queue.push(node.left);
        left = 1;
      }
      let right = 0;
      if (node.right) {
        queue.push(node.right);
        right = 1;
      }
      map.set(node, { left, right });
    }
  }


  return 0;
};


function diameterOfBinaryTree1(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }
  let ans = 0
  const depth = (node: TreeNode | null) => {
    if (node === null) {
      return 0;
    }

    const left = depth(node.left);
    const right = depth(node.right);

    ans = Math.max(ans, left + right);

    return Math.max(left, right) + 1;
  }

  depth(root);

  return ans;
}



function diameterOfBinaryTree3(root: TreeNode | null): number {
  let maxAns = 0;


  const depth = (root: TreeNode | null): number => {
    if (root === null) {
      return 0;
    }
    let ans = 1;

    const left = depth(root.left);
    const right = depth(root.right);
    left + right

    maxAns = Math.max(maxAns, left + right);


    return ans + Math.max(left, right);
  }

  depth(root);
  return maxAns;
}


function diameterOfBinaryTree4(root: TreeNode | null): number {
  let maxAns = 0;



  return maxAns;
}