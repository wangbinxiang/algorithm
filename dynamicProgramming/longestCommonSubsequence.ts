function longestCommonSubsequence(text1: string, text2: string): number {
  let ans = 0
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[m][n];
}


function longestCommonSubsequence1(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(n + 1).fill(0)
  for (let i = 0; i < m; i++) {
    let leftUp = 0
    for (let j = 1; j <= n; j++) {
      let tmp = dp[j];
      if (text1.charAt(i) === text2.charAt(j - 1)) {
        dp[j] = leftUp + 1;
      } else {
        dp[j] = Math.max(dp[j - 1], dp[j])
      }
      leftUp = tmp
    }
  }

  return dp[n];
}


console.log(longestCommonSubsequence1("abcde", "ace"))

console.log(longestCommonSubsequence1("abc", "abc"))

console.log(longestCommonSubsequence1("abc", "def"))