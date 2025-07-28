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


console.log(solveNQueens1(4))
// console.log(solveNQueens(1))