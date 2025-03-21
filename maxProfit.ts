function maxProfit(prices: number[]): number {
  let ans = 0;
  let n = prices.length;
  for (let i = 0; i < n - 1; i++) {
    const price = prices[i];
    for (let j = i + 1; j < n; j++) {
      ans = Math.max(ans, prices[j] - price)
    }
  }

  return ans;
};

function maxProfit1(prices: number[]): number {
  let ans = 0;
  let min = prices[0];
  const n = prices.length;
  for (let i = 1; i < n; i++) {
    if (min > prices[i]) {
      min = prices[i]
    } else {
      ans = Math.max(ans, prices[i] - min);
    }
  }

  return ans;
};

console.log(maxProfit1([7, 1, 5, 3, 6, 4])) // 5
console.log(maxProfit1([7, 6, 4, 3, 1])) // 0
