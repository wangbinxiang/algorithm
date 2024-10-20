const s = 'mtxacnu';
const t = 'mit3cmu';

// 计算两个字符串不同字符数量
const editDistanceDP = (s: string, t: string): number => {
  const n = s.length;
  const m = t.length;
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0))
  for (let i = 1; i <= n; i++) {
    dp[i][0] = i;
  }

  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s.charAt(i - 1) === t.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]) + 1
      }
      console.log(dp);
    }
  }
  console.log(dp);
  return dp[n][m];
}

// console.log(editDistanceDP('bag', 'pack'));
// console.log(editDistanceDP(s, t));

const editDistanceDPComp = (s: string, t: string): number => {
  const n = s.length;
  const m = t.length;

  const dp = Array(m + 1).fill(0);
  for (let j = 1; j <= m; j++) {
    dp[j] = j;
  }
  let leftUp;
  for (let i = 1; i <= n; i++) {
    leftUp = dp[0];
    dp[0] = i;
    for (let j = 1; j <= m; j++) {
      const leftUpTmp = dp[j];
      if (s.charAt(i - 1) === t.charAt(j - 1)) {
        dp[j] = leftUp;
      } else {
        dp[j] = Math.min(dp[j - 1], leftUp, dp[j]) + 1;
      }
      leftUp = leftUpTmp;
    }
  }

  return dp[m];
}

console.log(editDistanceDPComp('bag', 'pack'));
console.log(editDistanceDPComp('bag11', 'pack'));
console.log(editDistanceDPComp('bag', 'pack2334'));
console.log(editDistanceDPComp(s, t));

// 两个字符串最短编辑次数
const editDistanceBT = (s: string, t: string): number => {
  const n = s.length;
  const m = t.length;
  const helper = (i: number, j: number): number => {
    if (i === n) {
      const res = m - j;
      return res;
    }

    if (j === m) {
      const res = n - i;
      return res;
    }


    if (s.charAt(i) === t.charAt(j)) {
      const equal = helper(i + 1, j + 1);
      return equal;
    } else {
      // 不等于
      // s 增加, s, t 都增加, t增加
      const min = Math.min(helper(i + 1, j), helper(i + 1, j + 1), helper(1, j + 1)) + 1
      return min
    }
  }
  return helper(0, 0);
}

// console.log(editDistanceBT('pack', 'pack'));
// console.log(editDistanceBT('bag11', 'pack'));
// console.log(editDistanceBT('bag', 'pack2334'));
// console.log(editDistanceBT(s, t));

const editDistanceBTMemo = (s: string, t: string): number => {
  const n = s.length;
  const m = t.length;
  const memo: Record<string, number> = {};

  const helper = (i: number, j: number): number => {
    if (i === n) {
      return m - j;
    }
    if (j === m) {
      return n - i;
    }

    const key = `${i}_${j}`;
    if (memo[key]) {
      return memo[key];
    }

    if (s.charAt(i) === t.charAt(j)) {
      memo[key] = helper(i + 1, j + 1);
    } else {
      memo[key] = Math.min(helper(i + 1, j), helper(i + 1, j + 1), helper(i, j + 1)) + 1;
    }

    return memo[key];
  }

  return helper(0, 0);
}

// console.log(editDistanceBTMemo('pack', 'pack'));
// console.log(editDistanceBTMemo('bag11', 'pack'));
// console.log(editDistanceBTMemo('bag', 'pack'));
// console.log(editDistanceBTMemo('pac', 'pack'));
// console.log(editDistanceBTMemo(s, t));