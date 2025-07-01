
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


// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。

// 输入：nums = [-10,-3,0,5,9]
// 输出：[0,-3,9,-10,null,5]
// 解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：

// 输入：nums = [1,3]
// 输出：[3,1]
// 解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。

// 递归解决

// 参数是root

// 左节点是 左边数的中位数
// 右节点数 右边数的中位数
function sortedArrayToBST(nums: number[]): TreeNode | null {


  const right = nums.length - 1;
  const mid = Math.floor(right / 2);
  const head = new TreeNode(nums[mid]);

  const bst = (node: TreeNode, left: number, mid: number, right: number) => {
    console.log(node, left, mid, right)
    if (left !== mid) {
      const lMid = Math.floor((left + mid - 1) / 2);
      console.log("lMid:", lMid, nums[lMid]);
      const lNode = new TreeNode(nums[lMid]);
      node.left = lNode;
      bst(lNode, left, lMid, mid - 1);
    }
    console.log(`${mid} !== ${right}`, mid !== right);
    if (mid !== right) {
      const rMid = Math.floor((right + mid + 1) / 2);
      console.log("rMid:", rMid, nums[rMid]);
      const rNode = new TreeNode(nums[rMid]);
      node.right = rNode
      bst(rNode, mid + 1, rMid, right);
    }
  }

  bst(head, 0, mid, right);

  return head
};


// console.log(sortedArrayToBST([-10, -3, 0, 5, 9]))


function sortedArrayToBST1(nums: number[]): TreeNode | null {

  const bst = (left: number, right: number): TreeNode | null => {
    if (left > right) {
      return null;
    }
    const mid = Math.floor((left + right) / 2)
    const node = new TreeNode(nums[mid]);
    node.left = bst(left, mid - 1);
    node.right = bst(mid + 1, right);

    return node;
  }

  return bst(0, nums.length - 1);
}


// 参数是root
// 左节点是 左边数的中位数
// 右节点是 右边数的中位数
function sortedArrayToBST2(nums: number[]): TreeNode | null {

  const bst = (l: number, r: number): TreeNode | null => {
    if (l > r) {
      return null
    }
    const mid = Math.floor((l + r) / 2)
    const node = new TreeNode(nums[mid])

    node.left = bst(l, mid - 1)
    node.right = bst(mid + 1, r)

    return node
  }

  return bst(0, nums.length - 1);
}


function sortedArrayToBST3(nums: number[]): TreeNode | null {
  const len = nums.length
  if (len === 0) {
    return null
  }
  const dfs = (left: number, right: number): TreeNode => {
    if (left > right) {
      return null
    }
    const mid = Math.floor(left + (right - left) / 2)
    const node = new TreeNode(nums[mid])
    node.left = dfs(left, mid - 1)
    node.right = dfs(mid + 1, right)

    return node
  }

  return dfs(0, len - 1)
}


console.log(sortedArrayToBST2([-10, -3, 0, 5, 9]))