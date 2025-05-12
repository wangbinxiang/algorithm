function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  const dp = Array.from({ length: m }, () => Array(n).fill(0))

  dp[0][0] = grid[0][0]

  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }

  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j]
  }



  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }


  return dp[m - 1][n - 1];
};


function minPathSum1(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  const dp = Array(n).fill(0)

  dp[0] = grid[0][0]

  for (let j = 1; j < n; j++) {
    dp[j] = dp[j - 1] + grid[0][j]
  }

  // for (let i = 1; i < m; i++) {
  //   dp[0] = dp[0] + grid[i][0]
  // }
  console.log(dp)
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (j === 0) {
        dp[j] = dp[j] + grid[i][j]
      } else {
        dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j]
      }

    }
    console.log(dp)
  }

  console.log(dp)

  return dp[n - 1];
};

// console.log(minPathSum1([[1, 3, 1], [1, 5, 1], [4, 2, 1]])) // 7
// console.log(minPathSum1([[1, 2, 3], [4, 5, 6]])) // 12

console.log(minPathSum1([[7, 4, 8, 7, 9, 3, 7, 5, 0], [1, 8, 2, 2, 7, 1, 4, 5, 7], [4, 6, 4, 7, 7, 4, 8, 2, 1], [1, 9, 6, 9, 8, 2, 9, 7, 2], [5, 5, 7, 5, 8, 7, 9, 1, 4], [0, 7, 9, 9, 1, 5, 3, 9, 4]])) // 50
