// 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

// 1 <= n <= 9


interface Point {
  x: number;
  y: number;
}
function solveNQueens(n: number): string[][] {
  const ret: string[][] = [];
  const xSet: Set<number> = new Set();
  // const ySet: Set<number> = new Set();
  const leftSlash: Set<number> = new Set();
  const rightSlash: Set<number> = new Set();

  const ans: Point[] = [];
  const dfs = (i: number) => {
    if (ans.length === n) {
      console.table([...ans]);
      const list: string[] = []
      for (let i = 0; i < n; i++) {
        let str = '';
        for (let j = 0; j < n; j++) {
          if (ans[i].y === j) {
            str += 'Q'
          } else {
            str += '.'
          }
        }
        list.push(str)
      }
      ret.push(list);
      return;
    }
    for (let j = 0; j < n; j++) {
      if (!xSet.has(j) && !leftSlash.has(i + j) && !rightSlash.has(j - i)) {
        xSet.add(j)
        // ySet.add(j)
        leftSlash.add(i + j)
        rightSlash.add(j - i)
        ans.push({ x: i, y: j })
        dfs(i + 1)
        ans.pop()
        xSet.delete(j)
        // ySet.delete(j)
        leftSlash.delete(i + j)
        rightSlash.delete(j - i)
      }
    }
  }
  dfs(0);
  return ret;
};


function solveNQueens1(n: number): string[][] {
  // 初始化n x n的数组个
  const points: number[] = []
  const row = new Set<number>()
  const leftSlash = new Set<number>()
  const rightSlash = new Set<number>()
  const ans: number[][] = []


  const dfs = (line: number) => {
    // console.log(points)
    if (line === n) {
      ans.push([...points])
      return
    }
    for (let i = 0; i < n; i++) {
      if (row.has(i) || leftSlash.has(i - line) || rightSlash.has(1 - n + i + line)) {
        continue
      } else {
        points.push(i)
        row.add(i)
        leftSlash.add(i - line)
        rightSlash.add(1 - n + i + line)
        dfs(line + 1)
        points.pop()
        row.delete(i)
        leftSlash.delete(i - line)
        rightSlash.delete(1 - n + i + line)
      }
    }
  }
  dfs(0)
  // console.log(ans)
  const buildGraph = (ans: number[][]): string[][] => {
    const graphList: string[][] = []
    for (let i = 0; i < ans.length; i++) {
      const arr = ans[i];
      let graph: string[] = []
      for (let j = 0; j < arr.length; j++) {
        const p = arr[j]
        let line = ''
        for (let q = 0; q < n; q++) {
          if (q === p) {
            line += 'Q'
          } else {
            line += '.'
          }
        }
        graph.push(line)
      }
      graphList.push(graph)
    }

    return graphList
  }

  return buildGraph(ans);
}


function solveNQueensBit(n: number): string[][] {

  const dfs = (row: number, cols: number, left: number, right: number, board: number[]) => {
    if (row === n) {
      console.log(board)
      return
    }

    // 初始化当前行位图，与已有位图进行并操作生成生成剩下的有效位图
    let available = ((1 << n) - 1) & ~(cols | left | right)

    // 判断是否还有位置
    while (available) {

      // 获取最后一个有效位，有效位与负有效位进行并操作（负有效位等于有效位的补码）
      const position = available & -available
      // 去掉最后一个有效位
      available &= available - 1

      // 开方获取位置
      const col = Math.log2(position)


      dfs(row + 1, cols | position, (left | position) << 1, (right | position) >> 1, [...board, col])
    }
  }
  dfs(0, 0, 0, 0, [])
  return []
}


function solveNQueensBit1(n: number): string[][] {
  const graph: string[][] = []


  const dfs = (row: number, clos: number, left: number, right: number, board: number[]) => {
    if (row === n) {
      console.log(board)
      return
    }
    // 初始化位图
    // 1 << n  -1 获取n位二进制全为1的数， 
    // ~(col | left | right) ，从列，左对角线，右对角线，合并求出当前行的可以位置位图，然后求反，然后与左边的值进行 并集操作 二进制为1的位就是可用位置
    let available = ((1 << n) - 1) & ~(clos | left | right)

    while (available) {
      // 获取最后一位1的值
      const position = available & -available
      // 移除最后一位1
      available &= available - 1

      const col = Math.log2(position)

      dfs(row + 1, clos | position, (left | position) >> 1, (right | position) << 1, [...board, col])
    }
  }
  dfs(0, 0, 0, 0, [])

  return graph
}






