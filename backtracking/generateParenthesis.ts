// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合

function generateParenthesis(n: number): string[] {
  const ans: string[] = [];
  const output: string[] = [];
  // ()

  const dfs = (left: number, right: number) => {
    if (left === n) {
      console.log("output:", output)
      for (let i = right; i < n; i++) {
        output.push(')')
      }
      ans.push(output.join(''));
      for (let i = right; i < n; i++) {
        output.pop()
      }
      return;
    }
    output.push('(')
    dfs(left + 1, right)

    if (left + 1 < n) {
      output.push(')')
      dfs(left + 1, right + 1)
      output.pop()
    }
    output.pop()
  }

  dfs(0, 0)

  return ans;
};


function generateParenthesis1(n: number): string[] {
  const ans: string[] = [];
  const output: string[] = [];
  // ()

  const dfs = (left: number, right: number) => {
    console.log('left:', left, 'right:', right)
    if (left === n && right === n) {
      ans.push(output.join(''));
      return;
    }
    let l = left;
    if (l + 1 < n) {
      l++;
      output.push('(')
      dfs(l, right);
    }

    for (let i = 0; i < l - right; i++) {
      output.push(')')
      dfs(l, right + i);
    }

    for (let i = 0; i < l - right; i++) {
      output.pop()
    }

    if (l !== left) {
      output.pop()
    }
  }

  dfs(0, 0)

  return ans;
};

// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]


// 输入：n = 1
// 输出：["()"]


function generateParenthesis2(n: number): string[] {
  const ans: string[] = [];
  const output: string[] = [];


  const dfs = (left: number, right: number) => {
    console.log('output', output, left, right)
    if (left === n && right === n) {
      ans.push(output.join(''));
      return;
    }
    let r = right
    let l = left
    if (r < left) {
      output.push(')')
      r = r + 1;
      console.log('right dfs', r)
      dfs(left, r)
    }
    for (let i = left; i < n; i++) {
      output.push('(')
      l++;
      console.log('left dfs', l, i, n, left, right, output)
      dfs(l, r)
    }
    for (let i = left; i < n; i++) {
      output.pop()
    }
    if (r > right) {
      output.pop()
    }
  }


  dfs(0, 0);


  return ans;
}


function generateParenthesis3(n: number): string[] {
  const ans: string[] = [];
  const output: string[] = [];


  const dfs = (left: number, right: number) => {
    if (left === n && right === n) {
      ans.push(output.join(''));
      return;
    }
    let r = right;
    let l = left;
    if (r < l) {
      output.push(')')
      dfs(l, r + 1);
      output.pop()
    }
    if (l < n) {
      output.push('(')
      dfs(l + 1, r);
      output.pop();
    }
  }
  dfs(0, 0);

  return ans;
}


function generateParenthesis4(n: number): string[] {
  const ans: string[] = []
  // let res: string[] = []
  const dfs = (curr: string, left: number, right: number) => {
    if (right === n && left === n) {
      ans.push(curr)
      return
    }
    if (left < n) {
      // console.log('add (')
      // res.push('(')
      // console.log(res)
      dfs(curr + '(', left + 1, right)
      // res.pop()
      // console.log('remove (')
      // console.log(res)
    }
    if (right < n && left > right) {
      // console.log('add )')

      // res.push(')')
      // console.log(res)
      dfs(curr + ')', left, right + 1)
      // res.pop()
      // console.log('remove )')
      // console.log(res)
    }

  }
  dfs("", 0, 0)

  return ans
}

console.log(generateParenthesis4(3))