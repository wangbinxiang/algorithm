const wgt = [3, 2, 1];
const value = [17, 11, 5];
const cap = 12;


// cap 剩余容量，i剩余物品数量
const knapsackDFS = (wgt: number[], val: number[], cap: number, i: number): number => {
  if (cap === 0 || i === 0) {
    return 0;
  }
  const weight = wgt[i - 1];
  if (weight > cap) {
    return knapsackDFS(wgt, val, cap, i - 1);
  }

  const no = knapsackDFS(wgt, val, cap, i - 1);
  const yes = knapsackDFS(wgt, val, cap - weight, i - 1) + val[i - 1];
  return Math.max(no, yes);
}
// console.log(knapsackDFS(wgt, value, cap, wgt.length));

const knapsackDFSMemo = (wgt: number[], val: number[], cap: number, i: number): number => {

  const memo: Record<string, number> = {};

  const helper = (wgt: number[], val: number[], cap: number, i: number): number => {
    if (cap === 0 || i === 0) {
      return 0;
    }

    const key = `${cap}_${i}`;
    if (memo[key]) {
      return memo[key];
    }
  
    const weight = wgt[i - 1];
    const value = val[i - 1];
  
    if (weight > cap) {
      memo[key] = helper(wgt, val, cap, i - 1);
      return memo[key];
    }
    const no = helper(wgt, val, cap, i - 1);
    const yes = helper(wgt, val, cap - weight, i - 1) + value; 
  
    memo[key] = Math.max(no, yes);
    return memo[key];
  }
  
   const res = helper(wgt, val, cap, i);
   console.log(memo);
   return res;
}

// console.log(knapsackDFSMemo(wgt, value, cap, wgt.length));

// 背包可以放入物品的最大价值
const knapsackDP = (wgt: number[], val: number[], cap: number): number => {
  const n = wgt.length;

  const dp = Array.from({length: n + 1}, () => Array.from({length: cap + 1}, () => 0));

  for (let i = 1; i <= n; i++) {
    const weight = wgt[i - 1];
    const value = val[i - 1];
    for (let j = 1; j <= cap; j++) {
      if (j >= weight) {
        dp[i][j] = Math.max(dp[i-1][j], dp[i - 1][j - weight] + value);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }


  return dp[n][cap];
}

// console.log(knapsackDP(wgt, value, 1));
// console.log(knapsackDP(wgt, value, 2));
// console.log(knapsackDP(wgt, value, 3));
// console.log(knapsackDP(wgt, value, 4));
// console.log(knapsackDP(wgt, value, 5));
// console.log(knapsackDP(wgt, value, 6));
// console.log(knapsackDP(wgt, value, 7));
// console.log(knapsackDP(wgt, value, 8));
// console.log(knapsackDP(wgt, value, 9));
// console.log(knapsackDP(wgt, value, 10));



const knapsackDPComp = (wgt: number[], val: number[], cap: number): number => {
  const n = wgt.length;
  const dp = Array(cap + 1).fill(0);
  
  for (let i = 0; i < n; i++) {
    const weight = wgt[i];
    for (let j = cap; j > 0; j--) {
      if (j >= weight) {
        dp[j] = Math.max(dp[j], dp[j - weight] + val[i]);
      }
    }
  }




  return dp[cap];
}

// console.log(knapsackDPComp(wgt, value, 1));
// console.log(knapsackDPComp(wgt, value, 2));
// console.log(knapsackDPComp(wgt, value, 3));
// console.log(knapsackDPComp(wgt, value, 4));
// console.log(knapsackDPComp(wgt, value, 5));
// console.log(knapsackDPComp(wgt, value, 6));
// console.log(knapsackDPComp(wgt, value, 7));
// console.log(knapsackDPComp(wgt, value, 8));
// console.log(knapsackDPComp(wgt, value, 9));
// console.log(knapsackDPComp(wgt, value, 10));
// console.log(knapsackDPComp(wgt, value, cap));

// 每个物品可以重复选取，在限定背包容量下放入物品的最大价值
const unboundKnapsackDP = (wgt: number[], val: number[], cap: number): number => {
  const n = wgt.length;
  const dp = Array.from({length: n + 1}, () => Array.from({length: cap + 1}, () => 0));

  for (let i = 1; i <= n; i++) {
    const weight = wgt[i - 1];
    for (let j = 1; j <= cap; j++) {
      if ( j >= weight) {
        dp[i][j] = Math.max(dp[i][j - weight] + val[i - 1], dp[i - 1][j]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  console.log(dp);
  return dp[n][cap];
}

console.log(unboundKnapsackDP(wgt, value, 1));
console.log(unboundKnapsackDP(wgt, value, 2));
console.log(unboundKnapsackDP(wgt, value, 3));
console.log(unboundKnapsackDP(wgt, value, 4));
console.log(unboundKnapsackDP(wgt, value, 5));
console.log(unboundKnapsackDP(wgt, value, 6));
console.log(unboundKnapsackDP(wgt, value, 7));
console.log(unboundKnapsackDP(wgt, value, 8));
console.log(unboundKnapsackDP(wgt, value, 9));
console.log(unboundKnapsackDP(wgt, value, 10));
console.log(unboundKnapsackDP(wgt, value, 11));
console.log(unboundKnapsackDP(wgt, value, 12));
console.log(unboundKnapsackDP(wgt, value, cap));


// const unboundKnapsackDPComp = (wgt: number[], val: number[], cap: number): number => {
  
// }
// console.log(unboundKnapsackDPComp(wgt, value, cap));