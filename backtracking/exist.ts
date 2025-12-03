
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


function exist2(board: string[][], word: string): boolean {
  let ans = false;
  const n = board.length;
  const m = board[0].length;
  const len = word.length;

  const dfs = (x: number, y: number, index: number) => {
    if (index === len) {
      ans = true;
      return;
    }
    if (x < 0 || x === n || y < 0 || y === m || board[x][y] !== word[index]) {
      return;
    }
    const tmp = board[x][y];
    board[x][y] = '';
    dfs(x - 1, y, index + 1)
    dfs(x + 1, y, index + 1)
    dfs(x, y - 1, index + 1)
    dfs(x, y + 1, index + 1)
    board[x][y] = tmp;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (ans) {
        return ans;
      }
      dfs(i, j, 0);
    }
  }

  return ans;
};


function exist3(board: string[][], word: string): boolean {
  let ans = false;
  const t = word.length;

  const n = board.length;
  const m = board[0].length;


  const dfs = (k: number, x: number, y: number) => {
    if (k === t) {
      ans = true;
      return;
    }
    if (x < 0 || x === n || y < 0 || y === m || board[x][y] !== word[k]) {
      return;
    }
    const tmp = board[x][y];
    board[x][y] = '';
    dfs(k + 1, x - 1, y);
    dfs(k + 1, x + 1, y);
    dfs(k + 1, x, y - 1);
    dfs(k + 1, x, y + 1);
    board[x][y] = tmp

  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (ans === false) {
        dfs(0, i, j);
      } else {
        return ans;
      }
    }
  }


  return ans;
};

console.log(exist3([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"))

console.log(exist3([["a", "a"]], "aaa"))