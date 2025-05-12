function longestPalindrome(s: string): string {
  const n = s.length;
  if (n === 1) {
    return s
  }
  let begin = 0
  let end = 0

  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    dp[0][i] = true
  }

  for (let i = 1; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (s.charAt(j) === s.charAt(j - i)) {
        if (i >= 2) {
          if (dp[i - 2][j - 1]) {
            dp[i][j] = true
            begin = j - i
            end = j
          }
        } else {
          dp[i][j] = true
          begin = j - i
          end = j
        }
      }
    }
  }
  return s.substring(begin, end + 1)
};


// console.log(longestPalindrome("babad"))

// console.log(longestPalindrome("cbbd"))

console.log(longestPalindrome("ac"))