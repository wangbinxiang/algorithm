function numIslands(grid: string[][]): number {
  const set = new Set<string>();
  let start = 0;
  const n = grid[0].length;
  const m = grid.length;


  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        set.add(`${i}_${j}`)
        let isIsland = true;
        if (i > 0) {
          if (grid[i - 1][j] === "1") {
            if (set.has(`${i - 1}_${j}`)) {
              isIsland = false;
            }
            set.add(`${i - 1}_${j}`)
          }
        }
        if (j > 0) {
          if (grid[i][j - 1] === "1") {
            if (set.has(`${i}_${j - 1}`)) {
              isIsland = false;
            }
            set.add(`${i}_${j - 1}`)
          }
        }

        if (i < m - 1) {
          if (grid[i + 1][j] === "1") {
            if (set.has(`${i + 1}_${j}`)) {
              isIsland = false;
            }
            set.add(`${i + 1}_${j}`)
          }
        }

        if (j < n - 1) {
          if (grid[i][j + 1] === "1") {
            if (set.has(`${i}_${j + 1}`)) {
              isIsland = false;
            }
            set.add(`${i}_${j + 1}`)
          }
        }
        if (isIsland) {
          console.log(`${i}_${j}`);
          console.log(set);
          start++;
        }
      }
    }
  }



  return start;
};

// console.log(numIslands1([["1", "1", "1"], ["0", "1", "0"], ["1", "1", "1"]]))
// console.dir([["1", "0", "1", "1", "1"], ["1", "0", "1", "0", "1"], ["1", "1", "1", "0", "1"]])




function numIslands1(grid: string[][]): number {
  let ans = 0;
  const stack: string[] = [];
  const set = new Set<string>();
  const n = grid[0].length;
  const m = grid.length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        set.add(`${i}_${j}`);
      }
    }
  }

  while (set.size > 0) {
    if (stack.length === 0) {
      const node = set.entries().next().value[0];
      if (node) {
        ans++;
        // console.log('push node:', node);
        stack.push(node);
      }
    }
    while (stack.length > 0) {
      // console.log("stack:", stack);
      const node = stack.pop()!;
      // console.log("node:", node);
      let nodeSplit = node.split('_');
      const i = +nodeSplit[0];
      const j = +nodeSplit[1];
      if (i > 0) {
        const key = `${i - 1}_${j}`
        if (set.has(key)) {
          stack.push(key);
        }
      }
      if (j > 0) {
        const key = `${i}_${j - 1}`
        if (set.has(key)) {
          stack.push(key);
        }
      }
      if (i < m - 1) {
        const key = `${i + 1}_${j}`
        if (set.has(key)) {
          stack.push(key);
        }
      }

      if (j < n - 1) {
        const key = `${i}_${j + 1}`
        if (set.has(key)) {
          stack.push(key);
        }
      }
      set.delete(node);
    }
  }



  return ans;
}

function numIslands2(grid: string[][]): number {
  let ans = 0;
  const m = grid.length
  const n = grid[0].length


  const dfs = (x: number, y: number) => {
    if (x - 1 >= 0 && grid[x - 1][y] === "1") {
      grid[x - 1][y] = "0"
      dfs(x - 1, y)
    }
    if (x + 1 < m && grid[x + 1][y] === "1") {
      grid[x + 1][y] = "0"
      dfs(x + 1, y)
    }
    if (y - 1 >= 0 && grid[x][y - 1] === "1") {
      grid[x][y - 1] = "0"
      dfs(x, y - 1)
    }
    if (y + 1 < n && grid[x][y + 1] === "1") {
      grid[x][y + 1] = "0"
      dfs(x, y + 1)
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        grid[i][j] = '0'
        ans++
        dfs(i, j)
      }
    }
  }



  return ans;
}

function numIslands3(grid: string[][]): number {
  let ans = 0
  const m = grid.length
  const n = grid[0].length
  const dfs = (x: number, y: number) => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === "0") {
      return
    }
    grid[x][y] = "0"
    dfs(x - 1, y);
    dfs(x + 1, y);
    dfs(x, y - 1);
    dfs(x, y + 1)
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        dfs(i, j)
        ans++
      }
    }
  }

  return ans
};


function numIslands4(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  const dfs = (x: number, y: number): boolean => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === "0") {
      return;
    }
    grid[x][y] = "0"
    dfs(x - 1, y);
    dfs(x + 1, y);
    dfs(x, y - 1);
    dfs(x, y + 1);
    return true
  }
  let ans = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j)) {
        ans++
      }
    }
  }


  return ans;
};

// 递归每个方向，如果是1，则设置为0
function numIslands5(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  // console.table(grid);

  const queue: number[][] = [];

  const help = (x: number, y: number) => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === "0") {
      return;
    }
    // console.log(x, y);
    grid[x][y] = "0";
    queue.push([x - 1, y]);
    queue.push([x + 1, y]);
    queue.push([x, y - 1]);
    queue.push([x, y + 1]);
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        // console.log('count++')
        count++;
        help(i, j)
        while (queue.length) {
          const [x, y] = queue.shift();
          help(x, y);
        }
      }
    }
  }

  return count;
};

function numIslands6(grid: string[][]): number {
  let count = 0;
  const m = grid.length;
  const n = grid[0].length;


  const dfs = (x: number, y: number) => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === "0") {
      return;
    }
    grid[x][y] = "0";
    dfs(x - 1, y);
    dfs(x + 1, y);
    dfs(x, y - 1);
    dfs(x, y + 1);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        count++;
        dfs(i, j)
      }
    }
  }


  return count;
}

function numIslands7(grid: string[][]): number {
  let count = 0;
  const m = grid.length;
  const n = grid[0].length;

  const dfs = (i: number, j: number) => {
    if (i < 0 || i === m || j < 0 || j === n || grid[i][j] === "0") {
      return;
    }
    grid[i][j] = "0";
    dfs(i + 1, j);
    dfs(i, j + 1);
    dfs(i - 1, j);
    dfs(i, j - 1);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        count++;
        dfs(i, j);
      }
    }
  }



  return count;
};

console.log(numIslands7([["1", "0", "1", "1", "1"], ["1", "0", "1", "0", "1"], ["1", "1", "1", "0", "1"]]))

console.log(numIslands7([
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0']
]))


console.log(numIslands7([
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1']
]))