
interface Point {
  x: number;
  y: number;
}
function exist(board: string[][], word: string): boolean {
  const m = board.length;
  const n = board[0].length
  const wordList = word.split('');
  const len = wordList.length;
  const first = wordList[0];
  let ans = false;

  const startPoints: Point[] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === first) {
        startPoints.push({ x: i, y: j })
      }
    }
  }





  const dfs = (startPoint: Point, start: number) => {
    if (start === len - 1) {
      ans = true;
      return;
    }
    console.log('start:', start)
    const letter = wordList[start + 1];
    console.log('letter:', letter)
    if (startPoint.x > 0) {
      // 向左一位
      const point: Point = { x: startPoint.x - 1, y: startPoint.y };
      const key = `${point.x}_${point.y}`
      console.log('x - point:', point);
      if (letter === board[point.x][point.y] && !set.has(key)) {
        console.log('x - point in:', point, start);
        set.add(key);
        dfs(point, start + 1);
        set.delete(key);
      }
    }
    if (startPoint.y > 0) {
      // 向上一位
      const point: Point = { x: startPoint.x, y: startPoint.y - 1 };
      const key = `${point.x}_${point.y}`
      console.log('y - point:', point);
      if (letter === board[point.x][point.y] && !set.has(key)) {
        console.log('y - point in:', point, start);
        set.add(key);
        dfs(point, start + 1);
        set.delete(key);
      }
    }

    if (startPoint.x < m - 1) {
      // 向右一位

      const point: Point = { x: startPoint.x + 1, y: startPoint.y };
      const key = `${point.x}_${point.y}`
      console.log('x + point:', point);
      if (letter === board[point.x][point.y] && !set.has(key)) {
        console.log('x + point in:', point, start);
        set.add(key);
        dfs(point, start + 1);
        set.delete(key);
      }
    }

    if (startPoint.y < n - 1) {
      // 向下一位
      const point: Point = { x: startPoint.x, y: startPoint.y + 1 };
      const key = `${point.x}_${point.y}`
      console.log('y + point:', point);
      if (letter === board[point.x][point.y] && !set.has(key)) {
        console.log('y + point in:', point, start);
        set.add(key);
        dfs(point, start + 1);
        set.delete(key);
      }
    }
  }

  const set = new Set<string>()
  for (let i = 0; i < startPoints.length; i++) {
    if (ans === false) {
      console.log('startPoint:', startPoints[i]);
      const key = `${startPoints[i].x}_${startPoints[i].y}`
      set.add(key);
      dfs(startPoints[i], 0);
      set.delete(key);
    }
  }

  return ans
};

// console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"
// ))

// console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "SEE"
// ))

// console.log(exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCB"
// ))

function exist1(board: string[][], word: string): boolean {
  const m = board.length
  const n = board[0].length
  const l = word.length

  const dfs = (k: number, x: number, y: number) => {
    if (k === l) {
      return true
    }
    if (x < 0 || x >= m || y < 0 || y >= n) {
      return false
    }

    if (board[x][y] !== word[k]) {
      return false
    }

    const temp = board[x][y]
    board[x][y] = '#'
    const found = dfs(k + 1, x - 1, y) || dfs(k + 1, x, y - 1) || dfs(k + 1, x + 1, y) || dfs(k + 1, x, y + 1)
    board[x][y] = temp
    return found
  }


  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(0, i, j)) {
        return true
      }
    }
  }


  return false
}


console.log(exist1([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"))

console.log(exist1([["a", "a"]], "aaa"))