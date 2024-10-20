// const coinChange = (coins []number, amount: number ): number
const coins: number[] = [1, 3, 5];
const amount = 1;

// 硬币找零问题，最少需要多少个硬币才能找零，如果不能满足则返回-1

//暴力递归
const coinChange = (coins: number[], amount: number): number => {
  if (amount === 0) {
    return 0;
  }

  let min = Number.MAX_VALUE;
  for (let coin of coins) {
    if (amount >= coin) {
      const subproblem = coinChange(coins, amount - coin);
      if (subproblem >= 0) {
        min = Math.min(min, subproblem + 1);
      }
    }
  }

  return min === Number.MAX_VALUE ? -1 : min;
}

// console.log(1, coinChange(coins, 1));
// console.log(2, coinChange(coins, 2));
// console.log(3, coinChange(coins, 3));
// console.log(4, coinChange(coins, 4));
// console.log(5, coinChange(coins, 5));
// console.log(6, coinChange(coins, 6));
// console.log(7, coinChange(coins, 7));
// console.log(8, coinChange(coins, 8));
// console.log(9, coinChange(coins, 9));
// console.log(10, coinChange(coins, 10));
// console.log(11, coinChange(coins, 11));
// console.log(12, coinChange(coins, 12));
// console.log(13, coinChange(coins, 13));

// console.log(93,coinChange(coins, 93));
// // console.log(coinChangeMemo(coins, amount));

const coinChangeMemo = (coins: number[], amount: number): number => {
  const memo = Array(amount + 1);

  const helper = (coins: number[], amount: number): number => {
    if (amount === 0) {
      return 0;
    }

    if (memo[amount] !== undefined) {
      return memo[amount];
    }

    let min = Number.MAX_VALUE;
    for (let coin of coins) {
      if (amount >= coin) {
        const subproblem = helper(coins, amount - coin);
        if (subproblem >= 0) {
          min = Math.min(min, subproblem + 1);
        }
      }
    }

    memo[amount] = min === Number.MAX_VALUE ? -1 : min;

    return memo[amount]
  }

  helper(coins, amount);
  return memo[amount];
}

// console.log(1, coinChangeMemo(coins, 1));
// console.log(2, coinChangeMemo(coins, 2));
// console.log(3, coinChangeMemo(coins, 3));
// console.log(4, coinChangeMemo(coins, 4));
// console.log(5, coinChangeMemo(coins, 5));
// console.log(6, coinChangeMemo(coins, 6));
// console.log(7, coinChangeMemo(coins, 7));
// console.log(8, coinChangeMemo(coins, 8));
// console.log(9, coinChangeMemo(coins, 9));
// console.log(10, coinChangeMemo(coins, 10));
// console.log(11, coinChangeMemo(coins, 11));
// console.log(12, coinChangeMemo(coins, 12));
// console.log(13, coinChangeMemo(coins, 13));



const coinChangeDP = (coins: number[], amount: number): number => {
  const n = coins.length;
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: amount + 1 }, () => 0));
  for (let j = 1; j <= amount; j++) {
    dp[0][j] = Number.MAX_VALUE;
  }
  // console.log(dp);
  for (let i = 1; i <= coins.length; i++) {
    const coin = coins[i - 1];
    for (let j = 1; j <= amount; j++) {
      if (coin <= j) {
        dp[i][j] = Math.min(dp[i][j - coin] + 1, dp[i - 1][j]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[coins.length][amount] === Number.MAX_VALUE ? -1 : dp[coins.length][amount];
}
// console.log(1, coinChangeDP(coins, 1));
// console.log(2, coinChangeDP(coins, 2));
// console.log(3, coinChangeDP(coins, 3));
// console.log(4, coinChangeDP(coins, 4));
// console.log(5, coinChangeDP(coins, 5));
// console.log(6, coinChangeDP(coins, 6));
// console.log(7, coinChangeDP(coins, 7));
// console.log(8, coinChangeDP(coins, 8));
// console.log(9, coinChangeDP(coins, 9));
// console.log(10, coinChangeDP(coins, 10));
// console.log(11, coinChangeDP(coins, 11));
// console.log(12, coinChangeDP(coins, 12));
// console.log(13, coinChangeDP(coins, 13));
// // 缓存+循环迭代
const coinChangeDPComp = (coins: number[], amount: number): number => {
  const dp = Array(amount + 1).fill(Number.MAX_VALUE);
  dp[0] = 0;
  for (let coin of coins) {
    for (let j = 1; j <= amount; j++) {
      if (j - coin >= 0) {
        dp[j] = Math.min(dp[j], dp[j - coin] + 1);
      }
    }
  }
  return dp[amount] === Number.MAX_VALUE ? -1 : dp[amount];
}


// console.log(1, coinChangeDPComp(coins, 1));
// console.log(2, coinChangeDPComp(coins, 2));
// console.log(3, coinChangeDPComp(coins, 3));
// console.log(4, coinChangeDPComp(coins, 4));
// console.log(5, coinChangeDPComp(coins, 5));
// console.log(6, coinChangeDPComp(coins, 6));
// console.log(7, coinChangeDPComp(coins, 7));
// console.log(8, coinChangeDPComp(coins, 8));
// console.log(9, coinChangeDPComp(coins, 9));
// console.log(10, coinChangeDPComp(coins, 10));
// console.log(11, coinChangeDPComp(coins, 11));
// console.log(12, coinChangeDPComp(coins, 12));
// console.log(13, coinChangeDPComp(coins, 13));

// 硬币能凑出金额的a组合数量
const coinChangeIIDP = (coins: number[], amount: number): number => {
  // // 组合
  const n = coins.length;
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: amount + 1 }, () => 0));
  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i <= n; i++) {
    const coin = coins[i - 1];
    for (let j = 1; j <= amount; j++) {
      if (j >= coin) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coin];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n][amount];
}
// console.log(1, coinChangeIIDP(coins, 1));
// console.log(2, coinChangeIIDP(coins, 2));
// console.log(3, coinChangeIIDP(coins, 3));
// console.log(4, coinChangeIIDP(coins, 4));
// console.log(5, coinChangeIIDP(coins, 5));
// console.log(6, coinChangeIIDP(coins, 6));
// console.log(7, coinChangeIIDP(coins, 7));
// console.log(8, coinChangeIIDP(coins, 8));
// console.log(9, coinChangeIIDP(coins, 9));
// console.log(10, coinChangeIIDP(coins, 10));




const coinChangeIIDPComp = (coins: number[], amount: number): number => {
  const n = coins.length;
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let coin of coins) {
    for (let j = 1; j <= amount; j++) {
      if (j >= coin) {
        dp[j] = dp[j] + dp[j - coin];
      }
    }
  }


  return dp[amount];
}


console.log(1, coinChangeIIDPComp(coins, 1));
console.log(2, coinChangeIIDPComp(coins, 2));
console.log(3, coinChangeIIDPComp(coins, 3));
console.log(4, coinChangeIIDPComp(coins, 4));
console.log(5, coinChangeIIDPComp(coins, 5));
console.log(6, coinChangeIIDPComp(coins, 6));
console.log(7, coinChangeIIDPComp(coins, 7));
console.log(8, coinChangeIIDPComp(coins, 8));
console.log(9, coinChangeIIDPComp(coins, 9));
console.log(10, coinChangeIIDPComp(coins, 10));