// 使用位图解决该问题
// 使用递归，递归从0开始，
// 参数是col 当前行， cols 纵向已经被占据的列，left(从左上到右下当前行被占据的列) right(从右上到左下当前行被占据的列) boards 之前行所占据的列数组
// 初始化该行位图 使用 (1 << n) - 1获取全为1的位图
// 使用上一行的 cols列位图，left左上到右下位图，right右上到坐下位图的交集求反获取当前行有位置的位图（为1的位是有位置的，该值的问题是n位之前的位也是1）
// 使用全为1的位图并集操作当前行有位置的位图（移除n位之前的1值）可以获取当前行可以设置的位图（为1的就是可以设置的位）available
// 使用while判断 available 不为0是就进行循环
// 使用 available & -available 获取最后一位可以设置的位（-available是available的补吗，就是反码+1，与原值进行并集操作后刚好获取最后一位1的值）position
// 使用 available &= available - 1 来移除最后一位1
// 使用Math.log2(position)获取position的对数 （对数就是指数的逆运算）col, col就是当前行的位置
// 使用cols | col 获取 新的cols, 
// 使用(left | col) >> 1 获取新的 left
// 使用(right | col) << 1 获取新的 right
// 使用 [...boards, position] 获取新的boards
// 然后递归调用
function solveNQueensBit2(n: number): string[][] {
  const ans: string[][] = []
  // 递归解决该问题，每次递归到下一行

  const dfs = (col: number, cols: number, left: number, right: number, boards: number[]) => {
    if
      (col === n) {
      // 已经满足了n行的位置，将位置存入结果
      ans.push(build(boards))
    }
    // 生成当前可选择位置的位图
    let available = ((1 << n) - 1) & ~(cols | left | right)
    while (available) {
      // 获取最后一位可用的位置
      const position = available & -available
      // 移除最后一位可用的位置
      available &= available - 1
      dfs(col + 1, cols | position, (left | position) >> 1, (right | position) << 1, [...boards, Math.log2(position)])
    }
  }


  const build = (boards: number[]): string[] => {
    let ans: string[] = []
    console.log(boards)
    boards.forEach(item => {
      let res = ''
      for (let i = 0; i < n; i++) {
        if (i === item) {
          res += 'Q'
        } else {
          res += '.'
        }
      }
      ans.push(res)
    })
    return ans
  }
  dfs(0, 0, 0, 0, [])

  return ans
}

// 使用3个set分别存储纵向占据的列，左上到右下占据的列，右上到左下占据的列
// 左上到右下位置是 i - j, 右上到左下位置是 i+ + j + 1 - n
function solveNQueens2(n: number): string[][] {

  const cols = new Set<number>()
  const left = new Set<number>()
  const right = new Set<number>()
  const boards: number[] = []
  const ans: string[][] = []
  const dfs = (col: number) => {
    // console.log('col:', col)
    if (col === n) {
      console.log('boards:', boards)
      ans.push(boards.map(item => {
        let str = ''
        for (let i = 0; i < n; i++) {
          if (item === i) {
            str += 'Q'
          } else {
            str += '.'
          }
        }
        return str
      }))


      return
    }
    for (let j = 0; j < n; j++) {
      if (cols.has(j) || left.has(col - j) || right.has(col + j + 1 - n)) {
        continue
      }
      cols.add(j)
      left.add(col - j)
      right.add(col + j + 1 - n)
      boards.push(j)
      dfs(col + 1)
      boards.pop()
      cols.delete(j)
      left.delete(col - j)
      right.delete(col + j + 1 - n)
    }
  }
  dfs(0)
  return ans
}

function solveNQueens3(n: number): string[][] {
  const ans: string[][] = [];
  const leftSet: Set<number> = new Set()
  const rightSet: Set<number> = new Set()
  const colsSet: Set<number> = new Set()
  const queens: number[] = []

  const build = (queens: number[]) => {
    const graph = Array.from({ length: n }, () => Array.from({ length: n }, () => '.'));
    for (let i = 0; i < n; i++) {
      graph[i][queens[i]] = 'Q'
    }
    return graph.map(item => item.join(''))
  }

  const help = (row: number) => {
    if (row === n) {
      ans.push(build(queens))
      return
    }
    for (let i = 0; i < n; i++) {
      const left = i - row
      const right = row - (n - 1) + i
      if (!leftSet.has(left) && !rightSet.has(right) && !colsSet.has(i)) {
        leftSet.add(left)
        rightSet.add(right)
        colsSet.add(i)
        queens.push(i)
        help(row + 1)
        leftSet.delete(left)
        rightSet.delete(right)
        colsSet.delete(i)
        queens.pop()
      }
    }
  }
  help(0)


  return ans;
}


