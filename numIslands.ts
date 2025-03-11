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
console.dir([["1", "0", "1", "1", "1"], ["1", "0", "1", "0", "1"], ["1", "1", "1", "0", "1"]])
console.log(numIslands1([["1", "0", "1", "1", "1"], ["1", "0", "1", "0", "1"], ["1", "1", "1", "0", "1"]]))



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



  return ans;
}