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