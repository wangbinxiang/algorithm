
// 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

// 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
function numSquares(n: number): number {
  const dp = Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    let min = Number.MAX_VALUE
    for (let j = 1; (j * j) <= i; j++) {
      min = Math.min(min, dp[i - j * j])
    }
    dp[i] = min + 1
  }
  // console.log(dp)
  return dp[n];
};

// 1 <= n <= 104

console.log(numSquares(12)) // 3; 12 = 4 + 4 + 4
console.log(numSquares(13)) // 2; 13 = 4 + 9