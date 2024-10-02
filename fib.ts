// 动态规划问题的一般形式就是求最值,比如最长递增子序列，最小编辑距离等
// 求解动态规划的核心问题是穷举
// 重叠子问题，通过备忘录或者DP table来优化穷举过程，避免重复计算
// 具备最优子结构
// 状态转椅方程式

// 重叠子问题，最优子结构，状态转移方程式就是动态规划三要素。

// base case
// 状态
// 转移方程式； 对每个状态，可以做出什么“选择”似的“状态”发送改变
// 定义dp数组或者函数来表现“状态”和“选择”


//备忘录或者DP table本质上是一样的，只是自顶向下和自底向上的不同而已
// 备忘录递归是自顶向下，DP table是自底向上


// 暴力递归
const fib = (n: number): number => {
  if (n === 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }


  return fib(n - 1) + fib(n - 2);
}


// console.log(fib(1));
// console.log(fib(2));
// console.log(fib(3));
// console.log(fib(4));
// console.log(fib(5));
// console.log(fib(6));
// console.log(fib(7));
// console.log(fib(8));
// console.log(fib(9));
// console.log(fib(10));

//递归 缓存

const fibMemo = (n: number): number => {
  const memo: number[] = [];
  memo[0] = 0;
  memo[1] = 1;
  memo[2] = 1;
  const helper = (n: number) => {
    // if (n === 0) {
    //   return 0;
    // }
    // if (n === 1 || n === 2) {
    //   return 1;
    // }
    if (memo[n] !== undefined) {
      return memo[n];
    }
    memo[n] = helper(n - 1) + helper(n - 2);
    return memo[n];
  }
  helper(n);
  return memo[n]
}
// console.log(fibMemo(1));
// console.log(fibMemo(2));
// console.log(fibMemo(3));
// console.log(fibMemo(4));
// console.log(fibMemo(5));
// console.log(fibMemo(6));
// console.log(fibMemo(7));
// console.log(fibMemo(8));
// console.log(fibMemo(9));
// console.log(fibMemo(10));
// console.log(fibMemo(11));
// console.log(fibMemo(100));



// 循环迭代
const fibFor = (n: number): number => {
  if (n === 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  let prev = 1; // 1
  let current = 1; // 2
  for (let i = 3; i <= n; i++) {
    const temp = current;
    current = prev + current;
    prev = temp;
  }

  return current;
}
// console.log(fibFor(1));
// console.log(fibFor(2));
// console.log(fibFor(3));
// console.log(fibFor(4));
// console.log(fibFor(5));
// console.log(fibFor(6));
// console.log(fibFor(7));
// console.log(fibFor(8));
// console.log(fibFor(9));
// console.log(fibFor(10));
// console.log(fibFor(11));
// console.log(fibFor(100));





// 自底向上 dp数组


const fibDp = (n: number): number => {
  const dp = Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
// console.log(fibDp(1));
// console.log(fibDp(2));
// console.log(fibDp(3));
// console.log(fibDp(4));
// console.log(fibDp(5));
// console.log(fibDp(6));
// console.log(fibDp(7));
// console.log(fibDp(8));
// console.log(fibDp(9));
// console.log(fibDp(10));
// console.log(fibDp(100));
