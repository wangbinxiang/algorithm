const s = 'mtxacnu';
const t = 'mit3cmu';

// 计算两个字符串不同字符数量
const editDistanceDP = (s: string, t: string): number => {
  const n = s.length;
  const m = t.length;

  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0));

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
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }



  return dp[n][m];
}

// console.log(editDistanceDP('bag', 'pack'));
// console.log(editDistanceDP(s, t));


const editDistanceBT = (s: string, t: string): number => {
  const n = s.length;
  const m = t.length;
  const helper = (i: number, j: number, distance: number): number => {
    if (n === i) {
      return m - j + distance;
    }
    if (j === m) {
      return n - i + distance;
    }

    if (s.charAt(i) === t.charAt(j)) {
      return helper(i + 1, j + 1, distance);
    } else {
      return Math.min(helper(i, j + 1, distance), helper(i + 1, j + 1, distance), helper(i + 1, j, distance)) + 1;
    }
  }


  return helper(0, 0, 0);
}

// console.log(editDistanceBT('pack', 'pack'));
// console.log(editDistanceBT('bag11', 'pack'));
// console.log(editDistanceBT('bag', 'pack'));
// console.log(editDistanceBT(s, t));

const editDistanceBTMemo = (s: string, t: string): number => {
  const n = s.length;
  const m = t.length;
  const memo: Record<string, number> = {};
  const helper = (i: number, j: number, distance: number): number => {
    if (n === i) {
      return m - j + distance;
    }
    if (j === m) {
      return n - i + distance;
    }
    const key = `${i}_${j}`;
    if (memo[key]) {
      return memo[key];
    }
    if (s.charAt(i) === t.charAt(j)) {
      memo[key] = helper(i + 1, j + 1, distance);
    } else {
      memo[key] = Math.min(helper(i, j + 1, distance), helper(i + 1, j + 1, distance), helper(i + 1, j, distance)) + 1;
    }

    return memo[key];
  }


  return helper(0, 0, 0);
}

console.log(editDistanceBTMemo('pack', 'pack'));
console.log(editDistanceBTMemo('bag11', 'pack'));
console.log(editDistanceBTMemo('bag', 'pack'));
console.log(editDistanceBTMemo('pac', 'pack'));
console.log(editDistanceBTMemo(s, t));