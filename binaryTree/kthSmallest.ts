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





function kthSmallest(root: TreeNode | null, k: number): number {

  const stack: TreeNode[] = [];
  let node = root;
  let n = k;
  // 后续遍历
  while (stack.length || node !== null) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop()!;
    n--;
    if (n === 0) {
      break;
    }
    node = node.right;

  }
  return k;
};


// 中序遍历，计数K
function kthSmallest1(root: TreeNode | null, k: number): number {
  // 递归查询
  let count = 0;
  let ans = 0;
  const help = (node: TreeNode | null) => {
    if (node === null) {
      return
    }
    help(node.left)
    count++
    if (count === k) {
      ans = node.val
      throw new Error()
    }
    help(node.right)
  }
  try {
    help(root)
  } catch (e) {
    console.log(e)
  }

  return ans;
}


// 

function kthSmallest2(root: TreeNode | null, k: number): number {
  let ans = 0
  let i = 0
  const dfs = (node: TreeNode | null) {
    if (node === null) {
      return
    }
    dfs(node.left)
    i++
    if (i === k) {
      ans = node.val
    } else {
      dfs(node.right)
    }
  }

  dfs(root)
  return ans
}



function kthSmallest3(root: TreeNode | null, k: number): number {
  let i = 0
  let ans = 0;
  const stack: TreeNode[] = []
  let current = root
  while (stack.length || current) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    const node = stack.pop()
    i++
    if (i === k) {
      ans = node.val
      break
    }
    current = node.right
  }

  return 0
}