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



// 中序遍历
function rightSideView(root: TreeNode | null): number[] {
  const map = new Map<number, number>();
  const list: number[] = [];
  const inOrder = (root: TreeNode | null, level: number) => {
    if (root === null) {
      return;
    }
    inOrder(root.left, level + 1)
    map.set(level, root.val)
    inOrder(root.right, level + 1)
  }

  inOrder(root, 0);


  map.forEach((item, index) => {
    list[index] = item
  })

  return list
};

// 后续遍历
function rightSideView1(root: TreeNode | null): number[] {
  const map = new Map<number, number>();
  const list: number[] = [];
  const rightOrder = (root: TreeNode | null, level) => {
    if (root === null) {
      return root
    }
    if (!map.has(level)) {
      map.set(level, root.val);
    }
    rightOrder(root.right, level + 1);
    rightOrder(root.left, level + 1);

  }
  rightOrder(root, 0)

  map.forEach((item, index) => {
    list[index] = item
  })

  return list
}

interface StackNode {
  node: TreeNode;
  depth: number;
}

function rightSideView11(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  const list: number[] = [];
  const map = new Map<number, number>();
  const stack: StackNode[] = [];
  stack.push({ node: root, depth: 0 })
  while (stack.length > 0) {
    let p = stack.pop()!
    map.set(p.depth, p.node.val);
    if (p.node.right) {
      stack.push({ node: p.node.right, depth: p.depth + 1 })
    }
    if (p.node.left) {
      stack.push({ node: p.node.left, depth: p.depth + 1 })
    }
  }

  map.forEach((item, index) => {
    list[index] = item
  })

  return list;
}


function rightSideView12(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  const list: number[] = [];
  const map = new Map<number, number>();
  const stack: StackNode[] = [];
  stack.push({ node: root, depth: 0 })
  while (stack.length > 0) {
    let p = stack.pop()!
    if (!map.has(p.depth)) {
      map.set(p.depth, p.node.val);
    }
    if (p.node.left) {
      stack.push({ node: p.node.left, depth: p.depth + 1 })
    }
    if (p.node.right) {
      stack.push({ node: p.node.right, depth: p.depth + 1 })
    }
  }

  map.forEach((item, index) => {
    list[index] = item
  })

  return list;
}


function rightSideView13(root: TreeNode | null): number[] {
  const ans: number[] = []
  const help = (node: TreeNode | null, level) => {
    if (node === null) {
      return
    }
    if (level > ans.length) {
      ans.push(node.val)
    }
    help(node.right, level + 1)
    help(node.left, level + 1)
  }

  help(root, 1)
  return ans;
}


function rightSideView14(root: TreeNode | null): number[] {
  const ans: number[] = []
  const dfs = (node: TreeNode | null, level: number) => {
    if (node === null) {
      return
    }
    if (ans[level] === undefined) {
      ans[level] = node.val
    }
    dfs(node.right, level + 1)
    dfs(node.left, level + 1)
  }

  dfs(root, 0)
  return ans
}




function rightSideView15(root: TreeNode | null): number[] {
  const ans: number[] = [];


  const dfs = (node: TreeNode | null, level: number) => {
    if (node === null) {
      return;
    }
    if (ans[level] === void 0) {
      ans.push(node.val);
    }
    dfs(node.right, level + 1);
    dfs(node.left, level + 1);
  }
  dfs(root, 0);


  return ans;
};


function rightSideView16(root: TreeNode | null): number[] {
  const ans: number[] = [];
  const queue: number[] = [];
  let node = root;

  while (queue.length || node) {

  }




  return ans;
};