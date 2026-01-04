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


/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  // 当前节点的右节点的前驱节点是，当前节点的左节点的最右边节点
  // 找到前驱节点后迭代获取下一个前驱节点

  let curr = root;
  while (curr) {
    let next = curr.left;
    if (next) {
      let pre = next;
      while (pre.right) {
        pre = pre.right
      }
      pre.right = curr.right;
      curr.left = null;
      curr.right = next;
    }
    curr = curr.right;
  }
};

// 增加数组，前序遍历时向数组添加数据，最后整合成链表，递归实现
function flatten1(root: TreeNode | null): void {
  if (root === null) {
    return;
  }
  const list: TreeNode[] = [];

  const preOrder = (root: TreeNode | null): TreeNode | null => {
    if (root === null) {
      return root;
    }

    list.push(root);

    preOrder(root.left);
    preOrder(root.right);

    return null;
  }
  preOrder(root);
  let p: TreeNode = root;
  for (let i = 1; i < list.length; i++) {
    p.left = null;
    p.right = list[i];
    p = p.right;
  }
}

// 前序遍历向数组添加数据，最后合成链表，迭代实现
function flatten11(root: TreeNode | null): void {
  if (root === null) {
    return;
  }
  const stack: TreeNode[] = [];

  let p: TreeNode | null = root;
  // 迭代获取到最后的right
  while (p) {
    if (p.right) {
      stack.push(p.right)
    }
    if (p.left) {
      p.right = p.left;
      p.left = null;
      p = p.right;
    } else {
      const next = stack.pop()
      if (next) {
        p.right = next;
        p = p.right;
      } else {
        p = null;
      }
    }
  }
}

// 增加栈，迭代时将右节点存放在栈里进行切换链表
function flatten2(root: TreeNode | null): void {
  if (root === null) {
    return
  }
  const stack: TreeNode[] = []
  let p: TreeNode | null = root;
  while (p) {
    if (p.right) {
      stack.push(p.right)
    }
    if (p.left) {
      p.right = p.left;
      p.left = null;
      p = p.right
    } else {
      const next = stack.pop()
      if (next) {
        p.right = next;
        p = p.right;
      } else {
        p = null;
      }
    }
  }
}

// 递归解决
function flatten3(root: TreeNode | null): void {

  let preNode: TreeNode | null = null;
  const preOrder = (root: TreeNode | null): void => {
    if (root === null) {
      return;
    }
    preOrder(root.right);
    preOrder(root.left);

    root.left = null;
    root.right = preNode;
    preNode = root;
  }


  preOrder(root);
}


function flatten4(root: TreeNode | null): void {
  if (root === null) {
    return
  }

  let current = root
  while (current) {
    if (current.left) {
      const tmp = current.right
      current.right = current.left
      current.left = null
      if (tmp) {
        let right = current.right
        while (right.right) {
          right = right.right
        }
        right.right = tmp
      }
    }
    current = current.right
  }
}


function flatten5(root: TreeNode | null): void {

  const dfs = (node: TreeNode | null) => {
    if (node === null) {
      return;
    }

    if (node.left !== null) {
      const right = node.right;
      node.right = node.left;
      node.left = null;
      let leftRight = node.right;
      while (leftRight.right !== null) {
        leftRight = leftRight.right;
      }
      leftRight.right = right;
    }
    dfs(node.right);

  }

  dfs(root);
};


function flatten6(root: TreeNode | null): void {
  let node = root;

  while (node) {
    if (node.left) {
      let left = node.left;
      const right = node.right;
      let current = left;
      while (current.right) {
        current = current.right;
      }
      current.right = right;
      node.right = left;
      node.left = null;
      node = left;
    } else {
      node = node.right;
    }
  }
};