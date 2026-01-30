// 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

// 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
// 示例 1：

// 输入：n = 12
// 输出：3
// 解释：12 = 4 + 4 + 4
// 示例 2：

// 输入：n = 13
// 输出：2
// 解释：13 = 4 + 9

// 提示：

// 1 <= n <= 104
function numSquares(n: number): number {
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    let min = Number.MAX_VALUE;
    for (let j = 1; j * j <= i; j++) {
      min = Math.min(min, dp[i - j * j]);
    }
    dp[i] = min + 1;
  }
  // console.log(dp)
  return dp[n];
}

function numSquares1(n: number): number {
  if (n === 1) {
    return n;
  }
  let i = 1;
  const squares: number[] = [];
  while (i * i <= n) {
    squares.push(i * i);
    i++;
  }

  const squareMap: Record<number, number> = {};

  let k = squares.length - 1;
  for (let i = n; i > 0; i--) {
    for (let j = 0; j < k; j++) {
      if (squares[j] > i) {
        // console.log(j - 1, i)
        squareMap[i] = j - 1;
      } else if (squares[j] === i) {
        // console.log('squares[j] === i', j, i)
        squareMap[i] = j;
      }
    }
  }
  // console.log(squareMap)

  // console.log(squares)
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    let minNum = +Infinity;
    let j = squareMap[i] ?? squares.length - 1;
    for (; j >= 0; j--) {
      const square = squares[j];

      if (i - square >= 0) {
        // console.log('square:', square)
        // console.log('minNum:', minNum)
        minNum = Math.min(minNum, dp[i - square] + 1);
        break;
      }
    }
    dp[i] = minNum;
  }

  // console.log(dp)
  return dp[n];
}

function numSquares2(n: number): number {
  const squares: number[] = [];
  for (let i = 1; i <= n; i++) {
    const square = i * i;
    if (square <= n) {
      squares.push(square);
    } else {
      break;
    }
  }

  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (const square of squares) {
      if (i - square === 0) {
        dp[i] = 1;
      } else if (i - square > 0 && dp[i - square] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - square] + 1);
      }
    }
  }
  console.log(dp);
  return dp[n];
}

function numSquares3(n: number): number {
  const nums: number[] = [1];
  for (let i = 1; i < n; i++) {
    if (i * i > n) {
      break;
    }
    nums.unshift(i * i);
  }
  // console.log(nums);
  const dp = Array(n + 1).fill(+Infinity);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (const num of nums) {
      if (i - num >= 0) {
        // console.log("i - num:", i - num, i, num);
        const count = dp[i - num] + 1;
        if (dp[i] > count) {
          dp[i] = count;
        }
      }
    }
  }
  // console.log(dp);
  return dp[n];
}


function numSquares4(n: number): number {
  const dp = Array(n + 1).fill(+Infinity);
  dp[0] = 0;

  let i = 0;
  const squares: number[] = [];
  while (true) {
    if (i * i <= n) {
      squares.push(i * i);
      i++;
    } else {
      break;
    }
  }

  for (let i = 1; i <= n; i++) {
    for (const square of squares) {
      if (i - square >= 0) {
        const count = dp[i - square] + 1;
        if (dp[i] > count) {
          dp[i] = count;
        }
      }
    }
  }


  return dp[n];
};

// 1 <= n <= 104

console.log(numSquares4(4)); // 3; 12 = 4 + 4 + 4
console.log(numSquares4(12)); // 3; 12 = 4 + 4 + 4
console.log(numSquares4(13)); // 2; 13 = 4 + 9

console.log(numSquares4(1)); // 2; 13 = 4 + 9
