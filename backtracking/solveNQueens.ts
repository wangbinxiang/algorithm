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


console.log(solveNQueensBit1(4))
// console.log(solveNQueens(1))