function orangesRotting(grid: number[][]): number {
  const n = grid[0].length;
  const m = grid.length;

  let badSet = new Set<string>;
  const goodSet = new Set<string>;
  let time = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const val = grid[i][j];
      const key = `${i}_${j}`;
      if (val === 2) {
        badSet.add(key);
      } else if (val === 1) {
        goodSet.add(key);
      }
    }
  }

  console.log('badSet:', badSet);
  console.log('goodSet:', goodSet);

  while (badSet.size) {
    const newBadSet = new Set<string>;
    badSet.forEach(val => {
      const nodeSplit = val.split('_');
      const i = +nodeSplit[0];
      const j = +nodeSplit[1];
      if (i > 0) {
        const key = `${i - 1}_${j}`
        if (goodSet.has(key)) {
          newBadSet.add(key);
          goodSet.delete(key)
        }
      }
      if (j > 0) {
        const key = `${i}_${j - 1}`
        if (goodSet.has(key)) {
          newBadSet.add(key);
          goodSet.delete(key)
        }
      }
      if (i < m - 1) {
        const key = `${i + 1}_${j}`
        if (goodSet.has(key)) {
          newBadSet.add(key);
          goodSet.delete(key)
        }
      }

      if (j < n - 1) {
        const key = `${i}_${j + 1}`
        if (goodSet.has(key)) {
          newBadSet.add(key);
          goodSet.delete(key)
        }
      }
    })
    if (newBadSet.size > 0) {
      badSet = newBadSet;
      time++;
    } else {
      break;
    }
  }



  return goodSet.size > 0 ? -1 : time;
};


function orangesRotting1(grid: number[][]): number {
  let ans = 0
  const m = grid.length
  const n = grid[0].length

  const bads: string[] = []
  let goodNumber = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        goodNumber++
      } else if (grid[i][j] === 2) {
        bads.push(`${i},${j}`)
      }
    }
  }

  const help = (currBads: Set<string>, x: number, y: number) => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] !== 1) {
      return
    }
    currBads.add(`${x},${y}`)
    grid[x][y] = 2
    goodNumber--
    // console.log('goodNumber--:', x, y, ans)
  }

  // console.log('goodNumber:', goodNumber)
  let currBads = new Set(bads)
  while (goodNumber && currBads.size > 0) {
    ans++
    // console.log('currBads', currBads)
    const tmpBads: Set<string> = new Set();
    for (const bad of currBads) {
      const position = bad.split(',')
      const x = +position[0]
      const y = +position[1]
      help(tmpBads, x - 1, y)
      help(tmpBads, x + 1, y)
      help(tmpBads, x, y - 1)
      help(tmpBads, x, y + 1)
    }
    currBads = tmpBads
  }



  return goodNumber === 0 ? ans : -1;
}


function orangesRotting2(grid: number[][]): number {
  let ans = 0;
  const m = grid.length
  const n = grid[0].length

  let rottingList: number[][] = []
  let goodNumber = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        rottingList.push([i, j])
      } else if (grid[i][j] === 1) {
        goodNumber++
      }
    }
  }

  let tmpRottingList: number[][] = []
  const canRotting = (x: number, y: number): boolean => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] !== 1) {
      return
    }
    grid[x][y] = 2
    goodNumber--
    tmpRottingList.push([x, y])
  }

  while (rottingList.length) {
    tmpRottingList = []
    for (const [x, y] of rottingList) {
      canRotting(x + 1, y);
      canRotting(x - 1, y);
      canRotting(x, y + 1);
      canRotting(x, y - 1);
    }
    if (tmpRottingList.length > 0) {
      ans++;
      rottingList = tmpRottingList
    } else {
      break;
    }
  }

  return goodNumber === 0 ? ans : -1;
}


function orangesRotting3(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;


  let freshCount = 0;
  let rottingQueue: number[][] = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        freshCount++
      } else if (grid[i][j] === 2) {
        rottingQueue.push([i, j])
      }
    }
  }

  // console.log("freshCount:", freshCount)

  const freshOrg = (x: number, y: number, rottingQueue: number[][]) => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] !== 1) {
      return
    }
    grid[x][y] = 2
    freshCount--
    rottingQueue.push([x, y])
  }
  let time = 0
  while (rottingQueue.length) {
    // console.log(rottingQueue)

    let newRottingQueue: number[][] = [];
    for (const [x, y] of rottingQueue) {
      freshOrg(x - 1, y, newRottingQueue);
      freshOrg(x + 1, y, newRottingQueue);
      freshOrg(x, y - 1, newRottingQueue);
      freshOrg(x, y + 1, newRottingQueue);
    }
    if (newRottingQueue.length > 0) {
      time++
    }
    rottingQueue = newRottingQueue
  }

  // console.log("freshCount:", freshCount)
  return freshCount !== 0 ? -1 : time
};

function orangesRotting4(grid: number[][]): number {
  let count = 0;

  const m = grid.length;
  const n = grid[0].length;

  let queue: number[][] = [];
  let total = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      } else if (grid[i][j] === 1) {
        total++;
      }
    }
  }

  const help = (x: number, y: number, tmpQueue: number[][]) => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] !== 1) {
      return;
    }
    grid[x][y] = 2;
    total--;
    tmpQueue.push([x, y])
  }

  while (queue.length) {

    const tmpQueue: number[][] = [];
    for (let [x, y] of queue) {
      help(x - 1, y, tmpQueue);
      help(x + 1, y, tmpQueue);
      help(x, y - 1, tmpQueue);
      help(x, y + 1, tmpQueue);
    }
    queue = tmpQueue;
    if (queue.length) {
      count++;
    }
  }


  return total === 0 ? count : -1;
};

console.log(orangesRotting4([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))
console.log(orangesRotting4([[2, 1, 1], [1, 1, 1], [0, 1, 2]]))
console.log(orangesRotting4([[2, 1, 1], [0, 1, 1], [1, 0, 1]]))



