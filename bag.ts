const wgt = [1, 2, 3];
const value = [5, 11, 15];
const cap = 4;


const knapsackDFS = (wgt: number[], val: number[], cap: number, i: number): number => {
  if (i === 0 || cap === 0) {
    return 0;
  }

  // i 
  if (wgt[i - 1] > cap) {
    return knapsackDFS(wgt, val, cap, i - 1);
  }

  const no = knapsackDFS(wgt, val, cap, i - 1);
  const yes = knapsackDFS(wgt, val, cap - wgt[i - 1], i - 1) + val[i - 1];

  return Math.max(no, yes);
}
console.log(knapsackDFS(wgt, value, cap, wgt.length));

const knapsackDFSMemo = (wgt: number[], val: number[], cap: number, i: number): number => {
  const memo = Array.from({ length: wgt.length + 1 }, () => Array(cap + 1).fill(-1));
  const dfs = (cap: number, i: number): number => {
    if (i === 0 || cap === 0) {
      return 0;
    }
    if (memo[i][cap] !== -1) {
      return memo[i][cap];
    }
    if (wgt[i - 1] > cap) {
      return dfs(cap, i - 1);
    }

    const no = dfs(cap, i - 1);
    const yes = dfs(cap - wgt[i - 1], i - 1) + val[i - 1];
    memo[i][cap] = Math.max(no, yes);

    return memo[i][cap];
  }
  const res = dfs(cap, i);
  console.log(memo);
  return res;
}

console.log(knapsackDFSMemo(wgt, value, cap, wgt.length));

// 背包可以放入物品的最大价值
const knapsackDP = (wgt: number[], val: number[], cap: number): number => {
  const n = wgt.length
  const dp = Array.from({ length: n + 1 }, () => Array(cap + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= cap; j++) {
      if (wgt[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - wgt[i - 1]] + val[i - 1]);
      }
    }
  }
  console.log(dp);
  return dp[n][cap];
}

console.log(knapsackDP(wgt, value, cap));


const knapsackDPComp = (wgt: number[], val: number[], cap: number): number => {
  const dp = Array(cap + 1).fill(0);

  for (let i = 0; i < wgt.length; i++) {
    for (let j = 1; j <= cap; j++) {
      if (wgt[i] <= j) {
        dp[j] = Math.max(dp[j], dp[j - wgt[i]] + val[i]);
      }
    }
  }
  console.log(dp);
  return dp[cap];
}

// console.log(knapsackDPComp(wgt, value, cap));

// 
const unboundKnapsackDP = (wgt: number[], val: number[], cap: number): number => {
  const n = wgt.length;

  const dp = Array.from({ length: n + 1 }, () => Array(cap + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= cap; j++) {

      if (wgt[i - 1] > j) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - wgt[i - 1]] + val[i - 1]);
      }
    }
  }
  console.log(dp);
  return dp[n][cap]
}

// console.log(unboundKnapsackDP(wgt, value, cap));


const unboundKnapsackDPComp = (wgt: number[], val: number[], cap: number): number => {
  const dp = Array(cap + 1).fill(0);

  for (let i = 0; i < wgt.length; i++) {
    for (let j = 1; j <= cap; j++) {
      if (wgt[i] <= j) {
        dp[j] = Math.max(dp[j], dp[j - wgt[i]] + val[i]);
      }
    }
  }
  console.log(dp);
  return dp[cap];
}
// console.log(unboundKnapsackDPComp(wgt, value, cap));