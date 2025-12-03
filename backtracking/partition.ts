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

function partition3(s: string): string[][] {
  const ans: string[][] = []
  const n = s.length

  const dp = Array.from({ length: n }, () => Array(n).fill(false))
  for (let i = 0; i < n; i++) {
    dp[i][i] = true
  }
  // console.table(dp)
  for (let l = 2; l <= n; l++) {
    for (let i = 0; i <= n - l; i++) {
      if (s[i] === s[i + l - 1] && (l == 2 || dp[i + 1][i + l - 2])) {
        dp[i][i + l - 1] = true
      }
    }
  }

  console.table(dp)

  const curr: string[] = []
  const dfs = (k: number) => {
    if (k === n) {
      ans.push([...curr])
      return
    }
    for (let i = k; i < n; i++) {
      if (dp[k][i]) {
        const end = i + 1
        curr.push(s.substring(k, end))
        dfs(end)
        curr.pop()
      }
    }
  }

  dfs(0)
  return ans;
}


function partition4(s: string): string[][] {
  const ans: string[][] = [];
  const n = s.length;

  const tmp: string[] = [];

  const isPartition = (i: number, j: number) => {
    let l = i;
    let r = j;

    while (l < r) {
      if (s[l] !== s[r]) {
        return false;
      }
      l++;
      r--;
    }

    return true;
  }

  const dfs = (start: number) => {
    if (start === n) {
      ans.push([...tmp]);
      return;
    }
    for (let i = start; i < n; i++) {
      if (isPartition(start, i)) {
        tmp.push(s.slice(start, i + 1));
        dfs(i + 1);
        tmp.pop();
      }
    }
  }

  dfs(0);

  return ans;
};


function partition5(s: string): string[][] {
  const ans: string[][] = [];
  const n = s.length;

  const dp = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (s[j] === s[j + i] && (i < 2 || dp[j + 1][j + i - 1])) {
        dp[j][j + i] = true;
      }
    }
  }
  const tmp: string[] = [];
  const dfs = (start: number) => {
    if (start === n) {
      ans.push([...tmp]);
      return;
    }
    for (let i = start; i < n; i++) {
      if (dp[start][i]) {
        tmp.push(s.slice(start, i + 1));
        dfs(i + 1);
        tmp.pop();
      }
    }
  }

  // console.log(dp)
  dfs(0);
  return ans;
};



function partition6(s: string): string[][] {
  const ans: string[][] = [];
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(false));
  // 使用dp统计每个位置开始向后+1，+2，... +n个字符是否是回文串
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (s[j] === s[j + i] && (i < 2 || dp[j + 1][j + i - 1])) {
        dp[j][j + i] = true;
      }
    }
  }

  console.log(dp);
  const tmp: string[] = [];
  const dfs = (start: number) => {
    if (start === n) {
      ans.push([...tmp]);
      return;
    }
    for (let i = start; i < n; i++) {
      if (dp[start][i]) {
        tmp.push(s.slice(start, i + 1))
        dfs(i + 1);
        tmp.pop();
      }
    }
  }


  return ans;
};


function partition7(s: string): string[][] {
  const ans: string[][] = [];
  const n = s.length;

  const tmp: string[] = [];

  const isPartition = (left: number, right: number) => {
    let l = left;
    let r = right;
    while (l < r) {
      if (s[l] === s[r]) {
        l++;
        r--;
      } else {
        return false;
      }
    }
    return true;
  }


  const dfs = (k: number) => {
    if (k === n) {
      ans.push([...tmp]);
      return;
    }
    for (let i = k; i < n; i++) {
      if (isPartition(k, i)) {
        tmp.push(s.slice(k, i + 1));
        dfs(i + 1);
        tmp.pop();
      }
    }
  }
  dfs(0);

  return ans;
};


function partition8(s: string): string[][] {
  const ans: string[][] = [];
  const tmp: string[] = [];
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (s[j] === s[j + i] && (i < 2 || dp[j + 1][j + i - 1])) {
        dp[j][j + i] = true;
      }
    }
  }

  const dfs = (k: number) => {
    if (k === n) {
      ans.push([...tmp]);
    }
    for (let i = k; i < n; i++) {
      if (dp[k][i]) {
        tmp.push(s.slice(k, i + 1));
        dfs(i + 1);
        tmp.pop()
      }
    }
  }
  dfs(0);
  return ans;
};

console.log(partition8("aab")); // [["a","a","b"],["aa","b"]] 
// console.log(partition5("a")) // [["a"]]
// console.log(partition5("aacaa")) // [["a"]]
// console.log(partition8("abcba")) // [["a"]]

// const dp: string[][][] = Array(4).fill(0).map((_, index) => [[index.toString()]])
// console.table(dp)