function solveNBit2(n: number): string[][] {
  const ans: string[][] = [];


  const build = (board: number[]) => {
    const graph: string[] = []
    for (let i = 0; i < n; i++) {
      const arr = Array(n).fill('.')
      arr[board[i]] = 'Q'
      graph.push(arr.join(''))
    }
    return graph
  }


  const help = (row: number, cols: number, left: number, right: number, board: number[]) => {
    if (row === n) {
      ans.push(build(board))
      return
    }

    // 先找到当前可用位置
    // (1 << n) - 1 初始化所有位置
    // ~(cols | left | right) 已占位置合并后取反
    // （(1 << n) - 1) & ~(cols | left | right) 当前行所有可用位置

    // available & -available 当前行最后一个可用位置(负数是正数求反+1)

    // available &= available - 1 移除最后一个可用位置

    let available = ((1 << n) - 1) & ~(cols | left | right)
    while (available) {
      const position = available & -available
      available &= available - 1
      help(row + 1, cols | position, (left | position) >> 1, (right | position) << 1, [...board, Math.log2(position)])
    }
  }

  help(0, 0, 0, 0, [])

  return ans
}


function solveNQueensBit3(n: number): string[][] {
  const ans: string[][] = [];
  const s = Array(n).fill('.')
  const buildSolve = (boards: number[]) => {
    const ans: string[] = Array(n)

    for (let i = 0; i < n; i++) {
      s[boards[i]] = 'Q'
      ans[i] = s.join("")
      s[boards[i]] = '.'
    }
    return ans
  }

  const dfs = (row: number, cols: number, left: number, right: number, boards: number[]) => {
    if (row === n) {
      ans.push(buildSolve(boards))
      return;
    }
    // 初始化当前行可使用的位置
    let available = ((1 << n) - 1) & ~(cols | left | right)
    while (available) {
      // 获取最后一个可用位置
      const position = available & -available
      available &= available - 1
      dfs(row + 1, cols | position, (left | position) << 1, (right | position) >> 1, [...boards, Math.log2(position)])
      // 移除最后一个可用位置
    }
  }
  dfs(0, 0, 0, 0, [])

  return ans
}


function solveNQueens4(n: number): string[][] {
  const ans: string[][] = [];
  const verticalSet: Set<number> = new Set();
  const leftToRightSet: Set<number> = new Set();
  const rightToLeftSet: Set<number> = new Set();

  const tmp: number[] = [];
  const right = -n + 1;
  const dfs = (k: number) => {
    if (k === n) {

      const res = tmp.map((value) => {
        let str = ''
        for (let i = 0; i < n; i++) {
          if (i === value) {
            str += 'Q';
          } else {
            str += '.'
          }
        }
        return str;
      })
      // console.log([...tmp]);
      ans.push(res)
      return;
    }
    for (let i = 0; i < n; i++) {
      // console.log(`${right} + ${i} + ${k}:`, right + i + k)
      if (!verticalSet.has(i) && !leftToRightSet.has(i - k) && !rightToLeftSet.has(right + i + k)) {
        verticalSet.add(i);
        leftToRightSet.add(i - k);
        rightToLeftSet.add(right + i + k)
        tmp.push(i);
        dfs(k + 1)
        tmp.pop();
        verticalSet.delete(i);
        leftToRightSet.delete(i - k);
        rightToLeftSet.delete(right + i + k)
      }
    }
  }

  dfs(0);


  return ans;
};


function solveNQueensBit4(n: number): string[][] {
  const ans: string[][] = [];

  const mask = Math.pow(2, n) - 1;
  console.log('mask: ', mask.toString(2));

  const tmp: number[] = [];

  const dfs = (k: number, row: number, left: number, right: number) => {
    if (k === n) {
      const str = tmp.map(val => {
        const pos = Math.log2(val);
        let str = ''
        for (let i = 0; i < n; i++) {
          if (i === pos) {
            str += 'Q';
          } else {
            str += '.';
          }
        }
        return str
      });
      ans.push(str);
      return;
    }

    // 找到当前可选位置
    // 找到最后一个有效位
    // 删除最后一个有效位
    // row | left | right

    // 使用mask 异或 当前已占位置 的到当前有效位
    let available = mask ^ (mask & (row | left | right));
    // console.log(`${row} | ${left} | ${right}:`, mask & (row | left | right))
    // console.log(available)

    while (available) {
      const pos = available & -available;
      tmp.push(pos)
      dfs(k + 1, row | pos, (left | pos) >> 1, (right | pos) << 1);
      tmp.pop()
      // console.log(available.toString(2))
      available &= available - 1;
      // console.log(available.toString(2))
    }
  }

  dfs(0, 0, 0, 0);

  return ans;
};


