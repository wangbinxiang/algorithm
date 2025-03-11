
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


console.log(solveNQueens(4))
console.log(solveNQueens(1))