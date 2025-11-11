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

function maxProfit2(prices: number[]): number {
  let maxProfit = 0
  let minPrice = prices[0]
  const n = prices.length
  for (let i = 1; i < n; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i]
    } else {
      maxProfit = Math.max(maxProfit, prices[i] - minPrice)
    }
  }



  return maxProfit
}

function maxProfit3(prices: number[]): number {
  let maxProfit = 0
  let minPrice = prices[0]
  for (let i = 1; i < prices.length; i++) {
    const price = prices[i]
    if (price > minPrice) {
      maxProfit = Math.max(maxProfit, price - minPrice)
    } else if (price < minPrice) {
      minPrice = price
    }
  }

  return maxProfit
}


function maxProfit4(prices: number[]): number {
  const n = prices.length
  let min = prices[0]
  let maxProfit = 0

  for (let i = 1; i < n; i++) {
    const num = prices[i]
    if (num > min) {
      maxProfit = Math.max(maxProfit, num - min)
    } else {
      min = num
    }
  }



  return maxProfit
}


function maxProfit5(prices: number[]): number {
  let ans = 0;
  // const copyPrices = [...prices];
  let start = prices[0];
  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    if (start < price) {
      const profit = price - start;
      if (ans < profit) {
        ans = profit;
      }
    } else {
      start = price;
    }
  }



  return ans;
};

console.log(maxProfit4([7, 1, 5, 3, 6, 4])) // 5
console.log(maxProfit4([7, 6, 4, 3, 1])) // 0