function solveNQueens5(n: number): string[][] {
  const ans: string[][] = [];
  const rowSet: Set<number> = new Set();
  const leftSet: Set<number> = new Set();
  const rightSet: Set<number> = new Set();

  const tmp: number[] = [];

  const dfs = (k: number) => {
    if (k === n) {
      ans.push(tmp.map(val => {
        let str = '';
        for (let i = 0; i < n; i++) {
          if (i === val) {
            str += 'Q';
          } else {
            str += '.';
          }
        }
        return str;
      }));
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!rowSet.has(i) && !leftSet.has(i - k) && !rightSet.has(k + i + 1 - n)) {
        rowSet.add(i);
        leftSet.add(i - k);
        rightSet.add(k + i + 1 - n);
        tmp.push(i);
        dfs(k + 1);
        tmp.pop();
        rowSet.delete(i);
        leftSet.delete(i - k);
        rightSet.delete(k + i + 1 - n);
      }
    }
  }
  dfs(0);

  return ans;
};


function solveNQueensBit5(n: number): string[][] {
  const ans: string[][] = [];

  // 获取当前有效位置
  // 获取最后一个有效位置
  // 移除最后一个有效位置
  const tmp: number[] = [];

  const dfs = (k: number, row: number, left: number, right: number) => {
    if (k === n) {
      console.log(tmp);

      ans.push(tmp.map(val => {
        let str = '';
        for (let i = 0; i < n; i++) {
          if (i === Math.log2(val)) {
            str += 'Q';
          } else {
            str += '.';
          }
        }
        return str;
      }))
      return;
    }
    let available = (1 << n) - 1 & ~(row | left | right);
    while (available) {
      const pos = available & -available;
      tmp.push(pos);
      dfs(k + 1, row | pos, (left | pos) >> 1, (right | pos) << 1);
      tmp.pop();
      available &= available - 1;
    }
  }

  dfs(0, 0, 0, 0);

  return ans;
};


function solveNQueens6(n: number): string[][] {
  const ans: string[][] = [];
  const tmp: number[] = [];


  const rowSet: Set<number> = new Set();
  const leftSet: Set<number> = new Set();
  const rightSet: Set<number> = new Set();

  const dfs = (k: number) => {
    if (k === n) {
      ans.push(tmp.map(val => {
        let str = '';
        for (let i = 0; i < n; i++) {
          if (i === val) {
            str += 'Q';
          } else {
            str += '.';
          }
        }
        return str;
      }));
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!rowSet.has(i) && !leftSet.has(i - k) && !rightSet.has(k + i + 1 - n)) {
        rowSet.add(i);
        leftSet.add(i - k);
        rightSet.add(k + i + 1 - n);
        tmp.push(i);
        dfs(k + 1);
        tmp.pop();
        rowSet.delete(i);
        leftSet.delete(i - k);
        rightSet.delete(k + i + 1 - n);
      }
    }
  }


  dfs(0);


  return ans;
};

function solveNQueensBit6(n: number): string[][] {
  const ans: string[][] = [];
  const tmp: number[] = [];

  const mask = (1 << n) - 1;
  // 掩码

  const dfs = (k: number, row: number, left: number, right: number) => {
    if (k === n) {
      console.log(tmp);
      ans.push(tmp.map(val => {
        let str = '';
        const pos = Math.log2(val);
        for (let i = 0; i < n; i++) {
          if (i === pos) {
            str += 'Q';
          } else {
            str += '.';
          }
        }
        return str;
      }))
      return;
    }

    let available = mask & ~(row | left | right);
    // 当前可用位置
    while (available) {
      const pos = available & -available
      tmp.push(pos);
      dfs(k + 1, row | pos, (left | pos) >> 1, (right | pos) << 1);
      tmp.pop();
      // 移除最后一个可用位置
      available &= available - 1;
    }
  }
  dfs(0, 0, 0, 0);

  return ans;
}

// console.log(solveNQueensBit2(4))
console.log(solveNQueensBit6(9))
// console.log(solveNQueens5(4))