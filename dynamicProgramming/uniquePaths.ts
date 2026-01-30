function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }

  return dp[m - 1][n - 1];
};


function uniquePaths1(m: number, n: number): number {
  const dp = Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] = dp[j] + dp[j - 1]
    }
  }

  return dp[n - 1];
};


function uniquePaths2(m: number, n: number): number {
  const dp = Array(n + 1).fill(1)
  dp[0] = 0
  for (let i = 1; i < m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[j] = dp[j] + dp[j - 1]
    }
  }
  // console.log(dp)
  return dp[n]
}



function uniquePaths3(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[0][i] = 1;
  }
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }


  return dp[m - 1][n - 1];
};

console.log(uniquePaths3(3, 7))
console.log(uniquePaths3(3, 2))