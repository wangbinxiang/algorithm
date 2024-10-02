const longestCommonSubsequenceDP = (text1: string, text2: string): number => {
  const n = text1.length;
  const m = text2.length;

  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  return dp[n][m];
}

const text1 = 'dknkdizqxkdczafixidorgfcnkrirmhmzqbcfuvojsxwraxe';
const text2 = 'dulixqfgvipenkfubgtyxujixspoxmhgvahqdmzmlyhajerqz'
// console.log(longestCommonSubsequenceDP(text1, text2));


const longestCommonSubsequence = (text1: string, text2: string): number => {
  const n = text1.length;
  const m = text2.length;
  const helper = (i: number, j: number): number => {
    if (i === n || j === m) {
      return 0;
    }
    if (text1.charAt(i) === text2.charAt(j)) {
      return helper(i + 1, j + 1) + 1
    } else {
      return Math.max(helper(i + 1, j), helper(i, j + 1));
    }
  }
  return helper(0, 0);
}
// console.log(longestCommonSubsequence(text1, text2));

const longestCommonSubsequenceMemo = (text1: string, text2: string): number => {
  const n = text1.length;
  const m = text2.length;

  const memo: Record<string, number> = {};
  const helper = (i: number, j: number): number => {
    if (i === n || j === m) {
      return 0;
    }
    const key = `${i}_${j}`;
    if (memo[key] !== undefined) {
      return memo[key];
    }
    if (text1.charAt(i) === text1.charAt(j)) {
      memo[key] = helper(i + 1, j + 1) + 1;
    } else {
      memo[key] = Math.max(helper(i + 1, j), helper(i, j + 1))
    }
    return memo[key];
  }
  return helper(0, 0);
}

// console.log(longestCommonSubsequenceMemo(text1, text2));


function longestCommonSubsequenceDpComp(text1: string, text2: string): number {
  const n = text1.length;
  const m = text2.length;

  const dp2 = Array(m + 1).fill(0);
  let leftUp = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const leftUpTemp = dp2[j];
      if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
        dp2[j] = leftUp + 1;
      } else {
        dp2[j] = Math.max(dp2[j - 1], dp2[j]);
      }
      leftUp = leftUpTemp;
    }
    leftUp = dp2[0];
  }
  return dp2[m]
};

console.log(longestCommonSubsequenceDpComp(text1, text2));