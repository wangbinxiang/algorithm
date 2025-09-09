// 给你一个字符串 s，找到 s 中最长的 回文 子串。



// 示例 1：

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：

// 输入：s = "cbbd"
// 输出："bb"


// 提示：

// 1 <= s.length <= 1000
// s 仅由数字和英文字母组成


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

function longestPalindrome1(s: string): string {
  const n = s.length
  if (n < 2) {
    return s
  }
  const dp = Array.from({ length: n }, () => Array(n).fill(false))
  let start = 0
  let maxLen = 1

  for (let i = 0; i < n; i++) {
    dp[i][i] = true
  }


  for (let len = 2; len <= n; len++) {
    console.log(n - len)
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1
      console.log('s[i]:', s[i])
      console.log('s[j]:', s[j])
      if (s[i] === s[j]) {
        if (len === 2 || dp[i + 1][j - 1]) {
          dp[i][j] = true
          if (len > maxLen) {
            maxLen = len
            start = i
          }
        }
      }
    }
  }
  console.log(dp)
  return s.substring(start, start + maxLen)
}


function longestPalindrome2(s: string): string {



  return ""
}

// console.log(longestPalindrome1("babad"))

// console.log(longestPalindrome1("cbbd"))

// console.log(longestPalindrome1("ac"))

console.log(longestPalindrome1("bb"))