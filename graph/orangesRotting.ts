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


console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))