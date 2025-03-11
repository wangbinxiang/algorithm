// 给你一个字符串 s，请你将 s 分割成一些 子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

function partition(s: string): string[][] {
  let ans: string[][] = [];
  const len = s.length;

  for (let i = 0; i < len; i++) {
    ans.push([s.charAt(i)])
  }



  if (len === 0) {
    return ans;
  }

  // 奇偶区别


  const dfs = (start: number, l: number) => {
    // a 
    let end = start + l;
    if (end < len) {
      return;
    }
    if (l % 2 === 0) {
      // 偶数
    } else {
      // 奇数

    }
  }

  for (let i = 2; i < len; i++) {
    dfs(0, i);
  }

  return ans;
};


function partition1(s: string): string[][] {
  const dfs = (i: number) => {
    if (i === n) {
      ret.push(ans.slice());
      return;
    }
    for (let j = i; j < n; ++j) {
      if (f[i][j]) {
        ans.push(s.slice(i, j + 1));
        console.log('i:', i, '; j:', j)
        dfs(j + 1);
        ans.pop();
      }
    }
  }

  const n = s.length;
  const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
  let ret: string[][] = [], ans: string[] = [];

  for (let i = n - 1; i >= 0; --i) {
    for (let j = i + 1; j < n; ++j) {
      f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
    }
  }
  console.table(f)
  dfs(0);
  return ret;
};



// aabb
// aabcc

function partition2(s: string): string[][] {
  const ret: string[][] = [];
  const dfs = (i: number) => {
    if (i === n) {
      ret.push([...ans])
      return
    }
    for (let j = i; j < n; j++) {
      if (dp[i][j]) {

        ans.push(s.slice(i, j + 1))

        dfs(j + 1)
        ans.pop()
      }
    }
  }
  const n = s.length;
  // dp 预处理， 找到所有是回文的子串
  const dp = Array(n).fill(0).map(() => Array(n).fill(true))

  // 从最后向前处理
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1]
    }
  }

  const ans: string[] = [];

  dfs(0)

  return ret;
}

console.log(partition2("aabcb")); // [["a","a","b"],["aa","b"]] 
// console.log(partition("a")) // [["a"]]

// const dp: string[][][] = Array(4).fill(0).map((_, index) => [[index.toString()]])
// console.table(dp)