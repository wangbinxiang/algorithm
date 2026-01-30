function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  console.log('m:', m)
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    dp[0][i] = i
  }

  for (let i = 1; i <= m; i++) {
    dp[i][0] = i
  }
  console.table(dp)

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
      }
    }
  }

  console.table(dp)

  return dp[m][n];
};


function minDistance1(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;

  const dp = Array(n + 1).fill(0)
  for (let j = 1; j <= n; j++) {
    dp[j] = j
  }

  for (let i = 0; i < m; i++) {
    let leftUp = i;
    dp[0] = i + 1
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      if (word1.charAt(i) === word2.charAt(j - 1)) {
        dp[j] = leftUp;
      } else {
        dp[j] = Math.min(leftUp, dp[j], dp[j - 1]) + 1
      }
      leftUp = tmp;
    }
  }


  return dp[n]
}


function minDistance2(word1: string, word2: string): number {



  return 0
}


function minDistance3(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  // console.log(m, n)

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    dp[0][i] = i;
  }
  for (let i = 1; i <= m; i++) {
    dp[i][0] = i;
  }
  // console.log(dp);
  for (let i = 1; i <= m; i++) {
    const s = word1[i - 1];
    // console.log(dp[i], i)
    for (let j = 1; j <= n; j++) {
      if (s === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
      }
    }
  }



  return dp[m][n];
};

function minDistance4(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  // console.log(m, n)

  const dp = Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = i;
  }

  // console.log(dp);
  for (let i = 1; i <= m; i++) {
    const s = word1[i - 1];
    let lt = dp[0];
    dp[0]++;
    // console.log(dp[i], i)
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      if (s === word2[j - 1]) {
        dp[j] = lt;
        // dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[j] = Math.min(dp[j - 1], lt, dp[j]) + 1;
        // dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
      }
      lt = tmp;
    }
  }
  // console.log(dp);


  return dp[n];
};

console.log(minDistance4('horse', 'ros'))
console.log(minDistance4('intention', 'execution'))

console.log(minDistance4('dinitrophenylhydrazine', 'dimethylhydrazine'))