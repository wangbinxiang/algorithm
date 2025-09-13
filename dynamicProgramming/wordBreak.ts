// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。

// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。



// 示例 1：

// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
// 示例 2：

// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
//      注意，你可以重复使用字典中的单词。
// 示例 3：

// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false


// 提示：

// 1 <= s.length <= 300
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 20
// s 和 wordDict[i] 仅由小写英文字母组成
// wordDict 中的所有字符串 互不相同

function wordBreak(s: string, wordDict: string[]): boolean {
  const n = s.length;

  let start = 0;
  while (start < n) {
    let flag = false;
    for (let word of wordDict) {
      const res = s.startsWith(word, start)
      if (res) {
        start += word.length;
        flag = true
        break;
      }
    }
    if (flag === false) {
      return false;
    }
  }



  return true;
};

function wordBreak1(s: string, wordDict: string[]): boolean {
  const n = s.length;
  const dp = Array(n + 1).fill(false)
  dp[0] = true
  for (let i = 0; i < n; i++) {
    if (dp[i]) {
      for (let word of wordDict) {
        if (s.startsWith(word, i)) {
          dp[i + word.length] = true
        }
      }
    }
  }
  console.log(dp)


  return dp[n];
};

function wordBreak2(s: string, wordDict: string[]): boolean {
  const dp = Array<boolean>(s.length + 1).fill(false)
  dp[0] = true

  let minWordLen = +Infinity
  for (const word of wordDict) {
    minWordLen = Math.min(minWordLen, word.length)
  }


  for (let i = minWordLen; i <= s.length; i++) {
    for (const word of wordDict) {
      const len = word.length
      if (i - len >= 0 && dp[i - len] && s.startsWith(word, i - len)) {
        dp[i] = true
        break
      }
    }
  }

  // console.log(dp)

  return dp[s.length]
}


function wordBreak3(s: string, wordDict: string[]): boolean {
  const n = s.length;
  const dp = Array(n + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= n; i++) {
    for (let word of wordDict) {
      const l = word.length
      if (i >= l && dp[i - l] && s.substring(i - l, i) === word) {
        dp[i] = true
        break
      }
    }
  }
  // console.log(dp)
  return dp[n];
}

// console.log(wordBreak3('cars', ["car", "ca", "rs"]))
// console.log(wordBreak3('leetcode', ["leet", "code"]))
// console.log(wordBreak3('applepenapple', ["apple", "pen"]))
console.log(wordBreak2('catsandog', ["cats", "dog", "sand", "and", "cat"]))