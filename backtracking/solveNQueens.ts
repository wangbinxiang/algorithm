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


// function solveNQueens1(n: number): string[][] {



//   return [];
// }


console.log(solveNQueens(4))
console.log(solveNQueens(1))