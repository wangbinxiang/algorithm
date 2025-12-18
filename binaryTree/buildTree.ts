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


// 前序遍历，第一个节点是根节点
// 前序遍历，第二个节点是左节点
// 使用map存储中序遍历每个值在中序遍历数组中的位置
// 通过前序遍历获取的根节点的值，获取根节点在中序遍历数组中的位置，这个位置左边的长度就是取左子树的长度
// 通过这个左子树的长度，就能根据前序遍历数组中，根节点的位置+左子树长度获取右节点位置
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {

  const inorderMap = new Map<number, number>();
  inorder.forEach((value, index) => inorderMap.set(value, index));


  const build = (preStart: number, preEnd: number, inStart: number): TreeNode | null => {
    if (preStart > preEnd) {
      return null
    }

    const root = new TreeNode(preorder[preStart]);

    const inorderIndex = inorderMap.get(preorder[preStart])!;

    const left = inorderIndex - inStart;

    root.left = build(preStart + 1, preStart + left, inStart);

    root.right = build(preStart + left + 1, preEnd, inorderIndex + 1)

    return root;
  }

  return build(0, preorder.length - 1, 0);
};



function buildTree1(preorder: number[], inorder: number[]): TreeNode | null {
  const root = new TreeNode(preorder[0])

  const inorderMap = new Map()
  inorder.forEach((item, index) => {
    inorderMap.set(item, index)
  })

  const dfs = (left: number, right: number, inorderStart: number): TreeNode | null => {
    if (left > right) {
      return null
    }

    const node = new TreeNode(preorder[left])
    const inorderIndex = inorderMap.get(preorder[left])
    const leftLen = inorderIndex - inorderStart

    node.left = dfs(left + 1, left + leftLen, inorderStart)
    node.right = dfs(left + leftLen + 1, right, inorderIndex + 1)

    return node
  }

  return dfs(0, preorder.length - 1, 0)
}



function buildTree2(preorder: number[], inorder: number[]): TreeNode | null {
  const map = new Map<number, number>()
  inorder.forEach((item, index) => {
    map.set(item, index)
  })

  const dfs = (left: number, right: number, inorderStart: number): TreeNode | null => {
    if (left > right) {
      return null
    }
    const node = new TreeNode(preorder[left])
    const indexOrder = map.get(node.val)
    const leftLen = indexOrder - inorderStart
    node.left = dfs(left + 1, left + leftLen, inorderStart)
    node.right = dfs(left + leftLen + 1, right, indexOrder + 1)

    return node
  }


  return dfs(0, preorder.length - 1, 0)
}



function buildTree3(preorder: number[], inorder: number[]): TreeNode | null {

  const map: Map<number, number> = new Map();
  const n = inorder.length;

  for (let i = 0; i < n; i++) {
    map.set(inorder[i], i);
  }

  const dfs = (l: number, r: number, inorderStart: number): TreeNode | null => {
    if (l > r) {
      return null
    }
    const node = new TreeNode(preorder[l]);
    const inorderIndex = map.get(node.val);
    const leftLen = inorderIndex - inorderStart;
    node.left = dfs(l + 1, l + leftLen, inorderStart);
    node.right = dfs(l + leftLen + 1, r, inorderIndex + 1);
    return node;
  }

  return dfs(0, n - 1, 0);
};

function buildTree4(preorder: number[], inorder: number[]): TreeNode | null {
  const n = preorder.length;
  const map = new Map<number, number>();
  inorder.forEach((val, index) => map.set(val, index));


  const dfs = (l: number, r: number, inorderStart: number) => {
    if (l > r) {
      return null
    }
    const node = new TreeNode(preorder[l]);
    const inorderIndex = map.get(preorder[l]);
    const leftLen = inorderIndex - inorderStart;
    node.left = dfs(l + 1, l + leftLen, inorderStart);
    node.right = dfs(l + leftLen + 1, r, inorderIndex + 1);
    return node;
  }


  return null;
};

// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// 输出: [3,9,20,null,null,15,7]