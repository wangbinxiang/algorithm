// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。

// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

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

console.log(wordBreak1('cars', ["car", "ca", "rs"]))
console.log(wordBreak1('leetcode', ["leet", "code"]))
console.log(wordBreak1('applepenapple', ["apple", "pen"]))
console.log(wordBreak1('catsandog', ["cats", "dog", "sand", "and", "cat"]))