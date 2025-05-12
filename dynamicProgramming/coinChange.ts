// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

// 你可以认为每种硬币的数量是无限的。

function coinChange(coins: number[], amount: number): number {
  // if (amount === 0) {
  //   return 0
  // }
  const m = coins.length + 1;
  const n = amount + 1
  const arr: number[][] = Array.from({ length: m }, () => Array.from({ length: n }, () => Number.MAX_VALUE))

  for (let i = 0; i < m; i++) {
    arr[i][0] = 0;
  }

  for (let i = 1; i < m; i++) {
    const coin = coins[i - 1];
    // console.log('coin:', coin);
    for (let j = 1; j < n; j++) {
      // console.log('j:', j);
      // arr[i][j] = Math.min(arr[])
      if (j < coin) {
        arr[i][j] = arr[i - 1][j]
      } else {
        arr[i][j] = Math.min(arr[i - 1][j], arr[i][j - coin] + 1)
      }
    }
  }
  // console.log(arr)
  return arr[m - 1][n - 1] === Number.MAX_VALUE ? -1 : arr[m - 1][n - 1]
};


function coinChange1(coins: number[], amount: number): number {
  const m = coins.length + 1;
  const n = amount + 1
  const arr: number[] = Array.from({ length: n }, () => amount + 1)
  // const arr: number[] = Array(n).fill(amount + 1)

  arr[0] = 0;

  for (let i = 1; i < m; i++) {
    const coin = coins[i - 1];
    for (let j = 1; j < n; j++) {
      if (j >= coin) {
        arr[j] = Math.min(arr[j], arr[j - coin] + 1)
      }
    }
  }
  return arr[n - 1] === amount + 1 ? -1 : arr[n - 1];
};

console.log(coinChange1([5, 1, 2,], 11))
console.log(coinChange1([2], 3))
console.log(coinChange1([1], 0))